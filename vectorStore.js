// src/vectorStore.js
// Supabase pgvector — เพิ่ม getModifiedAtMap() สำหรับ incremental sync

const { createClient } = require("@supabase/supabase-js");
const { config } = require("./config");

let supabase = null;

async function initVectorStore() {
  console.log("🔌 Connecting to Supabase...");
  supabase = createClient(config.supabase.url, config.supabase.anonKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase
    .from(config.supabase.table)
    .select("id", { count: "exact", head: true });

  if (error && error.code === "42P01") {
    throw new Error(
      `❌ ตาราง "${config.supabase.table}" ยังไม่มี\n   รัน: node scripts/setupDatabase.js`
    );
  } else if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  const count = await getCount();
  console.log(`✅ Supabase พร้อม — ${count} chunks`);
}

async function addDocuments(documents) {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");
  if (!documents.length) return;

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

async function deleteArticle(articleId) {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");
  const { error } = await supabase
    .from(config.supabase.table)
    .delete()
    .eq("article_id", String(articleId));
  if (error) throw new Error(`deleteArticle: ${error.message}`);
}

async function clearCollection() {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");
  const { error } = await supabase
    .from(config.supabase.table)
    .delete()
    .gt("id", 0);
  if (error) throw new Error(`clearCollection: ${error.message}`);
  console.log("🗑️  ล้างข้อมูลทั้งหมดแล้ว");
}

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

async function getIndexedArticleIds() {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");
  const { data, error } = await supabase
    .from(config.supabase.table)
    .select("article_id");
  if (error) throw new Error(`getIndexedArticleIds: ${error.message}`);
  return new Set((data || []).map((r) => String(r.article_id)));
}

/**
 * คืน Map ของ articleId → modifiedAt
 * ใช้เปรียบเทียบว่าบทความเปลี่ยนแปลงหรือยัง
 */
async function getModifiedAtMap() {
  if (!supabase) throw new Error("VectorStore ยังไม่ได้ init");

  // ดึง chunk แรกของแต่ละ article (chunk_index = 0) เพื่อประหยัด
  const { data, error } = await supabase
    .from(config.supabase.table)
    .select("article_id, modified_at")
    .eq("chunk_index", 0);

  if (error) throw new Error(`getModifiedAtMap: ${error.message}`);

  const map = new Map();
  for (const row of data || []) {
    map.set(String(row.article_id), row.modified_at);
  }
  return map;
}

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
  getModifiedAtMap,
  getCount,
};
