import { test, expect, Page } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/citizen.json',
});

const documentBasePath = 'testcase/test-data/ตัวอย่างจริง มาตรา 13-1';

const documents = {
  requestForm:
    `${documentBasePath}/1. การยื่นคำขอ มาตรา 13-1/ตัวอย่างคำขอ ป.ส.17 (สำเนา) มาตรา 13-1.pdf`,
  governorCoverLetter:
    `${documentBasePath}/ใบปะหน้า แจ้งผู้ว่าราชการจังหวัด เรื่องการขอใช้พื้นที่_มาตรา 13-1.pdf`,
  inspectionForm:
    `${documentBasePath}/3. การประมวลเรื่องเสนอ และประชุมคณะกรรมการ มาตรา 13-1/1. ตัวอย่างแบบฟอร์ม ตรวจสอบข้อมูลการขอใช้พื้นที่_มาตรา 13-1.pdf`,
  conditionAttachment:
    `${documentBasePath}/3. การประมวลเรื่องเสนอ และประชุมคณะกรรมการ มาตรา 13-1/2. เงื่อนไขแนบท้าย_มาตรา 13-1.pdf`,
  meetingReport:
    `${documentBasePath}/3. การประมวลเรื่องเสนอ และประชุมคณะกรรมการ มาตรา 13-1/3. รายงานการประชุม และผลการประชุม_มาตรา 13-1.pdf`,
  announcement:
    `${documentBasePath}/4. การออกประกาศกรมป่าไม้ มาตรา 13-1/1. ประกาศกรมป่าไม้ ป.ส.19-1_มาตรา 13-1.pdf`,
  mapAttachment:
    `${documentBasePath}/4. การออกประกาศกรมป่าไม้ มาตรา 13-1/2. แผนที่สังเขปแนบท้าย_มาตรา 13-1.pdf`,
  announcementConditionAttachment:
    `${documentBasePath}/4. การออกประกาศกรมป่าไม้ มาตรา 13-1/3. เงื่อนไขแนบท้าย_มาตรา 13-1.pdf`,
};

// helper สำหรับ dropdown ที่ item มี testid แบบ dynamic
async function selectTestIdOption(
  page: Page,
  triggerTestId: string,
  itemTestIdPrefix: string,
  text: string
) {
  const trigger = page.getByTestId(triggerTestId);

  await expect(trigger).toBeVisible({
    timeout: 20_000,
  });

  await expect(trigger).toBeEnabled({
    timeout: 20_000,
  });

  await trigger.scrollIntoViewIfNeeded();

  const option = page
    .locator(`[data-testid^="${itemTestIdPrefix}"]`)
    .filter({ hasText: text })
    .first();

  // ลองเปิด dropdown ใหม่ได้สูงสุด 5 รอบ
  for (let attempt = 1; attempt <= 5; attempt++) {

    console.log(`เปิด dropdown ${text} รอบที่ ${attempt}`);

    await trigger.click();

    try {
      await expect(option).toBeVisible({
        timeout: 3000,
      });

      await option.click();

      console.log(`✅ เลือก ${text} สำเร็จ`);
      return;

    } catch {
      console.log(`ยังไม่พบ ${text} รอข้อมูลโหลด...`);

      // ถ้า dropdown ยังเปิดอยู่ ให้ Escape ปิดก่อน
      await page.keyboard.press('Escape');

      await page.waitForTimeout(1000);
    }
  }

  throw new Error(`ไม่พบ option: ${text}`);
}

test('Step 01 - ผู้ขอยื่นคำขอ ม.13/1', async ({ page }) => {
  // Flow นี้ค่อนข้างยาว
  test.setTimeout(180_000);

  // =========================================================
  // 1. เข้าเมนูยื่นคำขอ
  // =========================================================

  await page.goto('https://dev-dpermit.forest.go.th/');

  await page
    .getByRole('button', { name: 'ยื่นขอใบอนุญาต' })
    .click();

  await page
    .getByRole('button', { name: 'ยื่นขออนุญาต' })
    .nth(3)
    .click();

  await page
    .getByRole('button', { name: 'เริ่มยื่นคำขอ' })
    .click();

  // =========================================================
  // 2. ข้อมูลคำขอ
  // =========================================================

  await page
    .getByRole('combobox')
    .filter({ hasText: 'เลือกประเภทคำขอ' })
    .click();

  await page
    .getByRole('option', { name: 'การขออนุญาตใหม่' })
    .click();

  await page
    .getByRole('combobox')
    .filter({ hasText: 'เลือกวัตถุประสงค์' })
    .click();

  await page
    .getByRole('option', { name: 'การไฟฟ้า' })
    .click();

  await page
    .getByRole('textbox', {
      name: 'กรอกความประสงค์ขอใช้พื้นที่',
    })
    .fill(
      'เพื่อก่อสร้างและบำรุงรักษาระบบโครงข่ายไฟฟ้า 230 กิโลโวลต์'
    );

  await page
    .getByRole('button', { name: 'ถัดไป' })
    .click();

  // =========================================================
  // 3. ข้อมูลผู้ขอ
  // =========================================================

  await page
    .getByRole('textbox', {
      name: 'ตำแหน่งในหน่วยงาน',
    })
    .fill('เจ้าหน้าที่');

  // บ้านเลขที่
  await page
    .getByRole('textbox', { name: '/12' })
    .first()
    .fill('111/312');

  // ถนน
  await page
    .getByRole('textbox', { name: 'ถนน' })
    .first()
    .fill('พหลโยธิน');

  // จังหวัด
  await page
    .getByRole('combobox')
    .first()
    .click();

  await page
    .getByRole('option', { name: 'กรุงเทพมหานคร' })
    .click();

  // เขต
  await page
    .getByRole('combobox')
    .filter({ hasText: 'เลือกอำเภอ/เขต' })
    .click();

  await page
    .getByRole('option', { name: 'เขตดอนเมือง' })
    .click();

  // แขวง
  await page
    .getByRole('combobox')
    .filter({ hasText: 'เลือกตำบล/แขวง' })
    .click();

  await page
    .getByRole('option', { name: 'สีกัน' })
    .click();

  // =========================================================
  // 4. ข้อมูลหน่วยงาน
  // =========================================================

  await page
    .getByRole('textbox', {
      name: 'ชื่อส่วนราชการ/หน่วยงานรัฐ',
    })
    .fill('การไฟฟ้าฝ่ายผลิต');

  // เลขประจำตัว 13 หลัก
  const thaiId = '1234567890123';

  for (let i = 0; i < thaiId.length; i++) {
    await page
      .getByTestId(`thai-id-digit-${i}`)
      .nth(1)
      .fill(thaiId[i]);
  }

  // บ้านเลขที่หน่วยงาน
  await page
    .getByRole('textbox', { name: '/12' })
    .nth(1)
    .fill('551');

  // ถนนหน่วยงาน
  await page
    .getByRole('textbox', { name: 'ถนน' })
    .nth(1)
    .fill('งามวงวาน');

  // จังหวัด
  await page
    .getByRole('combobox')
    .filter({ hasText: /^เลือกจังหวัด$/ })
    .click();

  await page
    .getByRole('option', { name: 'กรุงเทพมหานคร' })
    .click();

  // เขต
  await page
    .getByRole('combobox')
    .filter({ hasText: 'เลือกอำเภอ/เขต' })
    .click();

  await page
    .getByRole('option', { name: 'เขตหลักสี่' })
    .click();

  // แขวง
  await page
    .getByRole('combobox')
    .filter({ hasText: 'เลือกตำบล/แขวง' })
    .click();

  await page
    .getByRole('option', { name: 'ทุ่งสองห้อง' })
    .click();

  // โทรศัพท์
  await page
    .getByRole('textbox', {
      name: '02-XXX-XXXX',
    })
    .fill('02-100-10000');

  await page
    .getByRole('button', { name: 'ถัดไป' })
    .click();

  // =========================================================
  // 5. ข้อมูลการใช้พื้นที่
  // =========================================================

  // ระยะเวลา
  await page
    .getByRole('combobox')
    .filter({ hasText: 'เลือกระยะเวลา' })
    .click();

  await page
    .getByRole('option', {
      name: 'จนกว่าจะหมดความจำเป็น',
    })
    .click();

  // =========================================================
  // จังหวัดพื้นที่ป่า
  // =========================================================

  await page
    .getByTestId('form-province')
    .click();

  await page
    .getByPlaceholder('ค้นหา')
    .fill('สระ');

  await page
    .getByTestId('form-province-item-สระบุรี')
    .click();

  // ตรวจให้แน่ใจว่าจังหวัดถูกเลือกแล้ว
  await expect(
    page.getByTestId('form-province')
  ).toContainText('สระบุรี');

  // =========================================================
  // ป่าสงวนแห่งชาติ
  // =========================================================

  await selectTestIdOption(
    page,
    'forest-area-forest-select-0',
    'forest-area-forest-select-0-item-',
    'ป่าพระฉาย'
  );

  // =========================================================
  // อำเภอ
  // =========================================================

  await selectTestIdOption(
    page,
    'forest-area-district-select-0',
    'forest-area-district-select-0-item-',
    'แก่งคอย'
  );

  // =========================================================
  // ตำบล
  // =========================================================

  await selectTestIdOption(
    page,
    'forest-area-subdistrict-select-0',
    'forest-area-subdistrict-select-0-item-',
    'ท่าคล้อ'
  );

  // =========================================================
  // 6. เลือกตำแหน่งบนแผนที่ Leaflet
  // =========================================================

  const map = page.locator('.leaflet-container');

  await expect(map).toBeVisible({
    timeout: 15_000,
  });

const latitude = page.getByPlaceholder('เช่น 13.756331');
const longitude = page.getByPlaceholder('เช่น 100.501765');

await expect(latitude).toBeVisible();
await expect(longitude).toBeVisible();

await latitude.fill('14.593219');
await latitude.press('Tab');

await longitude.fill('101.005554');
await longitude.press('Tab');

// ตรวจว่าค่าถูกใส่จริง
await expect(latitude).toHaveValue('14.593219');
await expect(longitude).toHaveValue('101.005554');

// ต้องไม่ขึ้น error ว่าอยู่นอกจังหวัด
await expect(
  page.getByText('ตำแหน่งที่เลือกอยู่นอกจังหวัดที่เลือก')
).not.toBeVisible();

  // =========================================================
  // 7. เนื้อที่
  // =========================================================

  await page
    .getByRole('button', {
      name: 'คำนวณพื้นที่',
    })
    .click();

  const areaInput = page
    .getByRole('textbox', { name: 'เช่น' })
    .first();

  await expect(areaInput).toBeVisible();

  await areaInput.fill('14.5');

  await page
    .getByRole('button', { name: 'ใช้ค่า' })
    .click();

  // =========================================================
  // 8. Upload แผนที่
  // =========================================================

  await page
    .locator('input[type="file"]')
    .first()
    .setInputFiles(documents.mapAttachment);

  await page
    .getByRole('button', { name: 'ถัดไป' })
    .click();

  // =========================================================
  // 9. เอกสารประกอบ
  // =========================================================

  await page
    .locator('input[type="file"]')
    .nth(1)
    .setInputFiles(documents.requestForm);

  await page
    .locator('input[type="file"]')
    .nth(2)
    .setInputFiles(documents.governorCoverLetter);

  await page
    .locator('input[type="file"]')
    .nth(3)
    .setInputFiles(documents.inspectionForm);

  await page
    .locator('div:nth-child(7) > input')
    .setInputFiles(documents.conditionAttachment);

  await page
    .getByRole('button', { name: 'ถัดไป' })
    .click();

  // =========================================================
  // 10. ถึงหน้าสุดท้ายแล้ว
  // ไม่ยื่นคำขออัตโนมัติ
  // =========================================================

const agreement = page.getByRole('checkbox', {
  name: /การรับทราบและยอมรับข้อตกลง/,
});

await expect(agreement).toBeVisible({
  timeout: 15_000,
});

// ติ๊กยอมรับข้อตกลง
await agreement.check();

// กดยื่นคำขอ
await page
  .getByRole('button', { name: 'ยื่นคำขอ' })
  .click();

// กดยืนยันใน Popup
await page
  .getByRole('button', { name: 'ยืนยันการยื่น' })
  .click();

// รอให้ยื่นสำเร็จ
await expect(
  page.getByText('ยื่นคำขอสำเร็จ', { exact: true })
).toBeVisible({
  timeout: 30_000,
});

// ไปหน้าสถานะคำขอ
await page
  .getByRole('button', { name: 'ดูสถานะคำขอ' })
  .click();

console.log('✅ ยื่นคำขอสำเร็จแล้ว');
});
