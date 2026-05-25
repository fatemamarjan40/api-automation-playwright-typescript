import { test, expect } from '@playwright/test'

test('Mocking API reponse', async ({ page }) => {

    await page.route('*/**/api/v1/fruits', async route => {

        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'hello', id: 1 }),
            json.push({ name: 'world', id: 2 }),
            json.push({ name: 'hi', id: 3 })


        await route.fulfill({ response, json });
    })

    await page.goto('https://demo.playwright.dev/api-mocking/');
    await page.waitForTimeout(2000);


    await expect(page.getByText('hello')).toBeVisible;
    await expect(page.getByText('world')).toBeVisible;
    await expect(page.getByText('hi')).toBeVisible;

});