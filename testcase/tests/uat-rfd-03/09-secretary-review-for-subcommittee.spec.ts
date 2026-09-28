import { test } from '@playwright/test';

test.use({
  storageState: 'testcase/auth/hq-secretary.json',
});

test('Step 09 - เลขานุการตรวจสอบเพื่อจัดวาระอนุกรรมการ', async ({ page }) => {
  await page.goto('https://dev-dpermit.forest.go.th/secretary/document-review');
  await page.getByText('อยู่ระหว่างพิจารณาคำขอ').click();
  await page.getByRole('link', { name: 'ตรวจเอกสาร' }).click();
  await page.getByRole('button', { name: 'ตรวจเอกสาร' }).click();
  await page.getByRole('button', { name: 'เข้าวาระพิจารณาคณะอนุกรรมการ' }).click();
  await page.getByRole('button', { name: 'บันทึก', exact: true }).click();
});