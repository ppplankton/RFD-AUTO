# RFD Automation

Playwright automation สำหรับช่วยบันทึกและรัน UAT flow ของระบบ `dev-dpermit.forest.go.th`

## Quick Start

### 1) ดึงโปรเจกต์จาก GitHub

ให้เข้า repo บน GitHub แล้วกด `Fork` ไปไว้ใน account ตัวเองก่อน จากนั้น clone fork ของตัวเองลงเครื่อง:

```bash
git clone git@github.com:<github-username>/RFD-AUTO.git
cd RFD-AUTO
```

ผูก repo ต้นทางไว้สำหรับ sync งานใหม่จากทีม:

```bash
git remote add upstream git@github.com:ppplankton/RFD-AUTO.git
git fetch upstream
```

สร้าง branch แยกตามชื่อตัวเองก่อนเริ่มทำงาน:

```bash
git switch -c work/<your-name>
```

ก่อนเริ่มงานทุกวันให้ sync จาก repo หลัก:

```bash
git fetch upstream
git merge upstream/main
```

### 2) ติดตั้งโปรเจกต์

ติดตั้ง dependency หลัง clone repo:

```bash
npm install
npm run install:browsers
```

ดูคำสั่งทั้งหมด:

```bash
npm run
```

### 3) Auth ที่ใช้ในโปรเจกต์

ไฟล์ auth อยู่ใน `testcase/auth/*.json` และถูก ignore จาก Git เพราะเป็น token/session จริงของแต่ละคน

| คนใช้งาน | Account ในเอกสาร | ไฟล์ auth |
| --- | --- | --- |
| ผู้ขอ | citizen | `testcase/auth/citizen.json` |
| เจ้าหน้าที่ สจป. | `reg5_saraburi` | `testcase/auth/reg5-saraburi.json` |
| หัวหน้าฝ่าย | `hq_division_head_central` | `testcase/auth/hq-division-head-central.json` |
| เจ้าหน้าที่ฝ่าย | `hq_division_staff_central1` | `testcase/auth/hq-division-staff-central1.json` |
| เลขานุการ | `hq_secretary` | `testcase/auth/hq-secretary.json` |

### 4) Save Auth Login

ใช้คำสั่งนี้เมื่อเครื่องยังไม่มีไฟล์ auth หรือ login หมดอายุ เปิด browser แล้ว login ให้เสร็จ จากนั้นปิด browser เพื่อ save session

ผู้ขอ:

```bash
npm run auth:citizen
```

เจ้าหน้าที่ สจป. `reg5_saraburi`:

```bash
npm run auth:reg5-saraburi
```

หัวหน้าฝ่าย `hq_division_head_central`:

```bash
npm run auth:hq-division-head-central
```

เจ้าหน้าที่ฝ่าย `hq_division_staff_central1`:

```bash
npm run auth:hq-division-staff-central1
```

เลขานุการ `hq_secretary`:

```bash
npm run auth:hq-secretary
```

### 5) Load Auth เพื่อบันทึก Script

ใช้ `--load-storage` ตอนจะอัด flow โดยไม่ต้อง login ใหม่ และใช้ `--save-storage` ตัวเดิมเพื่ออัปเดต session ถ้าระบบ refresh token

ผู้ขอ:

```bash
npx playwright codegen https://dev-dpermit.forest.go.th/ --load-storage=./testcase/auth/citizen.json --save-storage=./testcase/auth/citizen.json -o ./testcase/tests/uat-rfd-03/<step-file>.rec.ts
```

เจ้าหน้าที่ สจป. `reg5_saraburi`:

```bash
npx playwright codegen https://dev-dpermit.forest.go.th/ --load-storage=./testcase/auth/reg5-saraburi.json --save-storage=./testcase/auth/reg5-saraburi.json -o ./testcase/tests/uat-rfd-03/<step-file>.rec.ts
```

หัวหน้าฝ่าย `hq_division_head_central`:

```bash
npx playwright codegen https://dev-dpermit.forest.go.th/ --load-storage=./testcase/auth/hq-division-head-central.json --save-storage=./testcase/auth/hq-division-head-central.json -o ./testcase/tests/uat-rfd-03/<step-file>.rec.ts
```

เจ้าหน้าที่ฝ่าย `hq_division_staff_central1`:

```bash
npx playwright codegen https://dev-dpermit.forest.go.th/ --load-storage=./testcase/auth/hq-division-staff-central1.json --save-storage=./testcase/auth/hq-division-staff-central1.json -o ./testcase/tests/uat-rfd-03/<step-file>.rec.ts
```

เลขานุการ `hq_secretary`:

```bash
npx playwright codegen https://dev-dpermit.forest.go.th/ --load-storage=./testcase/auth/hq-secretary.json --save-storage=./testcase/auth/hq-secretary.json -o ./testcase/tests/uat-rfd-03/<step-file>.rec.ts
```

ตัวอย่างอัด Step 03 ด้วย `reg5_saraburi`:

```bash
npm run record:uat-rfd-03:step03
```

ไฟล์ `.rec.ts` เป็นไฟล์ชั่วคราวสำหรับให้คน merge เข้าไฟล์ `.spec.ts` จริง

### 6) ส่งงานกลับขึ้น GitHub

หลังแก้ script เสร็จ ให้ commit แล้ว push branch ของตัวเอง:

```bash
git status
git add .
git commit -m "record: add uat rfd step 03"
git push origin work/<your-name>
```

จากนั้นเปิด Pull Request จาก branch ของตัวเองกลับเข้า repo หลัก

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
