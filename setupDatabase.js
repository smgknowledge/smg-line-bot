// scripts/setupDatabase.js
// แสดง SQL ที่ต้องรันใน Supabase SQL Editor

const SQL = `-- ══════════════════════════════════════════════
-- รัน SQL นี้ใน Supabase → SQL Editor → New Query
-- ══════════════════════════════════════════════

-- 1. เปิดใช้งาน pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. สร้างตาราง
CREATE TABLE IF NOT EXISTS article_chunks (
  id           BIGSERIAL    PRIMARY KEY,
  chunk_id     TEXT         UNIQUE NOT NULL,
  article_id   TEXT         NOT NULL,
  title        TEXT,
  link         TEXT,
  excerpt      TEXT,
  categories   TEXT,
  modified_at  TEXT,
  chunk_index  INT          DEFAULT 0,
  total_chunks INT          DEFAULT 1,
  content      TEXT         NOT NULL,
  embedding    VECTOR(768)  NOT NULL,
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

-- 3. Index สำหรับ vector search (HNSW)
CREATE INDEX IF NOT EXISTS idx_chunks_embedding
  ON article_chunks
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- 4. Index สำหรับ delete by article_id
CREATE INDEX IF NOT EXISTS idx_chunks_article_id
  ON article_chunks (article_id);

-- 5. RPC function สำหรับ similarity search
CREATE OR REPLACE FUNCTION match_chunks(
  query_embedding  VECTOR(768),
  match_count      INT   DEFAULT 5,
  match_threshold  FLOAT DEFAULT 0.7
)
RETURNS TABLE (
  id          BIGINT,
  chunk_id    TEXT,
  article_id  TEXT,
  title       TEXT,
  link        TEXT,
  excerpt     TEXT,
  categories  TEXT,
  content     TEXT,
  similarity  FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ac.id,
    ac.chunk_id,
    ac.article_id,
    ac.title,
    ac.link,
    ac.excerpt,
    ac.categories,
    ac.content,
    1 - (ac.embedding <=> query_embedding) AS similarity
  FROM article_chunks ac
  WHERE 1 - (ac.embedding <=> query_embedding) > match_threshold
  ORDER BY ac.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 6. เปิด Row Level Security + allow all
ALTER TABLE article_chunks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_all" ON article_chunks;
CREATE POLICY "allow_all"
  ON article_chunks FOR ALL
  USING (true) WITH CHECK (true);

-- ✅ ตรวจสอบ
SELECT COUNT(*) AS total_chunks FROM article_chunks;`;

console.log("\n" + "═".repeat(60));
console.log("  📋 SQL Setup — Supabase pgvector");
console.log("═".repeat(60));
console.log(SQL);
console.log("═".repeat(60));
console.log(`
📍 ขั้นตอน:
   1. เปิด https://supabase.com → เลือก Project ของคุณ
   2. เมนูซ้าย → SQL Editor → กด "New query"
   3. Copy SQL ด้านบนทั้งหมด แล้ว Paste ลงไป
   4. กด "Run" (หรือ Ctrl+Enter)
   5. ถ้าเห็น total_chunks = 0 แสดงว่าสำเร็จ ✅
`);
