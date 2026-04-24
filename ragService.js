// src/ragService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { searchSimilar } = require("./vectorStore");
const { embedText } = require("./wordpressSync");
const { config } = require("./config");

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

const chatSessions = new Map();
const SESSION_TTL_MS = 30 * 60 * 1000;

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
- ตอบเป็นภาษาไทยเสมอ กระชับ เข้าใจง่าย
- ห้ามสร้างข้อมูลที่ไม่มีในบทความ

บทความอ้างอิง:
${contextText}

ตอบคำถามของผู้ใช้:`;
}

async function retrieveContext(query) {
  const queryEmbedding = await embedText(query);
  return searchSimilar(queryEmbedding, config.rag.topK);
}

/**
 * สร้างคำตอบด้วย RAG + Gemini
 * @returns {{ answer: string, contexts: Array }} — คืน contexts ด้วยเพื่อให้ lineHandler สร้าง Flex ได้
 */
async function generateAnswer(userId, query) {
  console.log(`\n🔍 Query: "${query}"`);

  const contexts = await retrieveContext(query);
  console.log(`📚 พบ ${contexts.length} chunks ที่เกี่ยวข้อง`);

  if (contexts.length === 0) {
    return {
      answer: `ขออภัยค่ะ ไม่พบข้อมูลเกี่ยวกับ "${query}" ในบทความของเรา\n\nลองถามด้วยคำอื่น หรือติดต่อเจ้าหน้าที่เพื่อรับข้อมูลเพิ่มเติมได้เลยค่ะ 😊`,
      contexts: [],
    };
  }

  if (!chatSessions.has(userId)) {
    const model = genAI.getGenerativeModel({
      model: config.gemini.chatModel,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.3 },
    });
    chatSessions.set(userId, model.startChat({ history: [] }));
    setTimeout(() => {
      chatSessions.delete(userId);
      console.log(`🗑️  Session หมดอายุ: ${userId}`);
    }, SESSION_TTL_MS);
  }

  const prompt = buildSystemPrompt(contexts) + "\n\n" + query;
  const chat   = chatSessions.get(userId);
  const result = await chat.sendMessage(prompt);
  const answer = result.response.text();

  const sources = [...new Set(contexts.map((c) => c.metadata.title))];
  console.log(`✅ ตอบแล้ว (${answer.length} ตัวอักษร) | แหล่ง: ${sources.join(", ")}`);

  // คืนทั้ง answer และ contexts ให้ lineHandler เอาไปสร้าง Flex
  return { answer, contexts };
}

function clearChatSession(userId) {
  chatSessions.delete(userId);
  console.log(`🗑️  ล้าง session: ${userId}`);
}

module.exports = { generateAnswer, clearChatSession };
