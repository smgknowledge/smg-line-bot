// scripts/ingest.js
// CLI สำหรับ index ข้อมูลจากทุกแหล่ง
//
// Usage:
//   node scripts/ingest.js --all              ← ทำทั้งหมด (manual + sheet + files)
//   node scripts/ingest.js --manual           ← เฉพาะ manual (FAQ, ข้อมูลบริษัท)
//   node scripts/ingest.js --sheet            ← เฉพาะ Google Sheets ที่กำหนด
//   node scripts/ingest.js --file path/file   ← ไฟล์เดี่ยว
//   node scripts/ingest.js --folder path/dir  ← ทุกไฟล์ในโฟลเดอร์

require("dotenv").config({ path: require("path").join(__dirname, "./.env") });

const path = require("path");
const { validateConfig }    = require("./config");
const { initVectorStore }   = require("./vectorStore");
const { ingestManual }      = require("./ingestors/manualIngestor");
const { ingestFile, ingestFolder } = require("./ingestors/fileIngestor");
const { ingestSheets }      = require("./ingestors/sheetIngestor");

// ─────────────────────────────────────────
// ✏️  ตั้งค่า Google Sheets ที่ต้องการ index
//    (เพิ่ม / ลบได้ตามต้องการ)
// ─────────────────────────────────────────
const SHEETS_CONFIG = [
  // ตัวอย่าง sheet สาธารณะ:
  // {
  //   sheetId:   "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
  //   title:     "ตารางราคาสินค้า",
  //   sheetName: "Sheet1",
  //   category:  "ราคาสินค้า",
  //   mode:      "public",
  // },

  // ตัวอย่าง sheet ส่วนตัว:
  // {
  //   sheetId:          "YOUR_SHEET_ID",
  //   title:            "ข้อมูล Stock",
  //   sheetName:        "Inventory",
  //   category:         "คลังสินค้า",
  //   mode:             "private",
  //   credentialsPath:  path.join(__dirname, "./service-account.json"),
  // },
];

// ─────────────────────────────────────────
// ✏️  ตั้งค่าโฟลเดอร์ไฟล์เอกสาร
// ─────────────────────────────────────────
const DOCS_FOLDER = path.join(__dirname, "./docs");
// วางไฟล์ PDF / Word / Excel ไว้ในโฟลเดอร์ docs/ แล้วรัน --folder หรือ --all

// ─────────────────────────────────────────
// CLI Handler
// ─────────────────────────────────────────
async function main() {
  validateConfig();
  await initVectorStore();

  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help")) {
    console.log(`
📦 Ingest CLI — เพิ่มข้อมูลเข้า Vector DB

คำสั่ง:
  node scripts/ingest.js --all              ทำทั้งหมด
  node scripts/ingest.js --manual           FAQ / ข้อมูลบริษัท (แก้ใน manualIngestor.js)
  node scripts/ingest.js --sheet            Google Sheets (ตั้งค่าใน SHEETS_CONFIG)
  node scripts/ingest.js --folder           ไฟล์ทุกไฟล์ในโฟลเดอร์ docs/
  node scripts/ingest.js --file <path>      ไฟล์เดี่ยว
    `);
    process.exit(0);
  }

  const doAll    = args.includes("--all");
  const doManual = doAll || args.includes("--manual");
  const doSheet  = doAll || args.includes("--sheet");
  const doFolder = doAll || args.includes("--folder");
  const fileIdx  = args.indexOf("--file");
  const doFile   = fileIdx !== -1;

  let totalChunks = 0;

  // ── Manual ───────────────────────────────
  if (doManual) {
    const n = await ingestManual();
    totalChunks += n;
  }

  // ── Google Sheets ────────────────────────
  if (doSheet) {
    if (SHEETS_CONFIG.length === 0) {
      console.log("\n⚠️  ยังไม่ได้ตั้งค่า SHEETS_CONFIG ใน scripts/ingest.js");
    } else {
      const n = await ingestSheets(SHEETS_CONFIG);
      totalChunks += n;
    }
  }

  // ── Folder ───────────────────────────────
  if (doFolder) {
    const { existsSync } = require("fs");
    if (!existsSync(DOCS_FOLDER)) {
      console.log(`\n⚠️  ไม่พบโฟลเดอร์ docs/ — สร้างก่อนแล้ววางไฟล์ลงไป`);
      require("fs").mkdirSync(DOCS_FOLDER, { recursive: true });
      console.log(`   สร้าง ${DOCS_FOLDER} แล้ว`);
    } else {
      const n = await ingestFolder({ folderPath: DOCS_FOLDER });
      totalChunks += n;
    }
  }

  // ── Single file ──────────────────────────
  if (doFile) {
    const filePath = args[fileIdx + 1];
    if (!filePath) {
      console.error("❌ ระบุ path ของไฟล์ด้วย: --file path/to/file.pdf");
      process.exit(1);
    }
    const n = await ingestFile({ filePath });
    totalChunks += n;
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`🎉 Ingest เสร็จสิ้น — รวม ${totalChunks} chunks ใหม่`);
  console.log(`${"═".repeat(50)}\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error("💥 Ingest ล้มเหลว:", err.message);
  process.exit(1);
});
