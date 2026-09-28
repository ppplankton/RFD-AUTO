import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/hq-division-head-central.json',
});

test('Step 06 - หัวหน้าฝ่ายมอบหมายงานให้เจ้าหน้าที่กองอนุญาต', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/assignment');
  await page.getByText('อยู่ระหว่างพิจารณาคำขอ').first().click();
  await page.getByRole('link', { name: 'มอบหมายงาน' }).click();
  await page.getByText('เลือกไฟล์').click();
  await page.getByLabel('เลือกไฟล์').setInputFiles('ผลการทดสอบ DEV-KBI.pdf');
  await page.getByRole('textbox', { name: 'ค้นหาชื่อเจ้าหน้าที่' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาชื่อเจ้าหน้าที่' }).fill('อรฃ');
  await page.getByRole('textbox', { name: 'ค้นหาชื่อเจ้าหน้าที่' }).press('Enter');
  await page.getByRole('textbox', { name: 'ค้นหาชื่อเจ้าหน้าที่' }).press('Enter');
  await page.getByRole('textbox', { name: 'ค้นหาชื่อเจ้าหน้าที่' }).fill('');
  await page.getByRole('button', { name: 'อรุณี ไพรสณฑ์ 3 รายการ' }).click();
  await page.getByRole('button', { name: 'ยืนยันมอบหมายงาน' }).click();
  await page.getByRole('button', { name: 'กลับสู่งานรอพิจารณาคำขอ' }).click();
});
