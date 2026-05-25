import { test, expect } from '@playwright/test'

test('Mocking API request', async ({ page }) => {

    await page.route('*/**/api/v1/fruits', async route => {
        const json = [
            { name: 'hello', id: 1 },
            { name: 'world', id: 2 },
            { name: 'hi', id: 3 }


        ]

        await route.fulfill({ json });
    })

    await page.goto('https://demo.playwright.dev/api-mocking/');
    await page.waitForTimeout(2000);


    await expect(page.getByText('hello')).toBeVisible;
    await expect(page.getByText('world')).toBeVisible;
    await expect(page.getByText('hi')).toBeVisible;

});