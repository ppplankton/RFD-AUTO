# RFD Automation

Playwright automation สำหรับช่วยบันทึกและรัน UAT flow ของระบบ `dev-dpermit.forest.go.th`

## Quick Start

ติดตั้ง dependency หลัง clone repo:

```bash
npm install
npm run install:browsers
```

ดูคำสั่งทั้งหมด:

```bash
npm run
```

## เก็บ Login Session

ไฟล์ auth อยู่ใน `testcase/auth/*.json` และถูก ignore จาก Git เพราะเป็น token/session จริงของแต่ละคน

ตัวอย่างเก็บ session เจ้าหน้าที่ สจป. `reg5_saraburi`:

```bash
npm run auth:reg5-saraburi
```

ตัวอย่างเก็บ session หัวหน้าฝ่าย:

```bash
npm run auth:hq-division-head-central
```

ตัวอย่างเก็บ session เจ้าหน้าที่ฝ่าย:

```bash
npm run auth:hq-division-staff-central1
```

ล็อกอินใน browser ที่เปิดขึ้นมาให้เสร็จ แล้วปิด browser เพื่อบันทึก session

## รัน Test

รัน UAT-RFD-03 ทั้งหมด:

```bash
npm run test:uat-rfd-03
```

รัน Step 01:

```bash
npm run test:uat-rfd-03:step01
```

รัน Step 02:

```bash
npm run test:uat-rfd-03:step02
```

## เริ่มบันทึก Step 03

ต้องมี session `reg5_saraburi` ก่อน:

```bash
npm run auth:reg5-saraburi
```

เริ่มอัด flow Step 03 เป็นไฟล์ชั่วคราว `.rec.ts`:

```bash
npm run record:uat-rfd-03:step03
```

อัดเสร็จแล้วให้ส่งไฟล์นี้ให้คน merge เข้าไฟล์จริง:

```text
testcase/tests/uat-rfd-03/03-regional-officer-schedule-inspection.rec.ts
```

ไฟล์จริงที่ใช้รัน test คือ:

```text
testcase/tests/uat-rfd-03/03-regional-officer-schedule-inspection.spec.ts
```

อ่านรายละเอียดทั้งหมดต่อที่ `RUNBOOK.md`
