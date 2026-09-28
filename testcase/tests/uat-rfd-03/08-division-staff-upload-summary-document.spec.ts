import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/hq-division-staff-central1.json',
});

test('Step 08 - เจ้าหน้าที่ฝ่ายอัปโหลดเอกสารประมวล', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/assignment/mine');
  await page.getByText('อยู่ระหว่างพิจารณาคำขอ').first().click();
  await page.getByRole('link', { name: 'บันทึกเอกสารประมวล' }).click();
  await page.locator('label').click();
  await page.getByLabel('ลากไฟล์วางที่นี่ หรือคลิกเพื่อเลือกไฟล์').setInputFiles('ผลการทดสอบ DEV-KBI.pdf');
  await page.getByRole('button', { name: 'บันทึกและส่งจัดประชุม' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByRole('button', { name: 'ไปยังหน้าคำขอ' }).click();
});