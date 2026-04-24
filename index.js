// src/index.js
// Entry point — Express server + Line Webhook + Cron

const express = require("express");
const line    = require("@line/bot-sdk");
const cron    = require("node-cron");

const { config, validateConfig } = require("./config");
const { initVectorStore, getCount } = require("./vectorStore");
const { handleLineEvent } = require("./lineHandler");
const { syncWordpress } = require("./wordpressSync");

// ตรวจสอบ env vars ก่อนเริ่ม
validateConfig();

const app = express();

// ─────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────

// Line signature validation (ต้องอยู่ก่อน express.json)
const lineMiddleware = line.middleware({
  channelSecret: config.line.channelSecret,
});

// JSON parser สำหรับ route อื่นที่ไม่ใช่ webhook
app.use((req, res, next) => {
  if (req.path === "/webhook") return next();
  express.json()(req, res, next);
});

// ─────────────────────────────────────────
// Routes
// ─────────────────────────────────────────

/** Health check — ใช้ทดสอบว่า server ทำงานปกติ */
app.get("/health", async (req, res) => {
  const chunks = await getCount().catch(() => -1);
  res.json({
    status: "ok",
    bot: config.bot.name,
    chunks,
    time: new Date().toISOString(),
  });
});

/** Line Webhook — รับ events จาก Line Platform */
app.post("/webhook", lineMiddleware, async (req, res) => {
  // ต้องตอบ 200 ทันที ไม่งั้น Line จะ retry
  res.sendStatus(200);

  const { events } = req.body;
  if (!events?.length) return;

  await Promise.allSettled(
    events.map((event) =>
      handleLineEvent(event).catch((err) =>
        console.error(`❌ Event error [${event.type}]:`, err.message)
      )
    )
  );
});

/** Manual sync — trigger sync ผ่าน API (ป้องกันด้วย secret) */
app.post("/sync", async (req, res) => {
  const secret = req.headers["x-sync-secret"];
  if (process.env.SYNC_SECRET && secret !== process.env.SYNC_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ message: "Sync เริ่มแล้ว ดู log ที่ server" });
  syncWordpress().catch((err) => console.error("❌ Manual sync error:", err));
});

// ─────────────────────────────────────────
// Start
// ─────────────────────────────────────────

async function start() {
  console.log("🚀 กำลังเริ่ม Line WP Gemini Bot...\n");

  // เชื่อมต่อ Supabase
  await initVectorStore();

  // เริ่ม server
  app.listen(config.port, () => {
    console.log(`\n✅ Server พร้อมใช้งานที่ port ${config.port}`);
    console.log(`   📡 Webhook : http://localhost:${config.port}/webhook`);
    console.log(`   ❤️  Health  : http://localhost:${config.port}/health`);
    console.log(`\n💡 ถ้ายังไม่ได้ sync บทความ ให้รัน: npm run sync`);
  });

  // Auto sync ทุกวันตี 2
  cron.schedule("0 2 * * *", async () => {
    console.log("\n⏰ Auto sync (cron) เริ่มแล้ว...");
    await syncWordpress().catch((err) => console.error("❌ Cron sync error:", err));
  });
}

start().catch((err) => {
  console.error("💥 Fatal:", err.message);
  process.exit(1);
});
