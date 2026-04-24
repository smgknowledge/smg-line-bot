// scripts/syncWordpress.js
// รัน sync แยกจาก server
// Usage:
//   npm run sync          — incremental (เฉพาะบทความใหม่)
//   npm run sync:full     — ล้างทั้งหมดแล้ว index ใหม่

require("dotenv").config({ path: require("path").join(__dirname, "./.env") });

const { validateConfig } = require("./config");
const { initVectorStore, clearCollection } = require("./vectorStore");
const { syncWordpress } = require("./wordpressSync");

async function main() {
  validateConfig();

  const fullReindex = process.argv.includes("--full");

  await initVectorStore();

  if (fullReindex) {
    console.log("⚠️  Full reindex: ล้างข้อมูลเดิมทั้งหมดก่อน...");
    await clearCollection();
  }

  await syncWordpress(fullReindex);
  process.exit(0);
}

main().catch((err) => {
  console.error("💥 Sync ล้มเหลว:", err.message);
  process.exit(1);
});
