// test-query.js
const ragService = require("./ragService");
const { initVectorStore } = require("./vectorStore");

async function test() {
  const question = "บ้านโดนแดดบ่ายร้อนมาก มีกระจกตัวไหนที่ช่วยให้แอร์ทำงานน้อยลงไหม?";
  console.log(`🔍 กำลังค้นหาคำตอบสำหรับ: "${question}"`);

  // 1. ตรวจสอบการโหลด .env (ถ้ายังไม่ได้โหลดใน vectorStore)
  require("dotenv").config();

  // 2. Initialize ฐานข้อมูล
  await initVectorStore();
  await ragService.clearChatSession("test-user-002");

  try {
    // 3. *** แก้ไขตรงนี้: ส่ง 2 พารามิเตอร์ (userId, query) ***
    const answer = await ragService.generateAnswer("test-user-003", question);

    console.log("\n🤖 AI ตอบว่า:");
    console.log(answer);
  } catch (error) {
    // พยายามดึง Error จาก Google ออกมาดูถ้ามี
    if (error.response && error.response.data) {
      console.error("❌ Google Detail:", JSON.stringify(error.response.data));
    } else {
      console.error("❌ พังเพราะ:", error.message);
    }
  }
}

test();
