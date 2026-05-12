// src/handoff.js
// จัดการ state "เจ้าหน้าที่กำลังดูแลอยู่" ต่อ userId
//
// ── วิธีใช้ (เจ้าหน้าที่พิมพ์ใน LINE OA Dashboard หรือ Group) ──
//
//   /takeover <userId>   — เจ้าหน้าที่รับเคส บอทหยุดตอบ user นั้น
//   /resume   <userId>   — คืนให้บอทตอบต่อ
//   /status              — ดูว่า userId ไหนอยู่ใน handoff บ้าง
//
// ── วิธีใช้ผ่าน HTTP (สำหรับ CRM หรือ dashboard ภายนอก) ──
//   POST /handoff/take   { "userId": "Uxxxx" }
//   POST /handoff/resume { "userId": "Uxxxx" }
//   GET  /handoff/status

// userId ที่เจ้าหน้าที่กำลังดูแลอยู่ → { agentId, takenAt }
const handoffSessions = new Map();

// ─────────────────────────────────────────
// State helpers
// ─────────────────────────────────────────

function takeOver(userId, agentId = "agent") {
  handoffSessions.set(userId, { agentId, takenAt: new Date() });
  console.log(`🙋 Handoff: ${agentId} รับเคส ${userId.slice(0, 8)}...`);
}

function resume(userId) {
  const had = handoffSessions.has(userId);
  handoffSessions.delete(userId);
  if (had) console.log(`🤖 Resume: คืนบอทสำหรับ ${userId.slice(0, 8)}...`);
  return had;
}

function isHandedOff(userId) {
  return handoffSessions.has(userId);
}

function getStatus() {
  return [...handoffSessions.entries()].map(([uid, v]) => ({
    userId:  uid,
    agentId: v.agentId,
    takenAt: v.takenAt.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
  }));
}

// ─────────────────────────────────────────
// Command parser — เจ้าหน้าที่พิมพ์ใน chat
// ─────────────────────────────────────────

// คำสั่งที่เจ้าหน้าที่ใช้ได้ (admin commands)
const ADMIN_IDS = new Set(
  (process.env.ADMIN_USER_IDS || "").split(",").map((s) => s.trim()).filter(Boolean)
);

/**
 * ตรวจว่าข้อความนี้เป็นคำสั่ง admin หรือไม่
 * ถ้าใช่ ประมวลผลและคืน reply text, ถ้าไม่ใช่คืน null
 */
function parseAdminCommand(senderId, text) {
  // ถ้าตั้ง ADMIN_USER_IDS ไว้ ต้องอยู่ใน list ถึงจะใช้ได้
  if (ADMIN_IDS.size > 0 && !ADMIN_IDS.has(senderId)) return null;

  const trimmed = text.trim();

  // /takeover U1234abcd
  const takeMatch = trimmed.match(/^\/takeover\s+(U\S+)/i);
  if (takeMatch) {
    const uid = takeMatch[1];
    takeOver(uid, senderId);
    return `✅ รับเคส ${uid.slice(0, 8)}... แล้วครับ\nบอทจะหยุดตอบ user นี้จนกว่าจะพิมพ์ /resume ${uid}`;
  }

  // /resume U1234abcd
  const resumeMatch = trimmed.match(/^\/resume\s+(U\S+)/i);
  if (resumeMatch) {
    const uid = resumeMatch[1];
    const had = resume(uid);
    return had
      ? `✅ คืนบอทสำหรับ ${uid.slice(0, 8)}... แล้วครับ`
      : `ℹ️ ${uid.slice(0, 8)}... ไม่ได้อยู่ใน handoff อยู่แล้ว`;
  }

  // /status
  if (/^\/status$/i.test(trimmed)) {
    const list = getStatus();
    if (list.length === 0) return "ℹ️ ไม่มี user ที่อยู่ใน handoff ตอนนี้";
    return "📋 Handoff ที่ active:\n" +
      list.map((r) => `• ${r.userId.slice(0, 8)}... (${r.agentId}) — ${r.takenAt}`).join("\n");
  }

  return null;
}

module.exports = { takeOver, resume, isHandedOff, getStatus, parseAdminCommand };