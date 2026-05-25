import { test, expect } from '@playwright/test'

test('Mocking API  using HAR file', async ({ page }) => {

  
await page.routeFromHAR('./har/fruits.har',

    {
        url :'*/**/api/v1/fruits',
        update: false
    })


    await page.goto('https://demo.playwright.dev/api-mocking/');
    await page.waitForTimeout(2000);


    await expect(page.getByText('strawberry')).toBeVisible;
    await expect(page.getByText('hello')).toBeVisible;
    await expect(page.getByText('world')).toBeVisible;
    await expect(page.getByText('hi')).toBeVisible;
   

});