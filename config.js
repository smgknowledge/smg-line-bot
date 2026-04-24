// src/config.js
require("dotenv").config();

const config = {
  line: {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    chatModel: "gemini-1.5-flash",
    embeddingModel: "text-embedding-004",
  },
  wordpress: {
    url: (process.env.WORDPRESS_URL || "").replace(/\/$/, ""), // ตัด / ท้ายออก
    perPage: parseInt(process.env.WORDPRESS_PER_PAGE || "100"),
    auth: process.env.WORDPRESS_AUTH || null,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    table: process.env.SUPABASE_TABLE || "article_chunks",
  },
  port: parseInt(process.env.PORT || "3000"),
  rag: {
    topK: parseInt(process.env.RAG_TOP_K || "5"),
    chunkSize: parseInt(process.env.CHUNK_SIZE || "800"),
    chunkOverlap: parseInt(process.env.CHUNK_OVERLAP || "100"),
    similarityThreshold: parseFloat(process.env.SIMILARITY_THRESHOLD || "0.7"),
  },
  bot: {
    name: process.env.BOT_NAME || "AI Assistant",
  },
};

function validateConfig() {
  const required = [
    ["LINE_CHANNEL_ACCESS_TOKEN", config.line.channelAccessToken],
    ["LINE_CHANNEL_SECRET", config.line.channelSecret],
    ["GEMINI_API_KEY", config.gemini.apiKey],
    ["WORDPRESS_URL", config.wordpress.url],
    ["SUPABASE_URL", config.supabase.url],
    ["SUPABASE_ANON_KEY", config.supabase.anonKey],
  ];

  const missing = required.filter(([, val]) => !val).map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `❌ ขาด environment variables:\n${missing.map((k) => `  - ${k}`).join("\n")}\n\nแก้ไขในไฟล์ .env แล้วรันใหม่`
    );
  }
}

module.exports = { config, validateConfig };
