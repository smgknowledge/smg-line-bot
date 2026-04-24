// src/ingestors/sheetIngestor.js
// ดึงข้อมูลจาก Google Sheets แล้ว index เข้า Supabase
//
// รองรับ 2 วิธี:
//   1. Public sheet  — ไม่ต้อง auth, ใช้ sheet ID เลย
//   2. Private sheet — ต้องมี Google Service Account credentials

const axios  = require("axios");
const { indexText } = require("./shared");

// ─────────────────────────────────────────
// Mode 1: Public Sheet (แนะนำ - ง่ายที่สุด)
// ─────────────────────────────────────────

/**
 * ดึงข้อมูลจาก Google Sheet ที่ตั้ง Public
 * (Share → Anyone with the link → Viewer)
 *
 * @param {string} sheetId  — ID ของ sheet (จาก URL)
 * @param {string} [range]  — เช่น "Sheet1!A1:Z1000" (default ทั้ง sheet แรก)
 */
async function fetchPublicSheet(sheetId, range = "Sheet1") {
  // ใช้ Google Sheets CSV export URL (ไม่ต้อง API key)
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(range)}`;

  console.log(`  🌐 Fetching public sheet...`);
  const { data } = await axios.get(url, { timeout: 15000 });

  return parseCsvText(data);
}

/**
 * แปลง CSV text → plain text สำหรับ embedding
 */
function parseCsvText(csvText) {
  const lines   = csvText.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return "";

  // parse headers (row แรก)
  const headers = parseRow(lines[0]);
  const result  = [`คอลัมน์: ${headers.join(", ")}`, ""];

  for (let i = 1; i < lines.length; i++) {
    const values = parseRow(lines[i]);
    const rowText = headers
      .map((h, j) => (values[j]?.trim() ? `${h}: ${values[j].trim()}` : null))
      .filter(Boolean)
      .join(" | ");
    if (rowText) result.push(rowText);
  }

  return result.join("\n");
}

/** Parse CSV row (handle quoted fields) */
function parseRow(line) {
  const result = [];
  let current  = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

// ─────────────────────────────────────────
// Mode 2: Private Sheet (ผ่าน Google API)
// ─────────────────────────────────────────

/**
 * ดึงข้อมูลจาก Google Sheet แบบ Private
 * ต้อง: npm install googleapis
 * ต้อง: มีไฟล์ service account credentials JSON
 *
 * @param {string} sheetId
 * @param {string} credentialsPath — path ของ service-account.json
 * @param {string} [range]
 */
async function fetchPrivateSheet(sheetId, credentialsPath, range = "Sheet1!A:Z") {
  let google;
  try {
    ({ google } = require("googleapis"));
  } catch {
    throw new Error(
      "ติดตั้ง googleapis ก่อน: npm install googleapis\n" +
      "แล้วสร้าง Service Account ที่ console.cloud.google.com"
    );
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes:  ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const res    = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });

  const rows    = res.data.values || [];
  if (rows.length === 0) return "";

  const headers = rows[0];
  const result  = [`คอลัมน์: ${headers.join(", ")}`, ""];

  for (let i = 1; i < rows.length; i++) {
    const rowText = headers
      .map((h, j) => (rows[i][j]?.trim() ? `${h}: ${rows[i][j].trim()}` : null))
      .filter(Boolean)
      .join(" | ");
    if (rowText) result.push(rowText);
  }

  return result.join("\n");
}

// ─────────────────────────────────────────
// Main
// ─────────────────────────────────────────

/**
 * Index Google Sheet เข้า Supabase
 *
 * @param {object} opts
 * @param {string} opts.sheetId      — Google Sheet ID (จาก URL)
 * @param {string} opts.title        — ชื่อเอกสาร
 * @param {string} [opts.sheetName]  — ชื่อ sheet tab (default "Sheet1")
 * @param {string} [opts.category]   — หมวดหมู่
 * @param {string} [opts.mode]       — "public" หรือ "private" (default "public")
 * @param {string} [opts.credentialsPath] — สำหรับ mode "private"
 * @param {string} [opts.link]       — URL ของ sheet (optional)
 */
async function ingestSheet({
  sheetId,
  title,
  sheetName    = "Sheet1",
  category     = "Google Sheet",
  mode         = "public",
  credentialsPath,
  link         = "",
}) {
  console.log(`\n📊 กำลังดึง Google Sheet: "${title}"`);

  let text;

  if (mode === "private") {
    if (!credentialsPath) {
      throw new Error("mode=private ต้องระบุ credentialsPath");
    }
    text = await fetchPrivateSheet(sheetId, credentialsPath, `${sheetName}!A:Z`);
  } else {
    text = await fetchPublicSheet(sheetId, sheetName);
  }

  if (!text || text.trim().length < 30) {
    console.log(`  ⚠️  Sheet ว่างหรือข้อมูลน้อยเกินไป`);
    return 0;
  }

  console.log(`  ✅ อ่านได้ ${text.length} ตัวอักษร`);

  return indexText({
    sourceId: sheetId,
    title,
    text,
    source:   "sheet",
    category,
    link:     link || `https://docs.google.com/spreadsheets/d/${sheetId}`,
  });
}

/**
 * Index หลาย Sheets พร้อมกัน
 * @param {Array} sheets — array ของ opts object
 */
async function ingestSheets(sheets) {
  console.log(`\n📊 Sheet ingest: ${sheets.length} sheets`);
  let totalChunks = 0;

  for (const sheet of sheets) {
    try {
      const chunks = await ingestSheet(sheet);
      totalChunks += chunks;
    } catch (err) {
      console.error(`  ❌ Error sheet "${sheet.title}":`, err.message);
    }
  }

  console.log(`\n✅ Sheet ingest เสร็จ — ${totalChunks} chunks`);
  return totalChunks;
}

module.exports = { ingestSheet, ingestSheets, fetchPublicSheet };
