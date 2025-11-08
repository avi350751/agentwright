import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.locator("#btn-make-appointment").click();
    await page.locator("#txt-username").fill("John Doe");
    await page.locator("#txt-password").fill("ThisIsNotAPassword");
    await page.locator("#btn-login").click();
  });
});
