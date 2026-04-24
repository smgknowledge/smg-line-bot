// src/ingestors/manualIngestor.js
// เพิ่มข้อมูลแบบพิมพ์เองลงใน Vector DB
// เหมาะกับ: FAQ, ข้อมูลบริษัท, นโยบาย, ราคา, ฯลฯ

const { indexText } = require("./shared");

/**
 * โครงสร้างข้อมูล manual entries
 * แก้ไข / เพิ่มได้ที่ส่วน MANUAL_DATA ด้านล่างเลย
 *
 * แต่ละ entry มี:
 *   id       — unique key (ห้ามซ้ำ)
 *   title    — หัวข้อ (Gemini จะเห็นตอนตอบ)
 *   category — หมวดหมู่ (ใส่อะไรก็ได้)
 *   content  — เนื้อหา (เขียนยาวได้เลย)
 */
const MANUAL_DATA = [
  // ─── FAQ ───────────────────────────────────────────
  {
    id:       "faq_hours",
    title:    "เวลาทำการ",
    category: "FAQ",
    content: `
เวลาทำการของเรา:
- วันจันทร์ - ศุกร์: 09:00 - 18:00 น.
- วันเสาร์: 10:00 - 15:00 น.
- วันอาทิตย์และวันหยุดนักขัตฤกษ์: ปิดทำการ

ช่องทางติดต่อนอกเวลาทำการ:
- Line OA: @your-line-oa (ตอบภายใน 24 ชั่วโมง)
- Email: support@yourcompany.com
    `.trim(),
  },
  {
    id:       "faq_shipping",
    title:    "การจัดส่งสินค้า",
    category: "FAQ",
    content: `
นโยบายการจัดส่ง:
- จัดส่งทั่วประเทศไทยผ่าน Kerry Express และ Flash Express
- ค่าจัดส่งมาตรฐาน: 50 บาท
- จัดส่งฟรีเมื่อซื้อครบ 500 บาทขึ้นไป
- ระยะเวลาจัดส่ง: 2-3 วันทำการ (กรุงเทพ), 3-5 วันทำการ (ต่างจังหวัด)
- สามารถติดตามพัสดุได้ผ่านเว็บไซต์ขนส่ง
    `.trim(),
  },
  {
    id:       "faq_return",
    title:    "การคืนสินค้าและเงินคืน",
    category: "FAQ",
    content: `
นโยบายการคืนสินค้า:
- คืนสินค้าได้ภายใน 7 วันนับจากวันที่ได้รับสินค้า
- สินค้าต้องอยู่ในสภาพสมบูรณ์ ไม่ผ่านการใช้งาน
- แนบหลักฐานการสั่งซื้อมาด้วยทุกครั้ง
- คืนเงินภายใน 5-7 วันทำการ ผ่านช่องทางที่ชำระเงินมา
- กรณีสินค้าชำรุด/ผิดรุ่น คืนได้ทันทีโดยไม่มีเงื่อนไข
    `.trim(),
  },

  // ─── ข้อมูลบริษัท ──────────────────────────────────
  {
    id:       "company_about",
    title:    "เกี่ยวกับบริษัท",
    category: "ข้อมูลบริษัท",
    content: `
บริษัท EXAMPLE CO., LTD.
ก่อตั้งปี 2558 มีความเชี่ยวชาญด้าน [ธุรกิจของคุณ]

วิสัยทัศน์: [วิสัยทัศน์บริษัท]
พันธกิจ: [พันธกิจบริษัท]

ที่อยู่: 123 ถนน XXX แขวง XXX เขต XXX กรุงเทพฯ 10XXX
โทรศัพท์: 02-XXX-XXXX
Email: info@yourcompany.com
เว็บไซต์: https://yourcompany.com
    `.trim(),
  },

  // ─── เพิ่ม entry ใหม่ได้ที่นี่ ──────────────────────
  // {
  //   id:       "faq_payment",
  //   title:    "ช่องทางชำระเงิน",
  //   category: "FAQ",
  //   content:  `...`,
  // },
];

// ─────────────────────────────────────────
// Main
// ─────────────────────────────────────────

/**
 * Index ข้อมูล manual ทั้งหมดเข้า Supabase
 * @param {string[]} [ids] — ถ้าระบุ จะ index เฉพาะ id ที่ระบุ (ไม่ระบุ = ทั้งหมด)
 */
async function ingestManual(ids) {
  const entries = ids
    ? MANUAL_DATA.filter((e) => ids.includes(e.id))
    : MANUAL_DATA;

  console.log(`\n📝 Manual ingest: ${entries.length} entries`);

  let totalChunks = 0;

  for (const entry of entries) {
    console.log(`\n▶ [${entry.category}] ${entry.title}`);
    const chunks = await indexText({
      sourceId: entry.id,
      title:    entry.title,
      text:     entry.content,
      source:   "manual",
      category: entry.category,
    });
    totalChunks += chunks;
  }

  console.log(`\n✅ Manual ingest เสร็จ — ${totalChunks} chunks`);
  return totalChunks;
}

module.exports = { ingestManual, MANUAL_DATA };
