# RFD Automation Runbook

## Git Workflow สำหรับคนเริ่มทำงาน

### 1) Fork repo

เข้า repo หลักบน GitHub:

```text
git@github.com:ppplankton/RFD-AUTO.git
```

กด `Fork` ไปไว้ใน GitHub account ของตัวเองก่อน เพื่อให้แต่ละคนมีพื้นที่ทำงานแยกกัน

### 2) Clone fork ลงเครื่อง

เปิด `cmd`, `Terminal`, หรือ terminal ใน VS Code แล้ว clone repo ของตัวเอง:

```bash
git clone git@github.com:<github-username>/RFD-AUTO.git
cd RFD-AUTO
```

ถ้าใช้ HTTPS ให้ใช้ URL จากปุ่ม `Code` บน GitHub ของ fork ตัวเองแทน

### 3) ผูก repo หลักไว้สำหรับ Sync

รันครั้งเดียวหลัง clone:

```bash
git remote add upstream git@github.com:ppplankton/RFD-AUTO.git
git fetch upstream
```

เช็กว่า remote มี `origin` เป็น fork ตัวเอง และ `upstream` เป็น repo หลัก:

```bash
git remote -v
```

### 4) สร้าง branch แยกตามชื่อ

ห้ามทำงานบน `main` ตรง ๆ ให้สร้าง branch ของตัวเองก่อน เช่น:

```bash
git switch -c work/<your-name>
```

ตัวอย่าง:

```bash
git switch -c work/nong-a
```

### 5) Sync งานล่าสุดก่อนเริ่มทำ

ทุกครั้งก่อนเริ่มบันทึก script ให้ดึงงานล่าสุดจาก repo หลัก:

```bash
git switch work/<your-name>
git fetch upstream
git merge upstream/main
```

ถ้ามี conflict ให้หยุดแล้วถามคนดูแลก่อน อย่าฝืนแก้มั่ว

### 6) Commit และ Push งานตัวเอง

หลังแก้ไฟล์เสร็จ:

```bash
git status
git add .
git commit -m "record: add uat rfd step 03"
git push origin work/<your-name>
```

จากนั้นเปิด Pull Request บน GitHub จาก branch ของตัวเองกลับเข้า repo หลัก

## Setup สำหรับเครื่องใหม่

หลัง clone repo ให้เข้าโฟลเดอร์โปรเจกต์:

```bash
cd RFD-AUTO
```

ติดตั้ง dependency:

```bash
npm install
```

ติดตั้ง browser ของ Playwright:

```bash
npm run install:browsers
```

ตรวจว่าคำสั่ง npm scripts มีครบ:

```bash
npm run
```

## Auth Session

ไฟล์ session จะอยู่ที่ `testcase/auth/*.json` และไม่ commit ขึ้น Git เพราะเป็น token/login ส่วนตัวของแต่ละคน

เก็บ session ผู้ขอ:

```bash
npm run auth:citizen
```

เก็บ session เจ้าหน้าที่ สจป. `reg5_saraburi`:

```bash
npm run auth:reg5-saraburi
```

เก็บ session หัวหน้าฝ่าย `hq_division_head_central`:

```bash
npm run auth:hq-division-head-central
```

เก็บ session เจ้าหน้าที่ฝ่าย `hq_division_staff_central1`:

```bash
npm run auth:hq-division-staff-central1
```

เก็บ session เลขานุการ `hq_secretary`:

```bash
npm run auth:hq-secretary
```

เมื่อ browser เปิดขึ้นมา ให้ login ด้วย account ที่ตรงกับ script แล้วปิด browser หลัง login สำเร็จ

## UAT-RFD-03 — Happy Flow มาตรา 13/1

รัน UAT-RFD-03 ทั้งหมด

```bash
npm run test:uat-rfd-03
```

---

### Step 01 — ผู้ขอยื่นคำขอ ม.13/1

ผู้ใช้งาน: ผู้ขอ

```bash
npm run test:uat-rfd-03:step01
```

ไฟล์:

```text
01-citizen-submit-request.spec.ts
```

---

### Step 02 — เจ้าหน้าที่ สจป. ตรวจสอบเอกสารคำขอและรับเรื่อง

ผู้ใช้งาน: เจ้าหน้าที่ สจป. (`reg5_saraburi`)

```bash
npm run test:uat-rfd-03:step02
```

ไฟล์:

```text
02-regional-officer-review-documents.spec.ts
```

---

### Step 03 — เจ้าหน้าที่ สจป. กำหนดนัดหมายตรวจสภาพป่า

ผู้ใช้งาน: เจ้าหน้าที่ สจป. (`reg5_saraburi`)

```bash
npm run test:uat-rfd-03:step03
```

ไฟล์:

```text
03-regional-officer-schedule-inspection.spec.ts
```

---

### Step 04 — เจ้าหน้าที่ สจป. บันทึกผลตรวจสภาพป่า

ผู้ใช้งาน: เจ้าหน้าที่ สจป. (`reg5_saraburi`)

```bash
npm run test:uat-rfd-03:step04
```

ไฟล์:

```text
04-regional-officer-record-inspection-result.spec.ts
```

---

### Step 05 — เจ้าหน้าที่ สจป. อัปโหลดหนังสือความเห็น

หนังสือความเห็น ผอ.สำนักจัดการทรัพยากรป่าไม้ท้องที่ และผู้ว่าราชการจังหวัด

ผู้ใช้งาน: เจ้าหน้าที่ สจป. (`reg5_saraburi`)

```bash
npm run test:uat-rfd-03:step05
```

ไฟล์:

```text
05-regional-officer-upload-opinion-documents.spec.ts
```

---

### Step 06 — หัวหน้าฝ่ายมอบหมายงาน

มอบหมายงานให้เจ้าหน้าที่กองอนุญาต

ผู้ใช้งาน: หัวหน้าภาค/หัวหน้าฝ่าย (`hq_division_head_central`)

```bash
npm run test:uat-rfd-03:step06
```

ไฟล์:

```text
06-division-head-assign-work.spec.ts
```

---

### Step 07 — เจ้าหน้าที่ฝ่ายตรวจสอบเอกสาร

ผู้ใช้งาน: เจ้าหน้าที่ฝ่าย (`hq_division_staff_central1`)

```bash
npm run test:uat-rfd-03:step07
```

ไฟล์:

```text
07-division-staff-review-documents.spec.ts
```

---

### Step 08 — เจ้าหน้าที่ฝ่ายอัปโหลดเอกสารประมวล

ผู้ใช้งาน: เจ้าหน้าที่ฝ่าย (`hq_division_staff_central1`)

```bash
npm run test:uat-rfd-03:step08
```

ไฟล์:

```text
08-division-staff-upload-summary-document.spec.ts
```

---

### Step 09 — เลขานุการตรวจสอบเอกสาร

เลือกเข้าสู่การพิจารณาของอนุกรรมการ

ผู้ใช้งาน: เลขานุการ (`hq_secretary`)

```bash
npm run test:uat-rfd-03:step09
```

ไฟล์:

```text
09-secretary-review-for-subcommittee.spec.ts
```

---

### Step 10 — เลขานุการสร้างวาระประชุมอนุกรรมการ

ผู้ใช้งาน: เลขานุการ (`hq_secretary`)

```bash
npm run test:uat-rfd-03:step10
```

ไฟล์:

```text
10-secretary-create-subcommittee-meeting.spec.ts
```

---

### Step 11 — เลขานุการบันทึกผลการพิจารณาอนุกรรมการ

กำหนดผู้เข้าประชุมและบันทึกผลการพิจารณา

ผู้ใช้งาน: เลขานุการ (`hq_secretary`)

```bash
npm run test:uat-rfd-03:step11
```

ไฟล์:

```text
11-secretary-record-subcommittee-result.spec.ts
```

---

### Step 12 — เลขานุการสร้างวาระประชุมคณะกรรมการ

ผู้ใช้งาน: เลขานุการ (`hq_secretary`)

```bash
npm run test:uat-rfd-03:step12
```

ไฟล์:

```text
12-secretary-create-committee-meeting.spec.ts
```

---

### Step 13 — เลขานุการบันทึกผลการพิจารณาคณะกรรมการ

กำหนดผู้เข้าประชุมและบันทึกผลการพิจารณา

ผู้ใช้งาน: เลขานุการ (`hq_secretary`)

```bash
npm run test:uat-rfd-03:step13
```

ไฟล์:

```text
13-secretary-record-committee-result.spec.ts
```

---

### Step 14 — เจ้าหน้าที่ฝ่ายส่ง สจป. ออกใบอนุญาต

แนบใบปะหน้าคำขอที่ผ่านคณะกรรมการ และส่ง สจป. ออกใบอนุญาต

ผู้ใช้งาน: เจ้าหน้าที่ฝ่าย (`hq_division_staff_central1`)

```bash
npm run test:uat-rfd-03:step14
```

ไฟล์:

```text
14-division-staff-send-for-license.spec.ts
```

---

### Step 15 — เจ้าหน้าที่ สจป. ออกใบอนุญาต

อัปโหลดหลักฐานการอนุญาตฉบับสมบูรณ์ และแจ้งหลักฐานการอนุญาต

ผู้ใช้งาน: เจ้าหน้าที่ สจป. (`reg5_saraburi`)

```bash
npm run test:uat-rfd-03:step15
```

ไฟล์:

```text
15-regional-officer-issue-license.spec.ts
```

---

### Step 16 — เจ้าหน้าที่ สจป. เพิ่มเอกสารตั้งงบประมาณ

ผู้ใช้งาน: เจ้าหน้าที่ สจป. (`reg5_saraburi`)

```bash
npm run test:uat-rfd-03:step16
```

ไฟล์:

```text
16-regional-officer-add-budget-document.spec.ts
```

---

## Recording Flow

โปรเจกต์นี้สร้างโครงไฟล์ Step ไว้แล้ว ไฟล์จริงที่ใช้รัน test คือ `.spec.ts`

ถ้าจะอัด flow ใหม่ ให้บันทึกเป็นไฟล์ `.rec.ts` ก่อนเพื่อไม่ทับไฟล์จริง แล้วค่อย merge เข้า `.spec.ts`

ไฟล์ `.rec.ts` เป็นไฟล์ชั่วคราวและถูก ignore จาก Git:

```text
*.rec.ts
```

ตัวอย่างเริ่มเก็บ Step 03 ด้วย login `reg5_saraburi`:

```bash
npm run record:uat-rfd-03:step03
```

ไฟล์ที่ถูกสร้าง:

```text
testcase/tests/uat-rfd-03/03-regional-officer-schedule-inspection.rec.ts
```

ไฟล์จริงที่ต้อง merge เข้า:

```text
testcase/tests/uat-rfd-03/03-regional-officer-schedule-inspection.spec.ts
```

หลัง merge เสร็จ ให้ตรวจว่าไฟล์ยังใช้ `storageState` ของ role นั้นถูกต้อง และชื่อ test ยังขึ้นต้นด้วย Step เดิม

Timeout กลางถูกตั้งไว้ใน `playwright.config.ts` แล้ว ไฟล์ที่บันทึกด้วย codegen จะได้ `actionTimeout`, `navigationTimeout`, และ test timeout อัตโนมัติ

ถ้า flow ไหนยังมี UI transition ช้า ให้ใช้ helper กลางจาก `testcase/support/ui.ts`:

```ts
import { clickWhenReady, waitForUi } from '../../support/ui';
```

---

## Playwright Commands

รันแบบเห็น Browser

```bash
npx playwright test --headed
```

รันแบบ Debug

```bash
npx playwright test --headed --debug
```

ดูรายการ Test ทั้งหมด

```bash
npx playwright test --list
```

เปิด HTML Report

```bash
npx playwright show-report
```

ดู npm scripts ที่มีทั้งหมด

```bash
npm run
```
