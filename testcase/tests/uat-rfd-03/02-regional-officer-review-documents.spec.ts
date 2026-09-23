import { Locator, Page, test } from '@playwright/test';
import { clickWhenReady, uiTimeout, waitForUi } from '../../support/ui';

type ApproveDocument = (page: Page) => Promise<void>;

async function approveSimpleDocument(page: Page) {
  await clickWhenReady(page, page.getByRole('button', { name: 'เอกสารถูกต้องครบถ้วน' }).first());
  await clickWhenReady(page, page.getByRole('button', { name: 'บันทึก' }).first());
}

async function approveDocumentWithConfirm(page: Page) {
  await clickWhenReady(page, page.getByRole('button', { name: 'เอกสารถูกต้องครบถ้วน' }).first());
  await clickWhenReady(page, page.getByRole('button', { name: 'บันทึก', exact: true }));
  await clickWhenReady(page, page.getByRole('button', { name: 'ยืนยัน' }));
  await clickWhenReady(page, page.getByRole('button', { name: 'ปิด' }));
}

async function approveFinalDocument(page: Page) {
  await clickWhenReady(page, page.getByRole('button', { name: 'เอกสารถูกต้องครบถ้วน' }).nth(1));
  await clickWhenReady(page, page.getByRole('button', { name: 'บันทึก' }).nth(1));
}

async function approveReviewButtonsUntilActionEnabled(
  page: Page,
  approveDocument: ApproveDocument,
  nextAction: Locator
) {
  const reviewButtons = page.getByRole('button', {
    name: 'ตรวจสอบ',
    exact: true,
  });

  await reviewButtons.first().waitFor({
    state: 'visible',
    timeout: uiTimeout,
  });

  for (let attempt = 0; attempt < 50; attempt++) {
    const canGoNext = await nextAction.isEnabled().catch(() => false);

    if (canGoNext) {
      return;
    }

    const buttonCount = await reviewButtons.count();
    let clicked = false;

    for (let buttonIndex = 0; buttonIndex < buttonCount; buttonIndex++) {
      const button = reviewButtons.nth(buttonIndex);
      const isVisible = await button.isVisible().catch(() => false);
      const isEnabled = await button.isEnabled().catch(() => false);

      if (!isVisible || !isEnabled) {
        continue;
      }

      await clickWhenReady(page, button);
      await approveDocument(page);
      await waitForUi(page);

      clicked = true;
      break;
    }

    if (!clicked) {
      throw new Error('ปุ่มถัดไปยัง disabled แต่ไม่พบปุ่มตรวจสอบที่กดได้');
    }
  }

  throw new Error('ตรวจสอบเอกสารเกิน 50 รอบแล้ว ปุ่มถัดไปยังไม่ enabled');
}

test.use({
  storageState: 'testcase/auth/reg5-saraburi.json',
});

test('Step 02 - เจ้าหน้าที่ สจป. ตรวจสอบเอกสารคำขอและรับเรื่อง', async ({ page }) => {
  page.setDefaultTimeout(uiTimeout);
  page.setDefaultNavigationTimeout(uiTimeout);

  await page.goto('https://dev-dpermit.forest.go.th/dashboard', {
    waitUntil: 'domcontentloaded',
  });
  await waitForUi(page);

  await clickWhenReady(page, page.getByRole('button', { name: 'คำขอใหม่' }));
  await clickWhenReady(page, page.getByText('ยื่นคำขอสำเร็จ').first());
  await clickWhenReady(page, page.getByRole('button', { name: 'ตรวจสอบเอกสารคำขอ' }));

  const nextButton = page.getByRole('button', { name: 'ถัดไป' });

  await approveReviewButtonsUntilActionEnabled(page, approveSimpleDocument, nextButton);
  await clickWhenReady(page, nextButton);

  await approveReviewButtonsUntilActionEnabled(page, approveSimpleDocument, nextButton);
  await clickWhenReady(page, nextButton);

  await approveReviewButtonsUntilActionEnabled(page, approveDocumentWithConfirm, nextButton);
  await clickWhenReady(page, nextButton);

  const issueReceiptButton = page.getByRole('button', { name: 'ออกใบรับคำขอ' }).nth(1);

  await approveReviewButtonsUntilActionEnabled(page, approveFinalDocument, issueReceiptButton);
  await clickWhenReady(page, issueReceiptButton);

  const receiptPagePromise = page.waitForEvent('popup', {
    timeout: uiTimeout,
  });

  await clickWhenReady(page, page.getByRole('button', { name: 'ยืนยัน' }));

  const receiptPage = await receiptPagePromise;

  await waitForUi(receiptPage);
  await clickWhenReady(page, page.getByRole('button', { name: 'ไปยังหน้าคำขอ' }));
  await clickWhenReady(page, page.locator('div').filter({ hasText: /^นัดหมายตรวจสภาพป่า$/ }));
});
