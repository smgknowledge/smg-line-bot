// src/notifier.js
// รวมช่องทางแจ้งเตือนทีมงานเมื่อ escalate
// รองรับ: LINE Group | Email (nodemailer) | Telegram Bot
//
// ── เลือกช่องทางใน .env ─────────────────────────────────────────────
// ESCALATION_CHANNELS=line,email,telegram   ← ใช้ทุกช่องทาง
// ESCALATION_CHANNELS=line                  ← เฉพาะ LINE Group
// ESCALATION_CHANNELS=email,telegram        ← Email + Telegram
// ไม่ตั้งค่า = ใช้ทุกช่องทางที่มี credentials ครบ
// ────────────────────────────────────────────────────────────────────

const { config } = require("./config");

// ─────────────────────────────────────────
// ตรวจว่าช่องทางนี้ถูกเลือกใช้ไหม
// ─────────────────────────────────────────

function isEnabled(channel) {
  const selected = config.escalation.channels; // Set หรือ null
  if (!selected) return true; // ไม่ได้ตั้งค่า = ใช้ทุกช่องที่ครบ
  return selected.has(channel);
}

// ─────────────────────────────────────────
// สร้าง message text กลาง (ใช้ทุกช่องทาง)
// ─────────────────────────────────────────

function buildMessage({ userId, trigger, detail }) {
  const time = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
  return (
    `🚨 ต้องการพนักงานช่วยเหลือ\n` +
    `👤 User: ${userId}\n` +
    `📌 เรื่อง: ${trigger}\n` +
    (detail ? `📝 รายละเอียด: ${detail}\n` : "") +
    `🕐 เวลา: ${time}`
  );
}

// ─────────────────────────────────────────
// LINE Group — pushMessage
// วิธีหา Group ID:
//   เพิ่ม OA เข้า Group → ดู webhook log ตรง source.groupId
//   ครั้งแรกที่มีคนพูดในกลุ่ม จะเห็น groupId ขึ้น console
// ─────────────────────────────────────────

async function notifyLineGroup({ userId, trigger, detail }) {
  if (!isEnabled("line")) return;
  const cfg = config.escalation.line;
  if (!cfg?.groupId) return;

  const line = require("@line/bot-sdk");
  const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: config.line.channelAccessToken,
  });

  const text = buildMessage({ userId, trigger, detail });

  try {
    await client.pushMessage({
      to: cfg.groupId,
      messages: [{ type: "text", text }],
    });
    console.log(`💬 LINE Group แจ้ง ${cfg.groupId} แล้ว`);
  } catch (err) {
    console.error("❌ LINE Group error:", err.message);
  }
}

// ─────────────────────────────────────────
// Email — nodemailer
// Gmail: ต้องใช้ App Password (ไม่ใช่ password login)
// Google Account → Security → 2-Step → App passwords
// ─────────────────────────────────────────

async function notifyEmail({ userId, trigger, detail }) {
  if (!isEnabled("email")) return;
  const cfg = config.escalation.email;
  if (!cfg?.to || !cfg?.user || !cfg?.pass) return;

  let nodemailer;
  try {
    nodemailer = require("nodemailer");
  } catch {
    console.error("❌ Email: ติดตั้ง nodemailer ก่อน: npm install nodemailer");
    return;
  }

  const transporter = nodemailer.createTransport({
    host:   cfg.host   || "smtp.gmail.com",
    port:   cfg.port   || 587,
    secure: cfg.secure || false,
    auth:   { user: cfg.user, pass: cfg.pass },
  });

  const text = buildMessage({ userId, trigger, detail });

  try {
    await transporter.sendMail({
      from:    `"${config.bot.name}" <${cfg.user}>`,
      to:      cfg.to,
      subject: `🚨 [${config.bot.name}] ต้องการพนักงาน — ${trigger}`,
      text,
    });
    console.log(`📧 Email แจ้ง ${cfg.to} แล้ว`);
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
}

// ─────────────────────────────────────────
// Telegram Bot — ฟรี ไม่ต้องติดตั้ง library
// วิธีสร้าง:
//   1. คุยกับ @BotFather → /newbot → ได้ BOT_TOKEN
//   2. เพิ่ม bot เข้า Group → ส่งข้อความใดก็ได้
//   3. เปิด https://api.telegram.org/bot<TOKEN>/getUpdates
//      หา "chat":{"id":...} (Group จะเป็นเลขติดลบ)
// ─────────────────────────────────────────

async function notifyTelegram({ userId, trigger, detail }) {
  if (!isEnabled("telegram")) return;
  const cfg = config.escalation.telegram;
  if (!cfg?.botToken || !cfg?.chatId) return;

  const axios = require("axios");
  const text  = buildMessage({ userId, trigger, detail });

  try {
    await axios.get(
      `https://api.telegram.org/bot${cfg.botToken}/sendMessage`,
      {
        params: { chat_id: cfg.chatId, text },
        timeout: 8000,
      }
    );
    console.log(`✈️  Telegram แจ้ง ${cfg.chatId} แล้ว`);
  } catch (err) {
    console.error("❌ Telegram error:", err.message);
  }
}

// ─────────────────────────────────────────
// Main — ยิงช่องทางที่เปิดใช้งานพร้อมกัน
// ─────────────────────────────────────────

/**
 * @param {{ userId: string, trigger: string, detail?: string }} opts
 */
async function notifyAll(opts) {
  const active = config.escalation.channels
    ? [...config.escalation.channels].join(", ")
    : "all";
  console.log(`📣 Escalation [${active}]: ${opts.trigger} | ${opts.userId.slice(0, 8)}...`);

  await Promise.allSettled([
    notifyLineGroup(opts),
    notifyEmail(opts),
    notifyTelegram(opts),
  ]);
}

module.exports = { notifyAll };