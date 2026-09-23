import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test.skip('Step 05 - เจ้าหน้าที่ สจป. อัปโหลดหนังสือความเห็น', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/');
});
