import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test('Step 15 - เจ้าหน้าที่ สจป. ออกใบอนุญาต', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/reception');
  await page.getByRole('button', { name: 'ระบบงานหลักฐานการอนุญาต' }).click();
  await page.getByRole('link', { name: '• งานรอออกหลักฐานการอนุญาต' }).click();
  await page.getByText('รอออกหลักฐานการอนุญาต', { exact: true }).click();
  await page.getByRole('link', { name: 'ออกใบอนุญาต' }).click();
  await page.getByRole('button', { name: 'อัปเดตร่าง' }).click();
  await page.getByRole('button', { name: 'ตั้งงบประมาณ' }).click();
  await page.getByRole('button', { name: 'คำนวณงบประมาณใหม่' }).click();
  await page.getByRole('button', { name: 'เปลี่ยนไฟล์' }).click();
  await page.locator('input[type="file"]').setInputFiles('ผลการทดสอบ DEV-KBI.pdf');
  await page.getByRole('button', { name: 'ยืนยันแจ้งหลักฐานการอนุญาต' }).click();
  await page.getByRole('button', { name: 'ยืนยัน', exact: true }).click();
  await page.getByRole('button', { name: 'ยืนยัน', exact: true }).click();
  await page.getByRole('button', { name: 'ยกเลิก' }).click();
});