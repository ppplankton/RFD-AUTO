import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/hq-division-staff-central1.json',
});

test.skip('Step 07 - เจ้าหน้าที่ฝ่ายตรวจสอบเอกสาร', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/');
});
