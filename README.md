# 🤖 Line OA × WordPress RAG × Gemini
### Supabase Edition — คู่มือแบบจับมือทำ

---

## ภาพรวมระบบ

```
ผู้ใช้ Line ──▶ Line Platform ──▶ Express Server (Railway)
                                         │
                              ┌──────────┴──────────┐
                              ▼                     ▼
                         Gemini API           Supabase DB
                       (สร้างคำตอบ)        (เก็บ vectors)
                              │
                    WordPress REST API
                      (ดึงบทความ)
```

**ขั้นตอนที่ทำงาน:**
1. User ส่งข้อความใน Line
2. Server embed คำถามด้วย Gemini
3. ค้นหาบทความที่ใกล้เคียงใน Supabase (vector search)
4. ส่ง context + คำถามให้ Gemini สร้างคำตอบ
5. ตอบกลับ user ใน Line

---

## สิ่งที่ต้องเตรียม

| สิ่งที่ต้องมี | ลิงก์สมัคร | ฟรีไหม? |
|---|---|---|
| Node.js 18+ | nodejs.org | ✅ ฟรี |
| บัญชี Line Developers | developers.line.biz | ✅ ฟรี |
| Google AI Studio (Gemini) | aistudio.google.com | ✅ ฟรี |
| Supabase | supabase.com | ✅ ฟรี 500MB |
| GitHub | github.com | ✅ ฟรี |
| Railway | railway.app | ✅ ฟรี $5/เดือน |

---

## ขั้นตอนที่ 1 — โหลดโค้ดและติดตั้ง

```bash
# สร้างโฟลเดอร์
mkdir smglinebot
cd smglinebot

# วางไฟล์ทั้งหมดลงมา แล้วรัน
npm install
```

ตรวจสอบว่า install สำเร็จ:
```bash
node -e "require('@supabase/supabase-js'); console.log('✅ OK')"
```

---

## ขั้นตอนที่ 2 — ตั้งค่า Supabase Database

### 2.1 สร้าง Project
1. ไปที่ **https://supabase.com** → กด **Start your project**
2. Sign up / Login ด้วย GitHub
3. กด **New project**
4. ตั้งชื่อ project (เช่น `line-bot-db`)
5. ตั้ง Database Password (จดไว้ด้วย)
6. เลือก Region: **Southeast Asia (Singapore)**
7. กด **Create new project** รอประมาณ 1-2 นาที

### 2.2 รัน SQL เพื่อสร้างตาราง
```bash
# ดู SQL ที่ต้องรัน
node scripts/setupDatabase.js
```

จากนั้น:
1. ใน Supabase → เมนูซ้าย → **SQL Editor**
2. กด **New query**
3. Copy SQL จาก terminal ทั้งหมด แล้ว Paste ลงไป
4. กด **Run** (หรือ `Ctrl + Enter`)
5. ต้องเห็นผลลัพธ์ `total_chunks = 0` แสดงว่าสำเร็จ ✅

### 2.3 เก็บ Supabase Keys
1. เมนูซ้าย → **Project Settings** → **API**
2. คัดลอก:
   - **Project URL** → เก็บไว้เป็น `SUPABASE_URL`
   - **anon public** key → เก็บไว้เป็น `SUPABASE_ANON_KEY`

---

## ขั้นตอนที่ 3 — ตั้งค่า Gemini API

1. ไปที่ **https://aistudio.google.com/app/apikey**
2. Login ด้วย Google Account
3. กด **Create API Key**
4. เลือก **Create API key in new project**
5. คัดลอก API Key → เก็บไว้เป็น `GEMINI_API_KEY`

---

## ขั้นตอนที่ 4 — ตั้งค่า Line OA

### 4.1 สร้าง Provider และ Channel
1. ไปที่ **https://developers.line.biz/**
2. Login → **Create a Provider** (ถ้ายังไม่มี)
3. กด **Create a new channel** → เลือก **Messaging API**
4. กรอกข้อมูล:
   - Channel name: ชื่อ Bot ของคุณ
   - Channel description: คำอธิบาย
   - Category / Subcategory: เลือกตามเหมาะสม
5. Agree terms → **Create**

### 4.2 เก็บ Keys
1. **Basic settings** tab → คัดลอก **Channel secret**
2. **Messaging API** tab → กด **Issue** ใต้ "Channel access token" → คัดลอก token

### 4.3 ปิด Auto-reply
1. **Messaging API** tab → **LINE Official Account features**
2. กด **Edit** ข้าง "Auto-reply messages"
3. ปิด **Auto-reply** และ **Greeting messages**

---

## ขั้นตอนที่ 5 — ตั้งค่าไฟล์ .env

```bash
# คัดลอก template
cp .env.example .env
```

เปิดไฟล์ `.env` แล้วแก้ไขให้ครบ:

```env
LINE_CHANNEL_ACCESS_TOKEN=eyJhbGci...   ← จาก Step 4
LINE_CHANNEL_SECRET=abc123...            ← จาก Step 4

GEMINI_API_KEY=AIzaSy...                 ← จาก Step 3

WORDPRESS_URL=https://your-site.com      ← URL WordPress คุณ

SUPABASE_URL=https://xxx.supabase.co    ← จาก Step 2
SUPABASE_ANON_KEY=eyJhbGci...           ← จาก Step 2

BOT_NAME=ชื่อ Bot ของคุณ
SYNC_SECRET=random-string-เปลี่ยนด้วย
```

ทดสอบว่าค่าถูกต้อง:
```bash
node -e "require('./src/config').validateConfig(); console.log('✅ Config OK')"
```

---

## ขั้นตอนที่ 6 — Sync บทความจาก WordPress

```bash
npm run sync
```

ตัวอย่าง output ที่ถูกต้อง:
```
🔌 Connecting to Supabase...
✅ Supabase พร้อมใช้งาน — มี 0 chunks

📥 กำลังดึงบทความจาก: https://your-site.com
   📄 บทความทั้งหมด: 50 (1 หน้า)
   ✅ หน้า 1/1: 50 บทความ

📚 กำลัง process 50 บทความ...

[1/50] 📝 "ชื่อบทความ" → 3 chunks
    📐 Embedding 1/1
  ✅ Upserted 3 chunks
...

✅ Sync เสร็จสิ้น ใช้เวลา 45.2s
   📄 Index ใหม่:  50 บทความ
   🧩 Chunks:     187
```

> **หมายเหตุ:** ถ้า Gemini rate limit ให้รอแล้วรันใหม่ — sync จะข้ามบทความที่ index แล้วโดยอัตโนมัติ

---

## ขั้นตอนที่ 7 — Deploy บน Railway

### 7.1 Push ขึ้น GitHub
```bash
git init
git add .
git commit -m "feat: line wp gemini bot"
```

ไปสร้าง repo ใหม่ที่ **github.com/new** แล้ว:
```bash
git remote add origin https://github.com/USERNAME/smglinebot.git
git push -u origin main
```

### 7.2 Deploy บน Railway
1. ไปที่ **https://railway.app** → Login ด้วย GitHub
2. กด **New Project** → **Deploy from GitHub repo**
3. เลือก repo `smglinebot`
4. Railway จะ detect Node.js และเริ่ม build อัตโนมัติ

### 7.3 ตั้งค่า Environment Variables ใน Railway
1. คลิกที่ Service → **Variables** tab
2. กด **Raw Editor** แล้ว paste ค่าจาก `.env` ทั้งหมด

หรือเพิ่มทีละตัว:
```
LINE_CHANNEL_ACCESS_TOKEN  → ค่าจาก .env
LINE_CHANNEL_SECRET        → ค่าจาก .env
GEMINI_API_KEY             → ค่าจาก .env
WORDPRESS_URL              → ค่าจาก .env
SUPABASE_URL               → ค่าจาก .env
SUPABASE_ANON_KEY          → ค่าจาก .env
BOT_NAME                   → ค่าจาก .env
SYNC_SECRET                → ค่าจาก .env
```

3. กด **Deploy** — รอ build เสร็จ (1-2 นาที)

### 7.4 เก็บ URL
Railway จะให้ URL แบบ: `https://smglinebot-xxxx.up.railway.app`

ทดสอบ:
```bash
curl https://YOUR-URL.up.railway.app/health
# ต้องได้: {"status":"ok","chunks":187,...}
```

---

## ขั้นตอนที่ 8 — ตั้งค่า Line Webhook

1. Line Developers Console → เลือก Channel → **Messaging API** tab
2. **Webhook settings** section:
   - Webhook URL: `https://YOUR-URL.up.railway.app/webhook`
   - กด **Verify** → ต้องได้ ✅ **Success**
3. เปิด toggle **Use webhook**

---

## ขั้นตอนที่ 9 — ทดสอบ

1. เปิด Line → เพิ่มเพื่อน OA ของคุณ (QR Code ใน Line Developers Console)
2. ส่งข้อความ: `สวัสดี`
3. Bot ควรตอบพร้อมเมนู Quick Reply
4. ลองถามเกี่ยวกับบทความ: `มีบทความเรื่อง SEO ไหม`

---

## คำสั่งที่ใช้บ่อย

```bash
# เริ่ม server ใน local (dev)
npm run dev

# Sync บทความใหม่ (incremental)
npm run sync

# Sync ทั้งหมดใหม่ (ล้างแล้ว index ใหม่)
npm run sync:full

# Trigger sync บน production
curl -X POST https://YOUR-URL.up.railway.app/sync \
  -H "x-sync-secret: YOUR_SYNC_SECRET"
```

---

## แก้ปัญหาที่พบบ่อย

**❌ `ตาราง article_chunks ยังไม่มีใน Supabase`**
→ รัน `node scripts/setupDatabase.js` แล้วทำตาม SQL ที่ได้

**❌ `Webhook verify ไม่ผ่าน`**
→ ตรวจสอบว่า Railway deploy สำเร็จ และ URL ถูกต้อง
→ ลอง `curl https://YOUR-URL.up.railway.app/health`

**❌ `Bot ตอบว่าไม่พบข้อมูล` ทุกคำถาม**
→ ตรวจว่า sync เสร็จแล้ว: เปิด Supabase → Table editor → article_chunks → ต้องมีข้อมูล
→ ลอง ลด `SIMILARITY_THRESHOLD` จาก `0.7` เป็น `0.5` ใน .env

**❌ `Gemini API error` ตอน sync**
→ Gemini free tier จำกัด 15 req/นาที — รอแล้วรัน `npm run sync` ใหม่ (จะข้ามที่ทำแล้ว)

**❌ `Railway build failed`**
→ ตรวจว่า `package.json` มี `"engines": {"node": ">=18.0.0"}`
→ ดู build log ใน Railway dashboard
