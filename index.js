// src/index.js
// Express server + Line Webhook + WordPress Webhook + Cron auto-sync

const express = require("express");
const line    = require("@line/bot-sdk");
const cron    = require("node-cron");
const crypto  = require("crypto");

const { config, validateConfig }           = require("./config");
const { initVectorStore, getCount }        = require("./vectorStore");
const { handleLineEvent }                  = require("./lineHandler");
const { syncWordpress, syncModifiedAfter, syncSingleArticle } = require("./wordpressSync");

validateConfig();

const app = express();

// ─────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────

const lineMiddleware = line.middleware({ channelSecret: config.line.channelSecret });

// raw body สำหรับ WP webhook signature verify
app.use("/wp-hook", express.raw({ type: "application/json" }));

// json สำหรับ route อื่น ยกเว้น Line webhook
app.use((req, res, next) => {
  if (req.path === "/webhook") return next();
  if (req.path === "/wp-hook") return next(); // handled above
  express.json()(req, res, next);
});

// ─────────────────────────────────────────
// Routes
// ─────────────────────────────────────────

/** Health check */
app.get("/health", async (req, res) => {
  const chunks = await getCount().catch(() => -1);
  res.json({ status: "ok", bot: config.bot.name, chunks, time: new Date().toISOString() });
});

// ── Line Webhook ─────────────────────────
app.post("/webhook", lineMiddleware, async (req, res) => {
  res.sendStatus(200);
  const { events } = req.body;
  if (!events?.length) return;
  await Promise.allSettled(
    events.map((e) =>
      handleLineEvent(e).catch((err) =>
        console.error(`❌ Line event [${e.type}]:`, err.message)
      )
    )
  );
});

// ── WordPress Webhook ────────────────────
// ติดตั้ง plugin "WP Webhooks" หรือ "Uncanny Automator" ใน WordPress
// แล้วตั้ง URL: https://your-server.com/wp-hook
// Event: post published / post updated / post trashed
app.post("/wp-hook", async (req, res) => {
  // ── Verify secret (ถ้าตั้งไว้) ──
  const wpSecret = process.env.WP_WEBHOOK_SECRET;
  if (wpSecret) {
    const sig = req.headers["x-wp-webhook-signature"] ||
                req.headers["x-hub-signature-256"] || "";
    const expected = "sha256=" + crypto
      .createHmac("sha256", wpSecret)
      .update(req.body)
      .digest("hex");
    if (sig !== expected) {
      console.warn("⚠️  WP Webhook: signature ไม่ตรง");
      return res.status(401).json({ error: "Invalid signature" });
    }
  }

  let payload;
  try {
    payload = JSON.parse(req.body.toString());
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  // ตอบ WordPress ทันที ไม่งั้น timeout
  res.json({ ok: true });

  // ── หา article ID จาก payload ──
  // รองรับ format จาก WP Webhooks plugin และ format ทั่วไป
  const articleId =
    payload.ID ||
    payload.id ||
    payload.post_id ||
    payload.post?.ID ||
    payload.post?.id;

  if (!articleId) {
    console.warn("⚠️  WP Webhook: ไม่พบ article ID ใน payload", JSON.stringify(payload).slice(0, 200));
    return;
  }

  console.log(`\n📨 WP Webhook รับแล้ว: article #${articleId}`);

  // ── Index บทความทันที ──
  syncSingleArticle(articleId).catch((err) =>
    console.error(`❌ WP Webhook sync error:`, err.message)
  );
});

// ── Manual sync endpoint ─────────────────
app.post("/sync", async (req, res) => {
  const secret = req.headers["x-sync-secret"];
  if (process.env.SYNC_SECRET && secret !== process.env.SYNC_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const full = req.body?.full === true;
  res.json({ message: `Sync เริ่มแล้ว (${full ? "full" : "incremental"})` });
  syncWordpress(full).catch((err) => console.error("❌ Manual sync:", err.message));
});

// ─────────────────────────────────────────
// Start + Cron
// ─────────────────────────────────────────

async function start() {
  console.log("🚀 กำลังเริ่ม Line WP Gemini Bot...\n");

  await initVectorStore();

  // sync ครั้งแรกตอน start (incremental — ข้ามที่ไม่เปลี่ยน)
  syncWordpress(false).catch((err) =>
    console.error("❌ Initial sync error:", err.message)
  );

  app.listen(config.port, () => {
    console.log(`\n✅ Server พร้อมที่ port ${config.port}`);
    console.log(`   📡 Line Webhook : http://localhost:${config.port}/webhook`);
    console.log(`   🔔 WP Webhook   : http://localhost:${config.port}/wp-hook`);
    console.log(`   ❤️  Health       : http://localhost:${config.port}/health`);
  });

  // ── Cron 1: ทุก 1 ชั่วโมง — sync เฉพาะที่แก้ไขใหม่ ──
  cron.schedule("0 * * * *", async () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    console.log("\n⏰ Hourly sync...");
    await syncModifiedAfter(oneHourAgo).catch((err) =>
      console.error("❌ Hourly sync:", err.message)
    );
  });

  // ── Cron 2: ทุกวันตี 3 — full sync กันพลาด ──
  cron.schedule("0 3 * * *", async () => {
    console.log("\n⏰ Daily full sync...");
    await syncWordpress(false).catch((err) =>
      console.error("❌ Daily sync:", err.message)
    );
  });

  console.log("⏰ Cron: hourly incremental sync + daily full sync ตีสาม");
}

start().catch((err) => {
  console.error("💥 Fatal:", err.message);
  process.exit(1);
});
