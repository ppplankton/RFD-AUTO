import { expect, Locator, Page } from '@playwright/test';

export const uiTimeout = 30_000;

export async function waitForUi(page: Page) {
  await page
    .waitForLoadState('domcontentloaded', { timeout: 10_000 })
    .catch(() => undefined);

  await page
    .waitForLoadState('networkidle', { timeout: 2_000 })
    .catch(() => undefined);
}

export async function clickWhenReady(page: Page, locator: Locator) {
  await expect(locator).toBeVisible({
    timeout: uiTimeout,
  });

  await expect(locator).toBeEnabled({
    timeout: uiTimeout,
  });

  await locator.scrollIntoViewIfNeeded({
    timeout: uiTimeout,
  });

  try {
    await locator.click({
      timeout: uiTimeout,
    });
  } catch (error) {
    if (page.isClosed()) {
      throw error;
    }

    await locator.evaluate((element) => {
      element.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    });

    await page.waitForTimeout(100);

    try {
      await locator.click({
        force: true,
        timeout: 5_000,
      });
    } catch (forceClickError) {
      if (page.isClosed()) {
        throw forceClickError;
      }

      await locator.evaluate((element) => {
        if (!(element instanceof HTMLElement)) {
          throw new Error('Target element is not clickable');
        }

        element.click();
      });
    }
  }

  await waitForUi(page);
}

export async function clickIfVisible(
  page: Page,
  locator: Locator,
  timeout = 3_000
) {
  try {
    await expect(locator).toBeVisible({
      timeout,
    });
  } catch {
    return false;
  }

  await clickWhenReady(page, locator);
  return true;
}

export async function fillWhenReady(
  page: Page,
  locator: Locator,
  value: string
) {
  await expect(locator).toBeVisible({
    timeout: uiTimeout,
  });

  await expect(locator).toBeEnabled({
    timeout: uiTimeout,
  });

  await locator.scrollIntoViewIfNeeded({
    timeout: uiTimeout,
  });

  await locator.fill(value, {
    timeout: uiTimeout,
  });

  await waitForUi(page);
}
