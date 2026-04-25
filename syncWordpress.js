// scripts/syncWordpress.js
// รัน sync แบบ manual จาก CLI
// Usage:
//   npm run sync            — incremental (ข้ามที่ไม่เปลี่ยน)
//   npm run sync:full       — force index ทุกบทความใหม่หมด

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const { validateConfig }    = require("./config");
const { initVectorStore, clearCollection } = require("./vectorStore");
const { syncWordpress }     = require("./wordpressSync");

async function main() {
  validateConfig();
  await initVectorStore();

  const forceAll = process.argv.includes("--full");

  if (forceAll) {
    console.log("⚠️  Full reindex: ล้างข้อมูลเดิมทั้งหมดก่อน...");
    await clearCollection();
  }

  await syncWordpress(forceAll);
  process.exit(0);
}

main().catch((err) => {
  console.error("💥 Sync ล้มเหลว:", err.message);
  process.exit(1);
});
