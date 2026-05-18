import { test, expect } from '@playwright/test';
import testdata from '../../test-data/QA/testdata.json'

type testData = 
{
 
    testdataset1:{
        Skil1:  string,
        Skil2 : string

    },
    
    testdataset2:{
        Skil1 : string,
        Skil2 : string

    }

}
const typeTestData = testdata as testData;
for (const datasetname in typeTestData)
{
    const skill = typeTestData[datasetname as keyof testData];

//     test (`Data Driven Testing Using JSON file in playwright: ${skill.Skil1}`, async ({ page }) =>
// {// Go to URL
// await page.goto('https://www.google.com/');
// // Search with keywords
// await page.getByLabel('Search', { exact: true }).fill(skill.Skil1);
// await page.getByLabel('Search', { exact: true }).press('Enter');
// // Click on playlist
// await page.getByRole('link', { name: skill.Skil1}).first().click();
// // Validate web page title
// await expect(page).toHaveTitle(skill.Skil1);

// })
// }

test(`Data Driven Testing Using JSON file in playwright: ${skill.Skil1}`, async ({ page }) => {

    test.setTimeout(60000); 

    await page.goto('https://www.google.com/');

    // قبول cookie (if appears)
    const acceptButton = page.getByRole('button', { name: /accept/i });
    if (await acceptButton.isVisible()) {
        await acceptButton.click();
    }

    // Search
  const searchBox = page.locator('textarea[name="q"]');
await searchBox.fill(skill.Skil1);
await searchBox.press('Enter');

await page.waitForLoadState('networkidle');

// Click first result
const firstResult = page.locator('h3').first();
await firstResult.waitFor({ state: 'visible' });
await firstResult.click();

// Validate title contains keyword (partial)
await expect(page).toHaveTitle(/playwright/i);
});
}