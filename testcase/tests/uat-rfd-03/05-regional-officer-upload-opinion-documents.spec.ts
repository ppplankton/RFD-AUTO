import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test('Step 05 - เจ้าหน้าที่ สจป. อัปโหลดหนังสือความเห็น', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/dashboard');
  await page.getByRole('button', { name: 'ระบบงานตรวจสภาพป่า' }).click();
  await page.getByRole('link', { name: '• งานผ่านการตรวจสภาพป่า' }).click();
  await page.getByText('รอบันทึกเอกสารความเห็น').first().click();
  await page.getByRole('link', { name: 'เอกสารลงความเห็น' }).click();
  await page.locator('#section-16').getByText('เลือกไฟล์').click();
  await page.locator('#section-16').getByLabel('เลือกไฟล์').setInputFiles('ผลการทดสอบ DEV-KBI.pdf');
  await page.getByRole('button', { name: 'ยืนยันบันทึกรายงาน' }).click();
  await page.getByRole('button', { name: 'ยืนยัน', exact: true }).click();
  await page.getByRole('button', { name: 'ไปยังหน้าคำขอ' }).click();
});