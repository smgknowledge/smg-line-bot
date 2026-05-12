// test-query.js
// รันแบบถามครั้งเดียว:   node test-query.js "คำถาม"
// รันแบบ interactive:     node test-query.js

require("dotenv").config();

const readline = require("readline");
const ragService = require("./ragService");
const { initVectorStore } = require("./vectorStore");

const TEST_USER = "test-user-local";

// แสดงผลลัพธ์
function printResult(result) {
  const intentLabel =
    {
      info: "ℹ️  info     — AI ตอบ",
      unclear: "❓ unclear  — ถามกลับ",
      escalate: "🚨 escalate — ส่งต่อพนักงาน",
    }[result.intentType] || `❔ ${result.intentType}`;

  console.log(`\n${intentLabel}${result.reason ? ` (${result.reason})` : ""}`);

  if (result.answer) {
    console.log(`\n🤖 คำตอบ:\n${result.answer}`);
  } else if (result.intentType === "escalate") {
    console.log("\n🤖 คำตอบ: [ระบบจะแจ้งพนักงานให้ติดต่อกลับ]");
  }

  if (result.contexts?.length) {
    const titles = [...new Set(result.contexts.map((c) => c.metadata.title))];
    console.log(`\n📚 Sources: ${titles.join(", ")}`);
  }
  console.log("─".repeat(50));
}

async function main() {
  await initVectorStore();

  const oneShot = process.argv[2];

  // ── โหมดถามครั้งเดียว ─────────────────────────
  if (oneShot) {
    console.log("─".repeat(50));
    console.log(`🔍 คำถาม: "${oneShot}"`);
    console.log("─".repeat(50));
    try {
      const result = await ragService.generateAnswer(TEST_USER, oneShot);
      printResult(result);
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
    }
    process.exit(0);
  }

  // ── โหมด interactive (multi-turn) ───────────────
  console.log("─".repeat(50));
  console.log("💬 Interactive mode — พิมพ์คำถามได้เลย");
  console.log("   /clear  = ล้าง session");
  console.log("   /exit   = ออก");
  console.log("─".repeat(50));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = () => {
    rl.question("\nคุณ: ", async (input) => {
      const text = input.trim();
      if (!text) return ask();

      if (text === "/exit") {
        console.log("👋 ออกจากโปรแกรม");
        rl.close();
        process.exit(0);
      }

      if (text === "/clear") {
        ragService.clearChatSession(TEST_USER);
        console.log("🗑️  ล้าง session แล้ว");
        return ask();
      }

      try {
        const result = await ragService.generateAnswer(TEST_USER, text);
        printResult(result);
      } catch (err) {
        console.error("❌ Error:", err.response?.data || err.message);
      }

      ask();
    });
  };

  ask();
}

main();
