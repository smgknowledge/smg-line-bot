// src/ingestors/fileIngestor.js
// ดึงข้อความจากไฟล์ PDF / Word (.docx) / Excel (.xlsx, .csv)
// แล้ว index เข้า Supabase

const fs   = require("fs");
const path = require("path");
const { indexText } = require("./shared");

// ─────────────────────────────────────────
// Parsers — โหลด library ตาม file type
// (ใช้ dynamic require เพื่อไม่ต้อง install ทุกตัวถ้าไม่ใช้)
// ─────────────────────────────────────────

/** แยก plain text จาก PDF */
async function parsePdf(filePath) {
  try {
    const pdfParse = require("pdf-parse");
    const buffer = fs.readFileSync(filePath);
    const result = await pdfParse(buffer);
    return result.text;
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      throw new Error("ติดตั้ง pdf-parse ก่อน: npm install pdf-parse");
    }
    throw err;
  }
}

/** แยก plain text จาก Word (.docx) */
async function parseDocx(filePath) {
  try {
    const mammoth = require("mammoth");
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      throw new Error("ติดตั้ง mammoth ก่อน: npm install mammoth");
    }
    throw err;
  }
}

/** แยก plain text จาก Excel (.xlsx) */
async function parseExcel(filePath) {
  try {
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(filePath);
    const lines = [];

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      // แปลง sheet → JSON rows
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      if (rows.length === 0) continue;
      lines.push(`=== Sheet: ${sheetName} ===`);

      for (const row of rows) {
        // แปลงแต่ละ row เป็น "คอลัมน์: ค่า" เพื่อให้ Gemini เข้าใจ
        const line = Object.entries(row)
          .filter(([, v]) => String(v).trim())
          .map(([k, v]) => `${k}: ${v}`)
          .join(" | ");
        if (line) lines.push(line);
      }
    }

    return lines.join("\n");
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      throw new Error("ติดตั้ง xlsx ก่อน: npm install xlsx");
    }
    throw err;
  }
}

/** แยก plain text จาก CSV */
async function parseCsv(filePath) {
  // ใช้ built-in เท่านั้น ไม่ต้อง install เพิ่ม
  const raw  = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n").filter((l) => l.trim());

  if (lines.length === 0) return "";

  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
  const result  = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""));
    const row = headers
      .map((h, j) => (values[j] ? `${h}: ${values[j]}` : null))
      .filter(Boolean)
      .join(" | ");
    if (row) result.push(row);
  }

  return `คอลัมน์: ${headers.join(", ")}\n\n` + result.join("\n");
}

// ─────────────────────────────────────────
// Detect & Parse
// ─────────────────────────────────────────

async function parseFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case ".pdf":  return parsePdf(filePath);
    case ".docx": return parseDocx(filePath);
    case ".xlsx":
    case ".xls":  return parseExcel(filePath);
    case ".csv":  return parseCsv(filePath);
    case ".txt":
    case ".md":   return fs.readFileSync(filePath, "utf-8");
    default:
      throw new Error(`ไม่รองรับไฟล์นามสกุล "${ext}" (รองรับ: pdf, docx, xlsx, csv, txt, md)`);
  }
}

// ─────────────────────────────────────────
// Main
// ─────────────────────────────────────────

/**
 * Index ไฟล์เดียว
 *
 * @param {object} opts
 * @param {string} opts.filePath  — path ของไฟล์
 * @param {string} [opts.title]   — ชื่อเอกสาร (default = ชื่อไฟล์)
 * @param {string} [opts.category] — หมวดหมู่
 * @param {string} [opts.link]    — URL อ้างอิง
 * @returns {number} จำนวน chunks
 */
async function ingestFile({ filePath, title, category = "เอกสาร", link = "" }) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`ไม่พบไฟล์: ${filePath}`);
  }

  const fileName  = path.basename(filePath);
  const sourceId  = fileName.replace(/[^a-zA-Z0-9ก-๙]/g, "_"); // safe ID
  const docTitle  = title || fileName;

  console.log(`\n📂 กำลัง parse: ${fileName}`);
  const text = await parseFile(filePath);

  if (!text || text.trim().length < 30) {
    console.log(`  ⚠️  ไฟล์นี้ไม่มีข้อความหรือข้อความน้อยเกินไป`);
    return 0;
  }

  console.log(`  ✅ อ่านได้ ${text.length} ตัวอักษร`);

  return indexText({
    sourceId,
    title:    docTitle,
    text,
    source:   "file",
    category,
    link,
  });
}

/**
 * Index ไฟล์ทั้งหมดในโฟลเดอร์
 *
 * @param {object} opts
 * @param {string} opts.folderPath — path โฟลเดอร์
 * @param {string} [opts.category] — หมวดหมู่ default
 * @param {string[]} [opts.extensions] — นามสกุลที่ต้องการ (default ทั้งหมด)
 */
async function ingestFolder({
  folderPath,
  category = "เอกสาร",
  extensions = [".pdf", ".docx", ".xlsx", ".csv", ".txt", ".md"],
}) {
  if (!fs.existsSync(folderPath)) {
    throw new Error(`ไม่พบโฟลเดอร์: ${folderPath}`);
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((f) => extensions.includes(path.extname(f).toLowerCase()))
    .map((f) => path.join(folderPath, f));

  console.log(`\n📁 โฟลเดอร์ "${folderPath}" — พบ ${files.length} ไฟล์`);

  let totalChunks = 0;

  for (const filePath of files) {
    try {
      const chunks = await ingestFile({ filePath, category });
      totalChunks += chunks;
    } catch (err) {
      console.error(`  ❌ Error "${path.basename(filePath)}":`, err.message);
    }
  }

  console.log(`\n✅ Folder ingest เสร็จ — ${totalChunks} chunks จาก ${files.length} ไฟล์`);
  return totalChunks;
}

module.exports = { ingestFile, ingestFolder, parseFile };
