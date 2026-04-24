// src/wordpressSync.js
// ดึงบทความจาก WordPress REST API → chunk → embed → เก็บใน Supabase

const axios = require("axios");
const { convert } = require("html-to-text");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { addDocuments, deleteArticle, getIndexedArticleIds, initVectorStore } = require("./vectorStore");
const { config } = require("./config");

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

// ─────────────────────────────────────────
// Text Utilities
// ─────────────────────────────────────────

/** แปลง HTML → plain text */
function htmlToPlainText(html) {
  return convert(html, {
    wordwrap: false,
    selectors: [
      { selector: "a",      options: { ignoreHref: true } },
      { selector: "img",    format: "skip" },
      { selector: "figure", format: "skip" },
      { selector: "script", format: "skip" },
      { selector: "style",  format: "skip" },
    ],
  }).trim();
}

/** แบ่ง text เป็น chunks พร้อม overlap */
function chunkText(text, size = config.rag.chunkSize, overlap = config.rag.chunkOverlap) {
  const chunks = [];
  let start = 0;

  // ป้องกัน Loop ค้างถ้าเนื้อหาว่าง
  if (!text || text.length === 0) return [];

  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    let chunk = text.slice(start, end);

    if (end < text.length) {
      const lastSpace = chunk.lastIndexOf(" ");
      if (lastSpace > size * 0.7) chunk = chunk.slice(0, lastSpace);
    }

    if (chunk.trim().length > 50) {
      chunks.push(chunk.trim());
    }

    // แก้ไขจุดนี้: เพื่อป้องกัน Infinite Loop ถ้า chunk.length เป็น 0 ให้ขยับไป 1 เสมอ
    const moveStep = chunk.length - overlap;
    start += (moveStep > 0) ? moveStep : size; 
  }

  return chunks;
}

// ─────────────────────────────────────────
// Gemini Embedding
// ─────────────────────────────────────────

/** สร้าง embedding vector จาก text */
async function embedText(text) {
  const apiKey = config.gemini.apiKey;
  // ใช้ชื่อโมเดลที่ Google ยืนยันว่าคุณมีสิทธิ์ (จากที่รัน PowerShell)
  const modelName = "models/gemini-embedding-2"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/${modelName}:embedContent?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      content: { parts: [{ text }] },
      // บังคับให้ขนาดข้อมูลเท่ากับ 768 เพื่อให้ลง Supabase ได้
      outputDimensionality: 768 
    });
    
    if (response.data && response.data.embedding) {
      return response.data.embedding.values;
    }
    throw new Error("โครงสร้างข้อมูลจาก Google ไม่ถูกต้อง");
  } catch (error) {
    if (error.response?.data) {
      console.error("❌ Google Detail:", JSON.stringify(error.response.data));
    }
    throw error;
  }
}

/** Embed หลาย texts เป็น batch (พร้อม rate-limit delay) */
async function batchEmbed(texts, batchSize = 5, delayMs = 600) {
  const embeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const total = Math.ceil(texts.length / batchSize);
    console.log(`    📐 Embedding ${Math.floor(i / batchSize) + 1}/${total}`);

    const results = await Promise.all(batch.map(embedText));
    embeddings.push(...results);

    if (i + batchSize < texts.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  return embeddings;
}

// ─────────────────────────────────────────
// WordPress API
// ─────────────────────────────────────────

/** ดึงบทความทั้งหมดจาก WordPress REST API */
async function fetchAllArticles() {
  const articles = [];
  let page = 1;
  let totalPages = 1;

  const headers = {};
  if (config.wordpress.auth) {
    headers["Authorization"] =
      "Basic " + Buffer.from(config.wordpress.auth).toString("base64");
  }

  console.log(`\n📥 กำลังดึงบทความจาก: ${config.wordpress.url}`);

  while (page <= totalPages) {
    const { data, headers: resHeaders } = await axios.get(
      `https://lavender-clam-276860.hostingersite.com/wp-json/wp/v2/posts`,
      {
        params: {
          per_page: config.wordpress.perPage,
          page,
          status: "publish",
          _fields: "id,title,content,excerpt,date,modified,link,categories,slug",
        },
        headers,
        timeout: 30000,
      }
    );

    if (page === 1) {
      totalPages = parseInt(resHeaders["x-wp-totalpages"] || "1");
      const total = parseInt(resHeaders["x-wp-total"] || "0");
      console.log(`   📄 บทความทั้งหมด: ${total} (${totalPages} หน้า)`);
    }

    articles.push(...data);
    console.log(`   ✅ หน้า ${page}/${totalPages}: ${data.length} บทความ`);
    page++;

    if (page <= totalPages) await new Promise((r) => setTimeout(r, 300));
  }

  return articles;
}

/** ดึงชื่อ categories จาก ID array */
async function fetchCategoryNames(categoryIds) {
  if (!categoryIds?.length) return [];
  try {
    const { data } = await axios.get(
      `${config.wordpress.url}/wp-json/wp/v2/categories`,
      { params: { include: categoryIds.join(","), per_page: 100, _fields: "id,name" } }
    );
    return data.map((c) => c.name);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────
// Indexing
// ─────────────────────────────────────────

/** Index บทความเดียวเข้า Supabase */
async function indexArticle(article) {
  const articleId   = String(article.id);
  const title       = article.title?.rendered || "Untitled";
  const bodyText    = htmlToPlainText(article.content?.rendered || "");
  const excerpt     = htmlToPlainText(article.excerpt?.rendered || "").slice(0, 300);
  const link        = article.link || "";
  const modifiedAt  = article.modified || article.date;
  const categories  = await fetchCategoryNames(article.categories || []);
  const fullText    = `${title}\n\n${bodyText}`;

  // --- เพิ่มบรรทัดนี้เพื่อป้องกัน Memory เต็ม ---
  let rawContent = article.content?.rendered || "";
  if (rawContent.length > 50000) { // ถ้าเนื้อหายาวเกิน 5 หมื่นตัวอักษร (ซึ่งผิดปกติสำหรับบทความทั่วไป)
      rawContent = rawContent.slice(0, 50000); 
  }

  if (fullText.trim().length < 100) {
    console.log(`  ⏭️  ข้าม (บทความสั้นเกิน): "${title}"`);
    return 0;
  }

  const chunks = chunkText(fullText);
  console.log(`  📝 "${title}" → ${chunks.length} chunks`);

  const embeddings = await batchEmbed(chunks);

  const documents = chunks.map((chunk, i) => ({
    id:   `article_${articleId}_chunk_${i}`,
    text: chunk,
    embedding: embeddings[i],
    metadata: {
      articleId,
      title,
      excerpt,
      link,
      modifiedAt,
      chunkIndex:  i,
      totalChunks: chunks.length,
      categories:  categories.join(", "),
    },
  }));

  await addDocuments(documents);
  return chunks.length;
}

// ─────────────────────────────────────────
// Main Sync
// ─────────────────────────────────────────

/**
 * Sync บทความจาก WordPress → Supabase
 * @param {boolean} fullReindex — ล้างทั้งหมดแล้ว index ใหม่
 */
async function syncWordpress(fullReindex = false) {
  console.log("\n🚀 เริ่ม WordPress sync...");
  const startTime = Date.now();

  const articles   = await fetchAllArticles();
  const indexedIds = fullReindex ? new Set() : await getIndexedArticleIds();

  console.log(`\n📚 กำลัง process ${articles.length} บทความ...`);
  console.log(`📌 Index แล้ว: ${indexedIds.size} บทความ`);

  let indexed = 0, skipped = 0, totalChunks = 0;

  for (let i = 0; i < articles.length; i++) {
    const article   = articles[i];
    const articleId = String(article.id);

    process.stdout.write(`\n[${i + 1}/${articles.length}] `);

    if (indexedIds.has(articleId)) {
      console.log(`⏭️  ข้าม (index แล้ว): "${article.title?.rendered}"`);
      skipped++;
      continue;
    }

    try {
      await deleteArticle(articleId); // ลบของเก่าก่อน (ถ้ามี)
      const chunks = await indexArticle(article);
      totalChunks += chunks;
      indexed++;
    } catch (err) {
      console.error(`  ❌ Error article ${articleId}:`, err.message);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`
✅ Sync เสร็จสิ้น ใช้เวลา ${elapsed}s
   📄 Index ใหม่:  ${indexed} บทความ
   ⏭️  ข้าม:       ${skipped} บทความ
   🧩 Chunks:     ${totalChunks}
`);
}

module.exports = { syncWordpress, indexArticle, embedText };
