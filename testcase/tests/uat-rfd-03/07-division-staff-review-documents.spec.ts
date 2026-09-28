import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/hq-division-staff-central1.json',
});

test('Step 07 - เจ้าหน้าที่ฝ่ายตรวจสอบเอกสาร', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/assignment/mine');
  await page.getByText('อยู่ระหว่างพิจารณาคำขอ').nth(2).click();
  await page.getByRole('link', { name: 'ตรวจเอกสาร' }).click();
  await page.getByRole('button', { name: 'บันทึกส่วนสำคัญ' }).click();
  await page.getByRole('button', { name: 'เอกสารถูกต้องครบถ้วน' }).click();
  await page.getByRole('button', { name: 'ถัดไป' }).click();
  await page.getByRole('button', { name: 'เอกสารถูกต้องครบถ้วน' }).click();
  await page.getByRole('button', { name: 'บันทึกและส่งไปยังกองการอนุญาต' }).click();
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByRole('button', { name: 'ไปยังหน้าคำขอ' }).click();
});