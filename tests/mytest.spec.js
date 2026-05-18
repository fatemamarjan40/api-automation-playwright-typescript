import {test, expect} from '@playwright/test'

test('my first test', async({page}) => {

    await page.goto('https://google.com/');
    await page.locator('textarea[name="q"]').fill('playwright');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const results = await page.locator('h3').allTextContents();
   // expect(results.length).toBeGreaterThan(0);
});