// src/vectorStore.js
// Vector store โดยใช้ Supabase pgvector

const { createClient } = require("@supabase/supabase-js");
const { config } = require("./config");

let supabase = null;

// ─────────────────────────────────────────
// Init
// ─────────────────────────────────────────

async function initVectorStore() {
  console.log("🔌 Connecting to Supabase...");

  supabase = createClient(config.supabase.url, config.supabase.anonKey, {
    auth: { persistSession: false },
  });

  // ทดสอบการเชื่อมต่อ — ถ้าตารางยังไม่มีจะได้ error code 42P01
  const { error } = await supabase
    .from(config.supabase.table)
    .select("id", { count: "exact", head: true });

  if (error && error.code === "42P01") {
    throw new Error(
      `❌ ตาราง "${config.supabase.table}" ยังไม่มีใน Supabase\n` +
      `   รัน: node scripts/setupDatabase.js แล้วทำตามขั้นตอน`
    );
  } else if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  const count = await getCount();
  console.log(`✅ Supabase พร้อมใช้งาน — มี ${count} chunks`);
}

// ─────────────────────────────────────────
// Write
// ─────────────────────────────────────────

/**
 * เพิ่ม / อัปเดต chunks เข้า Supabase
 * @param {Array<{id, text, embedding, metadata}>} documents
 */
async function addDocuments(documents) {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");
  if (documents.length === 0) return;

  const rows = documents.map((d) => ({
    chunk_id:     d.id,
    content:      d.text,
    embedding:    d.embedding,
    article_id:   d.metadata.articleId,
    title:        d.metadata.title,
    link:         d.metadata.link,
    excerpt:      d.metadata.excerpt,
    categories:   d.metadata.categories,
    modified_at:  d.metadata.modifiedAt,
    chunk_index:  d.metadata.chunkIndex,
    total_chunks: d.metadata.totalChunks,
  }));

  const { error } = await supabase
    .from(config.supabase.table)
    .upsert(rows, { onConflict: "chunk_id" });

  if (error) throw new Error(`addDocuments: ${error.message}`);
  console.log(`  ✅ Upserted ${documents.length} chunks`);
}

/**
 * ลบ chunks ของบทความนี้ทั้งหมด (ก่อน re-index)
 * @param {string} articleId
 */
async function deleteArticle(articleId) {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");

  const { error } = await supabase
    .from(config.supabase.table)
    .delete()
    .eq("article_id", String(articleId));

  if (error) throw new Error(`deleteArticle: ${error.message}`);
}

/**
 * ลบข้อมูลทั้งหมด (ใช้ตอน full reindex)
 */
async function clearCollection() {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");

  // ลบทุก row โดยใช้ filter ที่ true เสมอ
  const { error } = await supabase
    .from(config.supabase.table)
    .delete()
    .gt("id", 0);

  if (error) throw new Error(`clearCollection: ${error.message}`);
  console.log("🗑️  ล้างข้อมูลทั้งหมดแล้ว");
}

// ─────────────────────────────────────────
// Read
// ─────────────────────────────────────────

/**
 * ค้นหา chunks ที่ใกล้เคียงกับ query embedding
 * @param {number[]} queryEmbedding
 * @param {number} topK
 * @returns {Array<{text, metadata, score}>}
 */
async function searchSimilar(queryEmbedding, topK = config.rag.topK) {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");

  const { data, error } = await supabase.rpc("match_chunks", {
    query_embedding:  queryEmbedding,
    match_count:      topK,
    match_threshold:  config.rag.similarityThreshold,
  });

  if (error) throw new Error(`searchSimilar: ${error.message}`);

  return (data || []).map((row) => ({
    text: row.content,
    metadata: {
      articleId:  row.article_id,
      title:      row.title,
      link:       row.link,
      excerpt:    row.excerpt,
      categories: row.categories,
    },
    score: row.similarity,
  }));
}

/**
 * ดึง article IDs ทั้งหมดที่ index แล้ว
 * @returns {Set<string>}
 */
async function getIndexedArticleIds() {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");

  const { data, error } = await supabase
    .from(config.supabase.table)
    .select("article_id");

  if (error) throw new Error(`getIndexedArticleIds: ${error.message}`);

  return new Set((data || []).map((r) => String(r.article_id)));
}

/**
 * จำนวน chunks ทั้งหมด
 */
async function getCount() {
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from(config.supabase.table)
    .select("*", { count: "exact", head: true });

  if (error) return 0;
  return count || 0;
}

module.exports = {
  initVectorStore,
  addDocuments,
  deleteArticle,
  clearCollection,
  searchSimilar,
  getIndexedArticleIds,
  getCount,
};
