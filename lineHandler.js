// src/lineHandler.js
// จัดการ events ที่รับมาจาก Line Messaging API

const line  = require("@line/bot-sdk");
const axios = require("axios");
const { generateAnswer, generateAnswerFromImage, clearChatSession } = require("./ragService");
const { notifyAll }                                                  = require("./notifier");
const { isHandedOff, takeOver, resume, parseAdminCommand }          = require("./handoff");
const { config }                                                     = require("./config");

const lineClient = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.line.channelAccessToken,
});

const processingUsers = new Set();

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

async function replyText(replyToken, text) {
  await lineClient.replyMessage({
    replyToken,
    messages: [{ type: "text", text }],
  });
}

async function downloadLineContent(messageId) {
  const url = `https://api-data.line.me/v2/bot/message/${messageId}/content`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${config.line.channelAccessToken}` },
    responseType: "arraybuffer",
  });
  return {
    buffer:      Buffer.from(response.data),
    contentType: response.headers["content-type"] || "image/jpeg",
  };
}

async function handleEscalate(replyToken, userId, trigger, detail = "") {
  // บอทแจ้งลูกค้า
  await replyText(
    replyToken,
    "ขอโทษด้วยนะครับ 🙏\n\n" +
    "เรื่องนี้ต้องให้เจ้าหน้าที่ดูแลโดยตรงครับ\n" +
    "ทีมงานจะติดต่อกลับโดยเร็วที่สุดเลยนะครับ 😊"
  );
  // แจ้งทีมงาน
  await notifyAll({ userId, trigger, detail });
  // auto-takeover ทันที — บอทเงียบจนกว่าพนักงานจะพิมพ์ /resume Uxxxxx
  takeOver(userId, "auto");
}

// ─────────────────────────────────────────
// Event Handlers
// ─────────────────────────────────────────

async function handleText(event) {
  const { replyToken, source } = event;
  const userId = source.userId;
  const text   = event.message.text.trim();

  console.log(`\n💬 [${userId.slice(0, 8)}...] "${text}"`);

  // ── 1. ตรวจคำสั่ง admin ก่อน (เจ้าหน้าที่พิมพ์ใน OA) ──
  const adminReply = parseAdminCommand(userId, text);
  if (adminReply !== null) {
    return replyText(replyToken, adminReply);
  }

  // ── 2. ถ้า user นี้อยู่ใน handoff → บอทเงียบ ──
  if (isHandedOff(userId)) {
    console.log(`🙋 [${userId.slice(0, 8)}...] อยู่ใน handoff — บอทข้าม`);
    return; // ไม่ตอบ ไม่ทำอะไร
  }

  // ── 3. คำสั่งปกติ ──
  if (text === "/clear" || text === "ล้างประวัติ") {
    clearChatSession(userId);
    return replyText(replyToken, "🗑️ ล้างประวัติการสนทนาแล้วครับ ถามใหม่ได้เลย!");
  }
  if (text === "/help" || text === "ช่วยเหลือ") {
    return replyText(replyToken, getHelpText());
  }
  if (text.length < 2) {
    return replyText(replyToken, "กรุณาพิมพ์คำถามให้ละเอียดกว่านี้ครับ 😊");
  }

  if (processingUsers.has(userId)) {
    return replyText(replyToken, "⏳ กำลังประมวลผลอยู่ครับ รอสักครู่นะครับ");
  }

  processingUsers.add(userId);

  try {
    await lineClient
      .showLoadingAnimation({ chatId: userId, loadingSeconds: 20 })
      .catch(() => {});

    const result = await generateAnswer(userId, text);

    if (result.intentType === "escalate") {
      await handleEscalate(replyToken, userId, "ข้อความจากลูกค้า", text);
    } else {
      await replyText(replyToken, result.answer);
    }
  } catch (err) {
    console.error("❌ generateAnswer error:", err.message);
    await replyText(replyToken, "ขออภัยครับ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งครับ 🙏");
  } finally {
    processingUsers.delete(userId);
  }
}

async function handleImage(event) {
  const { replyToken, source, message } = event;
  const userId    = source.userId;
  const messageId = message.id;
  const caption   = message.caption || "";

  console.log(`\n🖼️  [${userId.slice(0, 8)}...] ส่งภาพมา (id: ${messageId})`);

  // ── ถ้าอยู่ใน handoff → บอทเงียบ ──
  if (isHandedOff(userId)) {
    console.log(`🙋 [${userId.slice(0, 8)}...] อยู่ใน handoff — บอทข้าม`);
    return;
  }

  if (processingUsers.has(userId)) {
    return replyText(replyToken, "⏳ กำลังประมวลผลอยู่ครับ รอสักครู่นะครับ");
  }

  processingUsers.add(userId);

  try {
    await lineClient
      .showLoadingAnimation({ chatId: userId, loadingSeconds: 30 })
      .catch(() => {});

    const { buffer, contentType } = await downloadLineContent(messageId);
    const result = await generateAnswerFromImage(userId, buffer, contentType, caption);

    if (result.intentType === "escalate") {
      const detail = [result.imageObject, result.imageIntent].filter(Boolean).join(" — ");
      await handleEscalate(replyToken, userId, "ภาพจากลูกค้า", detail);
    } else {
      await replyText(replyToken, result.answer);
    }
  } catch (err) {
    console.error("❌ handleImage error:", err.message);
    await replyText(replyToken, "ขออภัยครับ ไม่สามารถวิเคราะห์ภาพได้ กรุณาลองใหม่อีกครั้งครับ 🙏");
  } finally {
    processingUsers.delete(userId);
  }
}

async function handleFollow(event) {
  const { replyToken } = event;
  await lineClient.replyMessage({
    replyToken,
    messages: [{
      type: "text",
      text:
        `สวัสดีครับ! ยินดีต้อนรับสู่ ${config.bot.name} 🤖\n\n` +
        `ผมสามารถตอบคำถามจากบทความในเว็บไซต์ได้ครับ\n\n` +
        `ลองถามมาได้เลยครับ เช่น:\n` +
        `• "มีบทความเรื่อง SEO ไหม"\n` +
        `• "วิธีทำ content marketing"\n` +
        `• 📷 ส่งภาพสินค้า/คำถาม มาได้เลยครับ\n\n` +
        `พิมพ์ /help เพื่อดูคำสั่งทั้งหมดได้เลยครับ 😊`,
      quickReply: {
        items: [
          { type: "action", action: { type: "message", label: "📖 วิธีใช้", text: "/help" } },
        ],
      },
    }],
  });
}

async function handlePostback(event) {
  const { replyToken, postback, source } = event;
  if (postback.data === "action=clear") {
    clearChatSession(source.userId);
    await replyText(replyToken, "🗑️ ล้างประวัติการสนทนาแล้วครับ!");
  }
}

// ─────────────────────────────────────────
// Help Text
// ─────────────────────────────────────────

function getHelpText() {
  return (
    `📖 วิธีใช้งาน ${config.bot.name}\n\n` +
    `✅ พิมพ์คำถามได้เลยครับ เช่น:\n` +
    `   • "บทความเรื่อง SEO มีอะไรบ้าง"\n` +
    `   • "อธิบาย Google Analytics"\n` +
    `   • "วิธีเพิ่ม traffic เว็บ"\n\n` +
    `🖼️ ส่งภาพได้เลย:\n` +
    `   • ภาพสินค้า/บริการ เพื่อให้ช่วยค้นหาข้อมูล\n` +
    `   • ภาพ screenshot คำถาม\n` +
    `   • แนบข้อความพร้อมภาพเพื่อระบุสิ่งที่ต้องการ\n\n` +
    `⌨️ คำสั่ง:\n` +
    `   /clear — ล้างประวัติการสนทนา\n` +
    `   /help  — แสดงเมนูนี้\n\n` +
    `💡 ผมตอบจากบทความในเว็บไซต์เท่านั้นนะครับ\n` +
    `ถ้าไม่พบข้อมูล ลองเปลี่ยนคำถามดูได้เลยครับ 😊`
  );
}

// ─────────────────────────────────────────
// Main Handler
// ─────────────────────────────────────────

async function handleLineEvent(event) {
  switch (event.type) {
    case "message":
      switch (event.message.type) {
        case "text":  await handleText(event);  break;
        case "image": await handleImage(event); break;
        default:
          await replyText(event.replyToken, "ขออภัยครับ รองรับข้อความและภาพเท่านั้น 😊");
      }
      break;
    case "follow":   await handleFollow(event);  break;
    case "postback": await handlePostback(event); break;
    case "unfollow":
      console.log(`👋 Unfollow: ${event.source.userId}`);
      // ถ้า unfollow ขณะ handoff → resume อัตโนมัติ
      resume(event.source.userId);
      break;
    default: break;
  }
}

module.exports = { handleLineEvent };