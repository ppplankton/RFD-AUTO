import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/hq-division-head-central.json',
});

test.skip('Step 06 - หัวหน้าฝ่ายมอบหมายงานให้เจ้าหน้าที่กองอนุญาต', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/');
});
