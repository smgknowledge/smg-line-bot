// src/wordpressSync.js
// ดึงบทความจาก WordPress REST API → chunk → embed → เก็บใน Supabase
// รองรับ: full sync, incremental sync (เฉพาะที่แก้ไขใหม่), single article

const axios = require("axios");
const { convert } = require("html-to-text");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  addDocuments,
  deleteArticle,
  getIndexedArticleIds,
  getModifiedAtMap,
} = require("./vectorStore");
const { config } = require("./config");

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

// ─────────────────────────────────────────
// Text Utilities
// ─────────────────────────────────────────

function htmlToPlainText(html) {
  return convert(html, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
      { selector: "figure", format: "skip" },
      { selector: "script", format: "skip" },
      { selector: "style", format: "skip" },
    ],
  }).trim();
}

// --- ส่วนของ chunkText ที่ปลอดภัยขึ้น ---
function chunkText(
  text,
  size = config.rag.chunkSize,
  overlap = config.rag.chunkOverlap,
) {
  const chunks = [];
  let start = 0;

  if (!text) return [];

  while (start < text.length) {
    let end = start + size;
    let chunk = text.slice(start, end);

    if (end < text.length) {
      const lastSpace = chunk.lastIndexOf(" ");
      // ถ้าหาช่องว่างเจอ และอยู่เกิน 70% ของ chunk ให้ตัดตรงช่องว่าง
      if (lastSpace > size * 0.7) {
        chunk = chunk.slice(0, lastSpace);
      }
    }

    const trimmedChunk = chunk.trim();
    if (trimmedChunk.length > 50) {
      chunks.push(trimmedChunk);
    }

    // จุดสำคัญ: ต้องแน่ใจว่า start เพิ่มขึ้นเสมอ
    const moveStep = chunk.length - overlap;
    start += moveStep > 0 ? moveStep : chunk.length;

    // Safety break: ป้องกันค้าง
    if (chunks.length > 1000) break;
  }
  return chunks;
}

// --- ส่วนของ indexArticle ที่ประหยัด RAM ---
async function indexArticle(article) {
  const articleId = String(article.id);
  const title = article.title?.rendered || "Untitled";

  // แปลง HTML เป็น Text
  const bodyText = htmlToPlainText(article.content?.rendered || "");

  // แทนที่จะเอา title + bodyText เป็น string ยักษ์ก้อนเดียว
  // ให้ส่งเข้า chunkText ไปเลย
  const chunks = chunkText(bodyText);

  if (chunks.length === 0) return 0;

  // เอา title ไปแปะแค่ใน chunk แรก หรือจะใส่ทุก chunk แบบสั้นๆ ก็ได้
  chunks[0] = `หัวข้อ: ${title}\n${chunks[0]}`;

  console.log(` 📝 "${title}" → ${chunks.length} chunks`);

  // ดึง Embeddings
  const embeddings = await batchEmbed(chunks);

  // สร้าง Documents แบบไม่เก็บตัวแปรใหญ่ค้างไว้
  const documents = [];
  for (let i = 0; i < chunks.length; i++) {
    documents.push({
      id: `article_${articleId}_chunk_${i}`,
      text: chunks[i],
      embedding: embeddings[i],
      metadata: {
        articleId,
        title,
        excerpt: htmlToPlainText(article.excerpt?.rendered || "").slice(0, 300),
        link: article.link || "",
        modifiedAt: article.modified || article.date,
        chunkIndex: i,
        totalChunks: chunks.length,
        categories: "", // ค่อยไปดึงข้างนอกถ้าจำเป็น
      },
    });
  }

  await deleteArticle(articleId);
  await addDocuments(documents);

  // เคลียร์ค่าช่วย Garbage Collector
  return chunks.length;
}

// ─────────────────────────────────────────
// Gemini Embedding
// ─────────────────────────────────────────

async function embedText(text) {
  const apiKey = config.gemini.apiKey;
  // ใช้ชื่อโมเดลที่ Google ยืนยันว่าคุณมีสิทธิ์ (จากที่รัน PowerShell)
  const modelName = "models/gemini-embedding-2";
  const url = `https://generativelanguage.googleapis.com/v1beta/${modelName}:embedContent?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      content: { parts: [{ text }] },
      // บังคับให้ขนาดข้อมูลเท่ากับ 768 เพื่อให้ลง Supabase ได้
      outputDimensionality: 768,
    });

    if (response.data && response.data.embedding) {
      return response.data.embedding.values;
    }
    throw new Error("โครงสร้างข้อมูลจาก Google ไม่ถูกต้อง");
  } catch (error) {
    if (error.response?.data) {
      console.error(":x: Google Detail:", JSON.stringify(error.response.data));
    }
    throw error;
  }
}

async function batchEmbed(texts, batchSize = 5, delayMs = 1500) {
  const embeddings = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const total = Math.ceil(texts.length / batchSize);
    console.log(`    📐 Embedding ${Math.floor(i / batchSize) + 1}/${total}`);
    const results = await Promise.all(batch.map(embedText));
    // embeddings.push(...results);
    for (const res of results) {
      embeddings.push(res); // ใช้ for-loop ธรรมดาปลอดภัยกับ Memory กว่า
    }
    if (i + batchSize < texts.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return embeddings;
}

// ─────────────────────────────────────────
// WordPress API
// ─────────────────────────────────────────

function getAuthHeaders() {
  if (!config.wordpress.auth) return {};
  return {
    Authorization:
      "Basic " + Buffer.from(config.wordpress.auth).toString("base64"),
  };
}

/** ดึงบทความทั้งหมด */
async function fetchAllArticles() {
  const articles = [];
  let page = 1,
    totalPages = 1;

  console.log(`\n📥 ดึงบทความจาก: ${config.wordpress.url}`);

  while (page <= totalPages) {
    const { data, headers: h } = await axios.get(
      `${config.wordpress.url}/wp-json/wp/v2/posts`,
      {
        params: {
          per_page: config.wordpress.perPage,
          page,
          status: "publish",
          _fields:
            "id,title,content,excerpt,date,modified,link,categories,slug",
        },
        headers: getAuthHeaders(),
        timeout: 30000,
      },
    );
    if (page === 1) {
      totalPages = parseInt(h["x-wp-totalpages"] || "1");
      const total = parseInt(h["x-wp-total"] || "0");
      console.log(`   📄 ทั้งหมด: ${total} บทความ (${totalPages} หน้า)`);
    }
    articles.push(...data);
    console.log(`   ✅ หน้า ${page}/${totalPages}: ${data.length} บทความ`);
    page++;
    if (page <= totalPages) await new Promise((r) => setTimeout(r, 300));
  }
  return articles;
}

/** ดึงบทความเดียวตาม ID */
async function fetchArticleById(articleId) {
  const { data } = await axios.get(
    `${config.wordpress.url}/wp-json/wp/v2/posts/${articleId}`,
    {
      params: {
        _fields: "id,title,content,excerpt,date,modified,link,categories,slug",
      },
      headers: getAuthHeaders(),
      timeout: 15000,
    },
  );
  return data;
}

/** ดึงบทความที่แก้ไขหลังจาก date ที่กำหนด */
async function fetchArticlesModifiedAfter(afterDate) {
  const { data } = await axios.get(
    `${config.wordpress.url}/wp-json/wp/v2/posts`,
    {
      params: {
        per_page: 100,
        status: "publish",
        after: afterDate, // ISO8601 — WP จะคืนบทความที่ modified > after
        orderby: "modified",
        order: "desc",
        _fields: "id,title,content,excerpt,date,modified,link,categories,slug",
      },
      headers: getAuthHeaders(),
      timeout: 15000,
    },
  );
  return data;
}

/** ดึงชื่อ categories */
async function fetchCategoryNames(categoryIds) {
  if (!categoryIds?.length) return [];
  try {
    const { data } = await axios.get(
      `${config.wordpress.url}/wp-json/wp/v2/categories`,
      {
        params: {
          include: categoryIds.join(","),
          per_page: 100,
          _fields: "id,name",
        },
      },
    );
    return data.map((c) => c.name);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────
// Indexing
// ─────────────────────────────────────────

/** Index บทความเดียว */
async function indexArticle(article) {
  const articleId = String(article.id);
  const title = article.title?.rendered || "Untitled";
  const bodyText = htmlToPlainText(article.content?.rendered || "");
  const excerpt = htmlToPlainText(article.excerpt?.rendered || "").slice(
    0,
    300,
  );
  const link = article.link || "";
  const modifiedAt = article.modified || article.date;
  const categories = await fetchCategoryNames(article.categories || []);
  const fullText = `${title}\n\n${bodyText}`;

  if (fullText.trim().length < 100) {
    console.log(`  ⏭️  ข้ามบทความสั้น: "${title}"`);
    return 0;
  }

  const chunks = chunkText(fullText);
  console.log(`  📝 "${title}" → ${chunks.length} chunks`);

  const embeddings = await batchEmbed(chunks);

  const documents = chunks.map((chunk, i) => ({
    id: `article_${articleId}_chunk_${i}`,
    text: chunk,
    embedding: embeddings[i],
    metadata: {
      articleId,
      title,
      excerpt,
      link,
      modifiedAt,
      chunkIndex: i,
      totalChunks: chunks.length,
      categories: categories.join(", "),
    },
  }));

  await deleteArticle(articleId);
  await addDocuments(documents);
  return chunks.length;
}

// ─────────────────────────────────────────
// Sync Modes
// ─────────────────────────────────────────

/**
 * FULL SYNC — ดึงทั้งหมด เฉพาะบทความที่ยังไม่มีหรือ modified เปลี่ยน
 * @param {boolean} forceAll — true = index ทุกบทความใหม่หมด
 */
async function syncWordpress(forceAll = false) {
  console.log("\n🚀 เริ่ม WordPress sync...");
  const startTime = Date.now();

  const articles = await fetchAllArticles();
  const modifiedAtMap = forceAll ? new Map() : await getModifiedAtMap();

  console.log(`\n📚 process ${articles.length} บทความ...`);

  let indexed = 0,
    skipped = 0,
    totalChunks = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const articleId = String(article.id);
    const modifiedAt = article.modified || article.date;

    process.stdout.write(`\n[${i + 1}/${articles.length}] `);

    // ข้ามถ้า modified ไม่เปลี่ยน
    if (!forceAll && modifiedAtMap.get(articleId) === modifiedAt) {
      console.log(`⏭️  ไม่มีการเปลี่ยนแปลง: "${article.title?.rendered}"`);
      skipped++;
      continue;
    }

    try {
      const chunks = await indexArticle(article);
      totalChunks += chunks;
      indexed++;
    } catch (err) {
      console.error(`  ❌ Error article ${articleId}:`, err.message);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`
✅ Sync เสร็จ ใช้เวลา ${elapsed}s
   📄 Index ใหม่/อัปเดต: ${indexed}
   ⏭️  ข้าม (ไม่เปลี่ยน):  ${skipped}
   🧩 Chunks:             ${totalChunks}
`);
}

/**
 * INCREMENTAL SYNC — ดึงเฉพาะบทความที่แก้ไขหลัง afterDate
 * ใช้ใน cron ทุกชั่วโมง
 * @param {string} afterDate — ISO8601 เช่น "2024-01-01T00:00:00"
 */
async function syncModifiedAfter(afterDate) {
  console.log(`\n🔄 Incremental sync (หลัง ${afterDate})...`);

  const articles = await fetchArticlesModifiedAfter(afterDate);
  if (articles.length === 0) {
    console.log("   ✅ ไม่มีบทความใหม่/แก้ไข");
    return 0;
  }

  console.log(`   📄 พบ ${articles.length} บทความที่เปลี่ยนแปลง`);

  let totalChunks = 0;
  for (const article of articles) {
    try {
      const chunks = await indexArticle(article);
      totalChunks += chunks;
    } catch (err) {
      console.error(`  ❌ Error article ${article.id}:`, err.message);
    }
  }

  console.log(`   🧩 Indexed ${totalChunks} chunks ใหม่`);
  return totalChunks;
}

/**
 * SINGLE ARTICLE — index บทความเดียวจาก ID
 * ใช้เมื่อได้รับ WordPress Webhook
 * @param {string|number} articleId
 */
async function syncSingleArticle(articleId) {
  console.log(`\n⚡ Single sync: article #${articleId}`);
  try {
    const article = await fetchArticleById(articleId);
    // ถ้าเป็น draft/trash จาก webhook ให้ลบออก
    if (article.status !== "publish") {
      await deleteArticle(String(articleId));
      console.log(`  🗑️  ลบออก (status: ${article.status})`);
      return 0;
    }
    const chunks = await indexArticle(article);
    console.log(`  ✅ Indexed ${chunks} chunks`);
    return chunks;
  } catch (err) {
    if (err.response?.status === 404) {
      // บทความถูกลบ
      await deleteArticle(String(articleId));
      console.log(`  🗑️  ลบออก (บทความถูกลบจาก WordPress)`);
      return 0;
    }
    throw err;
  }
}

module.exports = {
  syncWordpress,
  syncModifiedAfter,
  syncSingleArticle,
  indexArticle,
  embedText,
};
