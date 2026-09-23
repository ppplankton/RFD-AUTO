import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test.skip('Step 16 - เจ้าหน้าที่ สจป. เพิ่มเอกสารตั้งงบประมาณ', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/');
});
