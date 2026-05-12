# 🪟 SMG — RAG & Knowledge Base v3 (ฉบับสมบูรณ์)
## สร้างจาก: RAG_Ready_v4.1 + IGU_Calculator + Normalized_Master_v3 + Article_Framework_2026 + IGU_spec_AIR_GAP.pdf + u_value_IGU_SMG.pdf + Insulated_Glass.pdf

---

## 📌 SECTION 1 — บริษัท & บทบาท

**บริษัท:** SMG Glass And Metal Co., Ltd. | บางบอน กรุงเทพฯ
**Tagline:** ONLY THE SIGNIFICANT
**โทรศัพท์:** 086-317-4966
**Website:** https://www.smg-con.co.th
**LINE:** @smg58
**บทบาท AI:** Glass Technical Expert — ตอบคำถามเทคนิคกระจก แนะนำ Spec เปรียบเทียบสินค้า
**โทนตอบ:** เป็นกันเอง ใช้ภาษาไทยที่เข้าใจง่าย มีข้อมูลตัวเลขรองรับเสมอ
**เรียกผู้ใช้ว่า:** "คุณ" หรือ "ครับ/ค่ะ"

---

## 📌 SECTION 2 — รหัส SKU Dictionary

| ฟิลด์ | รหัส | ความหมาย |
|--------|------|----------|
| TYPE | FLT | Float / กระจกแผ่นเดี่ยว |
| TYPE | LAM | Laminated / กระจกลามิเนต |
| TYPE | IGU | Insulated Glass Unit / กระจกอินซูเลต |
| COLOR | CLR | Clear (ใส) |
| COLOR | OGR | Ocean Green (เขียว) |
| COLOR | EGR | Euro Grey (เทา) |
| COLOR | EBR | Euro Bronze (บรอนซ์) |
| COLOR | SBL | Sky Blue (ฟ้า) |
| COATING | SUN | Sunergy Clear |
| COATING | CS120 | PairTAG Solar Control |
| COATING | CS130 | Solar Control Coating |
| COATING | CS135 | Solar Control Coating |
| COATING | CS214 | Solar Control Coating |
| COATING | CS220 | Solar Control Coating |
| COATING | CS514 | Solar Control Coating |
| COATING | CS520 | Solar Control Coating |
| PROCESS | AN | Annealed (ไม่อบ) |
| PROCESS | HS | Heat Strengthened (อบกึ่งเทมเปอร์) |
| PROCESS | TP | Tempered (อบเทมเปอร์) |
| STRUCTURE | 44.2 | 4+4 mm with PVB 0.38 |
| STRUCTURE | 55.2 | 5+5 mm with PVB 0.38 |
| STRUCTURE | 64.2 | 6+4 mm with PVB 0.38 |
| STRUCTURE | 66.2 | 6+6 mm with PVB 0.38 |
| STRUCTURE | 6A10+6 | 6mm + Air gap 10mm + 6mm |
| STRUCTURE | 6A12+6 | 6mm + Air gap 12mm + 6mm |
| STRUCTURE | 6A12+8 | 6mm + Air gap 12mm + 8mm |

**วิธีอ่าน SKU:** TYPE-STRUCTURE-COLOR-PROCESS
เช่น `LAM-66.2-OGR-AN` = ลามิเนต 6+6mm PVB 0.38, สี Ocean Green, Annealed

---

## 📌 SECTION 3 — ฐานข้อมูลสินค้า (Product Database) — PRODUCT_MASTER_V3

### 3A. กระจกแผ่นเดี่ยว (Float)
**Catalog Family:** กระจกโฟลตใส / กระจกโฟลตสีตัดแสง | **หน้า Catalog:** p.2–5

| SKU | สี | หนา(mm) | VLT% | SHGC | SC | U-Value | STL(dB) | STC | Catalog Family | แนะนำใช้ |
|-----|-----|---------|------|------|----|---------|---------|-----|----------------|----------|
| FLT-5-CLR-AN | ใส | 5 | 88.8 | 0.96 | 0.84 | 5.28 | 27 | 25 | กระจกโฟลตใส | งานทั่วไป / แสงผ่านสูง |
| FLT-6-CLR-AN | ใส | 6 | 88.2 | 0.95 | 0.82 | 5.25 | 28 | 26 | กระจกโฟลตใส | บ้าน / สำนักงาน |
| FLT-5-OGR-AN | Ocean Green | 5 | 76.0 | 0.73 | 0.63 | 5.28 | 27 | 25 | กระจกโฟลตสีตัดแสง | ลดแสงและร้อนเบื้องต้น |
| FLT-6-OGR-AN | Ocean Green | 6 | 73.1 | 0.69 | 0.60 | 5.25 | 28 | 26 | กระจกโฟลตสีตัดแสง | ด้านรับแดด / ลด glare |
| FLT-5-EGR-AN | Euro Grey | 5 | 50.8 | 0.75 | 0.65 | 5.28 | 27 | 25 | กระจกโฟลตสีตัดแสง | ความเป็นส่วนตัว |
| FLT-6-EGR-AN | Euro Grey | 6 | 45.0 | 0.70 | 0.61 | 5.25 | 28 | 26 | กระจกโฟลตสีตัดแสง | ลดแสงมากขึ้น |
| FLT-6-EBR-AN | Euro Bronze | 6 | 51.2 | 0.75 | 0.66 | 5.25 | 28 | 26 | กระจกโฟลตสีตัดแสง | facade tone bronze |
| FLT-6-SBL-AN | Sky Blue | 6 | 57.6 | 0.69 | 0.60 | 5.25 | 28 | 26 | กระจกโฟลตสีตัดแสง | facade tone blue |

### 3B. กระจกลามิเนต (Laminated) — Clear
**Catalog Family:** กระจกนิรภัยลามิเนต Lamitag | **หน้า Catalog:** p.30

| SKU | โครงสร้าง | หนา(mm) | VLT% | SHGC | SC | U-Value | STL(dB) | STC | แนะนำใช้ |
|-----|-----------|---------|------|------|----|---------|---------|-----|----------|
| LAM-44.2-CLR-AN | 4+PVB+4 | 8 | 87.4 | 0.89 | 0.77 | 5.14 | 30 | 28 | กันอันตราย / แสงผ่านสูง |
| LAM-55.2-CLR-AN | 5+PVB+5 | 10 | 86.4 | 0.87 | 0.75 | 5.09 | 32 | 30 | ประตู / ราวกันตก |
| LAM-64.2-CLR-AN | 6+PVB+4 | 10 | 86.4 | 0.87 | 0.75 | 5.09 | 32 | 30 | safety glass |
| LAM-66.2-CLR-AN | 6+PVB+6 | 12 | 85.3 | 0.84 | 0.73 | 5.04 | 33 | 31 | facade / กันอันตราย |

### 3C. กระจกลามิเนต (Laminated) — สีและ Coating
**Catalog Family:** กระจกนิรภัยลามิเนต Lamitag / Lamitag Cool | **หน้า Catalog:** p.30–31

| SKU | สี/Coating | หนา(mm) | VLT% | SHGC | SC | U-Value | STL(dB) | Catalog | แนะนำใช้ |
|-----|-----------|---------|------|------|-----|---------|---------|---------|----------|
| LAM-44.2-OGR-AN | Ocean Green | 8 | 78.7 | 0.74 | 0.65 | 5.14 | 30 | Lamitag | ลดร้อน + กันอันตราย |
| LAM-55.2-OGR-AN | Ocean Green | 10 | 74.0 | 0.68 | 0.60 | 5.09 | 32 | Lamitag | ลดแสง / safety |
| LAM-64.2-OGR-AN | Ocean Green | 10 | 71.7 | 0.66 | 0.57 | 5.09 | 32 | Lamitag | โครงการรับแดดมาก |
| LAM-66.2-OGR-AN | Ocean Green | 12 | 70.8 | 0.65 | 0.57 | 5.04 | 33 | Lamitag | facade safety + shading |
| LAM-64.2-EGR-AN | Euro Grey | 10 | 44.0 | 0.66 | 0.57 | 5.09 | 32 | Lamitag | ลดแสงมาก + safety |
| LAM-66.2-EGR-AN | Euro Grey | 12 | 43.5 | 0.64 | 0.56 | 5.04 | 33 | Lamitag | facade ลด glare มาก |
| LAM-44.2-SUN-AN | Sunergy | 8 | 69.5 | 0.70 | 0.61 | 5.14 | — | Lamitag Cool | ลดร้อนระดับกลาง |
| LAM-64.2-SUN-AN | Sunergy | 10 | 68.8 | 0.69 | 0.60 | 5.09 | — | Lamitag Cool | balance แสง+กันร้อน |
| LAM-66.2-SUN-AN | Sunergy | 12 | 68.0 | 0.67 | 0.59 | 5.04 | — | Lamitag Cool | facade / safety + ลดร้อน |
| LAM-64.2-CS130-AN | SolarTAG CS130 | 10 | 33.4 | 0.51 | 0.45 | 5.09 | — | Lamitag Cool | ลดร้อนชัดเจน / facade |
| LAM-66.2-CS130-AN | SolarTAG CS130 | 12 | 33.0 | 0.51 | 0.44 | 5.04 | — | Lamitag Cool | อาคารลดโหลดแอร์ |
| LAM-64.2-CS214-HS | SolarTAG CS214 | 10 | 12.3 | 0.38 | 0.33 | 4.94 | — | Lamitag Cool | ลดร้อนสูง / facade |
| LAM-66.2-CS214-HS | SolarTAG CS214 | 12 | 12.1 | 0.38 | 0.33 | 4.90 | — | Lamitag Cool | ลดร้อนสูง / project grade |
| LAM-64.2-CS514-HS | SolarTAG CS514 | 10 | 9.6 | 0.38 | 0.33 | 4.94 | — | Lamitag Cool | facade กันร้อนสูงมาก |
| LAM-66.2-CS514-HS | SolarTAG CS514 | 12 | 9.5 | 0.38 | 0.33 | 4.90 | — | Lamitag Cool | premium solar control |

### 3D. กระจกอินซูเลท (IGU)
**Catalog Family:** กระจกฉนวนความร้อน PairTAG / SolarTAG / PairTAG Low-E | **หน้า Catalog:** p.28–29

| SKU | โครงสร้าง | หนา(mm) | VLT% | SHGC | SC | U-Value | STL(dB) | แนะนำใช้ |
|-----|-----------|---------|------|------|----|---------|---------|----------|
| IGU-CS120-6A12+6 | 6+Air12+6 | 24 | 20 | 0.26 | 0.30 | 2.43 | 28 | อาคารเน้นกันร้อน |
| IGU-CS130-6A12+6 | 6+Air12+6 | 24 | 30 | 0.36 | 0.41 | 2.53 | 28 | balance แสงและกันร้อน |
| IGU-CS135-6A12+6 | 6+Air12+6 | 24 | 34 | 0.35 | 0.40 | 2.58 | 28 | ต้องการแสงมากขึ้น |
| IGU-CS214-6A12+6 | 6+Air12+6 | 24 | 12 | 0.19 | 0.22 | 2.32 | — | กันร้อนสูง / แสงผ่านต่ำ |
| IGU-CS220-6A12+8 | 6+Air12+8 | 24 | 16 | 0.22 | 0.25 | 2.40 | — | inner pane หนาขึ้น |
| IGU-CS514-6A12+8 | 6+Air12+8 | 24 | 9 | 0.18 | 0.21 | 2.30 | — | premium solar control |
| IGU-CS520-6A12+8 | 6+Air12+8 | 24 | 11 | 0.20 | 0.23 | 2.38 | — | premium solar control |
| IGU-LOWE-6A10+6-TP | 6+Air10+6 | 22 | — | 0.42 | — | 1.91 | — | พักอาศัย / ประหยัดพลังงาน |

### 3E. IGU Performance Quick Reference (สำหรับตอบเร็ว)

| รหัส | ชุดกระจก | U-Value | SHGC | Rw(dB) | ESG Claim |
|------|----------|---------|------|--------|-----------|
| IGU-01 | 6+6 Clear Air12 | 2.7–2.8 | 0.70 | 34 | ลดร้อน 35–40% vs กระจกเดี่ยว |
| IGU-02 | 6+6 Low-E Air12 | 1.8–2.0 | 0.35 | 34 | ลดร้อน 55–65% vs กระจกเดี่ยว |
| IGU-03 | 6+6 Low-E Ar15 | 1.3–1.4 | 0.25–0.30 | 35 | ลดร้อน 55–65% vs กระจกเดี่ยว |
| IGU-04 | 6+10 Lami Air12 | 2.5–2.7 | 0.60 | 38–39 | ลดร้อน 35–40% vs กระจกเดี่ยว |

---

## 📌 SECTION 4 — ตาราง Acoustic Reference (STL by Frequency)

| Ref Code | Glass Combination | Avg STL(dB) | 125Hz | 250Hz | 500Hz | 1000Hz | 2000Hz | 4000Hz |
|----------|-------------------|-------------|-------|-------|-------|--------|--------|--------|
| FL5 | Single pane 5mm | 27 | 19.1 | 23.7 | 29.0 | 33.4 | 28.1 | 30.7 |
| FL6 | Single pane 6mm | 28 | 19.0 | 25.0 | 30.6 | 34.2 | 28.6 | 34.2 |
| FL10 | Single pane 10mm | 31 | 23.7 | 27.6 | 33.8 | 32.7 | 34.6 | 43.0 |
| L8 | Laminated 8mm | 30 | 22.5 | 26.1 | 32.1 | 34.8 | 33.5 | 42.8 |
| L10 | Laminated 10mm | 32 | 25.2 | 27.9 | 33.4 | 34.6 | 35.7 | 45.7 |
| L12 | Laminated 12mm | 33 | 26.4 | 29.5 | 34.9 | 34.9 | 38.7 | 48.0 |
| FL6+A12+FL6 | IGU 6+12A+6 | 28 | 22.6 | 21.9 | 26.5 | 35.3 | 34.0 | 41.5 |
| FL6+A12+FL10 | IGU 6+12A+10 | 33 | 23.1 | 27.0 | 34.8 | 40.2 | 39.8 | 46.5 |
| FL8+A12+FL12 | IGU 8+12A+12 | 34 | 23.9 | 31.2 | 38.1 | 36.9 | 38.5 | 49.3 |

### STC Interpretation Guide

| STC/Rw (dB) | ระดับ | เหมาะกับ | ตัวอย่างสินค้า |
|-------------|-------|----------|---------------|
| 25–28 | 🔴 Weak | ซอยเงียบสงบ | กระจกเดี่ยว 4–6mm |
| 29–32 | 🟠 Fair | ถนนทั่วไปในเมือง | ลามิเนตบาง |
| 33–36 | 🟡 Good | ถนนสายหลัก / ห้องพัก | ลามิเนตหนา / IGU Air |
| 37–40 | 🟢 Very Good | บ้านริมถนน / ห้องประชุม | IGU Argon / Laminated |
| 41–45 | 🟢 Excellent | ทางด่วน / สนามบิน | Laminated IGU |
| 46–52 | 🔵 Acoustic | ห้องอัดเสียง / ห้องพิเศษ | Acoustic Laminated IGU |

---

## 📌 SECTION 5 — ตาราง Noise Reference Scale

| dB(A) | แหล่งเสียงตัวอย่าง | ความรู้สึก |
|-------|---------------------|------------|
| 130 | เครื่องบินไอพ่นที่ 30m | ปวดหู |
| 120 | แตรรถที่ 1m | ปวดหู |
| 110 | ฟ้าร้อง | หูอื้อ |
| 100 | รถไฟฟ้า / ดิสโก้ | หูอื้อ |
| 90 | ถนนดัง / โรงงานดัง | ดังมาก |
| 80 | รถบรรทุก / นกหวีดตำรวจ | ดังมาก |
| 70 | ปาร์ตี้ / ออฟฟิศดัง / ถนนทั่วไป | ดัง |
| 60 | วิทยุ / โรงงานทั่วไป | ปานกลาง |
| 50 | บ้านดัง / ออฟฟิศทั่วไป | ปานกลาง |
| 40 | สนทนา / วิทยุเบา | ปานกลาง |
| 30 | บ้านเงียบ / ห้องทำงานส่วนตัว | เบา |
| 20 | ห้องประชุมว่าง | เบา |
| 10 | ใบไม้ไหว | กระซิบ |

---

## 📌 SECTION 6 — สูตรคำนวณ (Calculator Formulas)

### 6A. สูตร U-Value (EN 673:2024 / ISO 10292)

**หมายเหตุ:** ค่าที่ได้เป็น Centre-of-Glass (ศูนย์กลางกระจก) — ยังไม่รวม Frame และ Edge effects

| ตัวแปร | สูตร | หน่วย | หมายเหตุ |
|--------|------|-------|----------|
| R_total | 1/hi + Σ(d/λ) + Σ(1/h_gap) + 1/he | m²K/W | hi=8.0, he=23.0 |
| h_gap | hc + hr | W/m²K | convection + radiation |
| hc | Nu × λ_gas / s | W/m²K | s=ความกว้างช่อง(m) |
| Nu | max(1, f(Ra)) | — | Ra<5×10⁴: 0.035Ra⁰·³⁸ |
| Ra | ρ²g(1/T)ΔTs³/μ² × Pr | — | ΔT=10K (EN 673 ref) |
| hr | 4σT³ / (1/ε₁+1/ε₂-1) | W/m²K | σ=5.67×10⁻⁸, T=283K |
| Ug | 1 / R_total | W/m²K | ยิ่งต่ำ = กันร้อนดี |

**ค่า Gas Properties:**

| รหัส | ก๊าซ | λ (W/mK) | ลักษณะ |
|------|------|----------|--------|
| 1 | Air | 0.0241 | ถูก / มาตรฐาน |
| 2 | Argon | 0.0163 | นิยมใช้มากที่สุด |
| 3 | Krypton | 0.00940 | บางมาก / แพง |
| 4 | Xenon | 0.00569 | ประสิทธิภาพสูงสุด |

**ค่า Emissivity:**

| ประเภทกระจก | ε | ลักษณะ |
|-------------|---|--------|
| กระจกใสทั่วไป (uncoated) | 0.84–0.89 | ทุกชนิด |
| Low-E Single Silver | 0.04–0.10 | ประหยัดพลังงาน |
| Low-E Double Silver | 0.02–0.05 | ประสิทธิภาพสูง |
| Low-E Triple Silver | 0.01–0.03 | Passive House |

### 6B. สูตร STC/Rw (ISO 717-1 / Mass Law)

| ตัวแปร | สูตร | หน่วย | หมายเหตุ |
|--------|------|-------|----------|
| R_mass (STC base) | 13.5 × log₁₀(M_total) + 13 | dB | M = surface density kg/m² |
| M_glass | d_mm/1000 × 2500 | kg/m² | ρ_glass=2500 kg/m³ |
| M_PVB | d_pvb/1000 × 1100 | kg/m² | ρ_PVB=1100 kg/m³ |
| Gap_bonus | 0.1 × gap_mm | dB | ต่อ 1 ช่องอากาศ |
| PVB_bonus | ดูตาราง | dB | 0.38→+4 / 0.76→+5.5 / 1.14→+6 / 1.52→+7 |
| STC_total | R_mass + ΣGap_bonus + ΣPVB_bonus | dB | รวมทุก bonus |
| Rw | ≈ STC | dB | ISO 717-1 ≈ ASTM E413 ±1–2 dB |
| OITC | STC − 3 (approx.) | dB | ASTM E1332, เสียงรถ |

### 6C. สูตรน้ำหนักกระจก (Weight Formula)

| ตัวแปร | สูตร | หน่วย |
|--------|------|-------|
| Weight per m² | ความหนา(mm) × 2.5 | kg/m² |
| Panel Weight | กว้าง(m) × สูง(m) × Weight per m² | kg |

ตัวอย่าง: กระจก 6mm = 6 × 2.5 = **15 kg/m²** | แผ่น 1.5×1.5m = 1.5×1.5×15 = **33.75 kg**

---

## 📌 SECTION 7 — มาตรฐานอ้างอิง

### 7A. มาตรฐาน U-Value

| มาตรฐาน | เกณฑ์ Ug ≤ | ภูมิภาค | หมายเหตุ |
|---------|-----------|---------|----------|
| EU PassivHaus | 0.8 | EU | บ้านประหยัดพลังงานสูงสุด |
| EU Energy+ (2021) | 1.0 | EU | มาตรฐานอาคารใหม่ยุโรป |
| ASHRAE 90.1 | 1.7 | US | มาตรฐานอาคารสหรัฐฯ |
| Thai BEC Code | 3.5 | TH | มาตรฐานอาคารไทย (DEDE) |

### 7B. Thai BEC Regulation (ราชกิจจานุเบกษา 8 เมษายน 2562)

กฎกระทรวงพลังงาน กำหนดมาตรฐานพลังงานกระจกสำหรับอาคารในไทย:

| เกณฑ์ | ค่ากำหนด | หมายเหตุ |
|-------|---------|----------|
| ค่าสัมประสิทธิ์การส่งผ่านความร้อนจากรังสีอาทิตย์ (SHGC) | 0.45–0.60 | ตามมาตรฐาน |
| ค่าการส่องผ่านของแสงธรรมชาติต่อค่าสัมประสิทธิ์ฯ (VLT/SHGC หรือ LSG) | 1.20–1.50 | ตามมาตรฐาน |

- กระจกเพื่อการอนุรักษ์พลังงาน: ต้องมี SHGC ไม่มากกว่าค่าที่กำหนด และ VLT/SHGC ไม่น้อยกว่าค่ากำหนด
- การทดสอบค่ามาตรฐาน ให้ใช้ตามมาตรฐาน **ISO 9050** และ **ISO 10292**
- บังคับใช้กับอาคารควบคุมตามกฎหมายอนุรักษ์พลังงาน (DEDE)

### 7C. มาตรฐานที่เกี่ยวข้องทั้งหมด

| มาตรฐาน | เนื้อหา | ภูมิภาค |
|---------|---------|---------|
| EN 673:2024 | Thermal – วิธีคำนวณ Ug ของกระจก | EU |
| ISO 9050 | Thermal – Solar properties of glazing | สากล |
| ISO 10292 | Thermal – Heat transfer in glazing | สากล |
| ISO 15099 | Thermal – Window & door performance | สากล |
| ISO 717-1:2013 | Acoustic – Rating sound insulation Rw | สากล |
| ASTM E413 | Acoustic – STC Classification | US |
| ASTM E1332 | Acoustic – OITC (Outdoor-Indoor) | US |
| ISO 10140 | Acoustic – Lab measurement method | สากล |
| EN 12758 | Acoustic – Glazing & sound insulation | EU |
| ASHRAE 90.1 | Energy Code – Window U-factor | US |
| Thai BEC | กฎหมายอนุรักษ์พลังงาน (DEDE ไทย) | TH |
| EN 12150 / มอก. 2127 | Tempered Glass specification | EU/TH |
| EN 1863 | Heat-Strengthened Glass spec | EU |
| ASTM C 1036 | Flat Glass Specification | US |
| ASTM C 1048 | Heat-Strengthened & Tempered Glass | US |
| ASTM C 1172 | Laminated Architectural Flat Glass | US |
| ASTM E 1300 | Load Resistance of Glass in Buildings | US |
| ASTM E 2188/2190 | IG Unit Performance Test/Evaluation | US |
| มอก. 2366 | มาตรฐาน OTTV อาคาร (ไทย) | TH |

---

## 📌 SECTION 8 — Catalog Product Family (AGC)

| Product Family | หน้า | ประเภท | ปัญหาที่แก้ |
|---------------|------|--------|------------|
| กระจกโฟลตใส | p.2–3 | Base single glass | แสงผ่านสูง / งานทั่วไป |
| กระจกโฟลตสีตัดแสง | p.4–5 | Tinted float | ลดแสง / ลดร้อนพื้นฐาน |
| SolarTAG (สะท้อนแสง) | p.10–15 | Reflective coated | ลดความร้อน |
| Sunergy | p.16–17 | Low-E energy saving | ลดร้อน / ประหยัดพลังงาน |
| Stopsol | p.18–19 | Reflective coated | ลดร้อน / ภาพลักษณ์ facade |
| Planibel G | p.20–21 | Low reflective energy | ธรรมชาติ / คุมร้อน |
| Temtag (Tempered) | p.25–26 | Tempered safety | ความปลอดภัย |
| Heattag (HS) | p.27 | Heat strengthened | แข็งแรง / ลด thermal breakage |
| PairTAG | p.28 | IGU | กันร้อน / ลดเสียง |
| PairTAG Low-E | p.29 | Low-E IGU | กันร้อนสูง |
| Lamitag | p.30 | Laminated safety | กันอันตราย / กันเสียง |
| Lamitag Cool | p.31 | Solar-control lam | กันเสียง + กันร้อน |
| Lamitag Security | p.32 | Security lam | กันโจรกรรม |
| Lamitag Bullet Resistant | p.33 | Bullet resistant | ความปลอดภัยขั้นสูง |

---

## 📌 SECTION 9 — FAQ คำถาม-คำตอบ (พร้อมใช้ตอบลูกค้า)

### FAQ-S-001 | เสียง | บ้านติดถนนใหญ่
**คำถาม:** บ้านติดถนนใหญ่ เสียงรถดังมาก ควรใช้กระจกแบบไหน
**SKU แนะนำ:** LAM-66.2-CLR-AN
**คำตอบ:** สำหรับบ้านติดถนนใหญ่ที่มีเสียงรถดังมาก แนะนำ กระจกลามิเนต 6+6 มม. (LAM-66.2-CLR-AN) ซึ่งมีค่า STL=33 dB ลดเสียงได้ดีมากสำหรับถนนสายหลัก ฟิล์ม PVB ระหว่างกระจกทำหน้าที่ดูดซับการสั่นสะเทือนของเสียง ทำให้ได้ผลดีกว่ากระจกแผ่นเดี่ยวความหนาเท่ากัน
**Follow-up:** ต้องการกันร้อนด้วยหรือไม่? ถ้าใช่แนะนำเป็น IGU Low-E เพิ่มเติม

### FAQ-S-002 | เสียง | ลามิเนต vs อินซูเลท
**คำถาม:** กระจกลามิเนตกับกระจกสองชั้น (อินซูเลท) อันไหนกันเสียงได้ดีกว่า
**SKU แนะนำ:** LAM-66.2-CLR-AN vs IGU-CS120-6A12+6
**คำตอบ:** กระจกลามิเนต (LAM) กันเสียงได้ดีกว่ากระจกอินซูเลท (IGU) ทั่วไปที่ความหนาเทียบกัน เพราะฟิล์ม PVB ในลามิเนตดูดซับการสั่นสะเทือนของเสียงได้โดยตรง ขณะที่ช่องอากาศใน IGU อาจสะท้อนเสียงบางความถี่ได้ อย่างไรก็ตาม IGU Low-E มีข้อดีเรื่องกันความร้อนดีกว่ามาก ถ้าต้องการทั้งกันเสียงและกันร้อนพร้อมกัน แนะนำ IGU ที่มีกระจกลามิเนตเป็น Pane หนึ่ง
**Follow-up:** ต้องการข้อมูลราคาเปรียบเทียบหรือไม่?

### FAQ-S-003 | เสียง | STC คืออะไร
**คำถาม:** ค่า STC คืออะไร ยิ่งมากยิ่งดีไหม
**คำตอบ:** ค่า STC (Sound Transmission Class) หรือ STL (Sound Transmission Loss) คือค่ากันเสียงของกระจก หน่วยเป็น dB ยิ่งมากยิ่งกันเสียงได้ดี โดยทั่วไป STC 27-28 dB = กระจกธรรมดา, STC 30-32 dB = ลามิเนตบาง เหมาะกับซอยทั่วไป, STC 33-35 dB = ลามิเนตหนา เหมาะกับถนนสายหลัก, STC 38+ dB = IGU หรือลามิเนตพิเศษ เหมาะกับทางด่วนหรือสนามบิน
**Follow-up:** บ้านหรือห้องของคุณอยู่ใกล้ถนนประเภทไหนครับ?

### FAQ-S-004 | เสียง | คอนโดติดวงแหวน
**คำถาม:** คอนโดติดถนนวงแหวน เสียงดังตลอดคืน จะแก้ยังไงดี
**SKU แนะนำ:** LAM-66.2-CLR-AN
**คำตอบ:** ถนนวงแหวนหรือทางด่วนมีเสียงรบกวนระดับ 70-80 dB ต้องการกระจกที่มีค่า STC 35 dB ขึ้นไป แนะนำกระจกลามิเนต 6+6 มม. (STL=33 dB) เป็นขั้นต่ำ หรือถ้างบพอแนะนำ IGU ที่มี Lam เป็น Pane ด้านนอก สิ่งสำคัญคือระบบเฟรมต้องดีด้วย เพราะเสียงลอดผ่านรอยต่อได้ง่ายไม่แพ้ผ่านกระจก
**Follow-up:** อยากทราบตัวเลือกราคาประหยัดหรือตัวเลือกประสิทธิภาพสูงสุดครับ?

### FAQ-H-001 | ความร้อน | ห้องทิศตะวันตก
**คำถาม:** ห้องร้อนมาก เปิดแอร์ไม่เย็น กระจกทิศตะวันตก ควรเปลี่ยนเป็นกระจกอะไร
**SKU แนะนำ:** IGU-CS120-6A12+6
**คำตอบ:** ห้องทิศตะวันตกรับแดดบ่ายจัดมาก ต้องการกระจกที่มี SHGC ต่ำ แนะนำ กระจกอินซูเลท IGU Low-E เช่น IGU-CS120-6A12+6 ที่มีค่า SHGC=0.26 (ลดความร้อนได้ถึง 74%) และ U-Value=2.43 เทียบกับกระจกธรรมดาที่ SHGC=0.96 ทำให้ห้องเย็นลงอย่างเห็นได้ชัดและลดค่าไฟแอร์ได้ในระยะยาว
**Follow-up:** ต้องการดูตัวเลือก Low-E ราคาประหยัดกว่าหรือไม่?

### FAQ-H-002 | ความร้อน | Low-E คืออะไร
**คำถาม:** กระจก Low-E คืออะไร ต่างจากกระจกธรรมดายังไง
**SKU แนะนำ:** IGU-LOWE-6A10+6-TP
**คำตอบ:** กระจก Low-E (Low Emissivity) คือกระจกที่เคลือบสารโลหะบางพิเศษ ทำหน้าที่สะท้อนรังสีอินฟราเรด (ความร้อน) ออกไป แต่ยังให้แสงธรรมชาติผ่านได้ดี ต่างจากกระจกธรรมดาอย่างมาก เช่น กระจกใสธรรมดา SHGC=0.96 (ความร้อนผ่านเข้า 96%) แต่ IGU Low-E SHGC อาจต่ำถึง 0.18-0.42 ข้อสำคัญ: กระจก Low-E แบบ Soft Coat ต้องทำเป็น IGU เสมอ ห้ามใช้แผ่นเดี่ยว
**Follow-up:** ต้องการดูรายละเอียดสเปคและราคาของ IGU Low-E ที่ SMG มีไหมครับ?

### FAQ-H-003 | ความร้อน | กระจกสี vs Low-E
**คำถาม:** กระจกสีเขียวกันร้อนได้จริงไหม หรือต้องเป็น Low-E
**SKU แนะนำ:** FLT-6-OGR-AN vs IGU-CS120-6A12+6
**คำตอบ:** กระจกสีเขียว (Ocean Green) กันร้อนได้ระดับพื้นฐาน SHGC ประมาณ 0.60-0.73 ราคาถูกกว่า Low-E มาก แต่มีข้อเสียคืออมความร้อนไว้ในเนื้อกระจกแล้วคลายออกทีหลัง ส่วน Low-E IGU กันร้อนได้ดีกว่ามาก SHGC ต่ำถึง 0.18-0.42 แต่ราคาสูงกว่า 4-6 เท่า สำหรับเมืองไทยที่ร้อนจัด ถ้าห้องรับแดดตลอดวัน Low-E IGU คุ้มค่ากว่าในระยะยาว
**Follow-up:** ห้องรับแสงแดดกี่ชั่วโมงต่อวันครับ?

### FAQ-H-004 | ความร้อน | SHGC & U-Value คืออะไร
**คำถาม:** ค่า SHGC และ U-Value คืออะไร ดูยังไง
**คำตอบ:** SHGC (Solar Heat Gain Coefficient) = สัดส่วนความร้อนจากแสงแดดที่ผ่านกระจกเข้ามา ยิ่งต่ำยิ่งกันร้อนได้ดี เช่น SHGC=0.25 หมายความว่าความร้อนผ่านแค่ 25% | U-Value = ค่าการนำความร้อนของกระจก ยิ่งต่ำยิ่งเป็นฉนวนที่ดี กระจกธรรมดา U-Value ≈ 5.0-5.3, IGU Low-E อาจต่ำถึง 1.9 | มาตรฐาน Thai BEC กำหนด SHGC ≤ 0.55 สำหรับอาคารประหยัดพลังงาน
**Follow-up:** ต้องการให้แนะนำกระจกที่ผ่านมาตรฐาน Thai BEC ไหมครับ?

### FAQ-C-001 | เสียง+ความร้อน | กันทั้งสองอย่าง
**คำถาม:** อยากได้กระจกที่กันทั้งเสียงและความร้อนพร้อมกัน มีไหม
**SKU แนะนำ:** IGU-CS120-6A12+6
**คำตอบ:** มีครับ! กระจกอินซูเลท IGU แบบที่มี Low-E Coating กันได้ทั้งสองอย่าง ตัวอย่างเช่น IGU-CS120-6A12+6 มีค่า SHGC=0.26 (กันร้อนดีเยี่ยม) และ STL=28 dB (กันเสียงได้ดี) ถ้าต้องการกันเสียงสูงขึ้น แนะนำให้ใช้กระจกลามิเนตเป็น Pane ด้านนอกแทนกระจกธรรมดา จะได้ทั้งกันเสียงและกันร้อนในระดับสูงพร้อมกัน
**Follow-up:** ต้องการใบเสนอราคาหรืออยากให้ประเมินเพิ่มเติมไหมครับ?

### FAQ-C-002 | เสียง+ความร้อน | บ้านใหม่งบปานกลาง
**คำถาม:** บ้านใหม่กำลังสร้าง อยากเลือกกระจกที่ดีที่สุด งบปานกลาง
**SKU แนะนำ:** LAM-66.2-OGR-AN
**คำตอบ:** สำหรับบ้านใหม่งบปานกลาง แนะนำ กระจกลามิเนต Ocean Green 6+6 มม. (LAM-66.2-OGR-AN) เป็นตัวเลือกที่คุ้มค่าที่สุด เพราะได้ทั้งกันเสียง STL=33 dB, ลดความร้อนเบื้องต้น SHGC=0.65, และความปลอดภัยจากฟิล์ม PVB พร้อมกัน ราคาถูกกว่า IGU Low-E มาก แต่ถ้างบพอสำหรับด้านที่รับแดดจัด แนะนำ upgrade เป็น IGU Low-E เฉพาะหน้าต่างทิศตะวันตก
**Follow-up:** ห้องไหนรับแดดมากที่สุดในบ้านครับ?

---

## 📌 SECTION 10 — SHGC Rating Guide

| SHGC Range | ระดับ | ลดร้อนได้ | ตัวอย่าง SKU |
|-----------|-------|----------|-------------|
| 0.80–1.00 | ต่ำ (กันร้อนได้น้อย) | < 20% | FLT-CLR, LAM-CLR |
| 0.60–0.79 | พื้นฐาน | 30–45% | FLT-OGR, LAM-OGR, LAM-SUN |
| 0.40–0.59 | ดี | 45–60% | LAM-CS130, IGU-LOWE |
| 0.20–0.39 | ดีมาก | 60–75% | IGU-CS120, IGU-CS130, LAM-CS214 |
| < 0.20 | ดีเยี่ยม | > 75% | IGU-CS214, IGU-CS514 |

---

## 📌 SECTION 11 — Decision Tree (แนวทางตอบลูกค้า)

### ถ้าลูกค้าถามเรื่อง "กันเสียง"
1. ถามระดับเสียงแวดล้อม (ซอยเงียบ / ถนนทั่วไป / ถนนใหญ่ / ทางด่วน)
2. แนะนำ STC ที่เหมาะ → เลือก SKU
3. ถาม Follow-up: ต้องการกันร้อนด้วยไหม?

### ถ้าลูกค้าถามเรื่อง "กันร้อน"
1. ถามทิศหน้าต่าง + จำนวนชั่วโมงรับแดด
2. แนะนำ SHGC ที่เหมาะ → เลือก SKU
3. ถาม Follow-up: งบประมาณระดับไหน?

### ถ้าลูกค้าถาม "ทั้งเสียงและร้อน"
1. แนะนำ IGU ที่มี Lam เป็น Pane ด้านนอก = ดีที่สุด
2. ถ้างบจำกัด → LAM-66.2-OGR-AN เป็น sweet spot
3. ถ้างบพอ → IGU-CS120-6A12+6 หรือสูงกว่า

### ถ้าลูกค้าถาม "บ้านใหม่ เลือกกระจกอะไรดี"
1. ถามงบ (ประหยัด / ปานกลาง / ไม่จำกัด)
2. ถามทิศที่รับแดดมากสุด
3. แนะนำแยกตามด้าน:
   - ด้านรับแดดจัด → IGU Low-E
   - ด้านอื่น → LAM-66.2-OGR-AN
   - ห้องน้ำ/ห้องเก็บของ → FLT-6-CLR-AN

---

## 📌 SECTION 12 — ESG Claims (ใช้ในงาน Marketing)

| Claim | ข้อมูลรองรับ |
|-------|-------------|
| Clear IGU ลดความร้อน 35–40% | vs กระจกเดี่ยว (SHGC 0.70 vs 0.96) |
| Low-E IGU ลดความร้อน 55–65% | vs กระจกเดี่ยว (SHGC 0.25-0.35 vs 0.96) |
| ลดค่าไฟแอร์ | U-Value ลดจาก 5.28 → 1.91–2.43 |
| ลดเสียงรบกวน | STL เพิ่มจาก 27 dB → 33–39 dB |
| กระจก Low-E ผ่านมาตรฐาน Thai BEC | SHGC ≤ 0.55 / U-Value ≤ 3.5 |
| IGU กับกระจกใส 6mm เปรียบเทียบ | U-Value: 1.91 vs 6.40 W/m²K / SHGC: 0.42% vs 0.96% |

---

## 📌 SECTION 13 — Room Routing Rules

| ถ้าคำถามเกี่ยวกับ | ส่งไปห้อง |
|-------------------|----------|
| ราคา / BOQ / ใบเสนอราคา | ⚙️ SMG — Ops Board |
| กลยุทธ์ / Board Report | 🧠 SMG — Master Strategy |
| Content / Social Media | 📣 SMG — Marketing & Ads |
| ลูกค้า / CRM / Follow-up | 🔍 SMG — Customer Intel |
| บัญชี / Cash Flow / Margin | 💰 SMG — Accounts & Finance |
| ESG / CSR / Brand | 🌿 SMG — ESG Center |

---

## 📌 SECTION 14 — ประเภทกระจกตาม Heat Treatment

### 14A. Annealed Glass (AN) — กระจกไม่อบ
- กระจก Float ที่ไม่ผ่านการอบ HS หรือ TP
- สามารถตัด เจาะ เจียร ขัดเงาได้
- ความแข็งแรง = **Baseline** (1x)
- แตกเป็นชิ้นใหญ่คม
- ไม่ถือเป็น Safety Glass
- มาตรฐาน: ASTM C 1036

### 14B. Heat-Strengthened Glass (HS) — อบกึ่งเทมเปอร์
- ผ่านการอบร้อนและเย็นตัวแบบควบคุม
- แข็งแรง **≈ 2 เท่า** ของ Annealed
- Surface Compression: **3,500–7,500 PSI** (สำหรับ 6mm ตาม ASTM C 1048)
- ทนความเครียดจากอุณหภูมิ (Thermal Load) ดีกว่า AN
- แตกเป็นชิ้นใหญ่กว่า Tempered — อาจยังคงอยู่ในเฟรม
- **ไม่ถือเป็น Safety Glass** ตามกฎหมาย
- ไม่สามารถตัด/เจาะหลังอบ
- Guardian แนะนำใช้ HS แทน TP ในงานที่ไม่บังคับ Safety Glass เพื่อลด Spontaneous Breakage
- มาตรฐาน: ASTM C 1048

### 14C. Tempered Glass (TP/FT) — อบเทมเปอร์เต็ม
- แข็งแรง **≈ 4 เท่า** ของ Annealed
- Surface Compression: **>10,000 PSI** (สำหรับ 6mm ตาม ASTM C 1048)
- กระบวนการ: อุ่นกระจก >1,000°F (538°C) แล้วเย็นเร็ว (Quench)
- แตกเป็น **ชิ้นเล็กมาก** — ปลอดภัยกว่า (Safety Glass)
- ถือเป็น **Safety Glass** ตามกฎหมาย
- ⚠️ มีความเสี่ยง NiS (Nickel Sulfide) Spontaneous Breakage — แก้ด้วย Heat-Soaking
- มาตรฐาน: ASTM C 1048, EN 12150, มอก. 2127

### 14D. เปรียบเทียบ AN vs HS vs TP

| คุณสมบัติ | AN (Annealed) | HS (Heat-Strengthened) | TP (Tempered) |
|-----------|---------------|----------------------|---------------|
| ความแข็งแรง | 1x (baseline) | ~2x | ~4x |
| Surface Compression (PSI) | — | 3,500–7,500 | >10,000 |
| ลักษณะเมื่อแตก | ชิ้นใหญ่คม | ชิ้นใหญ่ (อาจคงในเฟรม) | ชิ้นเล็กมาก (ปลอดภัย) |
| Safety Glass | ❌ | ❌ | ✅ |
| ตัด/เจาะหลังอบ | ✅ ได้ | ❌ | ❌ |
| ทน Thermal Stress | ต่ำ | ดี | ดีมาก |
| NiS Spontaneous Breakage | ต่ำมาก | ต่ำมาก | มีความเสี่ยง |
| มาตรฐาน | ASTM C 1036 | ASTM C 1048 / EN 1863 | ASTM C 1048 / EN 12150 / มอก. 2127 |

### 14E. Heat-Soaking (แก้ปัญหา NiS ใน Tempered)
- NiS (Nickel Sulfide) = สิ่งเจือปนในเนื้อกระจก บางชิ้นทำให้ TP แตกเองโดยไม่มีแรงกระทำ
- Heat-Soaking = นำ TP ไปอุ่นที่ ~290°C เพื่อเร่ง NiS ให้ขยายตัวจนกระจกแตกในห้อง Lab
- ⚠️ ไม่ได้ผล 100% แต่ลดความเสี่ยงลงอย่างมาก
- แก้ทางเลือก: ถ้าไม่บังคับ Safety Glass ให้ใช้ **HS หรือ Laminated** แทน TP

---

## 📌 SECTION 15 — Acoustic Data จาก Guardian (STC + OITC + Frequency)

### 15A. ตาราง Sound Transmission Loss (dB) — Lab Measured

| Configuration | STC | OITC | 100Hz | 125Hz | 250Hz | 500Hz | 1kHz | 2kHz | 4kHz |
|---------------|-----|------|-------|-------|-------|-------|------|------|------|
| 1/4" (6mm) single | 31 | 29 | 23 | 25 | 28 | 31 | 34 | 30 | 37 |
| 1/2" (12mm) single | 36 | 33 | 26 | 30 | 33 | 36 | 32 | 40 | 50 |
| 1/8"-PVB-1/8" LAM 6mm | 35 | 31 | 25 | 26 | 29 | 32 | 35 | 35 | 43 |
| 1/4"-PVB-1/4" LAM 12mm | 37 | 33 | 28 | 31 | 32 | 33 | 36 | 40 | 48 |
| 1/4"-0.060"PVB-1/4" LAM 12mm | 37 | 33 | 27 | 28 | 31 | 35 | 37 | 37 | 48 |
| 1/8"-3/8"as-1/8" IGU 10mm | 31 | 26 | 26 | 23 | 23 | 27 | 35 | 47 | 36 |
| 1/4"-1/2"as-1/4" IGU 18mm | 35 | 28 | 29 | 22 | 25 | 32 | 39 | 35 | 52 |
| 1/8"-1/2"as-1/8"PVB-1/8" IGU+LAM in | 37 | 31 | 27 | 29 | 25 | 31 | 40 | 43 | 49 |
| 1/4"-1/2"as-1/8"PVB-1/8" IGU+LAM in | 39 | 32 | 27 | 27 | 26 | 35 | 42 | 40 | 51 |
| 1/4"-1/2"as-1/4"PVB-1/4" IGU+LAM in | 41 | 35 | 30 | 26 | 29 | 37 | 41 | 44 | 53 |

### 15B. Acoustic Insight สำหรับตอบลูกค้า
- IGU กันเสียงได้ดีที่ความถี่สูง (>1kHz) แต่อ่อนที่ความถี่ต่ำ (250Hz)
- LAM กันเสียงสม่ำเสมอทุกความถี่ เพราะ PVB ดูดซับ vibration
- **Config ที่ดีที่สุด: IGU + LAM inboard** (STC 37–41, OITC 31–35)
- การรับรู้เสียง: เพิ่ม/ลด 3 dB = แทบไม่รู้สึก / 5 dB = ชัดเจน / 10 dB = ดังเป็นสองเท่า
- OITC ดีกว่า STC สำหรับประเมินเสียงรถ/เครื่องบิน (เสียงความถี่ต่ำ)
- Acoustic PVB เพิ่ม STC/OITC ขึ้นอีก ~1 dB

---

## 📌 SECTION 16 — Guardian SunGuard IGU Performance Data (6mm/12mm air/6mm)

### 16A. SuperNeutral Series (Coating #2 Surface)

| Product | VLT% | SHGC | U-Air | U-Argon | LSG |
|---------|------|------|-------|---------|-----|
| SNX 62/27 | 62 | 0.27 | 0.29 | 0.24 | 2.30 |
| SNX 51/23 | 51 | 0.23 | 0.29 | 0.24 | 2.18 |
| SN 68 | 68 | 0.38 | 0.29 | 0.25 | 1.80 |
| SN 62 | 62 | 0.31 | 0.29 | 0.24 | 1.99 |
| SN 54 | 54 | 0.28 | 0.29 | 0.24 | 1.91 |
| SNR 43 | 43 | 0.23 | 0.29 | 0.24 | 1.89 |

### 16B. High Performance Series

| Product | VLT% | SHGC | U-Air | U-Argon | LSG |
|---------|------|------|-------|---------|-----|
| Neutral 78/65 | 78 | 0.62 | 0.31 | 0.27 | 1.27 |
| Neutral 61 | 61 | 0.40 | 0.30 | 0.26 | 1.53 |
| Neutral 50 | 50 | 0.39 | 0.33 | 0.29 | 1.27 |
| Neutral 40 | 40 | 0.32 | 0.33 | 0.29 | 1.25 |
| AG 50 | 50 | 0.33 | 0.30 | 0.25 | 1.51 |
| AG 43 | 41 | 0.29 | 0.31 | 0.26 | 1.39 |

### 16C. Solar Series

| Product | VLT% | SHGC | U-Air | U-Argon | LSG |
|---------|------|------|-------|---------|-----|
| Silver 32 | 29 | 0.31 | 0.42 | 0.39 | 0.94 |
| Silver 20 | 18 | 0.21 | 0.40 | 0.36 | 0.85 |
| Neutral 70 | 68 | 0.53 | 0.33 | 0.29 | 1.27 |

### 16D. Tinted vs Low-E เปรียบเทียบ

| รายการ | Gray Tinted IGU | Low-E (SN 68) IGU |
|--------|----------------|-------------------|
| VLT | 42% | 68% |
| SHGC | 0.48 | 0.38 |
| Solar Reflected | 7% | 32% |
| Solar Transmitted | 38% | 33% |
| ข้อเสีย | อมร้อนแล้วคลาย (re-radiate) | สะท้อนร้อนออก |
| สรุป | แสงน้อย แต่ร้อนกว่า | แสงมาก แต่เย็นกว่า |

---

## 📌 SECTION 17 — Guardian Triple-Glazed IGU Data

### 17A. Triple IGU SuperNeutral (Argon)

| Product | VLT% | SHGC | U-Air | U-Argon | LSG |
|---------|------|------|-------|---------|-----|
| SNX 62/27 | 55 | 0.24 | 0.21 | 0.18 | 2.32 |
| SN 68 | 61 | 0.34 | 0.22 | 0.18 | 1.79 |
| SN 62 | 56 | 0.28 | 0.21 | 0.18 | 1.99 |

### 17B. Triple IGU with Dual Coating (Best U-Value)

| Product | VLT% | SHGC | U-Argon | LSG | หมายเหตุ |
|---------|------|------|---------|-----|----------|
| SNX 62/27 + SN68 | 47 | 0.23 | 0.12 | 2.03 | U=0.12 ใกล้ PassivHaus |
| SN 68 + SN68 | 52 | 0.32 | 0.12 | 1.64 | VLT สูง + U ต่ำมาก |
| SNR 43 + SN68 | 33 | 0.19 | 0.12 | 1.72 | กันร้อนสุดขีด |

**⚠️ Triple IGU U-Value 0.12 W/m²K ผ่าน PassivHaus (≤0.8) — แต่ SMG ยังไม่มี Triple IGU ใน DB**

---

## 📌 SECTION 18 — Laminated Glass Performance (Guardian, 6mm/PVB/6mm)

| Product | Substrate | VLT% | SHGC | U-Winter | LSG |
|---------|-----------|------|------|----------|-----|
| SN 68 | Clear/Clear | 67 | 0.40 | 0.94 | 1.68 |
| SN 68 | Green/Clear | 57 | 0.41 | 0.94 | 1.39 |
| SN 62 | Clear/Clear | 61 | 0.36 | 0.94 | 1.70 |
| Silver 32 | Clear/Clear | 31 | 0.38 | 0.94 | 0.82 |
| Silver 20 | Clear/Clear | 19 | 0.29 | 0.94 | 0.65 |

**หมายเหตุ:** Laminated U-Value สูงกว่า IGU มาก (0.85-0.94 vs 0.24-0.39) เพราะไม่มี Air Gap

---

## 📌 SECTION 19 — มาตรฐาน ASTM ที่เกี่ยวข้อง

| มาตรฐาน | เนื้อหา |
|---------|---------|
| ANSI Z 97.1 | Safety Performance — Glazing Materials |
| ASTM C 1036 | Flat Glass Specification |
| ASTM C 1048 | Heat-Strengthened & Tempered Glass Spec |
| ASTM C 1172 | Laminated Architectural Flat Glass |
| ASTM C 1376 | Pyrolytic & Vacuum Deposition Coatings |
| ASTM E 1300 | Load Resistance of Glass in Buildings |
| ASTM E 1886 | Impact Test (Hurricane Missile) |
| ASTM E 1996 | Hurricane Performance Spec |
| ASTM E 2188 | IG Unit Performance Test |
| ASTM E 2190 | IG Unit Performance Evaluation |
| CPSC 16CFR-1201 | Safety Standard for Architectural Glazing |

---

## 📌 SECTION 20 — Glossary คำศัพท์เทคนิค

| คำศัพท์ | ความหมาย | หน่วย |
|---------|----------|-------|
| VLT / Tvis | Visible Light Transmittance — แสงที่ผ่านกระจก | % |
| SHGC | Solar Heat Gain Coefficient — ความร้อนจากแดดที่ผ่านเข้า (ยิ่งต่ำยิ่งดี) | 0-1 |
| SC | Shading Coefficient — เทียบกับ 3mm Clear (SC ≈ SHGC/0.86) | 0-1 |
| U-Value | ค่าการนำความร้อน — ยิ่งต่ำยิ่งเป็นฉนวนดี | W/m²K |
| R-Value | ค่าต้านทานความร้อน = 1/U-Value | m²K/W |
| LSG | Light-to-Solar Gain = VLT/SHGC — ≥1.25 = Spectrally Selective (DOE) | ratio |
| STC | Sound Transmission Class — กันเสียงภายใน | dB |
| OITC | Outdoor-Indoor Transmission Class — กันเสียงภายนอก (รถ/เครื่องบิน) | dB |
| CRI | Color Rendering Index — ความสมจริงของสีผ่านกระจก (>90=ดีมาก) | 0-100 |
| Emissivity (ε) | ค่าการแผ่รังสีความร้อน — Low-E = ε ต่ำ = สะท้อนความร้อนกลับ | 0-1 |
| NiS | Nickel Sulfide — สิ่งเจือปนในเนื้อกระจก อาจทำให้ TP แตกเอง | — |
| Spandrel | กระจกปิดโครงสร้างระหว่างชั้น — ต้อง Heat-treat | — |
| Desiccant | สารดูดความชื้นใน Spacer ของ IGU | — |
| Warm-Edge Spacer | Spacer ที่ตัดสะพานความร้อน ลด U-Value edge | — |
| OTTV | Overall Thermal Transfer Value — ค่าถ่ายเทความร้อนรวมอาคาร (มอก. 2366) | W/m² |

---

## 📌 SECTION 21 — IGU Structure Knowledge

### 21A. โครงสร้าง IGU
- IGU = กระจก 2+ แผ่น ซีลรอบด้วย Spacer + Seal + Desiccant
- Config มาตรฐาน: **6mm - 12mm air space - 6mm** (รวม 24mm)
- Surface numbering: #1 (ด้านนอก) → #2 (cavity side) → #3 (cavity side) → #4 (ด้านใน)
- Low-E Coating มักวางที่ **Surface #2** เพื่อป้องกันร้อนจากแดด
- Cavity: Dry Air หรือ Argon (Argon ลด U-Value ดีกว่า ~15-20%)

### 21B. Common Configurations

| Configuration | Surfaces | หมายเหตุ |
|--------------|----------|----------|
| Monolithic (แผ่นเดี่ยว) | #1, #2 | ไม่มี cavity |
| Double IGU | #1, #2, #3, #4 | มาตรฐาน |
| Triple IGU | #1–#6 | U-Value ต่ำมาก |
| Laminated | #1, #2, #3, #4 | PVB ระหว่าง #2-#3 |
| IGU + LAM inboard | #1–#6 | กันเสียง+ร้อนดีสุด |
| IGU + LAM outboard | #1–#6 | กันพายุ+ร้อน |

### 21C. Thermal Breakage Knowledge
- สาเหตุ: อุณหภูมิต่างกันระหว่างกลางกระจก (ร้อน) กับขอบ (เย็น)
- ปัจจัยเสี่ยง: ชายคาบัง, เฟรมสัมผัสคอนกรีต, ม่าน/มู่ลี่ชิดกระจก
- กระจกเสี่ยงสูง: Tinted, Reflective, Spandrel
- แก้ไข: ใช้ HS หรือ TP / เปิดแอร์ในอาคาร

---

## 📌 SECTION 22 — IGU Air Spacer Limitation (จาก Order Manual Page 14)

### 22A. Anneal Glass — Max Area (sq.m) ตาม Air Spacer Size

| Thickness | Long Side Max (mm) | Short Side Max (mm) | A4 | A5 | A6 | A8 | A9 | A10 | A11 | A12 | A14 | A16 | A18 |
|-----------|-------------------|--------------------|----|----|----|----|----|-----|-----|-----|-----|-----|-----|
| FL.Tinted 3mm | 2205 | 1500 | 1.24 | 1.35 | 1.46 | 1.69 | 1.69 | 1.80 | 1.80 | 1.91 | 2.02 | 2.14 | 2.32 |
| other anneal 4mm | 2500 | 1800 | 1.78 | 1.94 | 1.94 | 2.27 | 2.27 | 2.43 | 2.59 | 2.59 | 2.75 | 2.91 | 3.08 |
| 5mm | 3650 | 2500 | 2.50 | 2.81 | 3.12 | 3.12 | 3.44 | 3.75 | 3.75 | 3.75 | 4.06 | 4.37 | - |
| 6mm | 3650 | 2500 | 3.12 | 3.12 | 3.44 | 3.75 | 3.75 | 3.75 | 4.06 | 4.37 | 4.37 | 4.69 | 5.00 |
| 8mm | 3650 | 2500 | 3.44 | 3.75 | 4.06 | 4.37 | 4.69 | 4.69 | 5.00 | 5.31 | 5.31 | 5.94 | 5.94 |
| 10mm | 3650 | 2500 | 4.06 | 4.37 | 4.69 | 5.00 | 5.31 | 5.62 | 5.94 | 6.56 | 6.56 | 6.56 | 7.44 |
| 12mm | 3650 | 2500 | 4.69 | 5.00 | 5.31 | 5.94 | 6.25 | 7.00 | 7.44 | 8.31 | 8.31 | 8.31 | 8.31 |
| 15mm | 3650 | 2500 | 5.62 | 6.25 | 7.00 | 7.44 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 |
| 19mm | 3650 | 2500 | 7.00 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 | 8.31 |

**Remark:** Long side max × Short side max = ถ้าเกิน limitation ต้องเปลี่ยนความหนากระจก | **Bold Letter** = standard stock of spacer at IGU

### 22B. Temper และ HS Glass — Max Area ตาม Air Spacer

| Thickness | Max Size (mm) | A6 | A8 | A9 | A10 | A11 | A12 |
|-----------|---------------|----|----|----|----|-----|-----|
| 4mm | 2150 × 2400 | 1.29 | 1.29 | 2.15 | 2.79 | 3.44 | 4.30 |
| 5mm | 2150 × 3150 | 1.29 | 2.04 | 2.60 | 3.55 | 4.19 | 5.05 |
| 6mm | 2400 × 3650 | — | — | — | 4.80 | 5.52 | 6.24 |
| 8mm | 2400 × 3650 | — | — | 4.80 | 5.52 | 6.24 | 7.20 |
| 10,12,15,19mm | 2400 × 3650 | — | — | — | — | — | 7.92 |

**Remark:** Over 10mm should use 12mm air spacer

### 22C. Air Spacer Code Reference

| Code | Air Gap (mm) | หมายเหตุ |
|------|-------------|----------|
| A4 | 4 | — |
| A5 | 5 | — |
| A6 | 6 | — |
| A8 | 8 | — |
| A9 | 9 | — |
| A10 | 10 | **Standard stock** |
| A11 | 11 | — |
| A12 | 12 | **Standard stock** |
| A14 | 14 | — |
| A16 | 16 | — |
| A18 | 18 | — |

---

## 📌 SECTION 23 — Article Framework & Content Calendar 2026

### 23A. บทความ 3 ประเภท (Type A / B / C)

**Type A — Technical Authority**
- **เป้าหมาย:** AI Search ดึงไปอ้างอิงบ่อยที่สุด · ตอบ B2B: สถาปนิก, ผู้รับเหมา
- **โครงสร้าง:** H1 (ชื่อ + Spec + Keyword) → Key Facts Block ตาราง → Q&A 3-5 ข้อ → Authoritative Reference → CTA
- **Schema:** Article + FAQPage

**Type B — Decision Guide**
- **เป้าหมาย:** ตรง Search Intent ทั้งคนและ AI · เปรียบเทียบ เลือกอย่างไร ราคาเท่าไหร่
- **โครงสร้าง:** H1 (A vs B + Context) → ตารางเปรียบเทียบ 5-7 หัวข้อ → เกณฑ์การเลือก → Price Guide → Recommendation Box
- **Schema:** Article + ItemList

**Type C — SMG Unique Insight**
- **เป้าหมาย:** Differentiation ที่คู่แข่งลอกไม่ได้ · ข้อมูลจากประสบการณ์จริง
- **โครงสร้าง:** H1 (SMG Case Study) → Context & Challenge → SMG Approach → Sourcing Intelligence → Key Takeaway
- **Schema:** Article + Organization

### 23B. Decision Filter — ก่อนเขียนทุกบทความ
ต้องผ่านทุกข้อ:
1. AI Search (Google AI Overview / Perplexity / SearchGPT) จะดึงไปอ้างอิงได้ไหม?
2. ข้อมูลนี้มีเฉพาะ SMG หรือ Unique มากพอไหม?
3. เพิ่ม Intelligence ให้ระบบ Knowledge ของ SMG ไหม?
4. ส่งต่อรุ่นถัดไปและลูกค้าได้เข้าใจง่ายขึ้นไหม?

### 23C. Content Calendar 2026 (12 บทความ)

| เดือน | Type | หัวข้อบทความ | หมวด |
|-------|------|-------------|------|
| ม.ค. 2569 | Type A | กระจก Low-E: ค่า U-Value, SHGC และ VLT คืออะไร? | พลังงาน |
| ก.พ. 2569 | Type B | กระจก Insulated vs กระจกชั้นเดียว: เลือกแบบไหนดีสำหรับอาคารในไทย? | พลังงาน |
| มี.ค. 2569 | Type C | SMG Sourcing: วิธีเลือก IGU ให้ตรง OTTV มอก. 2366 | สถาปนิก |
| เม.ย. 2569 | Type A | กระจกกันเสียง: STC, Rw และ OITC ต่างกันอย่างไร? | กันเสียง |
| พ.ค. 2569 | Type B | เปรียบเทียบกระจก 5 ประเภทสำหรับผนังกระจกอาคารสูง | สถาปนิก |
| มิ.ย. 2569 | Type C | Case Study: ติดตั้ง Laminated Glass ป้องกันพายุ — โครงการจริงของ SMG | นวัตกรรม |
| ก.ค. 2569 | Type A | มาตรฐาน EN 12150 vs มอก. 2127 กระจกเทมเปอร์คืออะไร? | ทั่วไป |
| ส.ค. 2569 | Type B | ราคากระจกฉนวนปี 2569: คู่มือเปรียบเทียบและงบประมาณ | พลังงาน |
| ก.ย. 2569 | Type C | ประสบการณ์จัดส่งกระจกโครงการ 10,000 ตร.ม. ภายใน 30 วัน | สถาปนิก |
| ต.ค. 2569 | Type A | กระจกกันกระสุน: มาตรฐาน EN 1063 ระดับ BR2-BR7 คืออะไร? | นวัตกรรม |
| พ.ย. 2569 | Type B | เลือกฟิล์มกระจกหรือ Low-E Glass? เปรียบเทียบ ROI 5 ปี | พลังงาน |
| ธ.ค. 2569 | Type C | SMG Glass Intelligence Report 2026: Trend กระจกสำหรับอาคารไทย | ทั่วไป |

### 23D. กลยุทธ์ Quarterly
- **Q1 (ม.ค.–มี.ค.):** เน้นหมวดพลังงาน — Search Volume สูงช่วงต้นปีที่มีโครงการใหม่
- **Q2 (เม.ย.–มิ.ย.):** ขยายไปสถาปนิกและนวัตกรรม — ตรง Bid Season
- **Q3 (ก.ค.–ก.ย.):** เสริมความรู้ทั่วไปและ Sourcing Intel — สร้าง Long-tail Traffic
- **Q4 (ต.ค.–ธ.ค.):** ปิดปีด้วย High-value Specialty + Annual Report

### 23E. KPI สิ้นปี 2569

| KPI | เป้าหมาย | วิธีวัด |
|-----|---------|--------|
| AI Search อ้างอิง SMG | 5+ ครั้ง/เดือน | Perplexity / SearchGPT Manual Check |
| Organic Traffic (B2B) | +50% จาก Baseline | Google Search Console |
| บทความ Published | 12 ชิ้น (1/เดือน) | CMS / Website |
| Schema Markup Coverage | 100% ของบทความใหม่ | Google Rich Results Test |

### 23F. Schema Markup Templates

**Article + FAQPage (Type A):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[ชื่อบทความ — ควรมี Keyword หลัก]",
  "description": "[สรุป 150–160 ตัวอักษร]",
  "author": {"@type": "Organization", "name": "SMG Glass And Metal"},
  "publisher": {"name": "SMG Glass And Metal Co., Ltd.", "url": "https://www.smg-con.co.th"},
  "articleSection": "Technical Guide",
  "speakable": {"@type": "SpeakableSpecification", "cssSelector": ["h2", ".key-facts"]}
}
```

**Organization Schema (Type C):**
```json
{
  "@type": "Organization",
  "name": "SMG Glass And Metal Co., Ltd.",
  "url": "https://www.smg-con.co.th",
  "telephone": "086-317-4966",
  "address": {"@type": "PostalAddress", "addressLocality": "Bangkok", "addressCountry": "TH"},
  "knowsAbout": ["Architectural Glass", "Insulated Glass", "Low-E Glass", "Tempered Glass", "Laminated Glass", "Acoustic Glass"]
}
```

---

## 📌 SECTION 24 — Catalog Normalization Rules (จาก Normalized_Master_v3)

| Normalization Rule | คำอธิบาย |
|-------------------|----------|
| 1 SKU = 1 configuration | ไม่รวมหลาย configuration ไว้ใน SKU เดียว |
| TYPE first | ให้รู้ทันทีว่าเป็น FLT / LAM / IGU |
| Structure explicit | LAM ใช้ 44.2 / 55.2 / 66.2, IGU ใช้ 6A12+6 เป็นต้น |

**RAW to SKU Mapping Examples:**

| Raw Text | Normalized SKU | เหตุผล |
|----------|----------------|--------|
| 6 mm Ocean Green A/N | FLT-6-OGR-AN | ประเภท=FLT, หนา 6mm, Ocean Green, Annealed |
| 6+PVB 0.38+6 Clear A/N | LAM-66.2-CLR-AN | Laminated 6+6 with PVB 0.38 |
| 6mm CS214 H/S #2 + PVB 0.38 + 6mm Clear H/S | LAM-66.2-CS214-HS | Coated lam with heat strengthened |

---

## 📌 SECTION 25 — NRC Helper (Noise Reduction Coefficient)

**Definition:** NRC = average of absorption coefficients at 250, 500, 1000, 2000 Hz

**Important Note:** สำหรับระบบกระจกเปิดช่องอาคาร ค่ากันเสียงหลักที่ใช้เลือกสินค้าคือ STL / STC / Ts มากกว่า NRC เพราะ NRC เป็นค่าอ้างอิงด้านดูดซับเสียง ไม่ใช่กันเสียง

---

*สร้างจาก: SMG_Glass_RAG_Ready_v4_1.xlsx + IGU_Performance_Calculator.xlsx + SMG_Glass_Normalized_Master_v3.xlsx + SMG_Article_Framework_Calendar_2026.docx + IGU_spec_AIR_GAP.pdf + u_value_IGU_SMG.pdf + Insulated_Glass.pdf + Guardian SunGuard Technical Catalog*
*เวอร์ชัน: Knowledge Base v3.0 | มีนาคม 2569*
*ไฟล์ที่ยังต้องเก็บไว้: **ไม่มี** — ข้อมูลทั้งหมดถูก merge ลงใน KB v3 นี้แล้ว*

---

## 📌 SECTION 26 — AGC PairTAG SL — ตารางประสิทธิภาพ (จาก IGU.jpg)

**Source:** AGC Flat Glass Thailand | PairTAG SL Product Spec
**Configuration:** SolarTAG (outer pane) + Clear glass (inner pane) | Thickness 24mm (6+Air12+6)

| Type | Thickness | LT (%) | LR Out (%) | LR In (%) | EN SF (%) | EN SHGC (%) | ISO SHGC | NFRC SHGC | EN SC | ISO SC | NFRC SC | EN U (W/m²K) | ISO U | NFRC U | U-Summer |
|------|-----------|--------|-----------|----------|-----------|------------|----------|-----------|-------|--------|---------|--------------|-------|--------|----------|
| PAIRTAG CS120 (6+A12+6) | 24 | 20 | 26 | 32 | 0.23 | 0.24 | 0.26 | 0.27 | 0.27 | 0.30 | — | 2.50 | 2.50 | 2.41 | — |
| PAIRTAG CS130 (6+A12+6) | 24 | 30 | 20 | 29 | 0.33 | 0.34 | 0.38 | 0.36 | 0.38 | 0.39 | 0.41 | 2.62 | 2.63 | 2.53 | — |
| PAIRTAG TBL135 (6+A12+6) | 24 | 34 | 19 | 29 | 0.32 | 0.33 | 0.35 | 0.37 | 0.38 | 0.40 | — | 2.68 | 2.69 | 2.58 | — |
| PAIRTAG CS214 (6+A12+6) | 24 | 12 | 23 | 36 | 0.16 | 0.16 | 0.19 | 0.18 | 0.19 | 0.22 | — | 2.41 | 2.42 | 2.32 | — |
| PAIRTAG CS220 (6+A12+6) | 24 | 16 | 19 | 33 | 0.19 | 0.19 | 0.22 | 0.22 | 0.22 | 0.25 | — | 2.49 | 2.50 | 2.40 | — |
| PAIRTAG CS514 (6+A12+6) | 24 | 9 | 17 | 37 | 0.15 | 0.15 | 0.18 | 0.17 | 0.18 | 0.21 | — | 2.39 | 2.39 | 2.30 | — |
| PAIRTAG CS520 (6+A12+6) | 24 | 11 | 16 | 31 | 0.16 | 0.17 | 0.20 | 0.19 | 0.19 | 0.23 | — | 2.47 | 2.47 | 2.38 | — |

**หมายเหตุ:** EN = European Standard | ISO = ISO Method | NFRC = North American Standard
**LT** = Light Transmittance | **LR** = Light Reflectance | **SF** = Solar Factor | **SC** = Shading Coefficient

---

## 📌 SECTION 27 — AGC PairTAG — Catalog Spec ฉบับไทย (จาก IGU_asahi.pdf / catalouge_IGU_AGC.pdf)

### 27A. คุณสมบัติหลัก (กระจกฉนวนความร้อน แพร์แทค)

- สามารถป้องกันการถ่ายเทความร้อนจากภายนอกก่อให้เกิดบรรยากาศสบาย
- ป้องกันเสียงรบกวนจากภายนอกก่อให้เกิดบรรยากาศเป็นส่วนตัว
- ลดภาระการทำงานของเครื่องปรับอากาศ ช่วยประหยัดค่าใช้จ่ายและพลังงาน
- ไม่ทำให้เกิดฝ้าหรือหยดน้ำบนกระจก แม้ว่าอุณหภูมิภายในกับภายนอกแตกต่างกันมาก

### 27B. การใช้งานที่แนะนำ

- อาคารสูงระฟ้า, อาคารสำนักงาน, อาคารพาณิชย์ทุกประเภท
- สถานที่ต้องการประหยัดค่าใช้จ่ายและพลังงาน
- สถานที่ต้องการตัดเสียงรบกวนจากภายนอก: ห้องบันทึกเสียง, ห้องประชุม
- ตู้แสดงสินค้า

### 27C. ผลิตภัณฑ์หลัก (ชนิด)

| ชนิด | กระจกแผ่นนอก | ช่องอากาศ | กระจกแผ่นใน | หนารวม (มม.) |
|------|-------------|----------|------------|-------------|
| PairTAG Clear | กระจกโฟลตใสหนา 6 | 6 | กระจกโฟลตใสหนา 6 | 18 |
| PairTAG Tempered | กระจกฮีทสตเร็งหนา 10 | 6 | กระจกโฟลตใสหนา 6 | 22 |
| PairTAG Solar SS214 | กระจกสะท้อนแสง SS214 หนา 6 | 12 | กระจกโฟลตใสหนา 4 | 22 |

**ขนาด:** เล็กสุด 350×180mm | ใหญ่สุด 3500×2500mm (clear), 3500×2438mm (SS214)

### 27D. PairTAG Argon (พิเศษ)
กระจกฉนวนความร้อนที่มีก๊าซอาร์กอนบรรจุอยู่ในช่องว่างระหว่างกระจก:
- ป้องกันความร้อนได้สูง — ตัวช่วยหน่วงความร้อนมีอัตราการแผร่ขยายต่ำ
- ก๊าซอาร์กอน: ไม่มีสี ไม่มีกลิ่น ไม่เป็นสารพิษ ปลอดภัย ไม่ก่อให้เกิดผลเสียต่อสุขภาพและสิ่งแวดล้อม

### 27E. ขั้นตอนการผลิต (Production Flow — ใบสั่งผลิตงานอาคาร FM-MK-02)

จาก `56464665.jpg` — ใบสั่งผลิตงานอาคาร กระจกอินซูเลต จาก Pornjaroen Safety Glass:
- ระบบแผ่นตรง หรือแผ่นโค้ง
- F = เจียรเหลี่ยมขัดมัน / L = ลบคม (หน่วย mm)
- ตัดยอย → ตัดโค้ง → สกรีน → ประกอบ
- QC → คลังสำเร็จรูป
- อัดอาร์กอน: ระบุในใบสั่ง

---

## 📌 SECTION 28 — Supplier Reference: Pornjaroen Safety Glass Co., Ltd.

**ชื่อ:** บริษัท พรเจริญ เซฟตี้ กลาส จำกัด (Pornjaroen Safety Glass Co., Ltd.)
**ที่อยู่:** 147 ม.8 ถ.โคกสูง–หนองเปิด ต.หนองปลาหมอ อ.บ้านโป่ง จ.ราชบุรี 70110
**โทรศัพท์:** 086-4207283, 086-8935005, 086-4206542
**โทรสาร:** 032-372631
**Email:** PSG-GLASS@hotmail.com
**LINE:** ID: pssgrop
**Certifications:** Tempered (มอก.), Laminated (มอก.), UKAS

### 28A. ตัวอย่างราคา Triple IGU (จาก TMP4.jpg — ใบเสนอราคา QT6211V/015 วันที่ 04/11/62)

| รายการ | Spec | ขนาด | จำนวน | ราคา/แผ่น | รวม |
|--------|------|------|-------|----------|-----|
| Low-e ใส 6 + AIR14 + ใส 5 + AIR14 + ใส 5mm | Triple IGU | 450×450mm | 1 แผ่น | 684.00 บาท | 684.00 บาท |
| **รวม VAT 7%** | | | | | **731.88 บาท** |

**Note จากใบเสนอราคา:**
- ราคา Triple IGU ขนาด 450×450mm = 420 บาท/ตร.ฟ. (ลด 20%) = **336 บาท/ตร.ฟ.**
- ยืนราคา 7 วัน | เงื่อนไข 30 วันหลังส่งมอบ

---

## 📌 SECTION 29 — Viracon Acoustic Data Tables (ฉบับสมบูรณ์)

**Source:** data_IGU.pdf — Viracon Acoustical Glass Performance Data Tables
**Test Standard:** ASTM E413-87 | Size: ~36"×84" | *OITC estimated

### 29A. Double Insulating Glass Acoustic Data (ตารางสมบูรณ์)

| Configuration (inches) | Config (mm approx) | STC | OITC |
|----------------------|-------------------|-----|------|
| 1/8" + 3/8"as + 1/8" | 3+10+3 = 16mm | 31 | 26 |
| 1/4" + 1/2"as + 1/4" | 6+12+6 = 24mm | 35 | 30 |
| 1/4" + 1/2" Argon + 1/4" | 6+12Ar+6 = 24mm | 35 | 29 |
| 1/4" + 9/16"as + 3/16" | 6+14+5 = 25mm | 37 | 30 |
| 5/16" + 1/2"as + 5/16" | 8+12+8 = 28mm | 37 | 32 |
| 3/8" + 1/2"as + 3/8" | 10+12+10 = 32mm | 37 | 32 |
| 1/4" + 1" as + 1/4" | 6+25+6 = 37mm | 37 | 30 |
| 1/4" + 1/2"as + 5/16" | 6+12+8 = 26mm | 38 | 33 |
| 1/4" + 3/4"as + 1/4" | 6+19+6 = 31mm | 38 | 31 |
| 1/4" + 1/2"as + 3/8" | 6+12+10 = 28mm | 39 | 34 |
| 5/16" + 1/2"as + 3/8" | 8+12+10 = 30mm | 39 | 34 |
| 1/4" + 3/4"as + 3/8" | 6+19+10 = 35mm | 40 | 33 |

### 29B. Monolithic Glass Acoustic Data

| Configuration | STC | OITC |
|--------------|-----|------|
| 1/8" (3mm) single | 30 | 25 |
| 1/4" (6mm) single | 31 | 29 |
| 3/8" (10mm) single | 34 | 32 |
| 1/2" (12mm) single | 36 | 33 |

### 29C. Laminated Glass Acoustic Data

| Configuration (inches) | Config (mm) | STC | OITC |
|----------------------|------------|-----|------|
| 1/8"+.030"PVB+1/8" | 3+1+3 = 7mm | 35 | 31 |
| 3/16"+.030"PVB+3/16" | 5+1+5 = 11mm | 36 | 33 |
| 1/4"+.030"PVB+1/4" | 6+1+6 = 13mm | 38 | 34 |
| 1/4"+.045"PVB+1/4" | 6+1.1+6 | 38 | 34 |
| 1/4"+.060"PVB+1/4" | 6+1.5+6 | 39 | 34 |
| 1/4"+Acoustic PVB+1/4" | 6+2+6 | 36-37 | 34-35 |

### 29D. Insulating + Laminated Inboard Data (IGU+LAM)

| Configuration | Total (mm) | STC | OITC |
|--------------|-----------|-----|------|
| 1/4"+1/2"as+1/8"PVB1/8" | 6+12+3+1+3 = ~25 | 39 | 31 |
| 1/4"+1/2"as+1/4"PVB1/4" | 6+12+6+1+6 = 31 | 40 | 30 |
| 1/4"+1/2"as+3/16"PVB3/16" | 6+12+5+1+5 = 29 | 41 | 35 |
| 1/4"+1/2"as+1/4".060PVB1/4" | 6+12+6+1.5+6 = 31.5 | 42 | 35 |
| 1/4"+3/4"as+3/16".060PVB3/16" | 6+19+5+1.5+5 = 36.5 | 42 | 35 |
| 1/4"+3/4"as+1/4".060PVB1/4" | 6+19+6+1.5+6 = 38.5 | 44 | 36 |
| 3/8"+3/4"as+1/4".060PVB1/4" | 10+19+6+1.5+6 = 42.5 | 43 | 37 |
| 3/8"+1"as+1/4".060PVB1/4" | 10+25+6+1.5+6 = 48.5 | 46 | 36 |

### 29E. Double Laminated Insulating Data (LAM+IGU+LAM = สูงสุด)

| Configuration | Total (mm) | STC | OITC |
|--------------|-----------|-----|------|
| LAM6+1/2"as+LAM3+3 | ~35mm | 41 | 35 |
| LAM3+LAM3+1/2"as+LAM3+LAM3 | ~25mm | 42 | 33 |
| LAM6+LAM6+1/2"as+LAM4+LAM4 | ~33mm | 43 | 36 |
| LAM6+1/2"as+LAM3+LAM5 | ~33mm | 44 | 37 |
| LAM10+3/4"as+LAM5+LAM5 | ~43mm | 45 | 38 |

### 29F. Double Glazed (Field-Glazed) — ช่องอากาศกว้างมาก

| Configuration | Total | STC | OITC |
|--------------|-------|-----|------|
| LAM6+1"as+3/16" | ~35mm | 42 | 33 |
| LAM6+2"as+3/16" | ~62mm | 45 | 35 |
| LAM6+1"as+LAM6 | ~38mm | 46 | 35 |
| LAM6+2"as+3/16" | ~62mm | 46 | 39 |
| LAM6+4"as+3/16" | ~112mm | 48 | 39 |
| LAM6+4"as+LAM6 | ~120mm | 49 | 41-44 |

**⚠️ Insight:** Double Glazed ช่องอากาศ 4" (100mm) ให้ STC สูงถึง 48–51 แต่ใช้เฉพาะงานพิเศษ (field-glazed)

---

## 📌 SECTION 30 — AGC Laminated + Sunergy — MK1810 Performance Data

**Source:** MK1810_33_TN_nttp_pf.pdf + MK1810_34_TN_nttp_pf.pdf
**จาก:** AGC Flat Glass (Thailand) | วันที่: 16-ต.ค.-18
**มาตรฐาน:** คำนวณด้วย AGC New GSDB Software

### 30A. MK1810/33 — Laminated Sunergy + PVB 1.14mm

| Item | Combination | VLT (%) | Refl Out | Refl In | SF (%) | U-Value | SC | SHGC |
|------|-------------|---------|----------|---------|--------|---------|-----|------|
| 1 | Sunergy Clear 6mm H/S#2 + 1.14 PVB + Clear 6mm A/N | 68 | 7 | 8 | 45 | 5.4 | 0.66 | 0.57 |
| 2 | Sunergy Clear 6mm H/S#2 + 1.14 PVB + Sunergy Clear 6mm A/N#4 | 53 | 8 | 10 | 34 | 3.9 | 0.51 | 0.44 |

**ความแตกต่าง:**
- Single Sunergy LAM (กระจกใส inboard): SHGC=0.57 / U=5.4
- Double Sunergy LAM (Sunergy ทั้ง 2 แผ่น): SHGC=0.44 / U=3.9 → **กันร้อนดีขึ้น 23%**

### 30B. MK1810/34 — Laminated Sunergy + PVB 1.52mm

| Item | Combination | VLT (%) | Refl Out | Refl In | SF (%) | U-Value | SC | SHGC |
|------|-------------|---------|----------|---------|--------|---------|-----|------|
| 1 | Sunergy Clear 6mm H/S#2 + 1.52 PVB + Clear 6mm H/S | 68 | 7 | 8 | 44 | 5.3 | 0.65 | 0.56 |
| 2 | Sunergy Clear 6mm H/S#2 + 1.52 PVB + Sunergy Clear 6mm H/S#4 | 53 | 8 | 10 | 33 | 3.9 | 0.50 | 0.44 |

**ความแตกต่าง PVB:**
- PVB 1.14mm vs 1.52mm: SHGC แทบไม่ต่างกัน (0.57 vs 0.56)
- แต่ PVB หนากว่า = **กันเสียงดีกว่าและความปลอดภัยสูงกว่า**

### 30C. Key Insights จาก MK1810 Data
- **Double Sunergy LAM** (ทั้งใน+นอก): ลดทั้ง VLT (68→53%) และ SHGC (0.57→0.44) พร้อมกัน
- **Heat-Strengthened (#2 surface)** = Sunergy อยู่ที่ผิวด้านในของแผ่นนอก (protected surface)
- **U=3.9** บน LAM แบบ Single-Pane แสดงว่า Double Sunergy มีประสิทธิภาพกลางระหว่าง FLT และ IGU
- Disclaimer AGC: ค่าทั้งหมดเป็นการคำนวณ มีค่าความเผื่อ (tolerance) อาจแตกต่างจากการวัดจริง

---

## 📌 SECTION 31 — Guardian Coated Glass: Min/Max Sizes

**Source:** gi_001675.pdf — Guardian SunGuard Technical Information

### 31A. Coated Glass Size Limits (ขนาดกระจกเคลือบ)

| Coating Type | Min Width (in) | Min Length (in) | Max Area (sq ft) | หมายเหตุ |
|-------------|---------------|----------------|-----------------|----------|
| Standard Low-E | 14" | 20" | 70 | สำหรับ SN/SNX series |
| Solar Reflective | 14" | 20" | 70 | สำหรับ Solar series |
| Tempered Coated | 18" | 18" | See heat-treat table | ต้องตรวจสอบแยก |

**Max Glass Size (Annealed):** 130" × 84" (3302mm × 2134mm) = ~76 sq ft
**Max Glass Size (Tempered/HS):** Contact Guardian for specific sizes

### 31B. Thermal Breakage Risk Factors (สรุปจาก Guardian Guide)

| ปัจจัยเสี่ยง | รายละเอียด | แก้ไขด้วย |
|------------|----------|---------|
| เงาชายคา/อาคาร | กระจกร้อนตรงกลาง เย็นที่ขอบ | HS หรือ TP |
| เฟรมสัมผัส คอนกรีต | ขอบกระจกเย็นเร็วกว่า | Thermal break frame |
| เฟรมครอบขอบมาก | ลด Exposed area ทำให้ขอบเย็น | ลด frame cover |
| กระจกสีเข้ม (Tinted) | ดูดความร้อนสูง → stress มาก | HS หรือ TP บังคับ |
| ม่าน/มู่ลี่ชิดกระจก | กักความร้อนระหว่างกระจก+ม่าน | เว้นช่องระบายอากาศ |
| Spandrel | รับ thermal load สูง | ต้อง Heat-treat เสมอ |
| อาคารไม่เปิดแอร์ช่วงก่อสร้าง | ความเสี่ยงสูงขึ้น 2-3 เท่า | เปิดแอร์หรือระบายอากาศ |

**กราฟ Guardian:** เมื่ออุณหภูมิภายในอาคาร >40°F (4°C) ความเสี่ยง Thermal Breakage ลดลงอย่างชัดเจนสำหรับกระจกทุกชนิด

### 31C. Wind Load & Glass Thickness

| ปัจจัย | ข้อพิจารณา |
|--------|-----------|
| การเลือกความหนา | ขึ้นกับ Design Wind Load + Probability of breakage |
| มาตรฐาน | ASTM E 1300 — Load Resistance of Glass in Buildings |
| Design Factor | ต้องระบุ: Wind Load (psf), Duration, Target Breakage Rate (x per 1,000 lites) |
| ผู้รับผิดชอบ | Design Professional (ไม่ใช่ผู้ผลิตกระจก) |

### 31D. Glazing Guidelines (สรุปจาก Guardian)

**Conventional Glazing:**
- Framing ต้องรับน้ำหนักกระจกโดยไม่โก่ง/บิด
- Deflection ≤ 1/175 of span (max ¾") | >15'-6" → L/240 + ¼"
- ต้องใช้ Setting blocks, Face gaskets, Wedges ตาม ASTM C 864 / D 395
- ต้องมี Weep holes ระบายน้ำ

**Silicone Structural Glazing:**
- Backup mullions สำหรับกระจกหนา ≤ 1/4" และ IGU ทุกชนิด
- High light-transmitting coating อาจเห็น Edge read-through
- IGU ใน Structural glazing ต้องใช้ Silicone sealant เท่านั้น

---

## 📌 SECTION 32 — Guardian Glossary (คำศัพท์เพิ่มเติม)

| คำศัพท์ | ความหมายฉบับเต็ม |
|---------|-----------------|
| CRI (Color Rendering Index) | ความสามารถของแสงที่ผ่านกระจกในการแสดงสีได้ถูกต้อง CRI >90=ดีมาก, 80-90=ดี |
| Heat Gain | ความร้อนที่เพิ่มขึ้นในอาคาร ทั้งจาก Radiation, Convection, Conduction |
| Hybrid Low-E/Reflective | รวมคุณสมบัติ Low-E + Reflective เช่น SNR 43, AG 43, AG 50 |
| Infrared (Long-wave) | รังสีความร้อนจากแหล่งให้ความร้อน เช่น เครื่องทำความร้อน |
| LSG (Light-to-Solar Gain) | VLT/SHGC ≥1.25 = Spectrally Selective (DOE standard) |
| RHG (Relative Heat Gain) | ค่าความร้อนรวมที่เข้าอาคาร = [(89.6-75.2)×U-Summer + 200×SC] Btu/hr.ft² |
| SC (Shading Coefficient) | สัดส่วน solar heat gain เทียบกับ 3mm clear glass (SC=1.0) → เก่ากว่า SHGC |
| Spectrally Selective Glazing | กระจกที่ให้แสงผ่านมาก แต่กันความร้อนได้ดี (LSG ≥1.25 ตาม DOE) |
| Solar Energy Wavelength | 300–4000nm: UV(300-380), Visible(380-780), Near-IR(780-4000) |
| SHGC | Solar Energy ทั้งที่ผ่านโดยตรง + ที่ดูดแล้วคายเข้าอาคาร |
| SC to SHGC Conversion | SHGC = SC × 0.86 (approximate) |
| U-Value to R-Value | R = 1/U |

---

## 📌 SECTION 33 — InsulatedGlass.pdf — U.S. IGU Size Guidelines & Process

**Source:** InsulatedGlass.pdf — Standard U.S. IGU Manufacturer Specification

### 33A. US IGU Size Limitations (Warranty)

| Glass Thickness | Air Spacer | Max sq ft |
|----------------|-----------|---------|
| 1/8" (3mm) DSB | 3/16" | 9 |
| 1/8" (3mm) DSB | 1/4" | 14 |
| 1/8" (3mm) DSB | 3/8" & up | 18 |
| 3/16" (5mm) | 1/4" | 25 |
| 3/16" (5mm) | 3/8" & up | 30 |
| 1/4" (6mm) | 1/4" | 30 |
| 1/4" (6mm) | 3/8" | 35 |
| 1/4" (6mm) | 1/2" | 50 |
| 1/4" (6mm) | 5/8" | 60 |
| 1/4" (6mm) | 3/4" | 65 |

**หมายเหตุ:**
- Max size: 137" × 87" (3480mm × 2210mm)
- Min size: Annealed 6"×6" (152×152mm) | Tempered 12"×12" (305×305mm)
- Overall thickness: 7/16" to 1-1/2"
- Units >50 sq ft (4.65 m²) ต้อง Tempered
- Warranty: Standard Seal (Polysulfide) = 5 ปี | Silicone Seal = 10 ปี
- Certified by: IGCC (Insulated Glass Certification Council)

### 33B. IGU Components (วัสดุประกอบ)

| ส่วนประกอบ | วัสดุ | หน้าที่ |
|-----------|------|---------|
| Air Spacer | Aluminum, 3/16"–3/4" | แยกระยะห่างระหว่างกระจก |
| Desiccant | Molecular Sieve | ดูดซับความชื้นที่เหลือในช่อง |
| Primary Seal | PIB (Polyisobutylene/Butyl) | ป้องกันความชื้น, UV resistant |
| Secondary Seal | Polysulfide (5yr) หรือ Silicone (10yr) | ยึดโครงสร้าง, ป้องกันความชื้นชั้น 2 |

### 33C. กระจกที่ใช้ทำ IGU ได้ (ข้อมูลจาก InsulatedGlass.pdf)
- Clear Glass
- Low-E Glass
- Reflective Glass
- Tempered Glass
- Heat-Strengthened Glass
- Laminated Glass
- Pattern Glass
- Tinted Glass

---

## 📌 SECTION 34 — Low-E Glass: หลักการทำงาน (จาก Pornjaroen Catalog)

**Source:** แค_ตตาล_อคบร_ษ_ท21.jpg + แค_ตตาล_อคบร_ษ_ท22.jpg (Pornjaroen Group Catalog)

### 34A. How Low-E Works (หลักการทางฟิสิกส์)

**ฤดูร้อน (Summer):**
- ภายนอกร้อน (Very Warm) → U-Factor ทำงาน
- แสงอาทิตย์ → SHGC ทำงาน
- Low-E สะท้อนความร้อน ไม่ให้เข้าภายใน → ภายในอบอุ่นน้อยกว่า

**ฤดูหนาว (Winter):**
- ภายในร้อนกว่าด้านนอก
- Low-E สะท้อนความร้อนจากภายใน ไม่ให้ออกไปนอก → ประหยัดพลังงานทำความร้อน

### 34B. คุณสมบัติของกระจก Low-E (ฉบับลูกค้า)

- ประหยัดพลังงานได้มากและมีกระบวนการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม
- สะท้อนแสงและคลื่นความร้อนได้ดี ขณะที่กระจกยังคงความใสอยู่
- ไม่เกิดฝ้าหรือละอองน้ำที่ผิวกระจก
- แสงส่องผ่านได้
- ทนต่อการสึกกร่อนและรอยขีดข่วน

### 34C. กระจกแม่รังสีต่ำ Low-E Glass (คำอธิบายทางเทคนิค)

Low-E Glass = กระจกเคลือบผิวด้วยโลหะบริสุทธิ์ภายใต้สุญญากาศ หรือที่เรียกว่า **Sputtering** ทำให้มีแม่รังสีความร้อนต่ำกว่ากระจกธรรมดา ช่วยลดความร้อนและมีแสงส่องผ่านได้ดีกว่ากระจกสะท้อน

**Low-E Coated** = รูปแบบใหม่ของกระจกประหยัดพลังงาน เนื่องจากมีความทนทาน สามารถถลอดการถ่ายเทความร้อน ยอมให้แสงผ่านเข้าบ้าง กระจกชนิด **Low-E Coated** นี้ผลิตโดยการเคลือบโลหะที่ผิวกระจกโฟลตให้เป็นเนื้อเดียวกับกระจก โดยการอบกระจกด้วยความร้อน เมื่อกระจกเริ่มอ่อนตัว จะโรยผงโลหะลงบนนิวยัลของกระจกที่อ่อนตัว เพื่อให้เป็นเนื้อเดียวกับผิวกระจก

**⚠️ หมายเหตุสำคัญ:** Low-E Soft Coat (Sputter) ต้องทำเป็น IGU เสมอ ห้ามใช้แผ่นเดี่ยวเปิดรับอากาศ

---

## 📌 SECTION 35 — Brochure Expert Series: IGU History & Evolution

**Source:** brochure_expert_series_EN_doc3_igu_2020.pdf

### 35A. ประวัติ IGU

| ปี | เหตุการณ์ |
|----|---------|
| 1865 | Thomas D. Stetson จดสิทธิบัตร "insulation pane" — กระจก 2 แผ่นซีลขอบด้วยน้ำมันดิน |
| 1930s | LOF พัฒนา IGU เชิงพาณิชย์รุ่นแรก |
| 1941 | สิทธิบัตร "Thermopane" — IGU เชิงพาณิชย์ที่ใช้งานได้จริง |
| 1970s | วิกฤตน้ำมัน → IGU แพร่หลายมากขึ้น + เริ่มพัฒนา Low-E Coatings |
| ปัจจุบัน | Low-E ปรับปรุงประสิทธิภาพ IGU เพิ่มขึ้นเกือบเท่าตัว |

### 35B. หลักการ IGU (ฉบับเต็ม)

- IGU = กระจก 2+ แผ่น ซีลรอบด้วย Hermetic Seal, ช่องอากาศหรือก๊าซเฉื่อย
- ลด Air-to-Air Heat Transfer ผ่าน Building Envelope ได้ดีกว่า Single Pane มาก
- U-Value ของ 1" IGU with Argon + Low-E = **0.25 Btu/h·ft²·°F** (SI: ~1.42 W/m²K)
- เทียบกับ Single 6mm glass = **1.0 Btu/h·ft²·°F** (SI: ~5.68 W/m²K)
- → IGU + Low-E กันร้อนดีกว่า Single Pane **4 เท่า**

### 35C. Surface Numbering (อ้างอิงมาตรฐาน)

| Surface | ตำแหน่ง | ใช้ทำอะไร |
|---------|---------|---------|
| #1 | ด้านนอกสุด (Outboard) | ไม่วาง Low-E (โดนอากาศ/UV) |
| #2 | ด้านในของแผ่นนอก (Cavity side) | **ตำแหน่งมาตรฐาน Low-E** |
| #3 | ด้านนอกของแผ่นใน (Cavity side) | บางครั้งใช้ Double Low-E |
| #4 | ด้านในสุด (Inboard) | ไม่วาง Low-E (โดนอากาศภายใน) |

**กฎ:** Low-E ต้องอยู่ใน Cavity เสมอ ห้ามโดนอากาศโดยตรง (เฉพาะ Soft Coat/Sputter)

---

*Knowledge Base v3.0 — Updated: เพิ่ม Section 26–35 จาก IGU.jpg, TMP4.jpg, 56464665.jpg, แค_ตตาล_อค*.jpg, IGU_asahi.pdf, catalouge_IGU_AGC.pdf, data_IGU.pdf, gi_001675.pdf, InsulatedGlass.pdf, brochure_expert_series_EN.pdf, MK1810_33/34.pdf*

---

## 📌 SECTION 36 — AGC Lamitag — Catalog Spec ฉบับไทย (จาก LAMINATED.pdf / Laminated_Glass.pdf)

**Source:** AGC Flat Glass Thailand — Architectural Glass Catalogue Page 30

### 36A. กระจกนิรภัยลามิเนต ลามิแทค (Lamitag)

**นิยาม:** กระจกที่ผลิตโดยการนำกระจก 2 แผ่นขึ้นไปมาปิดด้วยฟิล์ม **PVB (Poly Vinyl Butyral)** ที่มีความเหนียวทนทานคั่นอยู่ระหว่างกลาง ทำหน้าที่ยึดเกาะให้กระจกติดกัน — ในขณะเดียวกันกับแผ่นฟิล์มดังกล่าวสามารถป้องกันรังสีอัลตราไวโอเลตได้กว่า **99%**

**สมบัติเมื่อกระจกแตก:** ฟิล์มจะยึดเศษกระจกไว้ไม่ให้หลุดร่วง — จะมีเพียงรอยแตก หรืออรสาวคล้ายใยแมงมุมเท่านั้น และที่สำคัญคือวัตถุที่วิ่งมาชนกระจกแตกจะ**ไม่สามารถทะลุผ่านกระจกได้** (ขึ้นอยู่กับจำนวนชั้นฟิล์มและวัตถุที่มาชน)

### 36B. คุณสมบัติหลัก

- **ความปลอดภัยสูง** — เมื่อกระจกเกิดการแตก แผ่นฟิล์มจะเป็นตัวยึดเกาะกระจก ไม่หลุดร่วงมาทำอันตราย
- **ป้องกันรังสี UV >99%** — ลดปริมาณรังสีสีอัลตราไวโอเลตที่ส่องผ่านกระจกไปยังวัตถุที่อยู่ภายใน เช่น เฟอร์นิเจอร์ ม่าน ฯลฯ ทำให้ไม่ซีดจาง
- **ป้องกันเสียงรบกวนจากภายนอก** — ก่อให้เกิดบรรยากาศที่เป็นส่วนตัวของผู้อยู่อาศัย

### 36C. ข้อควรระวังและคำเตือน

- ควรติดตั้งตามจำนวนการติดตั้งกระจกลามิเนต
- **ไม่ควรทำให้ขอบกระจกลามิเนตเกิดรอยขีดกรีด** — โดยเฉพาะเมื่อติดตั้งกระจกไว้ภายนอก เพราะขอบอาจได้รับความชื้นซึ่งเป็นตัวทำให้ชั้นฟิล์มเป็นสาเหตุให้ฟิล์มแยกตัวออกจากกระจก
- กระจกลามิเนตจะเกิดฟองอากาศ เมื่อกระจกถูกกดสัมผัสฟิล์มโดยตรง อยู่ตลอดเวลา หรืออุณหภูมิกระจกได้รับความร้อนสูงกว่าปกติทั่วไป เพราะฟิล์มจะมีการเปลี่ยนแปลงคุณสมบัติทางกายภาพ
- **ระวังอย่าให้ขอบกระจกถูกสารละลาย** เพราะจะทำให้ชั้นฟิล์มเสียหาย
- ควรทำการวัดขนาดกระจกลามิเนตให้พอดีก่อนการติดตั้ง **เพราะกระจกลามิเนตไม่แนะนำให้นำมาตัดในภายหลัง**

### 36D. ผลิตภัณฑ์ (3 ชนิด)

| ชนิด | ส่วนประกอบ |
|------|-----------|
| กระจกนิรภัยลามิเนต ลามิแทค (ใส) | กระจกโฟลตใส + ฟิล์ม + กระจกโฟลตใส |
| กระจกนิรภัยลามิเนต ลามิแทค (เทมเปอร์) | กระจกนิรภัยเทมเปอร์ + ฟิล์ม + กระจกนิรภัยเทมเปอร์ |
| กระจกนิรภัยลามิเนต ลามิแทค (สะท้อนแสง) | กระจกสะท้อนแสง + ฟิล์ม + กระจกโฟลตใส |

### 36E. ข้อมูลขนาดผลิตภัณฑ์

| ชนิด | ความหนา (mm) | ขนาดเล็กสุด (mm) | ขนาดใหญ่สุด (mm) |
|------|-------------|-----------------|-----------------|
| กระจกนิรภัยลามิเนต ลามิแทค | 6–80 | 400 × 190 | 2000×3900 / 2400×3800 / 2438×3500 |

### 36F. การใช้งานที่แนะนำ

- ใช้เป็นหลังคากระจกที่ต้องการให้แสงสว่างเข้าสู่อาคาร
- ผนังของอาคารสูง หรือช่องหน้าต่างอาคารสูง ที่ต้องการความปลอดภัยจากเศษกระจกหลุดร่วงลงมาเมื่อกระจกแตก
- บริเวณทางเข้า–ออกอาคาร, หน้าร้านค้า, ตู้ปลาขนาดใหญ่, กระจกสำหรับราวกันตก

### 36G. วิธีการติดตั้ง (ข้อสำคัญ)

- **วัสดุยาแนว:** ใช้ Silicone sealant หรือ Polysulfide คุณภาพสูง — ห้ามใช้วัสดุแนวที่มีส่วนประกอบของสารละลาย หรือ Oil-based putty
- **แนวกรอบกระจก:** ต้องมีรองระบายน้ำอย่างต่ำที่เส้นผ่านศูนย์กลาง 5 มิลิเมตร และอย่างน้อย 3 จุดเพื่อการระบายน้ำที่ดี
- **วัสดุรองรับ:** ใช้ Polyethylene foam หรือ Chloroprene rubbers
- **วัสดุดูดรองกระจก:** ใช้ PVC resin คุณภาพสูง (สำหรับกระจกหนา 6mm หรือบางกว่า) — ใช้ยางแข็ง Chloroprene rubbers หรือ EPDM ที่ความแข็งอย่างน้อย 90 Shore A และควรแยกเป็น 2 จุดเพื่อให้สามารถรองรับน้ำหนักกระจกได้เท่ากัน
- **⚠️ ห้ามใช้ U-shape gasket** ในการติดตั้งกระจก เพราะหากมีน้ำซึมเข้าสู่ด้านในกระจกแล้วยากต่อการระบายออก เนื่องจากยางรองซึ่งปิดกั้นขอบกระจก จะทำให้กระจกเกิดความชื้น และทำให้เกิดความเสียหายต่อชั้นฟิล์มได้

---

## 📌 SECTION 37 — มาตรฐาน มอก. 1222-2560 กระจกนิรภัยหลายชั้น (Laminated Safety Glass)

**Source:** TIS12222560m_ลาม_เนต.pdf
**ประกาศในราชกิจจานุเบกษา:** เล่ม 134 ตอนพิเศษ 295 ง วันที่ 29 พฤศจิกายน 2560

### 37A. ขอบข่ายและนิยาม

**กระจกนิรภัยหลายชั้น (Laminated Safety Glass):** กระจกที่ประกอบด้วยกระจกตั้งแต่ 2 ชั้นขึ้นไป ประกบกันโดยมีวัสดุคั่นกลางระหว่างชั้น และยึดกระจกแต่ละชั้นให้ติดแน่นเป็นแผ่นเดียวกัน เมื่อกระจกแตกร้าวหรือราน วัสดุคั่นกลางดังกล่าวนี้จะยึดเศษหรือชิ้นกระจกไม่ให้หลุดออกมา

**มาตรฐานอ้างอิง:** ISO 12543-1 ถึง 6:2011, ISO 29584:2012, JIS R 3205-2005

**อนุกรมมาตรฐานกระจกไทย:**
- มอก. 54-2558 — กระจกแผ่น
- มอก. 880-2547 — กระจกโฟลตใส
- มอก. 965-2560 — กระจกเทมเปอร์
- **มอก. 1222-2560 — กระจกนิรภัยหลายชั้น (ฉบับนี้)**
- มอก. 1231-2558 — กระจกฉนวน
- มอก. 1344-2541 — กระจกโฟลตสีตัดแสง
- มอก. 1345-2558 — กระจกแผ่นสีตัดแสง
- มอก. 2736-2559 — กระจกเปล่งรังสีความร้อนต่ำ (Low-E)
- มอก. 2737-2559 — กระจกอบแข็งด้วยความร้อน (Heat-Strengthened)

### 37B. ประเภทและสัญลักษณ์

| ประเภท/ชนิด | สัญลักษณ์ | ลักษณะ |
|------------|----------|--------|
| แผ่นเรียบ ชนิด I | **L I** | ทนแรงกระแทก (Impact Resistance) |
| แผ่นเรียบ ชนิด II | **L II** | ทนแรงกระแทก + ทนแรงกระแทกทะลุ (Penetration Resistance) |
| แผ่นโค้ง | **cL I** | กระจกโค้ง ทนแรงกระแทก |

### 37C. ขนาดและเกณฑ์ความคลาดเคลื่อน

**ตาราง 1 — เกณฑ์ความคลาดเคลื่อนความกว้างและความยาว (หน่วย mm)**

| ความหนา | ≤1,200mm | >1,200–2,400mm | >2,400mm |
|---------|----------|---------------|---------|
| 4 ถึง <6mm | +2.0 / -1.0 | +2.0 / -1.0 | +5.0 / -3.0 |
| 6 ถึง <11mm | +3.0 / -1.0 | +3.0 / -1.0 | +6.0 / -3.0 |
| 11 ถึง <17mm | +3.0 / -2.0 | +3.0 / -2.0 | +6.0 / -3.0 |
| 17 ถึง 24mm | +4.0 / -3.0 | +5.0 / -3.0 | +7.0 / -4.0 |

**ตาราง 2 — เกณฑ์ความคลาดเคลื่อนผลต่างเส้นทแยงมุม (Diagonal Tolerance)**

| ความยาวด้านยาว | เกณฑ์ความคลาดเคลื่อน (mm) |
|--------------|------------------------|
| < 2,000mm | ≤ 6mm |
| 2,000–3,000mm | ≤ 7mm |
| ≥ 3,000mm | ≤ 8mm |

### 37D. คุณลักษณะที่ต้องการ (ตาราง 3 — ลักษณะทั่วไป)

| ชนิดตำหนิ | ขนาด (เส้นผ่านศูนย์กลาง) | จำนวนที่ยอมให้ |
|----------|------------------------|--------------|
| ฟองอากาศ | 0.5–<1.5mm | ≤ 5.5 × S (ตร.ม.) |
| ฟองอากาศ | 1.5–<3.0mm | ≤ 1.1 × S |
| ฟองอากาศ | 3.0–<5.0mm | ≤ 0.44 × S |
| ฟองอากาศ | 5.0–<10.0mm | ≤ 0.22 × S |
| ฟองอากาศ | ≥ 10.0mm | ต้องไม่มี |
| สิ่งแปลกปลอม | 0.5–<1.0mm | ≤ 2.2 × S |
| สิ่งแปลกปลอม | 1.0–<2.0mm | ≤ 0.44 × S |
| สิ่งแปลกปลอม | 2.0–<3.0mm | ≤ 0.22 × S |
| สิ่งแปลกปลอม | ≥ 3.0mm | ต้องไม่มี |
| ตำหนิเป็นเส้น/ปื้นต่อเนื่อง | — | ต้องไม่มี |

**ตาราง 4 — ค่าการเหลื่อมของแผ่นกระจกลามิเนต**

| ความยาวด้านที่ตั้งฉากกับขอบที่เหลื่อม | ค่ามากสุดที่ยอมรับ (mm) |
|--------------------------------------|----------------------|
| < 1,000mm | 2.0 |
| 1,000–<2,000mm | 3.0 |
| 2,000–<4,000mm | 4.0 |
| ≥ 4,000mm | 6.0 |

### 37E. คุณลักษณะการทนทาน

| หัวข้อ | เกณฑ์ |
|--------|-------|
| ความโค้งเดี่ยว | ≤ 0.5% |
| ความโค้งคลื่น | ≤ 0.3% |
| ความทนแสง (UV) | การส่องผ่านแสงลดลงได้ไม่เกิน 10% (ถ้า VLT > 20%) / ลดลงได้ไม่เกิน 2% (ถ้า VLT ≤ 20%) |
| ความทนความร้อน | ยอมให้เกิดรอยร้าว แต่ต้องไม่มีฟองอากาศและข้อบกพร่องอื่นๆ ในบริเวณห่างจากขอบหรือรอยร้าวเกิน 13mm |
| ความทนแรงกระแทก (L I, L II) | ต้องไม่แตก หรือถ้าแตกวัสดุคั่นกลางต้องไม่ฉีกขาด / ชิ้นกระจกต้องไม่หลุดร่วงจนเห็นวัสดุคั่นกลาง |
| การกระแทกด้วยถุงกระแทก (L II) | กระจกต้องไม่แตกทะลุทั้ง 2 ชั้น หรือถ้าแตกทะลุ ช่องต้องเล็กกว่าลูกบอล Ø75mm |

### 37F. การทดสอบ — ขนาดตัวอย่าง

| การทดสอบ | ขนาดตัวอย่าง |
|----------|------------|
| ความทนแสง / ความทนความร้อน | 300 × 300mm |
| ความทนแรงกระแทก | 610 × 610mm (12 แผ่น: 6 แผ่นทดสอบ + 6 แผ่นสำรอง) |
| การกระแทกด้วยถุงกระแทก | 864 × 1,930mm (3 แผ่น) |

### 37G. เครื่องหมายและฉลาก (ที่กำหนดบนกระจกทุกแผ่น)
1. สัญลักษณ์ + ความหนา
2. ชื่อผู้ผลิตหรือเครื่องหมายการค้า

**บนภาชนะบรรจุ:**
1. "กระจกนิรภัยหลายชั้น"
2. ประเภท, ชนิด, สัญลักษณ์, ความหนา (mm)
3. ขนาด (กว้าง × ยาว mm)
4. จำนวน (แผ่น)
5. มวลสุทธิ (kg)
6. เดือน ปีที่ทำ หรือรหัสรุ่น
7. ชื่อผู้ทำ / เครื่องหมายการค้า
8. ประเทศที่ทำ

---

## 📌 SECTION 38 — AGC General Spec for Laminated Glass (QAG015)

**Source:** 015_QAG015__General_spec_for_Project__LAMINATED.pdf
**อ้างอิง:** JIS R 3205 & AGC (Thailand) Standard

### 38A. Thickness Tolerance (Laminated Glass)

**สูตร:** T = T1 + Film thickness + T2

โดยที่:
- T = Nominal thickness of laminated glass (ความหนาที่กำหนด)
- T1, T2 = ความหนาของกระจกแต่ละแผ่น
- Film thickness = ความหนาของฟิล์ม PVB
- t max/min = summation of max/min tolerance ของกระจกแต่ละแผ่น

**เกณฑ์:**
- Maximum tolerance = T + t max
- Minimum tolerance = T + t min
- ความหนาของกระจกแต่ละแผ่นใช้ตาม Float Glass spec

### 38B. มาตรฐานที่ใช้
- **JIS R 3205** — Japanese Industrial Standard for Laminated Glass
- **AGC (Thailand) Standard** — มาตรฐานภายในของ AGC Thailand

---

## 📌 SECTION 39 — CNC Glass Cutting Machines Spec (Shandong Boke)

**Source:** CNC_3726_glass_cutting_machine.pdf + CNC4028_CNC_Automatic_Glass_Cutting_Line.pdf
**Supplier:** Shandong Boke CNC Equipment Co., Ltd. / Shandong XY International Trade Co., Ltd.
**Contact:** sarah-tian@xytrade.cn | WhatsApp: 0086-18678896956

### 39A. CNC-3726 — CNC Automatic Shaped Glass Cutting Machine

| Spec | ค่า |
|------|-----|
| Model | CNC-3726 |
| Dimension (machine) | 3000×2900×900mm |
| Weight | 3000kg |
| Max Loading Glass Size | 3700×2500mm |
| Max Cutting Glass Size | 3660×2440mm |
| Cutting Thickness | 3–19mm |
| Glass Loading Time | ≤50 sec/piece |
| Loading Arms | 3 |
| Glass Suckers | 12 |
| Cutting Speed | 0–120m/min (adjustable) |
| Linear Parallelism | ≤±2mm/m |
| Diagonal Accuracy | ≤±2mm/m |
| Belt Speed | 30m/min (adjustable) |
| Table Height | 900mm ±30mm |
| Power Supply | 380V/50Hz |
| Power | 10KW |
| Cutter Holder | 360° rotation |

**Key Components:**
- Controller: Galil (USA) — closed loop
- Servo Motor: Japanese brand
- Proportional Solenoid Valve: Japan SMC
- Positioning: Photoelectric + automatic edge hunting (no need to manually edge)
- Cutting oil: Automatic injection synchronized with cutting head

### 39B. CNC4028 — CNC Automatic Glass Cutting Line (3 sections)

**ประกอบด้วย 3 ส่วน:**
1. **QSP-4028** — Automatic Glass Loading Table
2. **CNC-4028** — CNC Automatic Shaped Glass Cutting Machine
3. **BQZ-4028** — Glass Breaking Table

**QSP-4028 Loading Table Components:**
- Motor: CBAR
- Vacuum Pump: PuXu (Shanghai)
- PLC: OMRON Japan
- Converter: Delta
- Solenoid valve: AIRTAC
- Power: 9.95KW

**CNC-4028 Cutting Machine Key Components:**

| ชิ้นส่วน | Brand |
|---------|-------|
| Table surface panel | High-density waterproof, roughness ≤±0.20mm/m |
| Rack and rail | ALTANTA GEMERGY |
| Belt/band pulley | Barbieri (Italy) |
| Cutter wheels & holder | BOHLE Germany |
| Relay | OMRON Japan |
| Terminal | WAGO Germany |
| Servo motor | YASKAWA Japan |
| Proportioning solenoid valve | SMC Japan |
| AC contactor | Schneider |
| Laser sensor | Panasonic |
| Position switch | OMRON |
| Control card | GALIL (USA) |
| Frequency converter | Delta |
| Optimize Software | OPTIMA |
| Power | 4.65KW |

**Galil Controller Features:**
- รับไฟล์: Standard G code, Optima / nesting software, AUTOCAD DXF
- ระบบ Cutting mode: Line / Optical positioning / Direct — เปลี่ยนได้อิสระ
- Real-time path display + fault diagnosis + alarm auto-record
- Store pressure settings ตามความหนากระจก — ใช้ซ้ำได้โดยไม่ต้อง input ใหม่

---

## 📌 SECTION 40 — IGU Production Line Specification (Shandong Boke LBP1800Q)

**Source:** Catalogue_for_insulating_glass_production_line.pdf
**Supplier:** Shandong Boke CNC Equipment Co., Ltd.
**CE Certified | ISO 9001**

### 40A. Technical Specifications — LBP1800Q Automatic IGU Production Line

| Spec | ค่า |
|------|-----|
| Model | LBP1800Q |
| Max processing glass size | 2500×1800mm |
| Min processing glass size | 450×200mm |
| Single glass thickness | 3–18mm |
| Cleanout speed | 3–9m/min |
| Work speed | 15–45m/min |
| Power supply | 3P, 380V/50Hz |
| Total power | 30.8KW (รวม heater 10KW) |
| Inert gas type | Argon, Nitrogen, etc. |
| Inert gas fill efficiency | >92% |
| Total weight | 7,800kg |
| Outline dimension | 19,720×2,200×2,850mm |

### 40B. 7 Sections ของ Production Line

| Section | ชื่อ | หน้าที่ |
|---------|------|---------|
| 1 | Loading Section | รับกระจก, ระบบ Low-E auto-detect |
| 2 | Washing & Drying | ล้างด้วย 3 คู่ brush (DuPont USA) + sponge roller |
| 3 | Transmission & Storage | ลำเลียงและเก็บกระจก |
| 4 | Light Inspection & Spacer Bar | ตรวจสอบและติด Aluminum Spacer |
| 5 | Outside Assembly | ประกอบด้านนอก |
| 6 | Inside Flat Press + Argon Fill | อัดแน่น + ฉีดก๊าซ Argon ≥92% efficiency |
| 7 | Storage & Unloading | เก็บและขนออก |

### 40C. คุณสมบัติพิเศษของ Production Line

- **Auto-detect Low-E coating side** — แยก coating surface อัตโนมัติ + เตือนด้วย alarm
- **Dual/Triple IGU capable** — รองรับ Double และ Triple insulating glass
- รองรับกระจก 3–18mm
- **Argon fill efficiency >92%** — ตามมาตรฐาน European
- PLC control (OMRON Japan) + Touch screen interface
- Brushes USA DuPont — ล้าง Low-E glass ได้โดยไม่ทำลาย coating
- Bearings: SKF Sweden (oil-less)
- Washing body: Stainless steel

### 40D. Imported Parts List

| ชิ้นส่วน | ประเทศ | Brand |
|---------|--------|-------|
| Photoelectric switch | USA | BANNER |
| Optical fiber switch | Japan | KEYE |
| Selection/Push-button switch | France | SCHNEIDER |
| PLC | Japan | OMRON |
| Transducer | Japan | OMRON |
| Air switch | France | SCHNEIDER |
| Vacuum sucker | Korea | YSC |
| Hydraulic valve | Taiwan | YUTIEN |
| Touch screen | Japan | OMRON |

### 40E. ZDJ-V Automatic Sealing Robot (Secondary Seal)

| Spec | ค่า |
|------|-----|
| Sealing speed | 5–35m/min |
| Sealing depth | <18mm |
| IGU thickness range | 12–50mm |
| Min IG unit size | 350×200mm |
| Max IG unit size | 2500×1800mm |
| Glue supply pressure | <30MPa |
| Elevation | 400mm (standard) |
| Angle of inclination | 6° |
| Air pressure | 0.6–0.8MPa |
| Total power | 9.4KW |
| Max weight of IG unit | 200kg |
| Outline dimension | 6,830×3,500×2,500mm |
| Servo motors | Yaskawa Japan |

### 40F. Butyl Coating Machine (DJJ03 Primary Seal)

| Spec | ค่า |
|------|-----|
| Power | 3P, 380V/50Hz |
| Total power | 2.24KW |
| Glue nozzle distance | 4–30mm (adjustable) |
| Extrusion pressure | 16–19MPa |
| Air pressure | 0.6–0.8MPa |
| Gluing temperature | 130–160°C |
| Belt speed | 0–35m/min |
| Dimension | 3000×630×970mm |
| Weight | 600kg |

### 40G. Auto Desiccant Filling Machine

| Spec | ค่า |
|------|-----|
| Power | 220V/50Hz — 1KW |
| Max frame size | 2000×2000mm |
| Aluminum width | 6–30mm |
| Desiccant diameter | 0.5–0.8mm |
| Air pressure | 0.6MPa |
| Dimension | 1450×850×4000mm |

### 40H. Automatic Aluminum Spacer Bending Machine (ZLZW02)

| Spec | ค่า |
|------|-----|
| Power | 220V/50Hz — 2.5KW |
| Air pressure | 0.6MPa |
| Aluminum width | 6–30mm |
| Spacer length | 4000–6000mm |
| Max frame size | 2000×2000mm |
| Min frame size | 280×200mm |
| Bending accuracy | <1mm error |
| Dimension | 10500×2200×2100mm |
| Feed tanks | 4 (รองรับ 4 ขนาดพร้อมกัน) |

### 40I. Glass Edging Machine (BMB95)

| Spec | ค่า |
|------|-----|
| Power | 2P, 220V/50Hz — 2.2KW |
| Max glass thickness | 20mm |
| Dimension | 3010×2110×1350mm |
| Weight | 260kg |

---

*Knowledge Base v3.0 — Section 36–40 เพิ่มจาก: LAMINATED.pdf/Laminated_Glass.pdf (=Lamitag catalog TH), TIS12222560m.pdf (มอก.1222-2560), 015_QAG015 (AGC Laminated spec), CNC_3726+CNC4028 (cutting machines), Catalogue_for_insulating_glass_production_line.pdf (IGU production line)*

---

## 📌 SECTION 41 — ตารางความหนากระจกที่แนะนำสำหรับ Facade สูง (TAG GLACADE)

**Source:** โครงสร_างกระจกส_ง_Page_1–4.jpg
**หน่วย:** ความหนา = มิลลิเมตร | กว้าง = มิลลิเมตร
**หมายเหตุ:**
1. ตารางนี้เป็นการคำนวณใช้กับ **กระจกชนิดธรรมดา (ANNEALED) เท่านั้น**
2. ในการออกแบบขอให้คำนึงถึงปัญหาการขนส่งกระจก และการซ่อมแซมกระจก หากมีกระจกแตก

### 41A. กำลังลมที่ใช้ในการออกแบบ 50 กก./ตารางเมตร

| ความสูงกระจกแผ่นหน้า (เมตร) | กว้าง 1.000ม. หนา | กว้าง 1.250ม. หนา | กว้าง 1.500ม. หนา | กว้าง 1.750ม. หนา | กว้าง 2.000ม. หนา |
|----|----|----|----|----|---|
| 3.000 | 6mm (กว้าง 140) / 12mm (130) | 6mm (150) / 12mm (140) | 8mm (170) / 12mm (150) | 8mm (180) / 12mm (170) | 8mm (190) / 12mm (180) |
| 3.500 | 6mm (160) / 12mm (150) | 6mm (180) / 12mm (160) | 8mm (200) / 12mm (180) | 8mm (210) / 12mm (190) | 10mm (210) / 15mm (180) |
| 4.000 | 8mm (180) / 12mm (170) | 8mm (200) / 12mm (190) | 10mm (200) / 15mm (180) | 10mm (220) / 15mm (200) | 10mm (240) / 15mm (210) |
| 4.500 | 10mm (190) / 15mm (170) | 10mm (210) / 15mm (190) | 10mm (230) / 15mm (210) | 12mm (220) / 19mm (200) | 12mm (240) / 19mm (210) |
| 5.000 | 10mm (210) / 15mm (190) | 10mm (230) / 15mm (210) | 10mm (260) / 15mm (230) | 12mm (250) / 19mm (220) | 12mm (260) / 19mm (230) |
| 5.500 | 12mm (200) / 19mm (180) | 12mm (230) / 19mm (200) | 12mm (250) / 19mm (220) | 15mm (270) / 19mm (240) | 15mm (290) / 19mm (260) |
| 6.000 | 12mm (220) / 19mm (200) | 12mm (250) / 19mm (220) | 12mm (270) / 19mm (240) | 15mm (300) / 19mm (260) | 15mm (320) / 19mm (280) |
| 6.500 | 15mm (240) / 19mm (220) | 15mm (270) / 19mm (240) | 15mm (300) / 19mm (260) | 19mm (280) | 19mm (300) |
| 7.000 | 15mm (260) / 19mm (230) | 15mm (290) / 19mm (260) | 15mm (320) / 19mm (280) | 19mm (310) | 19mm (330) |
| 7.500 | 15mm (280) / 19mm (250) | 15mm (310) / 19mm (280) | 15mm (340) / 19mm (300) | 19mm (330) | 19mm (350) |
| 8.000 | 15mm (300) / 19mm (260) | 15mm (330) / 19mm (300) | 15mm (370) / 19mm (320) | 19mm (350) | 19mm (370) |
| 8.500 | 15mm (320) / 19mm (280) | 15mm (350) / 19mm (310) | 19mm (340) | 19mm (370) | 19mm (400) |
| 9.000 | 15mm (340) / 19mm (300) | 15mm (380) / 19mm (330) | 19mm (360) | 19mm (390) | 19mm (420) |
| 9.500 | 15mm (350) / 19mm (310) | 15mm (400) / 19mm (350) | 19mm (390) | 19mm (420) | 19mm (440) |
| 10.000 | 19mm (330) | 19mm (370) | 19mm (410) | 19mm (440) | 19mm (470) |

*หมายเหตุ: ตัวเลขในวงเล็บ = ความกว้างขนาดกระจกครีบ (mm)*

### 41B. กำลังลมที่ใช้ในการออกแบบ 80 กก./ตารางเมตร

| ความสูงกระจกแผ่นหน้า (เมตร) | กว้าง 1.000ม. หนา | กว้าง 1.250ม. หนา | กว้าง 1.500ม. หนา | กว้าง 1.750ม. หนา | กว้าง 2.000ม. หนา |
|----|----|----|----|----|---|
| 3.000 | 6mm (170) / 12mm (160) | 8mm (190) / 12mm (180) | 8mm (210) / 12mm (190) | 10mm (210) / 15mm (190) | 10mm (220) / 15mm (200) |
| 3.500 | 6mm (200) / 12mm (180) | 8mm (230) / 12mm (210) | 8mm (250) / 12mm (230) | 10mm (240) / 15mm (220) | 10mm (260) / 15mm (230) |
| 4.000 | 8mm (230) / 12mm (210) | 8mm (260) / 12mm (240) | 10mm (260) / 15mm (230) | 10mm (280) / 15mm (250) | 12mm (270) / 19mm (240) |
| 4.500 | 10mm (240) / 15mm (210) | 10mm (270) / 15mm (240) | 10mm (290) / 15mm (260) | 12mm (280) / 19mm (250) | 12mm (300) / 19mm (270) |
| 5.000 | 10mm (260) / 15mm (240) | 10mm (290) / 15mm (260) | 10mm (320) / 15mm (290) | 12mm (310) / 19mm (280) | 12mm (330) / 19mm (300) |
| 5.500 | 12mm (260) / 19mm (230) | 12mm (290) / 19mm (260) | 12mm (320) / 19mm (280) | 15mm (340) / 19mm (300) | 15mm (370) / 19mm (330) |
| 6.000 | 12mm (280) / 19mm (250) | 12mm (320) / 19mm (280) | 12mm (350) / 19mm (310) | 15mm (370) / 19mm (330) | 15mm (400) / 19mm (360) |
| 6.500 | 15mm (310) / 19mm (270) | 15mm (340) / 19mm (300) | 15mm (380) / 19mm (330) | 19mm (360) | 19mm (390) |
| 7.000 | 15mm (330) / 19mm (290) | 15mm (370) / 19mm (330) | 15mm (400) / 19mm (360) | 19mm (390) | 19mm (410) |
| 7.500 | 15mm (350) / 19mm (310) | 15mm (400) / 19mm (350) | 15mm (430) / 19mm (380) | 19mm (420) | 19mm (440) |
| 8.000 | 15mm (380) / 19mm (340) | 15mm (420) / 19mm (370) | 15mm (460) / 19mm (410) | 19mm (440) | 19mm (470) |
| 8.500 | 15mm (400) / 19mm (360) | 15mm (450) / 19mm (400) | 19mm (440) | 19mm (470) | 19mm (500) |
| 9.000 | 19mm (380) | 19mm (420) | 19mm (460) | 19mm (500) | 19mm (530) |
| 9.500 | 19mm (400) | 19mm (440) | 19mm (490) | 19mm (530) | 19mm (560) |
| 10.000 | 19mm (420) | 19mm (470) | 19mm (510) | 19mm (550) | 19mm (590) |

### 41C. กำลังลมที่ใช้ในการออกแบบ 120 กก./ตารางเมตร (ความสูงถึง 5 เมตร)

| ความสูง (ม.) | กว้าง 1.000ม. | กว้าง 1.250ม. | กว้าง 1.500ม. | กว้าง 1.750ม. | กว้าง 2.000ม. |
|----|----|----|----|----|----|
| 3.000 | 8mm (210)/12mm(190) | 8mm(240)/12mm(220) | 10mm(240)/15mm(210) | 10mm(260)/15mm(230) | 12mm(240)/19mm(220) |
| 3.500 | 8mm(250)/12mm(230) | 10mm(280)/12mm(250) | 10mm(280)/15mm(250) | 12mm(270)/19mm(240) | 12mm(290)/19mm(250) |
| 4.000 | 8mm(280)/12mm(260) | 10mm(320)/12mm(290) | 10mm(320)/15mm(280) | 12mm(310)/19mm(270) | 15mm(330)/19mm(290) |
| 4.500 | 10mm(290)/15mm(260) | 10mm(320)/15mm(290) | 12mm(360)/15mm(320) | 12mm(340)/19mm(310) | 15mm(370)/19mm(330) |
| 5.000 | 10mm(320)/15mm(290) | 12mm(360)/15mm(320) | 12mm(400)/15mm(350) | 15mm(380)/19mm(340) | 15mm(410)/19mm(360) |

### 41D. กำลังลมที่ใช้ในการออกแบบ 160 กก./ตารางเมตร (ความสูงถึง 5 เมตร)

| ความสูง (ม.) | กว้าง 1.000ม. | กว้าง 1.250ม. | กว้าง 1.500ม. | กว้าง 1.750ม. | กว้าง 2.000ม. |
|----|----|----|----|----|----|
| 3.000 | 8mm(240)/12mm(220) | 10mm(250)/15mm(220) | 10mm(270)/15mm(240) | 12mm(260)/19mm(240) | 15mm(280)/19mm(250) |
| 3.500 | 8mm(290)/12mm(260) | 10mm(290)/15mm(260) | 12mm(320)/15mm(290) | 15mm(310)/19mm(270) | 15mm(330)/19mm(290) |
| 4.000 | 10mm(330)/12mm(300) | 10mm(330)/15mm(300) | 12mm(330)/19mm(290) | 15mm(350)/19mm(310) | 15mm(380)/19mm(340) |
| 4.500 | 10mm(340)/15mm(300) | 12mm(380)/15mm(340) | 15mm(370)/19mm(330) | 15mm(400)/19mm(350) | 19mm(420)/15mm(380) |
| 5.000 | 10mm(370)/15mm(330) | 12mm(420)/15mm(370) | 15mm(410)/19mm(360) | 15mm(440)/19mm(390) | 19mm(470)/15mm(420) |

---

## 📌 SECTION 42 — AGC AQAC888 — Fabricated Glass Specification (Tempered & HS)

**Source:** AQAC_888_heatsoak.pdf
**Document:** AQAC888 Issue 9 | 21-Oct-14
**Issuer:** AGC Flat Glass (Thailand) PCL — Samut Prakan Fabricated Glass Factory
**Authorized by:** QA. Fabricated Glass Manager (K. Poonsup T.)

### 42A. Float Glass — Dimensional Specification (อ้างอิง JIS R 3202)

**Thickness Tolerance:**

| ความหนา (mm) | Tolerance |
|-------------|-----------|
| 3, 4 | ±0.3mm |
| 5, 6 | ±0.3mm |
| 8, 10 | ±0.6mm |
| 12, 15 | ±0.8mm |
| 19 | ±1.2mm |

**Size Tolerance (กระจกแผ่นเดี่ยว):**

| ความหนา | L ≤3,000mm | L >3,000mm | หมายเหตุ |
|---------|-----------|-----------|---------|
| 3, 4 | +1 / -2mm | +/-2mm | * ต้อง Grinding (Type B) ถ้า L>3,000 |
| 5, 6 | +/-2mm | +/-3mm | |
| 8, 10 | +/-2mm | +/-3mm | |
| 12 | +/-3mm | +/-3mm | |
| 15* | +/-3mm | +/-3mm | |
| 19* | +/-3mm | +/-3mm | |

**Warp (ความโค้ง):**

| ความหนา | Standard |
|---------|---------|
| 3–19mm (monolithic) | ≤0.3% ของความยาว |
| Laminated | ≤0.3% |

**Warp HS glass:**

| ขนาดความยาว (L) | 6mm | 8mm | 10, 12mm |
|----------------|-----|-----|---------|
| L ≤1,000 | ≤0.3% | ≤0.3% | ≤0.3% |
| 1,000 < L ≤2,000 | ≤0.3% | ≤0.3% | ≤0.3% |
| 2,000 < L ≤3,000 | ≤0.5% | ≤0.5% | ≤0.3% |
| L >3,000 | ≤0.5% | — | — |
| Partial wave | <1.5mm | | |

**Edge Work (การฝนขอบ):**

| ชนิดขอบ | Arising (A) | Grinding (B) & Polishing (D) |
|---------|------------|------------------------------|
| ความหนา 3, 4, 5, 6mm | 0.5 ≤W ≤2.0mm | 0.5 ≤W ≤2.0mm |
| ความหนา 8, 10, 12mm | 0.5 ≤W ≤2.5mm | 0.5 ≤W ≤2.5mm |
| ความหนา 15, 19mm | 0.5 ≤W ≤4.0mm | 0.5 ≤W ≤4.0mm |

**Corner Cut:**

| ความหนา | Standard |
|---------|---------|
| 3mm | 0 < W ≤0.5mm |
| 4, 5mm | 0.5 ≤W ≤2.0mm |
| 6, 8mm | 0.5 ≤W ≤3.0mm |
| 10, 12, 15, 19mm | 0.5 ≤W ≤5.0mm |

**Special Dimension — 45–60° arising (สำหรับกระจก 8, 10mm):**
- A: 1–2mm (กว้าง 1–2mm)
- B: 1–2mm (กว้าง 1–2mm)

### 42B. Float Glass — Appearance (Normal)

**Bubble (ฟองอากาศ):**

| ขนาด (φ) | Standard |
|---------|---------|
| φ > 2.0mm | Reject |
| 1.5 ≤φ ≤2.0mm | 1 pc/m² |
| 0.5 ≤φ <1.5mm | 1 pc/2ft² |
| φ <0.5mm | Accept All |

**Inclusion (สิ่งแปลกปลอม):**

| ขนาด (φ) | Standard |
|---------|---------|
| φ ≥1.0mm | Reject |
| 0.5 ≤φ <1.0mm | 2 pcs/m² |
| φ <0.5mm | Accept All |

**Scratch (รอยขีดข่วน):**

| พื้นที่กระจก (m²) | ความยาวต่อรอย (mm) | ความยาวรวมทุกรอย (mm) |
|-------------------|--------------------|----------------------|
| A <2.0 | 60 | 240 |
| 2.0 ≤A <3.0 | 120 | 480 |
| 3.0 ≤A <4.0 | 180 | 720 |
| A ≥4.0 | 240 | 960 |
*Width of scratch ≤0.3mm*

**Hackle (รอยฟันเลื่อย):**
- Arising: ≤1/2 ความหนา (หนา ≤6mm) / ≤3/4 ความหนา (หนา >6mm), ความยาวรวม ≤10% ของความยาวกระจก
- Grinding/Polishing: ไม่ยอมรับ

**Chip (รอยกะเทาะ):**
- Arising: ด้านกว้าง ≤ ความหนา, ด้านยาว ≤ ความหนา, ลึก ≤ ความหนา และ ≤10mm
- Grinding/Polishing: ด้านกว้าง/ยาว ≤1/2 ความหนา ไม่มีจุดแหลม

**Horn (รอยยื่น) สำหรับ Arising:**

| ความหนา | Standard |
|---------|---------|
| 3–5mm | ไม่ยอมรับ |
| 6–8mm | 0.5 ≤W ≤2.0mm |
| 10–12mm | 0.5 ≤W ≤2.0mm |
| 15–19mm | 0.5 ≤W ≤2.0mm |

### 42C. Tempered & Heat-Strengthened Glass — Special Testing

| รายการทดสอบ | Standard |
|-----------|---------|
| Surface Stress (HS) | Follow JIS R 3222 — Surface stress = 20–60 MPa |
| Fragmentation (Tempered) | Follow JIS R 3206 — Total pieces ≥40 ชิ้น ในพื้นที่ 50×50mm |
| Drill & Notching | อ้างอิงมาตรฐาน AQAC811 |

### 42D. Logo Specification — AGC Products

**Temptag (Tempered for sale):**
- Location: 50mm distance from right-top corner (outside view)
- Distance tolerance from edge: ±4mm
- Logo slant tolerance: |A-B| ≤2mm
- ถ้าเป็น coating glass: Logo อยู่ที่ coating side เท่านั้น

**Temptag Heat Soak:**
- Logo เพิ่ม text "TEMPERED HEAT SOAK ⊕"

**"T" mark — Tempered for Fabrication:**
- Location: 20mm from edge of glass height side (ด้านความสูง)
- Distance tolerance: ±5mm

**"H" mark — Heat-Strengthened (Heattag):**
- Logo "HEATTAG" (AGC Flat Glass Thailand)
- Location: 50mm from right-top corner on outside view
- Distance tolerance from edge: ±4mm | Slant: |A-B| ≤2mm

**Solartag Plus Tempered:**
- Logo "SOLARTAG PLUS" + "TEMPERED HEAT SOAK ⊕" (ถ้าผ่าน soak)

**Label Position (สติกเกอร์):**
- Location: Right-bottom corner (outside view), ห่างจากขอบ 100mm
- ถ้า coating glass: ติดสติกเกอร์ที่ non-coating side เท่านั้น
- สินค้าบาง category: ไม่ติดสติกเกอร์ (No attach label)

### 42E. ประเภทสินค้าตามการใช้งาน (Product Category)

| ประเภท | รายละเอียด | สัญลักษณ์/Logo |
|--------|-----------|--------------|
| Tempered for sale | กระจก Tempered ขายตรง | TEMPTAG |
| Tempered Heat Soak for sale | ผ่านกระบวนการ Heat Soak | TEMPTAG HEAT SOAK ⊕ |
| Solartag Plus Tempered for sale | SolarTAG Tempered ขายตรง | SOLARTAG PLUS |
| Solartag Plus Tempered Heat Soak for sale | SolarTAG + Soak | SOLARTAG PLUS HEAT SOAK ⊕ |
| Tempered for Reflective glass | ต้องผ่านกระบวนการทำเป็นกระจกสะท้อนแสง | SOLARTAG (Tempered Glass) |
| Tempered for Laminated/IGU | ต้องนำไปทำเป็น LAM หรือ IGU | TEMPERED |
| Tempered Heat Soak for Lam/IGU | ผ่าน Soak แล้วทำ LAM/IGU | TEMPERED HEAT SOAK ⊕ |
| Heat-Strengthened for sale | Heattag ขายตรง | HEATTAG |
| Solartag Plus HS for sale | SolarTAG HS | SOLARTAG PLUS HEAT STRENGTHENED |

---

## 📌 SECTION 43 — มาตรฐาน มอก. 965-2533/2537 กระจกนิรภัยเทมเปอร์

**Source:** TIS9652537_เทมเปอร_.pdf
**ประกาศ:** ราชกิจจานุเบกษา เล่ม 107 ตอนที่ 140 วันที่ 7 สิงหาคม 2533
**แก้ไขครั้งที่ 1:** ราชกิจจานุเบกษา เล่ม 111 ตอนที่ 43ง วันที่ 31 พฤษภาคม 2537

### 43A. นิยามสำคัญ

**กระจกนิรภัยเทมเปอร์:** ผลิตภัณฑ์กระจกชั้นเดียวที่ผ่านกรรมวิธีอบด้วยความร้อนหรือวิธีทางเคมี จนเกิดแรงเคน (Compressive Stress) ที่ผิวและแรงดึง (Tensile Stress) ที่ศูนย์กลาง ซึ่งสมดุลกันพอดี — เมื่อมีแรงกระทำพอ กระจกทั้งแผ่นจะแตกออกเป็นชิ้นเล็กๆ โดยรอยแตกกลมมน ไม่แหลมคม

### 43B. ประเภทและสัญลักษณ์

| ประเภท | ชนิด | สัญลักษณ์ | คุณสมบัติ |
|--------|------|----------|---------|
| แผ่นเรียบ | I | X I TP | ทนแรงกระแทกตามข้อ 10.6 |
| แผ่นเรียบ | II | X II TP | ทนแรงกระแทก + ลักษณะการแตกแบบ 10 ชิ้นใหญ่ ≤6,500mm² |
| แผ่นเรียบ | III | X III TP | ผ่านทั้งชนิด I และ II |
| แผ่นโค้ง | I | X I TP | ทนแรงกระแทกตามข้อ 10.6 |

*X = ความหนาของกระจก | TP = Tempered Glass*

### 43C. ขนาดและเกณฑ์ความคลาดเคลื่อน

**ตาราง 1 — Thickness Tolerance & Size Tolerance (มม.)**

| ความหนา (mm) | Thickness ±mm | L ≤1,000 | 1,000<L≤2,000 | 2,000<L≤3,000 |
|-------------|--------------|---------|--------------|--------------|
| *4, *5 | ±0.3 | +1/-2 | +/-3 | ขึ้นอยู่กับข้อตกลง |
| 6 | ±0.3 | +1/-2 | +/-3 | +/-4 |
| 8 | ±0.6 | +2/-3 | +/-3 | +/-4 |
| 10, 12 | ±0.6 | +2/-3 | +/-3 | +/-4 |
| 15 | ±0.8 | ±4 | ±4 | — |
| 19 | ±1.2 | ±5 | ±5 | ±6 |

*หมายเหตุ: * = กระจกลาย tolerance ±0.4mm | >3,000mm ขึ้นกับข้อตกลงผู้ซื้อ-ผู้ขาย*

### 43D. คุณลักษณะที่ต้องการ

**ตาราง 2 — ลักษณะทั่วไป:**

| ตำหนิ | เกณฑ์ |
|-------|-------|
| รอยร้าว (crack) | ต้องไม่มี |
| รอยขีดข่วน | สังเกตไม่เห็นด้วยตาเปล่า |
| รอยบิ่น (chip) | กว้าง/ยาว < ความหนากระจก |

**ความโค้ง (แผ่นเรียบ):**
- โค้งในลักษณะโค้ง (bow): ≤0.5%
- โค้งในลักษณะคลื่น (wave): ≤0.3%

**ความทนการกระแทก:** เมื่อทดสอบด้วยลูกเหล็กกลมตกจากสูง 1,000mm — ต้องไม่แตก

**ลักษณะการแตก:**
- ชนิด I (หนา 4mm): ชิ้นใหญ่สุด ≤15 กรัม
- ชนิด I (หนา ≥5mm): จำนวนชิ้นรวมในพื้นที่ 50×50mm ≥40 ชิ้น
- ชนิด II: 10 ชิ้นใหญ่สุดรวมกัน ≤น้ำหนักกระจกพื้นที่ 6,500mm²
- ชนิด III: ผ่านทั้ง I และ II

### 43E. เครื่องหมายและฉลาก

**บนกระจกทุกแผ่น (ถาวร):**
1. สัญลักษณ์แสดงชนิด
2. ชื่อผู้ทำ หรือเครื่องหมายการค้า

**บนภาชนะบรรจุ:**
1. "กระจกนิรภัยเทมเปอร์"
2. สัญลักษณ์ชนิด
3. ขนาด (mm)
4. จำนวน
5. เดือน ปีที่ทำ
6. ชื่อผู้ทำ หรือเครื่องหมายการค้า

---

## 📌 SECTION 44 — AGC Temptag — Catalog Spec ฉบับไทย

**Source:** TEMPERED.pdf / Tempered_Glass.pdf (AGC Architectural Glass Catalogue Page 25–26)

### 44A. กระจกนิรภัยเทมเปอร์ เทมแทค (Temptag)

**นิยาม:** กระจกนิรภัยเทมเปอร์ เทมแทค ของ AGC มีลักษณะภายนอกทั่วไปเหมือนกระจกธรรมดา แต่มีคุณสมบัติพิเศษที่แตกต่าง คือ **มีความแข็งแรงกว่ากระจกธรรมดา 3–5 เท่า** เมื่อถูกแรงกระทบจนแผ่นกระจกแตก แผ่นกระจกจะแตกออกเป็นชิ้นเล็กๆ ไม่มีคม จึงช่วยลดอันตรายที่มีต่อผู้ใช้

### 44B. หลักการทางฟิสิกส์ (Tempering Process)

กระจกนิรภัยเทมเปอร์จะมีชั้น **Compressive Stress อยู่บนผิวกระจกทั้งสองข้าง** และมีชั้น **Tensile Stress อยู่ภายในเนื้อกระจก** ซึ่งเป็นตัวที่ทำให้กระจกนิรภัยเทมเปอร์เกิดความสมดุล ถ้ามีรอยร้าวเกิดขึ้นบนผิวกระจกและรอยร้าวนั้นขยายตัวเข้าถึงชั้น Tensile Stress — กระจกจะแตกทันที

**รอยร้าวของกระจกมี 2 ประเภท:**
- รอยร้าวที่เกิดจากแรงกระทบภายนอก เช่น รอยร้าวที่มาจากของแข็งมากระทบ
- รอยร้าวที่เกิดขึ้นจากสิ่งเจือปนที่อยู่ในเนื้อกระจก ซึ่งเป็นกรณีที่เกิดขึ้นได้น้อยมาก (NiS)

**ลักษณะการแตกของกระจกนิรภัยเทมเปอร์:**
- เมื่อกระจกแตก กระจกทั้งบานจะแตกออกเป็นชิ้นเล็กๆ ทั่วทันที
- เศษกระจกอาจจะหลุดร่วงลงมาจากขอบกระจก เนื่องมาจากการติดตั้งกระจกแต่ละวิธี
- เศษกระจกอาจตกลงมาเป็นชิ้นๆ หรืออาจตกกลมมาเป็นกลุ่มใหญ่
- **ลักษณะการแตกของกระจกนิรภัยเทมเปอร์** = กระจกอาจจะแตกได้ด้วยตัวมันเอง แม้ว่าจะไม่มีการกระทบจากภายนอก ซึ่งในกรณีนี้จะไม่เกิดขึ้นกับกระจกทั่วไป (NiS Spontaneous Breakage)

### 44C. การใช้งานที่แนะนำ

- ประตูบานเลื่อยและผนังกระจก ทั้งด้านหน้าและภายในตัวอาคารซึ่งต้องทนต่อความพลุกพล่านของผู้คนที่เข้าออกอยู่เสมอ
- ตู้โทรศัพท์ ห้องไซ ตู้สินค้าอัญมณีที่ต้องการความโปร่งใส แต่ทนต่อแรงกระทบกระแทกในการใช้งาน
- ฉากกั้นส่วนอาบน้ำ ประตูห้องน้ำ ผนังกั้นภายในอาคารที่ต้องการความสวยงามและความปลอดภัย แต่ยังคงความปลอดภัย โปร่ง กว้างขวาง
- ผนังกระจกของสถานที่ที่ต้องรับแรงกระทบที่มีความเร็วสูง เช่น สนามสควอช
- หน้าต่าง ผนังอาคาร ผนังกระจก ของอาคารในบริเวณที่มีแรงอัดของลมสูง
- บริเวณหน้าคานของอาคาร หน้าต่าง คู่อาบน้ำ หรือบริเวณที่ต้องเผชิญกับภาวะความร้อนสูงกว่าปกติ
- งานเฟอร์นิเจอร์ เช่น ชั้นวางของ ชั้นโชว์สินค้า
- สถานที่ที่คำนึงถึงความปลอดภัย 2 ระดับ คือ ต้องการความแข็งแรงสูง และยังคงความปลอดภัยแม้กระจกเกิดการแตก เช่น ผนังอาคารของโรงเรียนอนุบาล ราวบันได เป็นต้น

### 44D. ข้อควรระวังและคำเตือน

**การป้องกันอันตราย:**
- **วิธีป้องกันกระจกหลุดร่วง:** การติดตั้งโดยใช้ sealant หรือติดตั้งอย่างถูกวิธี จะสามารถป้องกันอันตรายที่เกิดจากเศษกระจกหลุดร่วงเมื่อเกิดการแตก
- **วิธีป้องกันอันตรายจากเศษกระจกแตก:** ควรป้องกันการหลุดร่วงของกระจกโดยนำกระจกนิรภัยเทมเปอร์ ไปทำเป็นกระจกนิรภัยลามิเนต หรือติดฟิล์มที่สามารถป้องกันเศษกระจกหลุดร่วง
- สถานที่ที่มีความลาดเอียง เช่น Skylight — **เศษกระจกอาจตกลงมาทำอันตรายต่อบุคคลที่อยู่ข้างล่างได้**
- การติดตั้งกระจกโดยไม่ใช้กรอบ เช่น ราวบันได — **ชิ้นกระจกอาจตกลงมาเป็นชิ้นๆ ได้**

**คำแนะนำในการออกแบบ:** เพื่อป้องกันอันตรายจากกระจก เมื่อกระจกแตกและหลุดร่วงลงมา ควรปฏิบัติดังนี้:
- ติดตั้งกันสาด หรือใช้วิธีอื่นที่คล้ายกัน เพื่อป้องกันเศษกระจกตกลงมาทำอันตรายได้
- ทำสัญลักษณ์เพื่อให้รู้ว่าสถานที่นั้นมีอันตรายจากการตกลงมาของเศษกระจก

**ข้อควรระวังในการใช้งาน:**
- **กระจกนิรภัยเทมเปอร์** = กระจกที่มีคุณสมบัติแตกต่างจากกระจกธรรมดา จึง**ไม่สามารถตัด เจาะรู บากมุม หรือเจียรขอบได้หลังจากการผลิต** ดังนั้นในการสั่งซื้อผลิตภัณฑ์ จะต้องระบุขนาดของกระจก ตำแหน่งการเจาะรู การบากมุม และลักษณะการเจียรขอบให้ถูกต้อง

### 44E. ฮีทโซค (Heat Soak) — คุณภาพเหนือมาตรฐาน

ฮีทโซค เป็นการจำลองสภาวะการใช้งานของกระจกนิรภัยเทมเปอร์ในอุณหภูมิที่สูงกว่าการใช้งานจริง กระจกนิรภัยเทมเปอร์ที่ผ่านการฮีทโซคแล้ว จะมีคุณสมบัติที่ช่วยลดปัญหาการแตกร้าวด้วยตัวเองของกระจกได้

**⚠️ หมายเหตุสำคัญ:**
- กระจกนิรภัยเทมเปอร์ที่ต้องการให้ผ่านกระบวนการฮีทโซค จะต้องมีค่าใช้จ่ายของกระบวนการฮีทโซคเพิ่ม
- **กระจกฮีทสเตร็งท์ ไม่มีความจำเป็นต้องผ่านกระบวนการฮีทโซค**

### 44F. ชนิดและข้อมูลผลิตภัณฑ์ (Temptag Size Reference)

| ชนิด | ความหนา (mm) | ขนาดเล็กสุด (mm) | ขนาดใหญ่สุด (mm) | น้ำหนักต่อ m² (kg) |
|------|-------------|-----------------|-----------------|------------------|
| กระจกนิรภัยเทมเปอร์ + ฮีทโซค | 3.2 | 300×120 | 2000×1000 | 8 |
| | 4.0 | 300×120 | 2440×2150 | 10 |
| | 5.0 | 300×120 | 3150×2150 | 12 |
| | 6.0 | 300×120 | 3600×2410 | 15 |
| | 8.0 | 300×120 | 4800×2410 | 20 |
| | 10.0 | 300×120 | 4800×2410 | 25 |
| | 12.0 | 300×120 | 4800×2410 | 30 |

*หมายเหตุ: สำหรับ 15 และ 19mm กรุณาสอบถามข้อมูลเพิ่มเติมจากเจ้าหน้าที่*

---

## 📌 SECTION 45 — AGC QAG015 — General Spec for Tempered & Heat-Strengthened Glass

**Source:** 015_QAG015__General_spec_for_Project__TEMPER_HS.pdf
**อ้างอิง:** JIS R 3206 (Tempered) + JIS R 3222 (Heat-Strengthened) + AGC Thailand Standard

### 45A. Thickness

ใช้ตาม **FLOAT GLASS** item (ตาม AGC AQAC888 / JIS)

### 45B. Size

- กระจกแผ่นเดี่ยว (Monolithic): ดูตาม FLOAT GLASS
- กระจกประกอบ (≥2 แผ่น) เช่น LAM, IGU: ดูตาม LAMINATED GLASS หรือ IGU GLASS item

### 45C. Diagonal Difference

- กระจกแผ่นเดี่ยว: ดูตาม FLOAT GLASS
- กระจก ≥2 แผ่น: ดูตาม LAMINATED หรือ IGU

### 45D. Warp

**Tempered Glass:**
- Bow: ≤0.5% ของความยาว
- Wave (Laminated): ≤0.3%

**Heat-Strengthened Glass:**

| ขนาดความยาว | หนา 6mm | หนา 8mm | หนา 10–12mm |
|------------|--------|--------|------------|
| L ≤1,000mm | ≤0.3% | ≤0.3% | ≤0.3% |
| 1,000 < L ≤2,000mm | ≤0.3% | ≤0.3% | ≤0.3% |
| 2,000 < L ≤3,000mm | ≤0.5% | ≤0.5% | ≤0.3% |
| L >3,000mm | ≤0.5% | — | — |
| Partial wave | <1.5mm | | |

---

*Knowledge Base v3.0 — Section 41–45 เพิ่มจาก: โครงสร้างกระจกสูง Page 1–4.jpg (TAG Glacade wind load tables), AQAC_888_heatsoak.pdf (AGC AQAC888 fabricated glass QA spec), TIS9652537.pdf (มอก.965-2533/2537), TEMPERED.pdf+Tempered_Glass.pdf (Temptag catalog TH), 015_QAG015__General_spec_for_Project__TEMPER_HS.pdf*

---

## 📌 SECTION 46 — PPG TD-110: Glass Breakage — Failure Mode & Stress Estimation

**Source:** 22_TD110F.pdf | PPG Industries, Inc. — Glass Technical Document TD-110
**ฉบับ:** Revision #3, 9/7/2016 | Original Publication: December 1995
**วัตถุประสงค์:** ใช้วิเคราะห์สาเหตุการแตกของกระจก (Forensic Analysis) และประเมินระดับ Stress ที่ทำให้แตก

### 46A. หลักการวิเคราะห์การแตก (Break Origin Analysis)

การวิเคราะห์จุดกำเนิดรอยแตก (Fracture Origin) สามารถบอกได้ถึง:
1. **Mode of Failure** — bending, thermal, pure tension, torsional, peel chip ฯลฯ
2. **Stress Level** — ระดับ tension ที่ทำให้แตก
3. **Cause** — impact, crush, digs, glass-to-glass/metal contact, chips, edge/surface damage, scratches

**หลักการพื้นฐาน:** กระจกแตกเมื่อ Tension Stress เข้าใกล้หรือเกิน Ultimate Strength
- สาเหตุหลัก 2 ประการ: (1) Thermal Stress (อุณหภูมิต่างกันภายในกระจก) และ (2) Mechanical Stress (bending/impact)
- **Edge Damage** ลดความแข็งแรงกระจกได้ **>50%** ทำให้ทนทั้ง thermal และ mechanical load ได้น้อยลง

### 46B. Origin Traceability — วิธีหาจุดกำเนิดรอยแตก

**Wallner Lines:** รอยแตกที่เริ่มจาก Origin แล้วแผ่ออกตาม Break Branches
- วิธีหา Origin:
  1. ลาก Arrows ตาม Fracture Line Direction (ลูกศรชี้เข้า concave face ของ break wave)
  2. Trace point-to-tail ของ arrows ย้อนกลับหา Break Origin

**กฎ:** ไม่ว่าจะเป็น Annealed, HS, Tempered, หรือ Chemically Strengthened — รอยแตกจะ **project เข้า concave face เสมอ**

### 46C. Failure Modes — ประเภทการแตก

#### Thermal Stress
- Origin: **ขอบกระจก** (Edge) เสมอ
- ทำมุม **~90°** กับทั้ง edge และ surface
- แบ่งเป็น 2 ระดับ:

| ระดับ | ลักษณะ | สาเหตุ |
|-------|--------|--------|
| **Low Thermal Stress** | รอยแตกเส้นเดียวจาก Origin → propagate **≥2 นิ้ว (5cm)** ก่อนแตกแขนง | Edge ที่เสียหาย (Damaged Edge) |
| **High Thermal Stress** | รอยแตกเส้นเดียวจาก Origin → แตกแขนง **ภายใน 2 นิ้ว (5cm)** | Severe shading, heating registers ชิดกระจก, ม่านสีอ่อนชิดกระจก, กรอบคอนกรีตขนาดใหญ่ |

**หมายเหตุ:** Thermal Breakage เสี่ยงสูงขึ้นเมื่ออากาศเย็น โดยเฉพาะเมื่อมีแสงแดดร่วมด้วย

#### Mechanical Stress
| ระดับ | ลักษณะ | ระดับ Stress |
|-------|--------|------------|
| **Low Stress Tension** | Origin ไม่ใช่ 90° กับขอบ, propagate **>2 นิ้ว** เส้นเดียว | <1,500 psi (10.4 MPa) |
| **High Stress Mechanical** | รอยแตกหลายเส้นจาก Point of Impact รูปแบบ **spider web** | สูงมาก — กระทบแรง |

**Low Stress Origin** มักพบที่: crush, digs, scratches, chips, หรือ weak edge จาก poor cutting (shark teeth / serration hackle)

### 46D. Stress Estimation — PPG/Orr's Equation

**สูตร:** `σ_stress = 1950 / √R`
- R = Mirror Radius (วัดเป็น **inches**)
- σ = Breaking Stress (PSI)

**ตัวอย่าง:** R = 0.22 นิ้ว → σ = 1950/√0.22 = **4,200 PSI (29 MPa)**
→ High breaking stress = กระจกมี good cut edge quality, ไม่มี edge damage

**Fracture Face Zones** (จาก Origin ออกมา):

| Zone | ลักษณะ | ความหมาย |
|------|--------|---------|
| **Mirror** (เงา) | Smooth, mirror-like | Crack velocity ต่ำ — ใกล้ Origin |
| **Frosted** (霜) | Frosted band | Velocity เพิ่มขึ้น |
| **Hackled/Ragged** (หยัก) | Ragged, rough | Velocity สูง — ห่างจาก Origin |

**กฎ Mirror Radius:**
- R **เล็ก** = Breaking stress **สูง** (high thermal/bending)
- R **ใหญ่** = Breaking stress **ต่ำ** (thin glass / pre-existing damage)
- Mirror radius **ไม่ขึ้นกับความหนากระจก**

**เครื่องมือที่ต้องใช้:** Point source of light + 7–10× magnifier (เช่น Bausch & Lomb No. 81-34-35)

**เกณฑ์ตีความ:**
- Breaking stress **>1,500 psi** → เห็น fracture markings ชัด → วิเคราะห์ได้แม่นยำ
- Breaking stress **<1,500 psi** → markings ไม่ชัด → มักเกิดจาก Pre-existing damage (scratches, digs, chips, crush)

### 46E. Thermal Stress Impact of Fired Ceramic Enamel and Silver Frit

เมื่อเคลือบ Ceramic Enamel หรือ Silver Frit บนกระจก จะเกิด Residual Stress เพิ่มเติม เนื่องจาก CTE (Coefficient of Thermal Expansion) ต่างกัน:

| ชนิด Frit | ลดความแข็งแรงกระจก |
|-----------|------------------|
| Enamel Frit | สูงสุด **40%** |
| Silver Frit | สูงสุด **70%** |

**สูตรประมาณ Residual Stress (กรณีฟิล์มบางมาก):**
`Δσ_A = E_A × ΔT × (α_B - α_A) / (1 - ν_A)`

- E = Young's Modulus | ν = Poisson's Ratio | α = CTE | T = Temperature
- PPG Float Glass: α_B = 8.6 × 10⁻⁶ °F⁻¹ (4.8 × 10⁻⁶ °C⁻¹)

**วิธีตรวจสอบความเข้ากันได้ (Compatibility):**
1. วัด Stress ที่ frit/glass interface
2. Concentric ring test เปรียบกับ basic strength ของกระจก
3. ใช้ ASTM E831 วัด CTE ของ frit ให้ match กับ substrate glass

### 46F. Stress–Mirror Radius Quick Reference Table

| Mirror Radius R (inches) | Breaking Stress (PSI) | Interpretation |
|--------------------------|----------------------|----------------|
| 0.01 | 19,500 | สูงมาก — High thermal/impact |
| 0.02 | 13,788 | สูงมาก |
| 0.05 | 8,717 | สูง |
| 0.10 | 6,164 | ปานกลาง–สูง |
| 0.22 | 4,157 (~4,200) | ปานกลาง — ตัวอย่างใน TD-110 |
| 0.50 | 2,758 | ปานกลาง–ต่ำ |
| 1.00 | 1,950 | ต่ำ — มักมี pre-existing damage |

---

## 📌 SECTION 47 — Pilkington: Finding the Cause of Glass Breakages

**Source:** Finding_the_cause_of_glass__breakages.pdf
**Author:** Phil Brown, European Regulatory Marketing Manager, Pilkington UK
**Published:** Glass and Glazing Products Magazine, October 2016 | Blog: 29 Dec 2016

### 47A. หลักการสืบหาสาเหตุ (Detective Approach)

เปรียบการวิเคราะห์รอยแตกเหมือนงานสืบสวน:
- ถามถึง **กิจกรรมในพื้นที่** ก่อนเกิดเหตุ
- ตรวจสอบ **เหตุการณ์ผิดปกติ** ที่เกิดขึ้นล่าสุด
- ดูงานซ่อมบำรุงที่ทำล่าสุด

### 47B. วิธีหาจุดกำเนิดรอยแตก (Origin Location)

**เครื่องมือ:** แว่นขยาย (Magnifying Glass) — ดูทั้งผิวกระจกและส่องผ่านขอบกระจก

**จาก Surface:** หา **Point of Branching** — มักปรากฏเป็น **"Cat's Eyes"** (ชิ้นกระจก 2 ชิ้นรูปร่างเฉพาะ)

**จาก Fracture Area:** ค้นหา:
- **Rib Marks** — นำกลับไปหา Origin
- **Hackle Lines** — นำกลับไปหา Origin
- **Mirror Region** — บริเวณขัดเงาสูงที่ขอบรอยแตก = ประมาณ Stress Level ขณะแตก

**กรณีกระจก Toughened:** เศษกระจกส่วนใหญ่ตกพื้น — ต้องคุกเข่าหาชิ้นที่มี Origin

### 47C. สาเหตุการแตกของกระจก (Causes of Glass Fracture)

| สาเหตุ | วิธีสังเกต |
|--------|----------|
| **Impact** | Spider web pattern, point of impact ชัดเจน |
| **Edge Damage ก่อนติดตั้ง** | Origin ที่ขอบ — ดูด้วยกล้องจุลทรรศน์ |
| **Poor Installation** | Origin ที่ขอบหรือจุดกดทับ |
| **Poor Design** | รอยแตกซ้ำตำแหน่งเดิม |
| **Inclusions (NiS)** | Spontaneous — ไม่มีจุด impact — ต้องวิเคราะห์ chemical |
| **Thermal Breakage** | รอยแตกตั้งฉากกับขอบ — เริ่มจากขอบ |

**กรณีที่ต้องใช้ Lab:** Inclusions ที่ต้องสงสัย — ต้อง Chemical Analysis

**บทบาทของการวิเคราะห์:** ช่วยแก้ข้อพิพาทใน Supply Chain และหาทางแก้ไขได้ตรงจุด

---

## 📌 SECTION 48 — BIFMA: Spontaneous Breakage of Tempered Glass

**Source:** Spontaneous_Glass_Break_6Jan.pdf
**Author:** Dave Panning, BIFMA (Business and Institutional Furniture Manufacturers Association)
**Date:** January 6, 2016

### 48A. Spontaneous Breakage คืออะไร

**นิยาม:** การแตกของกระจกเทมเปอร์โดยไม่มีแรงกระทบจากภายนอก — เกิดจาก **Inclusion** (สิ่งแปลกปลอม) ในเนื้อกระจกที่เกิดขึ้นในกระบวนการผลิต

**อัตราเกิด:**
- Glass industry ประมาณ: สูงสุด **1%**
- BIFMA members รายงาน: **ต่ำกว่ามาก** (เศษเสี้ยวของ 1%)

### 48B. สาเหตุของ Spontaneous Breakage

**1. Edge Damage (พบบ่อยที่สุด)**
- Scratches, nicks ที่เกิดขึ้นระหว่าง shipping, handling, installation, maintenance
- แตกอาจเกิดทันที หรือ **ล่าช้าหลายสัปดาห์–เดือน**

**2. Temperature Shock**
- การเปลี่ยนแปลงอุณหภูมิอย่างรวดเร็ว
- Heat zones เฉพาะจุด (เทียน, น้ำแข็ง ฯลฯ)

**3. Nickel Sulfide (NiS) — Inclusion**
- ที่มา: NiS "stones" เกิดขึ้นในกระบวนการผลิต Float Glass จาก **Nickel Contamination**
- ขนาด: **0.003–0.015 นิ้ว** ในเส้นผ่านศูนย์กลาง (เล็กมาก — มองด้วยตาเปล่าไม่เห็น)
- ตำแหน่ง: อยู่ใน **Center Tension Zone** ของ Tempered Glass
- กลไก: เมื่อสัมผัสกับอุณหภูมิต่างๆ NiS ขยายตัว → กระจกแตกโดยไม่มีสาเหตุภายนอก
- ระยะเวลา: อาจแตก **หลายเดือนถึงหลายปี** หลังจากติดตั้ง

### 48C. ข้อเท็จจริงสำคัญเกี่ยวกับ NiS

| ข้อ | เนื้อหา |
|-----|---------|
| 1 | NiS Spontaneous Breakage เกิด **เฉพาะ Tempered Glass** — ไม่เกิดใน Annealed หรือ Heat-Strengthened |
| 2 | **ไม่มีเทคโนโลยีใดกำจัด NiS ได้ 100%** — เพราะขนาดเล็กเกินกว่าจะ inspect ได้ |
| 3 | ASTM ยอมให้มี blemish ขนาด **0.020–0.100 นิ้ว** — ใหญ่กว่า NiS stone ทั่วไปมาก |
| 4 | **Heat-Soaking** ช่วยลดความเสี่ยงได้ แต่ไม่รับประกัน 100% + เพิ่มต้นทุน, cycle time, และ scrap rate |

### 48D. ประเภทกระจกและความเสี่ยง NiS

| ประเภทกระจก | ความเสี่ยง NiS Spontaneous |
|-----------|--------------------------|
| Annealed (AN) | ❌ ไม่มีความเสี่ยง |
| Heat-Strengthened (HS) | ❌ ไม่มีความเสี่ยง |
| Tempered (TP) | ✅ มีความเสี่ยง |

**วิธีลดความเสี่ยง:** ใช้ **HS แทน TP** ในงานที่ไม่บังคับ Safety Glass — หรือ **Laminated** เพื่อกักเศษแม้แตก

### 48E. Safety Glass — ทำไมต้องใช้

**Tempered Glass Characteristics:**
- แข็งแรง **4–5 เท่า** ของ Annealed
- เมื่อแตก → ชิ้น**เล็ก** ("cubes") ไม่คม ≈ ลดอันตราย
- เรียกว่า "Safety Glass" — มีมาตรฐาน ASTM กำกับ

**Safety Glass ประเภทอื่น:**
- Laminated Glass (Polymeric Interlayer) — กักเศษไม่ให้กระเด็น

---

*Knowledge Base v3.0 — Section 46–48 เพิ่มจาก: 22_TD110F.pdf (PPG TD-110 Glass Breakage Failure Mode & Stress Estimation), Finding_the_cause_of_glass__breakages.pdf (Pilkington Blog), Spontaneous_Glass_Break_6Jan.pdf (BIFMA Memo)*
*ทุกไฟล์ใน Project สกัดครบ 100% แล้ว | Total: 2,037+ บรรทัด / 45+ Sections*

---

## 📌 SECTION 49 — SMG Industry Standards for Tempered Glass (เอกสาร SMG)

**Source:** Industry_Standards_for_Tempered_Glass1.pdf
**เจ้าของ:** บริษัท เอส เอ็ม จี กลาส แอนด์ เมทัล จำกัด | www.smg-con.co.th | LINE OA: @smg58

### 49A. มาตรฐานตรวจสอบกระจกนิรภัยเทมเปอร์ (SMG Internal Standard)

**ความหนาและความคลาดเคลื่อน:**

| ความหนา | Tolerance |
|---------|-----------|
| 4–6mm | ±0.3mm |
| 5–10mm | ±0.6mm |
| 12–15mm | ±0.8mm |
| 19mm | ±1.2mm |

**ความโก่ง (Bow):** ไม่เกิน 2mm ต่อทุกความยาว 1 เมตร

**เส้นทแยงมุม (Diagonal):**
- กระจกสี่เหลี่ยม: ±3mm
- กระจกสามเหลี่ยมมุมแหลม: ±10mm

**รอยขีดข่วน:**

| กว้าง | ความยาว | เกณฑ์ |
|-------|---------|-------|
| ≤1mm | <5mm | ผ่าน |
| ≤1mm | 5–10mm | ≤2 จุด/ตร.ม. (ห่างกัน 300mm) |
| ≤1mm | >15mm | ไม่ผ่าน |
| >1mm | <20mm | ผ่าน |
| >1mm | 10–20mm | ≤2 จุด/ตร.ม. (ห่างกัน 300mm) |
| >1mm | >30mm | ไม่ผ่าน |

**การเหลื่อม (ตามแบบปกติ):**

| ความยาว | Tolerance |
|---------|-----------|
| <1000mm | ±2mm |
| 1000–2000mm | ±3mm |
| 2000–4000mm | ±4mm |

**การเหลื่อม (ตามแบบไม้หรืออื่นๆ):**

| ความยาว | Tolerance |
|---------|-----------|
| <2000mm | ±3mm |
| 2000–4000mm | ±4mm |

### 49B. มาตรฐานตรวจสอบกระจกนิรภัยหลายชั้น (Laminated)

**ฟองอากาศในชั้นฟิล์ม:**
- φ ≤3mm: มีได้ไม่เกิน 3 จุด ห่างจากขอบไม่เกิน 5mm
- φ >3mm: ไม่ผ่าน (implicit)

**สิ่งแปลกปลอม:**
- φ 0.5–1.5mm: ≤2 จุด/ตร.ม.
- φ <0.5mm: ผ่าน
- φ ≥1.5mm: ไม่ผ่าน

**คลื่น:** ไม่เกิน 0.13mm

**ระยะการตรวจสอบ:** ต้องมองไม่เห็นที่ระยะ 1 เมตร ภายใต้แสงธรรมชาติ

### 49C. ตารางเปรียบเทียบ Tempered vs Heat-Strengthened

| รายการตรวจสอบ | Tempered | Heat-Strengthened |
|-------------|---------|------------------|
| รอยร้าว | ไม่อนุญาต | ไม่อนุญาต |
| รอยขีดข่วน | จำกัดขนาดและความยาว | จำกัดขนาดและความยาว |
| รอยบิ่น | จำกัดขนาด | จำกัดขนาด |
| การโก่งตัว | ตามมาตรฐาน | ตามมาตรฐาน |
| คลื่นบนผิว | ตามมาตรฐาน | ตามมาตรฐาน |
| ความคลาดเคลื่อน | ตามมาตรฐาน | ตามมาตรฐาน |

---

## 📌 SECTION 50 — SMG Terms and Conditions (เงื่อนไขและข้อกำหนด)

**Source:** Terms_and_Conditions.pdf
**เจ้าของ:** บริษัท เอส เอ็ม จี กลาส แอนด์ เมทัล จำกัด | www.smg-con.co.th | LINE OA: @smg58

### 50A. มาตรฐานคุณภาพกระจก SMG

ผลิตภัณฑ์กระจกทั้งหมดของ SMG ผลิตตาม **มาตรฐานอุตสาหกรรมญี่ปุ่น (JIS)** และ **มาตรฐาน AGC**

### 50B. เงื่อนไขสำหรับกระจกแต่ละประเภท

| ประเภท | คุณสมบัติหลัก | เงื่อนไขเพิ่มเติม |
|--------|-------------|-----------------|
| Float Glass | พื้นผิวเรียบ, โปร่งแสงสูง, ความหนาหลากหลาย | อาจมีรอยขีดข่วนเล็กน้อยตามมาตรฐาน |
| Laminated Glass | ความปลอดภัยสูง, กันเสียง, ป้องกัน UV | อาจมีฟองอากาศเล็กๆ ระหว่าง PVB ตามมาตรฐาน |
| Reflective Glass | ลดความร้อน, ความเป็นส่วนตัว, รูปลักษณ์ทันสมัย | สีอาจแตกต่างเล็กน้อยตามสภาพแสง |
| Low-E Glass | ประหยัดพลังงาน, ลดความร้อน/เย็น, ป้องกัน UV | ค่าการส่งผ่านแสงอาจต่างกันตามชนิด Coating |
| Tempered Glass | แข็งแรง 4–5 เท่า, แตกเป็นเม็ดเล็กไม่อันตราย | อาจบิดเบี้ยวเล็กน้อย, **ห้ามตัด/เจาะ/ขัดหลัง temper** |
| Heat-Strengthened | แข็งแรง 2 เท่า, ทนอุณหภูมิ | แข็งแรงน้อยกว่า Tempered, อาจแตกแผ่นใหญ่ |

### 50C. เงื่อนไขทางการค้า

| รายการ | รายละเอียด |
|--------|-----------|
| การแจ้งปัญหา | ภายใน **7 วัน** นับจากวันรับสินค้า |
| การตรวจสอบ | ตรวจก่อนติดตั้ง — หากติดตั้งแล้ว SMG ขอสงวนสิทธิ์รับผิดชอบ |
| การรับประกัน | ตามเงื่อนไขที่ระบุในใบเสนอราคา |

---

## 📌 SECTION 51 — ค่าการสูญเสียการส่งผ่านเสียง (STL) — ตาราง AGC ฉบับสมบูรณ์

**Source:** ค_าการส_ญเส_ยการส_งผ_านเส_ยง_STL.pdf
**มาตรฐาน:** JIS A 4706 | Ts = 1/3 octave & 1 octave

### 51A. Single Pane (กระจกแผ่นเดี่ยว)

| รหัส | กระจก | Avg STL | Ts 1/3 oct | Ts 1 oct | 125Hz | 250Hz | 500Hz | 1000Hz | 2000Hz | 4000Hz | fc (Hz) |
|------|-------|---------|-----------|---------|-------|-------|-------|--------|--------|--------|---------|
| FL3 | 3mm single | 25 | Ts-25 | Ts-25 | 15.3 | 19.5 | 25.3 | 29.8 | 33.0 | 25.6 | 4000 |
| FL4 | 4mm single | 26 | Ts-25 | Ts-25 | 18.1 | 22.0 | 27.4 | 31.8 | 31.0 | 25.8 | 3000 |
| FL5 | 5mm single | 27 | Ts-25 | Ts-30 | 19.1 | 23.7 | 29.0 | 33.4 | 28.1 | 30.7 | 2400 |
| FL6 | 6mm single | 28 | Ts-25 | Ts-30 | 19.0 | 25.0 | 30.6 | 34.2 | 28.6 | 34.2 | 2000 |
| PW6.8 | 6.8mm pattern | 29 | Ts-30 | Ts-30 | 20.5 | 25.4 | 31.6 | 34.5 | 29.4 | 36.7 | 1765 |
| FL8 | 8mm single | 29 | Ts-30 | Ts-30 | 21.2 | 25.7 | 32.2 | 33.2 | 31.2 | 39.5 | 1500 |
| FL10 | 10mm single | 31 | Ts-30 | Ts-35 | 23.7 | 27.6 | 33.8 | 32.7 | 34.6 | 43.0 | 1200 |
| FL12 | 12mm single | 33 | Ts-35 | Ts-35 | 24.9 | 29.6 | 34.8 | 33.7 | 38.4 | 45.5 | 1000 |
| FL15 | 15mm single | 34 | Ts-35 | Ts-35 | 25.2 | 30.6 | 35.6 | 34.2 | 42.0 | 48.8 | 800 |
| FL19 | 19mm single | 35 | Ts-35 | Ts-35 | 26.7 | 31.2 | 35.1 | 36.2 | 46.2 | 51.1 | 632 |

### 51B. Laminated Glass

| รหัส | กระจก | Avg STL | Ts 1/3 oct | Ts 1 oct | 125Hz | 250Hz | 500Hz | 1000Hz | 2000Hz | 4000Hz |
|------|-------|---------|-----------|---------|-------|-------|-------|--------|--------|--------|
| L6 | 6mm lam (3+PVB+3) | 28 | Ts-30 | Ts-30 | 19.6 | 24.4 | 30.4 | 34.6 | 32.3 | 37.7 |
| L8 | 8mm lam (4+PVB+4) | 30 | Ts-30 | Ts-30 | 22.5 | 26.1 | 32.1 | 34.8 | 33.5 | 42.8 |
| L10 | 10mm lam (5+PVB+5) | 32 | Ts-30 | Ts-35 | 25.2 | 27.9 | 33.4 | 34.6 | 35.7 | 45.7 |
| L12 | 12mm lam (6+PVB+6) | 33 | Ts-35 | Ts-35 | 26.4 | 29.5 | 34.9 | 34.9 | 38.7 | 48.0 |

**หมายเหตุ fc:** Critical Frequency — ความถี่ที่ประสิทธิภาพกันเสียงลดต่ำสุด (Coincidence Dip)
- กระจกบาง: fc สูง (4000Hz = เสียงสูง), กระจกหนา: fc ต่ำลง (632Hz = เสียงต่ำ)
- LAM มี fc ต่ำกว่า FL ที่ความหนาเทียบกัน → กันเสียงความถี่สูงได้ดีกว่า

---

## 📌 SECTION 52 — ตารางมาตรฐานอุตสาหกรรมกระจกนิรภัย (Northern Glass / FM-CSD-011)

**Source:** ตารางมาตรฐานกระจกน_รภ_ย.jpg (combined), ตารางมาตรฐานกระจกน_รภ_ย_Laminated.jpg, ตารางมาตรฐานกระจกน_รภ_ย_Tempered.jpg
**Issuer:** Northern Glass — www.northernglass.co.th | Tel. 038-198-553, 093-318-5777
**Form:** FM-CSD-011 Rev.01 Eff: 20-Dec-23

### 52A. กระจกลามิเนต (Laminated) — มาตรฐานตรวจสอบ

| ข้อกำหนด | รายละเอียด |
|---------|-----------|
| ความหนา | ±1mm ทุกความหนา |
| กระจกสี่เหลี่ยม | ±2mm |
| กระจก Shape สี่เหลี่ยม | ±3mm |
| กระจก Shape สามเหลี่ยมมุมแหลม | ±5mm |
| เส้นทแยงมุม | ≤3mm |
| ความโก่ง | 2mm ต่อทุกความยาว 1 เมตร |
| คลื่น | ไม่เกิน 0.13mm |
| ฟองอากาศในชั้นฟิล์ม | φ≤3mm: ≤3 จุด ห่างขอบ ≤5mm |
| สิ่งแปลกปลอม φ 0.5–1.5mm | ≤2 จุด/ตร.ม. |
| สิ่งแปลกปลอม φ <0.5mm | ผ่าน |
| สิ่งแปลกปลอม φ ≥1.5mm | ไม่ผ่าน |
| ระยะการตรวจสอบ | ต้องมองไม่เห็นที่ระยะ 1 เมตร ภายใต้แสงธรรมชาติ |
| Logo | อ้างอิงจากเอกสารสั่งผลิต / เงื่อนไขลูกค้า |

**รอยขีดข่วน (Laminated):**

| กว้าง | ความยาว | เกณฑ์ |
|-------|---------|-------|
| 0.5mm | <20mm | ผ่าน |
| 0.5mm | 10–20mm | 2 จุด/ตร.ม. (ห่าง 300mm) |
| 0.5mm | >30mm | ไม่ผ่าน |
| >1mm | <5mm | ผ่าน |
| >1mm | 5–10mm | 2 จุด/ตร.ม. (ห่าง 300mm) |
| >1mm | >15mm | ไม่ผ่าน |

**การเหลื่อมของกระจก (ตามแบบปกติ):**

| ความยาว | Tolerance |
|---------|-----------|
| <1000mm | ±2mm |
| 1000–2000mm | ±3mm |
| 2000–4000mm | ±4mm |
| ≥4000mm | ±4mm (Over Size ขึ้นอยู่กับการตกลง) |

**การเหลื่อมของกระจก (ตามแบบไม้หรืออื่นๆ):**

| ความยาว | Tolerance |
|---------|-----------|
| <2000mm | ±3mm |
| 2000–4000mm | ±4mm |
| ≥4000mm | ±5mm (Over Size ขึ้นอยู่กับการตกลง) |

### 52B. กระจกเทมเปอร์ (Tempered) — มาตรฐานตรวจสอบ

| ข้อกำหนด | รายละเอียด |
|---------|-----------|
| ความหนา 4–6mm | ±0.3mm |
| ความหนา 8–10mm | ±0.6mm |
| ความหนา 12–15mm | ±0.8mm |
| ความหนา 19mm | ±1.2mm |
| เส้นทแยงมุม | ≤3mm |
| ความโก่ง | 2mm ต่อทุกความยาว 1 เมตร |
| คลื่น | ไม่เกิน 0.13mm |
| ระยะการตรวจสอบ | ต้องมองไม่เห็นที่ระยะ 1 เมตร ภายใต้แสงธรรมชาติ |
| Logo | อ้างอิงจากเอกสารสั่งผลิต / เงื่อนไขลูกค้า |

**ขนาดกระจก (Shape สี่เหลี่ยม) — Tempered:**

| ความหนา | ≤1000mm | >1000–2000mm | >2000–3000mm |
|---------|---------|-------------|-------------|
| 4, 5, 6mm | ±2mm | ±3mm | ±4mm |
| 8, 10, 12mm | ±2mm | ±3mm | ±4mm |
| 15mm | ±4mm | ±4mm | ±6mm |
| 19mm | ±5mm | ±5mm | — |
| Shape สามเหลี่ยมมุมแหลม | ±10mm | — | — |

**รอยขีดข่วน (Tempered) — เหมือนกับ Laminated ข้างต้น**

---

## 📌 SECTION 53 — กฎหมายอาคาร & พลังงาน — ฉบับที่เกี่ยวข้องกับกระจก

**Sources:** กฎกระทรวง/พรบ./ประกาศหลายฉบับ

### 53A. กฎกระทรวง กำหนดกระจกเพื่อการอนุรักษ์พลังงาน พ.ศ. 2552
**ราชกิจจานุเบกษา:** เล่ม 126 ตอนที่ 23ก วันที่ 8 เมษายน 2552
**ออกตาม:** พรบ. ส่งเสริมการอนุรักษ์พลังงาน พ.ศ. 2535

**นิยามสำคัญ:**
- **"กระจก"** = กระจกที่ใช้เป็นส่วนประกอบของผนังด้านนอกอาคาร ช่วยในการอนุรักษ์พลังงาน โดยการลดความร้อนจากรังสีอาทิตย์ที่สองผ่านกระจก และส่งเสริมการใช้แสงธรรมชาติเพื่อการส่องสว่างภายในอาคาร
- **"ค่ามาตรฐานพลังงาน"** = ค่าประสิทธิภาพของกระจก กำหนดในรูปของ SHGC และ VLT/SHGC

**ค่ามาตรฐานพลังงาน (ข้อ 2):**

| ค่า | ช่วงกำหนด |
|-----|---------|
| SHGC (ค่าสัมประสิทธิ์การส่งผ่านความร้อนจากรังสีอาทิตย์) | **0.55–0.30** |
| VLT/SHGC (ค่าการส่องผ่านแสงธรรมชาติต่อ SHGC) | **1.20–1.60** |

**มาตรฐานการทดสอบ (ข้อ 4):** ISO 9050 และ ISO 10292
**ผู้ทดสอบ:** หน่วยงานที่รัฐมนตรีประกาศกำหนด

### 53B. ประกาศกระทรวงพลังงาน — กำหนดค่ามาตรฐานการออกแบบอาคารเพื่ออนุรักษ์พลังงาน พ.ศ. 2564
**ราชกิจจานุเบกษา:** เล่ม 138 ตอนพิเศษ 315ง วันที่ 24 ธันวาคม 2564
**ออกตาม:** กฎกระทรวงอนุรักษ์พลังงาน พ.ศ. 2563

**ค่า OTTV สูงสุด (Overall Thermal Transfer Value — ผนังด้านนอก) วัตต์/ตร.ม.:**

| ประเภทอาคาร | OTTV สูงสุด (W/m²) |
|------------|------------------|
| โรงมหรสพ | 40 |
| โรงแรม | 30 |
| สถานบริการ | 40 |
| สถานพยาบาล | 30 |
| สถานศึกษา | 50 |
| สำนักงานหรือที่ทำการ | 50 |
| ห้างสรรพสินค้า/ศูนย์การค้า | 40 |
| อาคารชุด | 30 |
| อาคารชุมนุมคน | 40 |

**ค่า RTTV สูงสุด (หลังคา) วัตต์/ตร.ม.:**

| ประเภทอาคาร | RTTV สูงสุด (W/m²) |
|------------|------------------|
| โรงมหรสพ | 8 |
| โรงแรม | 6 |
| สถานพยาบาล | 6 |
| สถานศึกษา | 10 |
| สำนักงาน | 10 |
| ห้างสรรพสินค้า | 8 |
| อาคารชุด | 6 |

**ค่า LPD สูงสุด — ไฟส่องสว่าง (Lighting Power Density) วัตต์/ตร.ม.:**

| ประเภทอาคาร | LPD (W/m²) |
|------------|-----------|
| โรงมหรสพ/สถานบริการ/ชุมนุมคน | 11 |
| โรงแรม/สถานพยาบาล/อาคารชุด | 12 |
| สถานศึกษา/สำนักงาน | 10 |
| ห้างสรรพสินค้า | 11 |

**ประสิทธิภาพแอร์ (เครื่องปรับอากาศ ≤12,000W):** ต้องผ่านเกณฑ์เบอร์ 5 (ขั้นต่ำ) ของการไฟฟ้าฝ่ายผลิต

### 53C. ประกาศคณะกรรมการควบคุมอาคาร พ.ศ. 2565
**ราชกิจจานุเบกษา:** เล่ม 140 ตอนพิเศษ 17ง วันที่ 24 มกราคม 2566
**สาระสำคัญ:** นำกฎกระทรวงอนุรักษ์พลังงาน พ.ศ. 2563 มาบังคับใช้ตามกฎหมายควบคุมอาคาร
- เจ้าของอาคารต้องจัดทำรายงานผลตรวจประเมินการออกแบบ
- ผู้ตรวจประเมินต้องได้รับใบประกอบวิชาชีพ (วิศวกรรม/สถาปัตยกรรม) + ผ่านการอบรม DEDE

### 53D. กฎกระทรวง กำหนดการออกแบบโครงสร้างอาคาร พ.ศ. 2566
**ราชกิจจานุเบกษา:** เล่ม 140 ตอนที่ 54ก วันที่ 6 กันยายน 2566
**ยกเลิก:** กฎกระทรวงฉบับที่ 6 (2527), ฉบับที่ 48 (2540), ฉบับที่ 60 (2549)
**นิยามสำคัญที่เกี่ยวข้อง:**
- **แรงลม** = แรงที่เกิดจากลมใช้ในการออกแบบโครงสร้างอาคาร
- **น้ำหนักบรรทุกคงที่** = น้ำหนักวัสดุก่อสร้างที่ยึดติดกับอาคารถาวร (รวมกระจก)
- **น้ำหนักบรรทุกจร** = น้ำหนักจากการใช้งานตามปกติ

### 53E. พรบ. ควบคุมอาคาร — ฉบับที่เกี่ยวข้อง

| ฉบับ | ปี พ.ศ. | สาระสำคัญที่เกี่ยวข้อง |
|-----|---------|----------------------|
| พรบ. ควบคุมอาคาร ฉบับที่ 4 | 2550 | เพิ่มมาตรา 7(8): ยกเว้นหน่วยงานรัฐจัดที่อยู่ผู้มีรายได้น้อย ไม่ผ่อนผันเรื่องความมั่นคงและความปลอดภัย |
| พรบ. ควบคุมอาคาร ฉบับที่ 5 | 2558 | เพิ่ม ม.8 วรรคสอง: รายละเอียดเทคนิคออกแบบตามประกาศได้, ม.32ตรี: ต้องมีประกันภัยสำหรับอาคารชนิดที่กำหนด |

---

## 📌 SECTION 54 — TISI: ความรู้ทั่วไปเกี่ยวกับกระจกสำหรับอาคาร

**Source:** tisi_go_th4.pdf | สำนักงานมาตรฐานผลิตภัณฑ์อุตสาหกรรม (สมอ.)

### 54A. วัตถุดิบหลักในการผลิตกระจก

| วัตถุดิบ | สัดส่วน | แหล่งที่มา |
|---------|---------|-----------|
| ทรายแก้ว (SiO₂) | 45.5% | จังหวัดระยอง (SiO₂ >99.4%, Fe₂O₃ <0.06%) |
| เศษกระจก (Cullet) | 27.3% | ช่วยเร่งการหลอมละลาย |
| โซดาแอช (Na₂CO₃) | 11.8% | นำเข้าต่างประเทศ — ลดอุณหภูมิหลอม |
| หินฟันม้า (Feldspar) | 9.7% | ใน ประเทศ — Al₂O₃ ช่วยความทนทาน |
| หินปูน (CaCO₃) | 3.1% | ในประเทศ |
| หินโดโลไมต์ | 1.4% | ในประเทศ |
| โซเดียมซัลเฟต (Na₂SO₄) | 1.2% | นำเข้า |

### 54B. อุตสาหกรรมการผลิตกระจก 2 ขั้นตอนหลัก

**1. อุตสาหกรรมกระจกพื้นฐาน:**
- กระจกโฟลต (Float Glass) — กระบวนการลอยบนดีบุกหลอมเหลว
- กระจกแผ่น (Sheet Glass) — กระบวนการดึง

**2. อุตสาหกรรมแปรรูปกระจก:**
- กระจกเทมเปอร์
- กระจกลามิเนต
- กระจกอินซูเลท (IGU)
- กระจกสะท้อนแสง / กระจก Low-E

### 54C. มาตรฐานผลิตภัณฑ์อุตสาหกรรมกระจกในไทย (อนุกรม มอก.)

| มอก. | ชื่อมาตรฐาน |
|-----|-----------|
| มอก. 54-2558 | กระจกแผ่น |
| มอก. 880-2547 | กระจกโฟลตใส |
| มอก. 965-2560 | กระจกเทมเปอร์ |
| มอก. 1222-2560 | กระจกนิรภัยหลายชั้น (Laminated) |
| มอก. 1231-2558 | กระจกฉนวน (IGU) |
| มอก. 1344-2541 | กระจกโฟลตสีตัดแสง |
| มอก. 1345-2558 | กระจกแผ่นสีตัดแสง |
| มอก. 1732-2558 | กระจกเงา |
| มอก. 2203-2558 | กระจกลวดลาย |
| มอก. 2366 | OTTV อาคาร |
| มอก. 2672-2558 | กระจกสะท้อนแสง |
| มอก. 2736-2559 | กระจกเปล่งรังสีความร้อนต่ำ (Low-E) |
| มอก. 2737-2559 | กระจกอบแข็งด้วยความร้อน (Heat-Strengthened) |

---

*Knowledge Base v3.0 — Section 49–54 เพิ่มจาก: Industry_Standards_for_Tempered_Glass1.pdf (SMG Internal), Terms_and_Conditions.pdf (SMG T&C), ค่าการสูญเสียการส่งผ่านเสียง_STL.pdf (AGC JIS A4706 ฉบับสมบูรณ์), ตารางมาตรฐานกระจกนิรภัย x3 (Northern Glass FM-CSD-011), กฎหมายพลังงาน+อาคาร (SHGC 0.30-0.55, OTTV, RTTV, LPD ครบทุกประเภทอาคาร), tisi_go_th4.pdf (TISI ความรู้ทั่วไปกระจก)*

---

## 📌 SECTION 55 — ตารางความหนากระจกและครีบ เทียบกับกระแสลม (TAG GLACADE เพิ่มเติม)

**Source:** ตารางความหนาของกระจก_และขนาดของคร_บ_เปร_ยบเท_ยบก_บ_กระแสลม.pdf
**หมายเหตุ:** ข้อมูลเดียวกับ §41 (TAG Glacade) — ยืนยันว่า Section 41A และ 41B ครบถ้วนแล้ว ไม่มีข้อมูลใหม่เพิ่มเติม

---

## 📌 SECTION 56 — พรบ. ควบคุมอาคาร — ประวัติและฉบับหลัก

**Sources:** พรบ__ควบค_มอาคาร_2522.pdf, 2535.pdf, 2543.pdf

### 56A. ลำดับ พรบ. ควบคุมอาคาร

| ฉบับ | ปี พ.ศ. | ราชกิจจานุเบกษา | สาระสำคัญ |
|-----|---------|----------------|---------|
| พรบ. ควบคุมอาคาร (ฉบับหลัก) | 2522 | เล่ม 96 ตอนที่ 80 (19 พ.ค. 2522) | กฎหมายหลัก — ควบคุมการก่อสร้าง ดัดแปลง รื้อถอน เคลื่อนย้าย และการใช้อาคาร |
| พรบ. ควบคุมอาคาร ฉบับที่ 2 | 2535 | — | แก้ไขเพิ่มเติมฉบับ 2522 |
| พรบ. ควบคุมอาคาร ฉบับที่ 3 | 2543 | — | แก้ไขเพิ่มเติม รวมถึงการออกแบบเพื่ออนุรักษ์พลังงาน |
| พรบ. ควบคุมอาคาร ฉบับที่ 4 | 2550 | เล่ม 124 ตอนที่ 68ก (16 ต.ค. 2550) | เพิ่ม ม.7(8): ยกเว้นอาคารรัฐสำหรับผู้มีรายได้น้อย |
| พรบ. ควบคุมอาคาร ฉบับที่ 5 | 2558 | เล่ม 132 ตอนที่ 82ก (27 ส.ค. 2558) | เพิ่ม ม.8 วรรคสอง + ม.32ตรี (ประกันภัย) + ม.39ทวิ (แจ้งก่อสร้าง) |

### 56B. สาระสำคัญที่เกี่ยวกับกระจก

**ม.8 แห่ง พรบ.2522 (แก้ไขโดย ฉ.3/2543 และ ฉ.5/2558):**
รัฐมนตรีมีอำนาจออกกฎกระทรวงกำหนด:
- (2) วัสดุที่ใช้ในการก่อสร้างอาคาร (**ครอบคลุมกระจก**)
- (3) ลักษณะของอาคารเพื่อความปลอดภัยและความมั่นคง
- วรรคสอง: รายละเอียดทางเทคนิคที่เปลี่ยนแปลงรวดเร็วสามารถออกเป็นประกาศในราชกิจจานุเบกษาได้

**ความเชื่อมโยงกับกระจก:**
- กฎกระทรวง กำหนดกระจกเพื่ออนุรักษ์พลังงาน พ.ศ.2552 ออกตาม ม.8 ของ พรบ.นี้
- กฎกระทรวง กำหนดโครงสร้างอาคาร พ.ศ.2566 ออกตาม ม.5(3) และ ม.8(2)(3) ของ พรบ.นี้

---

## 📌 SECTION 57 — วิธีคำนวณ OTTV — สูตรและค่าอ้างอิง BEC 2564

**Source:** ประกาศกระทรวงพล_งงาน_เร__อง_หล_กเกณฑ__ว_ธ.pdf / ว_ธ_คำนวณ_หล_กเกณฑ__อาคารอน_ร_กษ__2564.pdf
**ราชกิจจานุเบกษา:** เล่ม 138 ตอนพิเศษ 315ง วันที่ 24 ธันวาคม 2564

### 57A. สูตร OTTV (Overall Thermal Transfer Value)

**สูตรหลัก:**
```
OTTVᵢ = (Uw)(1−WWR)(TDeq) + (Uf)(WWR)(ΔT) + (WWR)(SHGC)(SC)(ESR)
```

**ตัวแปร:**
| ตัวแปร | ความหมาย | หน่วย |
|--------|---------|-------|
| OTTVᵢ | ค่าการถ่ายเทความร้อนรวมผนังด้านที่พิจารณา | W/m² |
| Uw | สัมประสิทธิ์การถ่ายเทความร้อนรวมของผนังทึบ | W/(m².°C) |
| WWR | อัตราส่วนพื้นที่หน้าต่างต่อพื้นที่ผนังทั้งหมด | — |
| TDeq | ค่าความแตกต่างอุณหภูมิเทียบเท่า (ผนังทึบ) | °C |
| Uf | สัมประสิทธิ์การถ่ายเทความร้อนรวมของกระจก/ผนังโปร่งแสง | W/(m².°C) |
| ΔT | ความแตกต่างอุณหภูมิภายใน-ภายนอก | °C |
| SHGC | สัมประสิทธิ์การส่งผ่านความร้อนจากรังสีอาทิตย์ของกระจก | — |
| SC | สัมประสิทธิ์การบังแดดของอุปกรณ์บังแดดภายนอก | — |
| ESR | ค่ารังสีอาทิตย์ตกกระทบที่มีผลต่อการถ่ายเทความร้อน | W/m² |

**OTTV เฉลี่ยทั้งอาคาร:**
```
OTTV = Σ(Awᵢ × OTTVᵢ) / Σ(Awᵢ)
```

### 57B. ค่า ΔT — ความแตกต่างอุณหภูมิภายใน-ภายนอก

| ประเภทอาคาร | ΔT (°C) |
|------------|---------|
| โรงมหรสพ | 5 |
| โรงแรม | 3 |
| สถานบริการ | 5 |
| สถานพยาบาล | 3 |
| สถานศึกษา | 7 |
| สำนักงาน | 7 |
| ห้างสรรพสินค้า | 5 |
| อาคารชุด | 3 |
| อาคารชุมนุมคน | 5 |

### 57C. ค่าสัมประสิทธิ์การนำความร้อนกระจก (BEC 2564)

**ตารางที่ 1.3 — ค่า k ของกระจก:**
- กระจกใส: k = **0.960 W/(m.°C)**, ρ = 2,500 kg/m³

### 57D. ตารางที่ 1.7 — ค่า SHGC และ τvis ของกระจกชนิดต่างๆ

**กระจกชั้นเดียวไม่เคลือบผิว (6mm):**

| ชนิดกระจก | τvis | SHGC |
|----------|------|------|
| กระจกใส | 0.88 | 0.73 |
| กระจกสีบรอนซ์ | 0.54 | 0.54 |
| กระจกสีเขียว | 0.76 | 0.54 |
| กระจกสีเทา | 0.46 | 0.52 |
| กระจกสีฟ้าอมเขียว | 0.75 | 0.55 |

**กระจกสะท้อนแสงชั้นเดียว (6mm):**

| ชนิดกระจก | τvis | SHGC |
|----------|------|------|
| กระจกใสเคลือบโลหะสเตนเลส 20% | 0.20 | 0.28 |
| กระจกใสเคลือบไทเทเนียม 20% | 0.20 | 0.27 |
| กระจกใสเคลือบไทเทเนียม 30% | 0.30 | 0.35 |

**กระจกสองชั้น ไม่เคลือบผิว (6+6mm):**

| ชนิดกระจก | τvis | SHGC |
|----------|------|------|
| กระจกสีฟ้าอมเขียว + กระจกใส | 0.67 | 0.43 |
| กระจกสีเขียวคุณภาพสูง + กระจกใส | 0.59 | 0.33 |

**กระจกสะท้อนแสงสองชั้น:**

| ชนิดกระจก | τvis | SHGC |
|----------|------|------|
| กระจกใสเคลือบไทเทเนียม 30% + กระจกใส | 0.27 | 0.25 |

**กระจก Low-E สองชั้น (ε = 0.2):**

| ชนิดกระจก | τvis | SHGC |
|----------|------|------|
| Low-E + กระจกใส | 0.73 | 0.53 |

**กระจก Low-E สองชั้น (ε = 0.1):**

| ชนิดกระจก | τvis | SHGC |
|----------|------|------|
| Low-E (ε=0.1) + กระจกใส | 0.72 | 0.44 |
| กระจกสีเขียวคุณภาพสูง + Low-E (ε=0.1) | 0.57 | 0.27 |

### 57E. ค่าความต้านทานความร้อนของช่องว่างอากาศ (ตารางที่ 1.5)

| ความหนาช่องอากาศ (mm) | ε สูง (R value m².°C/W) | ε ต่ำ/Low-E (R value m².°C/W) |
|----------------------|------------------------|------------------------------|
| 13 | 0.119 | 0.345 |
| 10 | 0.110 | 0.278 |
| 7 | 0.097 | 0.208 |
| 6 | 0.091 | 0.196 |
| 5 | 0.084 | 0.167 |

**หมายเหตุ:**
- ช่องอากาศทั่วไป: ใช้ค่า **ε สูง**
- ถ้ากระจกด้านติดช่องอากาศเคลือบ Low-E (ε ต่ำ): ใช้คอลัมน์ **ε ต่ำ**
- ช่องอากาศ >13mm: ใช้ค่าที่ 13mm
- ช่องอากาศอยู่ระหว่างค่าในตาราง: ใช้ Linear Interpolation

### 57F. สูตรคำนวณ Uf กระจก

**กระจกชั้นเดียว:**
```
Uf = 1/Rf
Rf = Ri + (Δx/kg) + Ro
```
- Ri, Ro = Film resistance ภายใน-ภายนอก (จากตาราง 1.1)
- Δx = ความหนากระจก (m)
- kg = 0.960 W/(m.°C) สำหรับกระจกใส

**กระจกลามิเนต:** ใช้สูตรเดียวกับผนังหลายชั้น (คำนวณทีละชั้น)

**กระจกสองชั้น (IGU):** ใช้สูตรผนังหลายชั้น + ค่า R ของช่องอากาศจากตาราง 1.5

### 57G. SC — สัมประสิทธิ์บังแดดของอุปกรณ์บังแดด

```
SC = Eew / Eet
```
- Eew = รังสีที่ผ่านอุปกรณ์บังแดดมาตกหน้าต่าง (W/m²)
- Eet = รังสีรวมที่ตกหน้าต่าง (กรณีไม่มีบังแดด) (W/m²)

**SC เฉลี่ยทั้งปี:** คำนวณจาก 4 วันอ้างอิง: 21 มีนาคม, 22 มิถุนายน, 23 กันยายน, 22 ธันวาคม

---

*Knowledge Base v3.0 — Section 55–57 เพิ่มจาก: ตารางความหนากระจก_ครีบ.pdf (duplicate §41), พรบ.ควบคุมอาคาร 2522/2535/2543 (image-based), ประกาศกระทรวงพลังงาน_หลักเกณฑ์วิธีคำนวณ.pdf (สูตร OTTV, ตาราง SHGC/τvis กระจก 11 ชนิด, R-value ช่องอากาศ, ΔT แยก 9 ประเภทอาคาร)*

---

## 📌 SECTION 58 — ข้อมูลกระจกกันเสียง — ชุดภาพ & ตาราง (ชุดใหม่)

**Sources:** glassstc.jpg, R111580304.jpg, 9799.jpg, 9802.jpg, 9817.jpg, 9818.jpg, 04oct01.jpg, sound_meter.jpg, กระจกกันเสียง_๑๙๐๔๑๗_0003.jpg

---

### 58A. หลักการกันเสียงของกระจก (จาก 9802.jpg — dynamicwindows.com)

เมื่อเสียงกระทบกระจก แบ่งออกเป็น 3 ส่วน:

| เส้นทางเสียง | คำอธิบาย |
|------------|---------|
| **Transmitted Sound** | เสียงที่ผ่านกระจกไปอีกด้าน — ส่วนใหญ่ผ่านไป (majority) |
| **Reflected Sound** | เสียงที่กระจกสะท้อนกลับ |
| **Absorbed Sound** | เสียงที่กระจกดูดซับไว้ |

**STC value 30 dB** = ตัวอย่างค่ากันเสียงกระจกทั่วไป ที่แสดงในแผนภาพ

---

### 58B. ตาราง STC กระจกแต่ละประเภท (จาก glassstc.jpg — ตาราง SMG)

**กระจกชั้นเดียว (Single Pane):**

| ชนิด | ความหนา | STC |
|------|---------|-----|
| กระจกชั้นเดียว | 6mm | 31 |
| กระจกชั้นเดียว | 12mm | 33 |
| กระจกชั้นเดียว | 16mm | 35 |

**กระจกลามิเนต (Laminated):**

| ชนิด | โครงสร้าง | STC |
|------|---------|-----|
| กระจกลามิเนต 6.38mm | 3+0.38+3mm (ฟิล์ม PVB 0.38mm) | 32 |
| กระจกลามิเนต 12.38mm | 6+0.38+6mm (ฟิล์ม PVB 0.38mm) | 37 |
| กระจกลามิเนต 20.76mm | 10+0.76+10mm (ฟิล์ม PVB 0.38mm 2 ชั้น) | 40 |

**กระจกสองชั้น (Double Glazing / IGU):**

| ชนิด | โครงสร้าง | STC |
|------|---------|-----|
| กระจกสองชั้น | 6mm + ช่องว่าง 6mm + 6mm | 30 |
| กระจกสองชั้น | 6mm + ช่องว่าง 10mm + 6mm | 32 |
| กระจกสองชั้น | 6mm + ช่องว่าง 70mm + 6mm | **46** |

**⚠️ Key Insight:** ช่องว่างกว้าง 70mm ให้ STC สูงถึง 46 — แต่หนามากและต้องการกรอบพิเศษ

---

### 58C. การเลือกกระจกกันเสียง (จาก R111580304.jpg)

**กระจกชั้นเดียว:**
- 3mm → STC 30
- 6mm → STC 31
- 12mm → STC 36

**กระจกลามิเนต:**
- 6mm (3+3mm) → STC 35
- 12mm (6+6mm) → STC 38
- หนารวม 19mm → STC 41

**กระจกสองชั้น:**
- 3mm + อากาศ 6mm + 3mm → STC 28
- 6mm + อากาศ 12mm + 6mm → STC 35

**หลักสำคัญ:** กระจกลามิเนตให้ STC สูงกว่ากระจกเดี่ยวที่ความหนาเท่ากัน เพราะ PVB ดูดซับการสั่นสะเทือน

---

### 58D. ตาราง Sound Reduction Rating เปรียบเทียบ (จาก 9818.jpg)

| Glass Type | Perceived Sound Reduction (%) |
|-----------|-------------------------------|
| Single glass 4mm | 10% |
| Double glazing 4/12/4* | 20% |
| Double glazing 6/12/6 | 25% |
| Double glazing 6.38**/12/4 | 57% |

*4mm float glass / 12mm air space / 4mm float glass
**6.38 = 6mm laminated glass

**⚠️ Key Insight:** LAM 6.38mm + Air 12mm + Float 4mm ให้การลดเสียงเพิ่มขึ้นถึง **57%** เมื่อเทียบกับ Double glazing ธรรมดา

---

### 58E. ตาราง Sound Transmission Loss ฉบับสมบูรณ์ — AGC JIS A4706 (จาก กระจกกันเสียง_๑๙๐๔๑๗_0003.jpg)

ตารางนี้ครอบคลุม Single Pane, Laminated, IGU และ Double Window ทุก Configuration

**Single Pane (กระจกแผ่นเดี่ยว):**

| รหัส | Avg | Ts 1/3 | 125 | 250 | 500 | 1k | 2k | 4k | fc |
|------|-----|--------|-----|-----|-----|----|----|----|----|
| FL3 | 25 | Ts-25 | 15.3 | 19.5 | 25.3 | 29.8 | 33.0 | 25.6 | 4000Hz |
| FL4 | 26 | Ts-25 | 18.1 | 22.0 | 27.4 | 31.8 | 31.0 | 25.8 | 3000Hz |
| FL5 | 27 | Ts-25 | 19.1 | 23.7 | 29.0 | 33.4 | 28.1 | 30.7 | 2400Hz |
| FL6 | 28 | Ts-25 | 19.0 | 25.0 | 30.6 | 34.2 | 28.6 | 34.2 | 2000Hz |
| PW6.8 | 29 | Ts-30 | 20.5 | 25.4 | 31.6 | 34.5 | 29.4 | 36.7 | 1765Hz |
| FL8 | 29 | Ts-30 | 21.2 | 25.7 | 32.2 | 33.2 | 31.2 | 39.5 | 1500Hz |
| FL10 | 31 | Ts-30 | 23.7 | 27.6 | 33.8 | 32.7 | 34.6 | 43.0 | 1200Hz |
| FL12 | 33 | Ts-35 | 24.9 | 29.6 | 34.8 | 33.7 | 38.4 | 45.5 | 1000Hz |
| FL15 | 34 | Ts-35 | 25.2 | 30.6 | 35.6 | 34.2 | 42.0 | 48.8 | 800Hz |
| FL19 | 35 | Ts-35 | 26.7 | 31.2 | 35.1 | 36.2 | 46.2 | 51.1 | 632Hz |

**Laminated (กระจกลามิเนต — รวม Low/High Temp):**

| รหัส | Avg | Ts 1/3 | 125 | 250 | 500 | 1k | 2k | 4k | fc |
|------|-----|--------|-----|-----|-----|----|----|----|----|
| L6 | 28 | Ts-30 | 19.6 | 24.4 | 30.4 | 34.6 | 32.3 | 37.7 | 2000Hz |
| L8 | 30 | Ts-30 | 22.5 | 26.1 | 32.1 | 34.8 | 33.5 | 42.8 | 1500Hz |
| L10 | 32 | Ts-30 | 25.2 | 27.9 | 33.4 | 34.6 | 35.7 | 45.7 | 1200Hz |
| L12 | 33 | Ts-35 | 26.4 | 29.5 | 34.9 | 34.9 | 38.7 | 48.0 | 1000Hz |
| L16 | 35 | Ts-35 | 27.1 | 31.1 | 35.3 | 35.4 | 43.7 | 51.0 | 750Hz |
| L6(low temp) | 28 | Ts-30 | 19.7 | 24.7 | 30.4 | 34.0 | 28.9 | 36.0 | 2000Hz |
| L6(high temp) | 30 | Ts-30 | 20.4 | 25.2 | 30.9 | 35.4 | 36.2 | 37.8 | 2000Hz |
| L12(low temp) | 33 | Ts-30 | 24.7 | 29.8 | 34.5 | 33.5 | 38.6 | 47.0 | 1000Hz |
| L12(high temp) | 34 | Ts-35 | 26.0 | 29.5 | 36.0 | 38.5 | 40.7 | 48.8 | 1000Hz |

**IGU — Standard Configurations:**

| รหัส | Avg | Ts 1/3 | 125 | 250 | 500 | 1k | 2k | 4k | fc |
|------|-----|--------|-----|-----|-----|----|----|----|----|
| FL3+A6+FL3 | 25 | Ts-20 | 19.3 | 21.0 | 19.8 | 28.1 | 37.0 | 32.6 | 4000/400Hz |
| FL3+A12+FL3 | 27 | Ts-20 | 18.6 | 17.1 | 21.7 | 32.7 | 42.4 | 33.9 | 4000/280Hz |
| FL3+A6+FL5 | 28 | Ts-25 | 22.2 | 23.0 | 24.2 | 32.2 | 36.4 | 39.4 | 4000,2400/360Hz |
| FL3+A12+FL5 | 29 | Ts-25 | 20.4 | 18.6 | 26.3 | 37.6 | 42.1 | 42.7 | 4000,2400/250Hz |
| FL3+A6+FL6 | 29 | Ts-25 | 22.0 | 23.2 | 26.0 | 33.8 | 37.1 | 42.7 | 4000,2000/350Hz |
| FL4+A6+FL4 | 27 | Ts-20 | 21.0 | 21.3 | 22.2 | 32.1 | 36.9 | 32.8 | 3000/350Hz |
| FL4+A6+FL6 | 29 | Ts-25 | 22.6 | 23.3 | 26.0 | 35.7 | 36.5 | 38.8 | 3000,2000/320Hz |
| FL4+A12+FL6 | 31 | Ts-25 | 21.0 | 21.5 | 28.0 | 39.8 | 40.7 | 42.0 | 3000,2000/220Hz |
| FL4+A6+FL8 | 31 | Ts-30 | 22.8 | 23.1 | 29.3 | 36.6 | 39.1 | 42.6 | 3000,1500/300Hz |
| FL5+A6+FL5 | 28 | Ts-25 | 22.2 | 21.4 | 24.7 | 33.8 | 33.5 | 37.1 | 2400/310Hz |
| FL5+A12+FL5 | 28 | Ts-25 | 20.2 | 17.6 | 27.6 | 37.2 | 36.6 | 40.4 | 2400/220Hz |
| FL5+A12+PW6.8 | 31 | Ts-30 | 20.0 | 22.1 | 33.1 | 40.8 | 37.7 | 43.0 | 2400,1765/200Hz |
| FL5+A6+FL8 | 30 | Ts-30 | 24.0 | 24.8 | 28.5 | 36.3 | 36.9 | 42.6 | 2400,1500/280Hz |
| FL5+A6+FL10 | 32 | Ts-30 | 25.4 | 25.9 | 30.5 | 35.8 | 39.4 | 44.1 | 2400,1200/270Hz |
| FL6+A6+FL6 | 28 | Ts-25 | 22.6 | 21.9 | 26.5 | 35.3 | 34.0 | 41.5 | 2000/280Hz |
| FL6+A12+FL10 | 33 | Ts-35 | 23.1 | 27.0 | 34.8 | 40.2 | 39.8 | 46.5 | 2000,1200/180Hz |
| FL6+A6+FL12 | 33 | Ts-30 | 26.6 | 26.4 | 31.2 | 38.3 | 39.3 | 46.9 | 2000,1000/240Hz |
| FL6+A12+FL12 | 33 | Ts-35 | 22.7 | 26.7 | 34.5 | 40.0 | 41.5 | 46.4 | 2000,1000/170Hz |
| FL8+A12+FL8 | 29 | Ts-30 | 19.8 | 21.9 | 30.7 | 36.4 | 35.3 | 44.6 | 1500/170Hz |
| FL8+A6+FL12 | 33 | Ts-35 | 26.2 | 27.9 | 35.5 | 36.3 | 38.4 | 49.7 | 1500,1000/220Hz |
| FL8+A12+FL12 | 34 | Ts-35 | 23.9 | 31.2 | 38.1 | 36.9 | 38.5 | 49.3 | 1500,1000/160Hz |

**IGU — ช่องว่างกว้าง (Double Window):**

| รหัส | Avg | Ts 1/3 | 125 | 250 | 500 | 1k | 2k | 4k | fc |
|------|-----|--------|-----|-----|-----|----|----|----|----|
| FL3+A50+FL6 | 33 | Ts-30 | 13.3 | 25.2 | 34.2 | 44.9 | 45.5 | 54.1 | 119Hz |
| FL3+A100+FL6 | 40 | Ts-35 | 19.2 | 31.7 | 37.7 | 50.2 | 54.3 | 55.4 | 85Hz |
| FL5+A50+FL8 | 38 | Ts-35 | 20.5 | 32.8 | 37.3 | 47.2 | 47.4 | 59.6 | 96Hz |
| FL5+A100+FL8 | 43 | Ts-40 | 27.4 | 36.6 | 41.3 | 53.0 | 52.8 | 60.7 | 68Hz |
| FL5+A200+FL8 | 45 | Ts-45 | 31.1 | 39.3 | 46.5 | 53.2 | 51.5 | 65.6 | 48Hz |
| FL5+A50+(FL3+A6+FL6) | 39 | Ts-35 | 19.1 | 33.1 | 39.3 | 49.8 | 47.3 | 58.8 | 94Hz |
| FL5+A100+(FL3+A6+FL6) | 45 | Ts-40 | 27.4 | 38.3 | 43.3 | 56.5 | 57.2 | 62.7 | 66Hz |
| FL5+A200+(FL3+A6+FL6) | 47 | Ts-45 | 31.4 | 40.2 | 46.9 | 58.3 | 57.0 | 63.9 | 47Hz |

**⚠️ Key Insights จากตาราง:**
- Double Window ช่องว่าง 200mm → Avg STL สูงถึง **45–47 dB**
- Double Window + IGU inside → STL สูงสุด **47 dB** (FL5+A200+IGU)
- ช่องว่างกว้าง: fc ต่ำ → กันเสียงความถี่ต่ำได้ดีขึ้น (เสียงรถ เครื่องบิน)

---

### 58F. ตาราง IGU Low-E3 Components (จาก 9817.jpg)

**LoE3 Glass + Argon Gas + Duralite Spacer (Triple IGU):**
- **LoE3 Glass** = Low Emissivity Triple Silver Coating — สะท้อนความร้อนทั้งด้านนอก (Outside Heat Energy) และด้านใน (Inside Heat Energy)
- **Argon Gas** = เพิ่มความเป็นฉนวนความร้อน
- **Duralite Spacer** = Warm-Edge Spacer ลด thermal bridge ที่ขอบกระจก

---

### 58G. ระดับเสียงและแหล่งกำเนิด — ฉบับ App (จาก sound_meter.jpg)

**App Sound Meter — Reference Scale:**

| dB | แหล่งเสียง |
|----|-----------|
| 120 | Threshold of pain, Thunder |
| 110 | Rock music, Car horns |
| 100 | Blow dryer, Motorcycle |
| 90 | Diesel truck, Power tools |
| 80 | Busy street, Alarm clocks |
| 70 | Busy traffic, Vacuum cleaner |
| 60 | Normal conversation at 3ft. |
| **50** | **Quiet office, Quiet street** ← ค่าอ้างอิง "เงียบพอ" |
| 40 | Quiet library, Park |
| 30 | Whisper, Quiet room |
| 20 | Mosquito, Rustling leaves |
| 10 | Breathing, Almost quiet |

---

### 58H. ระดับเสียงไทย — กฎหมายและแหล่งกำเนิด (จาก 04oct01.jpg — mango zero)

**มาตรฐานความดังเสียงทั่วไปสูงสุดไม่เกิน 115 dB** (ตามประกาศคณะกรรมการสิ่งแวดล้อมแห่งชาติ ฉบับที่ 15 พ.ศ.2540)

| dB | ระดับ | ตัวอย่างแหล่งเสียง |
|----|-------|-----------------|
| 140 | เริ่มปวดหู | — |
| 130 | ดังสุดๆ | เครื่องบินเจ็ต |
| 120 | ดังสุดๆ | เพลงแดนซ์ในผับ, คอนเสิร์ตร็อก |
| 110 | ไม่ควรรับเกิน 1–2 ชม. | — |
| 100–90 | ดังมาก | เครื่องตัดหญ้า, โรงงาน |
| 80–70 | ดัง | เครื่องดูดฝุ่น, นกหวีด |
| 60–50 | ปานกลาง | ฝนตกเบาๆ, พูดคุยทั่วไป |
| 40–30 | เบา | ในห้องสมุด, ห้องนอนตอนกลางคืน |
| 20–0 | เบามาก | หายใจ, กระซิบ |

**แหล่งเสียงรบกวนบ้านพักอาศัย (ที่พบบ่อย):**
- จัดปาร์ตี้ / เปิดเพลงเสียงดัง
- สุนัขเห่า / เปิดทีวีเสียงดัง
- คนทะเลาะกัน / ก่อสร้าง

---

### 58I. ตาราง Sound Pressure Level & Loudness (จาก 9799.jpg — soundproofingcompany.com)

| dB(A) | แหล่งเสียง | ความรู้สึก |
|-------|-----------|-----------|
| 130 | เครื่องบินไอพ่นที่ 100', กลองใหญ่ 3', แตรรถ 3' | Physical Pain |
| 120 | ฟ้าร้อง, ปืนใหญ่ | Physical Pain |
| 110 | รถไฟฟ้ายกระดับ, ดิสโก้ | Deafening |
| 100 | ถนนดัง, โรงงานดัง | Deafening |
| 90 | รถบรรทุกไม่มีท่อไอเสีย, นกหวีดตำรวจ | Very Loud |
| 80 | ปาร์ตี้ค็อกเทล, ออฟฟิศดัง, ถนนเฉลี่ย | Very Loud |
| 70 | วิทยุเฉลี่ย, โรงงานเฉลี่ย | Loud |
| 60 | บ้านดัง, ออฟฟิศทั่วไป | Moderate |
| 50 | สนทนา, วิทยุเบา | Moderate |
| 40 | บ้านเงียบ, ออฟฟิศส่วนตัว | Moderate |
| 30 | ห้องประชุมว่าง, สนทนาเบา | Faint |
| 20 | ใบไม้ไหว | Whisper |
| 10 | ห้องซาวด์พรูฟ | Whisper |
| 0 | Threshold of Audibility | — |

---

*Knowledge Base v3.0 — Section 58 เพิ่มจาก: glassstc.jpg (STC table LAM/IGU/Double), R111580304.jpg (การเลือกกระจกกันเสียง chart), 9802.jpg (STC diagram Incident/Transmitted/Reflected/Absorbed), 9817.jpg (LoE3+Argon+Duralite IGU), 9818.jpg (Sound Reduction % comparison), 04oct01.jpg (ระดับเสียงไทย + กฎหมาย 115dB), sound_meter.jpg (App scale 10–120dB), กระจกกันเสียง_๑๙๐๔๑๗_0003.jpg (AGC JIS A4706 STL ตาราง 40+ configurations สมบูรณ์), ข้อมูลกระจกกันเสียง.docx (wrapper สำหรับรูปภาพข้างต้น)*
