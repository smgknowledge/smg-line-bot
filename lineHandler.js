// src/lineHandler.js
// จัดการ events ที่รับมาจาก Line Messaging API

const line = require("@line/bot-sdk");
const { generateAnswer, clearChatSession } = require("./ragService");
const { config } = require("./config");

const lineClient = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.line.channelAccessToken,
});

// ป้องกัน user ส่งซ้ำขณะกำลัง process
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

// ─────────────────────────────────────────
// Event Handlers
// ─────────────────────────────────────────

async function handleText(event) {
  const { replyToken, source } = event;
  const userId  = source.userId;
  const text    = event.message.text.trim();

  console.log(`\n💬 [${userId.slice(0, 8)}...] "${text}"`);

  // ── คำสั่งพิเศษ ──
  if (text === "/clear" || text === "ล้างประวัติ") {
    clearChatSession(userId);
    return replyText(replyToken, "🗑️ ล้างประวัติการสนทนาแล้วค่ะ ถามใหม่ได้เลย!");
  }

  if (text === "/help" || text === "ช่วยเหลือ") {
    return replyText(replyToken, getHelpText());
  }

  if (text.length < 2) {
    return replyText(replyToken, "กรุณาพิมพ์คำถามให้ละเอียดกว่านี้ค่ะ 😊");
  }

  // ── กัน duplicate ──
  if (processingUsers.has(userId)) {
    return replyText(replyToken, "⏳ กำลังประมวลผลอยู่ค่ะ รอสักครู่นะคะ");
  }

  processingUsers.add(userId);

  try {
    // แสดง loading animation (ถ้า plan รองรับ)
    await lineClient
      .showLoadingAnimation({ chatId: userId, loadingSeconds: 20 })
      .catch(() => {});

    const answer = await generateAnswer(userId, text);
    await replyText(replyToken, answer);
  } catch (err) {
    console.error("❌ generateAnswer error:", err.message);
    await replyText(
      replyToken,
      "ขออภัยค่ะ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง 🙏"
    );
  } finally {
    processingUsers.delete(userId);
  }
}

async function handleFollow(event) {
  const { replyToken } = event;
  await lineClient.replyMessage({
    replyToken,
    messages: [
      {
        type: "text",
        text:
          `สวัสดีค่ะ! ยินดีต้อนรับสู่ ${config.bot.name} 🤖\n\n` +
          `ฉันสามารถตอบคำถามจากบทความในเว็บไซต์ได้ค่ะ\n\n` +
          `ลองถามมาได้เลย เช่น:\n` +
          `• "มีบทความเรื่อง SEO ไหม"\n` +
          `• "วิธีทำ content marketing"\n\n` +
          `พิมพ์ /help เพื่อดูคำสั่งทั้งหมดค่ะ 😊`,
        quickReply: {
          items: [
            { type: "action", action: { type: "message", label: "📖 วิธีใช้", text: "/help" } },
          ],
        },
      },
    ],
  });
}

async function handlePostback(event) {
  const { replyToken, postback, source } = event;
  if (postback.data === "action=clear") {
    clearChatSession(source.userId);
    await replyText(replyToken, "🗑️ ล้างประวัติการสนทนาแล้วค่ะ!");
  }
}

// ─────────────────────────────────────────
// Help Text
// ─────────────────────────────────────────

function getHelpText() {
  return (
    `📖 วิธีใช้งาน ${config.bot.name}\n\n` +
    `✅ พิมพ์คำถามได้เลยค่ะ เช่น:\n` +
    `   • "บทความเรื่อง SEO มีอะไรบ้าง"\n` +
    `   • "อธิบาย Google Analytics"\n` +
    `   • "วิธีเพิ่ม traffic เว็บ"\n\n` +
    `⌨️ คำสั่ง:\n` +
    `   /clear — ล้างประวัติการสนทนา\n` +
    `   /help  — แสดงเมนูนี้\n\n` +
    `💡 ฉันตอบจากบทความในเว็บไซต์เท่านั้นนะคะ\n` +
    `ถ้าไม่พบข้อมูล ลองเปลี่ยนคำถามดูค่ะ 😊`
  );
}

// ─────────────────────────────────────────
// Main Handler
// ─────────────────────────────────────────

async function handleLineEvent(event) {
  switch (event.type) {
    case "message":
      if (event.message.type === "text") {
        await handleText(event);
      } else {
        await replyText(event.replyToken, "ขออภัยค่ะ รองรับเฉพาะข้อความตัวอักษร 😊");
      }
      break;
    case "follow":
      await handleFollow(event);
      break;
    case "postback":
      await handlePostback(event);
      break;
    case "unfollow":
      console.log(`👋 Unfollow: ${event.source.userId}`);
      break;
    default:
      break;
  }
}

module.exports = { handleLineEvent };
