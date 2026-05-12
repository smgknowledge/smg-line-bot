// src/ragService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { searchSimilar } = require("./vectorStore");
const { embedText } = require("./wordpressSync");
const { config } = require("./config");

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

const chatSessions = new Map();
const SESSION_TTL_MS = 30 * 60 * 1000;

// ─────────────────────────────────────────
// Intent classifier สำหรับข้อความ
// ─────────────────────────────────────────

/**
 * วิเคราะห์ข้อความว่าควร route ไปที่ไหน
 * @returns {{ intentType: "info"|"unclear"|"escalate", reason: string }}
 */
async function classifyTextIntent(text) {
  const model = genAI.getGenerativeModel({
    model: config.gemini.chatModel,
    generationConfig: { maxOutputTokens: 100, temperature: 0.1 },
  });

  const prompt = `วิเคราะห์ข้อความลูกค้านี้แล้วตอบ JSON เท่านั้น ห้ามมีข้อความอื่น:
ข้อความ: "${text}"

intentType ต้องเป็นหนึ่งในนี้:
- "info"     = ถามข้อมูล/ราคา/บริการทั่วไป ที่ AI ตอบได้
- "unclear"  = คำถามคลุมเครือ ต้องถามเพิ่มก่อน
- "escalate" = ร้องเรียน/โกรธ/ขอคืนเงิน/ยกเลิก/เรื่องสัญญา/ขอคุยคน

{"intentType":"info|unclear|escalate","reason":"เหตุผลสั้นๆ"}`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim().replace(/```json|```/g, "");
    const parsed = JSON.parse(raw);
    return {
      intentType: ["info", "unclear", "escalate"].includes(parsed.intentType)
        ? parsed.intentType
        : "info",
      reason: parsed.reason || "",
    };
  } catch {
    return { intentType: "info", reason: "parse failed, fallback to info" };
  }
}

// ─────────────────────────────────────────
// System prompt builder
// ─────────────────────────────────────────

function buildSystemPrompt(contexts) {
  const contextText = contexts
    .map((c, i) => {
      const m = c.metadata;
      return [
        `[บทความที่ ${i + 1}]`,
        `ชื่อ: ${m.title}`,
        m.categories ? `หมวดหมู่: ${m.categories}` : null,
        `ลิงก์: ${m.link}`,
        `เนื้อหา:\n${c.text}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n---\n\n");

  return `คุณคือ ${config.bot.name} ผู้ช่วย AI ของเว็บไซต์

กฎการตอบ:
- ตอบโดยอ้างอิงจากบทความที่ให้ไว้เท่านั้น
- ถ้าไม่มีข้อมูลในบทความ ให้บอกตรงๆ ว่าไม่ทราบ อย่าเดา
- ตอบเป็นภาษาไทยเสมอ กระชับ เข้าใจง่าย ใช้สรรพนาม "ผม" และลงท้ายด้วย "ครับ"
- ห้ามอารัมภบทหรือขึ้นต้นด้วยการแนะนำตัวเอง เช่น "SMG ให้บริการ..." หรือ "ยินดีช่วยเหลือ..." ให้ตอบตรงประเด็นและถามต่อได้เลย
- ห้ามสร้างข้อมูลที่ไม่มีในบทความ
- ห้ามเสนอ "ประสานงาน" "ติดต่อให้" "ส่งต่อให้" หรือรับปากแทนพนักงาน
- ถ้าลูกค้าต้องการคุยกับคน ให้บอกว่า "พิมพ์ 'ขอคุยกับเจ้าหน้าที่' ได้เลยครับ"

บทความอ้างอิง:
${contextText}

ตอบคำถามของผู้ใช้:`;
}

async function retrieveContext(query) {
  const queryEmbedding = await embedText(query);
  return searchSimilar(queryEmbedding, config.rag.topK);
}

// ─────────────────────────────────────────
// Chat session helper
// ─────────────────────────────────────────

function getOrCreateSession(userId) {
  if (!chatSessions.has(userId)) {
    const model = genAI.getGenerativeModel({
      model: config.gemini.chatModel,
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    });
    chatSessions.set(userId, model.startChat({ history: [] }));
    setTimeout(() => {
      chatSessions.delete(userId);
      console.log(`🗑️  Session หมดอายุ: ${userId}`);
    }, SESSION_TTL_MS);
  }
  return chatSessions.get(userId);
}

// ─────────────────────────────────────────
// generateAnswer — ข้อความปกติ
// ─────────────────────────────────────────

/**
 * @returns {{
 *   answer: string,
 *   contexts: Array,
 *   intentType: "info"|"unclear"|"escalate",
 *   reason: string
 * }}
 */
async function generateAnswer(userId, query) {
  console.log(`\n🔍 Query: "${query}"`);

  // ── Classify intent ก่อน ──
  const { intentType, reason } = await classifyTextIntent(query);
  console.log(`🎯 Intent: ${intentType} (${reason})`);

  // ── escalate: ไม่ต้อง RAG เลย ส่งกลับไปให้ lineHandler จัดการ ──
  if (intentType === "escalate") {
    return { answer: "", contexts: [], intentType, reason };
  }

  // ── unclear: ถามกลับทันที ──
  if (intentType === "unclear") {
    return {
      answer:
        "ขอโทษนะครับ ช่วยอธิบายเพิ่มเติมได้ไหมครับ? 😊\n\n" +
        "เช่น ต้องการข้อมูลเรื่องอะไร หรือมีรูปสินค้าที่สนใจก็ส่งมาได้เลยครับ",
      contexts: [],
      intentType,
      reason,
    };
  }

  // ── info: RAG + ตอบ ──
  const contexts = await retrieveContext(query);
  console.log(`📚 พบ ${contexts.length} chunks ที่เกี่ยวข้อง`);

  if (contexts.length === 0) {
    return {
      answer:
        `ขออภัยครับ ไม่พบข้อมูลเกี่ยวกับ "${query}" ในบทความของเรา\n\n` +
        `ลองถามด้วยคำอื่น หรือติดต่อเจ้าหน้าที่เพื่อรับข้อมูลเพิ่มเติมได้เลยครับ 😊`,
      contexts: [],
      intentType,
      reason,
    };
  }

  const chat = getOrCreateSession(userId);
  const prompt = `สรุปคำตอบจากเนื้อหานี้ไม่เกิน 3 บรรทัดและถามต่อ: \n\n ${buildSystemPrompt(contexts)} \n\n คำถามลูกค้า: ${query}`;
  const result = await chat.sendMessage(prompt);
  const answer = result.response.text();

  const sources = [...new Set(contexts.map((c) => c.metadata.title))];
  console.log(`✅ ตอบแล้ว (${answer.length} ตัวอักษร) | แหล่ง: ${sources.join(", ")}`);

  return { answer, contexts, intentType, reason };
}

// ─────────────────────────────────────────
// generateAnswerFromImage — วิเคราะห์ภาพ
// ─────────────────────────────────────────

/**
 * @returns {{
 *   answer: string,
 *   contexts: Array,
 *   intentType: "info"|"unclear"|"escalate",
 *   imageObject: string,
 *   imageIntent: string
 * }}
 */
async function generateAnswerFromImage(userId, imageBuffer, mimeType, caption = "") {
  console.log(`\n🖼️  Image query from ${userId.slice(0, 8)}... (${mimeType})`);

  // ── Step 1: Vision → วิเคราะห์ภาพ + classify intent พร้อมกัน ──
  const visionModel = genAI.getGenerativeModel({
    model: config.gemini.chatModel,
    generationConfig: { maxOutputTokens: 300, temperature: 0.2 },
  });

  const imageDescPrompt = caption
    ? `ดูภาพนี้ + ข้อความลูกค้า: "${caption}" แล้วตอบ JSON เท่านั้น ห้ามมีข้อความอื่น:
{
  "object": "สิ่งที่เห็นในภาพ",
  "intent": "ลูกค้าต้องการอะไร",
  "intentType": "info หรือ unclear หรือ escalate",
  "searchQuery": "คำค้นหาบริการที่เกี่ยวข้อง"
}
intentType: info=ถามทั่วไป unclear=คลุมเครือ escalate=ร้องเรียน/คืนเงิน/โกรธ/ขอคุยคน`
    : `ดูภาพนี้แล้วตอบ JSON เท่านั้น ห้ามมีข้อความอื่น:
{
  "object": "สิ่งที่เห็นในภาพ",
  "intent": "ลูกค้าน่าจะต้องการอะไร",
  "intentType": "info หรือ unclear หรือ escalate",
  "searchQuery": "คำค้นหาบริการที่เกี่ยวข้อง"
}
intentType: info=ถามทั่วไป unclear=คลุมเครือ escalate=ร้องเรียน/คืนเงิน/โกรธ/ขอคุยคน`;

  const visionResult = await visionModel.generateContent([
    imageDescPrompt,
    { inlineData: { data: imageBuffer.toString("base64"), mimeType } },
  ]);

  // parse JSON — fallback gracefully ถ้า Gemini ตอบผิด format
  let imageObject = "", imageIntent = "", intentType = "info", searchQuery = "";
  try {
    const raw = visionResult.response.text().trim().replace(/```json|```/g, "");
    const parsed = JSON.parse(raw);
    imageObject = parsed.object      || "";
    imageIntent = parsed.intent      || caption || "";
    intentType  = ["info", "unclear", "escalate"].includes(parsed.intentType)
      ? parsed.intentType : "info";
    searchQuery = parsed.searchQuery || `${imageObject} ${imageIntent}`;
  } catch {
    searchQuery = visionResult.response.text().trim();
    imageObject = searchQuery;
    imageIntent = caption || "";
    intentType  = "info";
  }

  console.log(`🎯 Intent: ${intentType} | ภาพ: "${imageObject}" | ต้องการ: "${imageIntent}"`);

  // ── escalate ──
  if (intentType === "escalate") {
    return { answer: "", contexts: [], intentType, imageObject, imageIntent };
  }

  // ── unclear ──
  if (intentType === "unclear") {
    return {
      answer:
        `🖼️ เห็นภาพ "${imageObject}" แล้วครับ\n\n` +
        `ช่วยบอกเพิ่มเติมได้ไหมครับ ต้องการบริการอะไรเป็นพิเศษ? 😊`,
      contexts: [],
      intentType,
      imageObject,
      imageIntent,
    };
  }

  // ── info: RAG ──
  const contexts = await retrieveContext(searchQuery);
  console.log(`📚 พบ ${contexts.length} chunks ที่เกี่ยวข้อง`);

  if (contexts.length === 0) {
    return {
      answer:
        `🖼️ จากภาพ "${imageObject}" ครับ\n\n` +
        `ขออภัยครับ ไม่พบข้อมูลที่เกี่ยวข้องในระบบ\n` +
        `ลองถามเป็นข้อความ หรือติดต่อเจ้าหน้าที่ได้เลยครับ 😊`,
      contexts: [],
      intentType,
      imageObject,
      imageIntent,
    };
  }

  const chat = getOrCreateSession(userId);
  const prompt =
    `ผู้ใช้ส่งภาพมา เห็น: "${imageObject}"\n` +
    (imageIntent ? `ความต้องการ: "${imageIntent}"\n` : "") +
    `\nสรุปคำตอบจากเนื้อหานี้ไม่เกิน 3 บรรทัดและถามต่อ:\n\n` +
    `${buildSystemPrompt(contexts)}\n\n` +
    `คำถามจากภาพ: ${imageIntent || imageObject}`;

  const result = await chat.sendMessage(prompt);
  const answer = result.response.text();

  const sources = [...new Set(contexts.map((c) => c.metadata.title))];
  console.log(`✅ ตอบภาพแล้ว (${answer.length} ตัวอักษร) | แหล่ง: ${sources.join(", ")}`);

  return { answer, contexts, intentType, imageObject, imageIntent };
}

function clearChatSession(userId) {
  chatSessions.delete(userId);
  console.log(`🗑️  ล้าง session: ${userId}`);
}

module.exports = { generateAnswer, generateAnswerFromImage, clearChatSession };