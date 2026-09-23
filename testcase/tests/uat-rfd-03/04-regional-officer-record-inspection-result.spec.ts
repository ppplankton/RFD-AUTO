import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test.skip('Step 04 - เจ้าหน้าที่ สจป. บันทึกผลตรวจสภาพป่า', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/');
});
