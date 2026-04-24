// src/ingestors/shared.js
// Utility functions ที่ทุก ingestor ใช้ร่วมกัน

const { addDocuments, deleteArticle } = require("./vectorStore");
const { embedText } = require("./wordpressSync");
const { config } = require("./config");

// ─────────────────────────────────────────
// Text chunking
// ─────────────────────────────────────────

/**
 * แบ่ง text เป็น chunks พร้อม overlap
 * (copy มาจาก wordpressSync เพื่อให้ ingestor ใช้ได้เลย)
 */
function chunkText(text, size = config.rag.chunkSize, overlap = config.rag.chunkOverlap) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    let chunk = text.slice(start, end);

    if (end < text.length) {
      const lastSpace = chunk.lastIndexOf(" ");
      if (lastSpace > size * 0.7) chunk = chunk.slice(0, lastSpace);
    }

    if (chunk.trim().length > 30) chunks.push(chunk.trim());
    start += chunk.length - overlap;
  }

  return chunks;
}

// ─────────────────────────────────────────
// Batch embed
// ─────────────────────────────────────────

async function batchEmbed(texts, batchSize = 5, delayMs = 600) {
  const embeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const total = Math.ceil(texts.length / batchSize);
    process.stdout.write(`    📐 Embedding ${Math.floor(i / batchSize) + 1}/${total}\r`);

    const results = await Promise.all(batch.map(embedText));
    embeddings.push(...results);

    if (i + batchSize < texts.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  console.log(); // newline หลัง progress
  return embeddings;
}

// ─────────────────────────────────────────
// Core indexing
// ─────────────────────────────────────────

/**
 * Index text เข้า Supabase — ใช้ได้กับทุก source
 *
 * @param {object} opts
 * @param {string} opts.sourceId   — unique ID ของ source เช่น "faq", "pdf_คู่มือ"
 * @param {string} opts.title      — ชื่อเอกสาร / หัวข้อ
 * @param {string} opts.text       — เนื้อหาทั้งหมด (plain text)
 * @param {string} opts.source     — ประเภท เช่น "manual", "pdf", "csv", "sheet"
 * @param {string} [opts.link]     — URL อ้างอิง (optional)
 * @param {string} [opts.category] — หมวดหมู่ (optional)
 * @returns {number} จำนวน chunks ที่ index
 */
async function indexText({ sourceId, title, text, source, link = "", category = "" }) {
  if (!text || text.trim().length < 30) {
    console.log(`  ⏭️  ข้าม (เนื้อหาสั้นเกิน): "${title}"`);
    return 0;
  }

  const chunks = chunkText(text);
  console.log(`  📝 "${title}" → ${chunks.length} chunks`);

  const embeddings = await batchEmbed(chunks);

  const documents = chunks.map((chunk, i) => ({
    id:        `${source}_${sourceId}_chunk_${i}`,
    text:      chunk,
    embedding: embeddings[i],
    metadata: {
      articleId:   `${source}_${sourceId}`,  // ใช้ field เดิม เพื่อให้ delete/search ทำงานได้
      title,
      link,
      excerpt:     text.slice(0, 200),
      categories:  category,
      modifiedAt:  new Date().toISOString(),
      chunkIndex:  i,
      totalChunks: chunks.length,
    },
  }));

  // ลบของเก่าก่อน (ถ้ามี) แล้วเพิ่มใหม่
  await deleteArticle(`${source}_${sourceId}`);
  await addDocuments(documents);

  return chunks.length;
}

module.exports = { chunkText, batchEmbed, indexText };
