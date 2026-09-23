import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/hq-secretary.json',
});

test.skip('Step 10 - เลขานุการสร้างการประชุมอนุกรรมการ', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/');
});
