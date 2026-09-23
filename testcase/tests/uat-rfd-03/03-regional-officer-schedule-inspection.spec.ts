import { test } from '@playwright/test';
import {
  clickIfVisible,
  clickWhenReady,
  fillWhenReady,
  uiTimeout,
  waitForUi,
} from '../../support/ui';

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test('Step 03 - เจ้าหน้าที่ สจป. กำหนดนัดหมายตรวจสภาพป่า', async ({ page }) => {
  page.setDefaultTimeout(uiTimeout);
  page.setDefaultNavigationTimeout(uiTimeout);

  await page.goto('https://dev-dpermit.forest.go.th/dashboard', {
    waitUntil: 'domcontentloaded',
  });
  await waitForUi(page);

  await clickWhenReady(page, page.getByRole('button', { name: 'ระบบงานรับเรื่อง' }));
  await clickWhenReady(page, page.getByRole('button', { name: 'ระบบงานตรวจสภาพป่า' }));
  await clickWhenReady(page, page.getByRole('link', { name: '• งานนัดหมายตรวจสภาพป่า' }));
  await page
    .getByRole('row')
    .filter({ hasText: 'นัดหมายตรวจสภาพป่า' })
    .filter({ hasText: 'สบ-' })
    .first()
    .click({ timeout: uiTimeout });
  await waitForUi(page);
  await clickWhenReady(page, page.getByRole('link', { name: 'สร้างนัดหมายตรวจสภาพป่า' }));

  if (await clickIfVisible(page, page.getByRole('button', { name: 'เลือกวันที่' }))) {
    await clickIfVisible(page, page.getByRole('button', { name: /^Today,/ }));
  }

  if (await clickIfVisible(page, page.getByRole('button', { name: 'เลือกเวลา' }))) {
    await clickIfVisible(page, page.getByRole('button', { name: '08' }).first());
    await clickIfVisible(page, page.getByRole('button', { name: '30', exact: true }));
  }

  await clickWhenReady(page, page.locator('div').filter({ hasText: 'สถานที่' }).nth(5));
  await clickWhenReady(page, page.getByRole('heading', { name: 'ผู้นัดตรวจ (ผู้ยื่นคำขอ หรือ ผู้แทน)' }));
  await clickWhenReady(page, page.locator('.mt-2 > .grid > div').first());

  await clickWhenReady(page, page.getByRole('heading', { name: 'เจ้าหน้าที่สำนักงานจัดการทรัพยากรป่าไม้' }));
  await clickWhenReady(page, page.getByRole('heading', { name: 'เจ้าหน้าที่คนที่' }).first());
  await fillWhenReady(page, page.locator('input[name="forestOfficers.0.name"]'), 'กิตติพงษ์ วัฒนชัย');
  await fillWhenReady(page, page.getByRole('textbox', { name: '-123-4567' }).first(), '089-123-4567');
  await fillWhenReady(page, page.locator('input[name="forestOfficers.0.email"]'), 'kittipong.test@example.com');

  await clickWhenReady(page, page.getByRole('button', { name: 'เพิ่มเจ้าหน้าที่' }).first());
  await clickWhenReady(page, page.locator('div').filter({ hasText: /^เจ้าหน้าที่คนที่ 2$/ }));
  await fillWhenReady(page, page.locator('input[name="forestOfficers.1.name"]'), 'ณัฐวุฒิ ศรีสุวรรณ');
  await fillWhenReady(page, page.getByRole('textbox', { name: '-123-4567' }).nth(1), '086-234-5678');
  await fillWhenReady(page, page.locator('input[name="forestOfficers.1.email"]'), 'nattawut.test@example.com');

  await clickWhenReady(page, page.getByRole('heading', { name: 'เจ้าหน้าที่สำนักงานทรัพยากรธรรมชาติและสิ่งแวดล้อมจังหวัด' }));
  await clickWhenReady(page, page.locator('div').filter({ hasText: /^เจ้าหน้าที่คนที่ 1$/ }).nth(1));
  await fillWhenReady(page, page.locator('input[name="provinceOfficers.0.name"]'), 'พิมพ์ชนก รัตนากร');
  await fillWhenReady(page, page.getByRole('textbox', { name: '-123-4567' }).nth(2), '081-345-6789');
  await fillWhenReady(page, page.locator('input[name="provinceOfficers.0.email"]'), 'pimchanok.test@example.com');

  await clickWhenReady(page, page.getByRole('button', { name: 'เพิ่มเจ้าหน้าที่' }).nth(1));
  await clickWhenReady(page, page.locator('div').filter({ hasText: /^เจ้าหน้าที่คนที่ 2$/ }).nth(1));
  await fillWhenReady(page, page.locator('input[name="provinceOfficers.1.name"]'), 'ศุภชัย อินทรรักษ์');
  await fillWhenReady(page, page.getByRole('textbox', { name: '-123-4567' }).nth(3), '082-456-7890');
  await fillWhenReady(page, page.locator('input[name="provinceOfficers.1.email"]'), 'supachai.test@example.com');

  await clickWhenReady(page, page.getByRole('button', { name: 'ยืนยันสร้างนัดหมายตรวจสภาพป่า' }));
  await clickWhenReady(page, page.getByRole('button', { name: 'ยืนยัน', exact: true }));
  await clickWhenReady(page, page.getByText('สร้างนัดหมายสำเร็จ'));
  await clickWhenReady(page, page.getByRole('button', { name: 'ไปยังหน้าคำขอ' }));
  await clickWhenReady(page, page.getByText('รอบันทึกตรวจสภาพป่า'));
});
