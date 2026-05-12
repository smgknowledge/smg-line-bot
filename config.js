// src/config.js
require("dotenv").config();

// แปลง "line,email,telegram" → Set{"line","email","telegram"} หรือ null ถ้าไม่ตั้ง
function parseChannels(raw) {
  if (!raw) return null;
  return new Set(raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean));
}

const config = {
  line: {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret:      process.env.LINE_CHANNEL_SECRET,
  },
  gemini: {
    apiKey:         process.env.GEMINI_API_KEY,
    chatModel:      "gemini-flash-lite-latest",
    embeddingModel: "gemini-embedding-2",
  },
  wordpress: {
    url:     (process.env.WORDPRESS_URL || "").replace(/\/$/, ""),
    perPage: parseInt(process.env.WORDPRESS_PER_PAGE || "100"),
    auth:    process.env.WORDPRESS_AUTH || null,
  },
  supabase: {
    url:     process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    table:   process.env.SUPABASE_TABLE || "article_chunks",
  },

  // ── Escalation channels ──────────────────────────────────────────────
  //
  // ESCALATION_CHANNELS=line,email,telegram  ← เปิดทุกช่องทาง
  // ESCALATION_CHANNELS=line                 ← เฉพาะ LINE Group
  // ESCALATION_CHANNELS=email               ← เฉพาะ Email
  // ไม่ตั้งค่า ESCALATION_CHANNELS          ← ใช้ทุกช่องที่มี credentials ครบ
  //
  escalation: {
    channels: parseChannels(process.env.ESCALATION_CHANNELS), // Set หรือ null

    // LINE Group — pushMessage เข้า Group ของทีมงาน
    // หา groupId: เพิ่ม OA เข้า Group แล้วดู console log (source.groupId)
    line: {
      groupId: process.env.LINE_ESCALATION_GROUP_ID || null,
    },

    // Email — nodemailer (npm install nodemailer)
    // Gmail ต้องใช้ App Password: Google Account → Security → App passwords
    email: {
      host:   process.env.SMTP_HOST   || "smtp.gmail.com",
      port:   parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      user:   process.env.SMTP_USER   || null,  // อีเมลผู้ส่ง
      pass:   process.env.SMTP_PASS   || null,  // App Password
      to:     process.env.SMTP_TO     || null,  // อีเมลทีมงาน (คั่น , ถ้าหลายคน)
    },

    // Telegram Bot — ฟรี ไม่ต้องติดตั้ง library เพิ่ม
    // สร้าง bot: @BotFather → /newbot → ได้ TOKEN
    // หา chatId: เพิ่ม bot เข้า group → getUpdates → ดู chat.id
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN || null,
      chatId:   process.env.TELEGRAM_CHAT_ID   || null,
    },
  },
  // ────────────────────────────────────────────────────────────────────

  port: parseInt(process.env.PORT || "3000"),
  rag: {
    topK:                parseInt(process.env.RAG_TOP_K              || "5"),
    chunkSize:           parseInt(process.env.CHUNK_SIZE             || "1000"),
    chunkOverlap:        parseInt(process.env.CHUNK_OVERLAP          || "100"),
    similarityThreshold: parseFloat(process.env.SIMILARITY_THRESHOLD || "0.7"),
  },
  bot: {
    name: process.env.BOT_NAME || "AI Assistant",
  },
};

function validateConfig() {
  const required = [
    ["LINE_CHANNEL_ACCESS_TOKEN", config.line.channelAccessToken],
    ["LINE_CHANNEL_SECRET",       config.line.channelSecret],
    ["GEMINI_API_KEY",            config.gemini.apiKey],
    ["WORDPRESS_URL",             config.wordpress.url],
    ["SUPABASE_URL",              config.supabase.url],
    ["SUPABASE_ANON_KEY",         config.supabase.anonKey],
  ];

  const missing = required.filter(([, val]) => !val).map(([key]) => key);
  if (missing.length > 0) {
    throw new Error(
      `❌ ขาด environment variables:\n${missing.map((k) => `  - ${k}`).join("\n")}\n\nแก้ไขในไฟล์ .env แล้วรันใหม่`
    );
  }

  // สรุปช่องทาง escalation ที่พร้อมใช้
  const { line: ln, email, telegram, channels } = config.escalation;
  const ready = [];
  if (ln?.groupId)                  ready.push("LINE Group");
  if (email?.user && email?.to)     ready.push("Email");
  if (telegram?.botToken)           ready.push("Telegram");

  if (ready.length === 0) {
    console.warn("⚠️  ไม่มีช่องทาง escalation — ตั้งค่าใน .env อย่างน้อย 1 ช่องทาง");
  } else {
    const active = channels ? [...channels].join(", ") : "auto";
    console.log(`✅ Escalation channels: ${ready.join(", ")} [ESCALATION_CHANNELS=${active}]`);
  }
}

module.exports = { config, validateConfig };