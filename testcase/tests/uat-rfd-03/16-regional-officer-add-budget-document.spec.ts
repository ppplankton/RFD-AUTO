import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test('Step 16 - เจ้าหน้าที่ สจป. เพิ่มเอกสารตั้งงบประมาณ', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/');
  await page.getByRole('button', { name: 'คำขอของฉัน' }).click();
  await page.getByRole('button', { name: 'อนุมัติแล้ว' }).click();
  await page.getByRole('button', { name: 'ดูรายละเอียด' }).first().click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'ดาวน์โหลดใบออกหลักฐานการอนุญาต' }).click();
  const page1 = await page1Promise;
});