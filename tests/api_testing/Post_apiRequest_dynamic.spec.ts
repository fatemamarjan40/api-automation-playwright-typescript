import { test, expect } from '@playwright/test'
import { formatAPIRequest } from '../../src/utils/APIhelper';
import path from 'path';
import fs from 'fs';
import { faker } from '@faker-js/faker';
test.use({

    baseURL: process.env.BASE_API_URL,
})

test('Create Post API dynamic request', async ({ request }) => {
    // Point to the JSON file
    const filepath = path.join(__dirname, '../../test-data/API_Requests/Dynamic_postRequest.json');
    const jsonTemplate = fs.readFileSync(filepath, 'utf-8');

    // Values to inject into {0}, {1}, {2}
    const values = ['Jon', 'Junior', 1000];

    // Format the string
    const formattedString = await formatAPIRequest(jsonTemplate, values);

    // Convert the formatted string BACK to a JSON Object for Playwright
    // const requestBody = JSON.parse(formattedString);

    // Create api response
    const postAPIResponse = await request.post(`https://restful-booker.herokuapp.com/booking`, {
        data: JSON.parse(formattedString)
    });

    const jsonPostapiResponse = await postAPIResponse.json();
    console.log('Response:', JSON.stringify(jsonPostapiResponse, null, 2));

    // Validating the response
    expect(postAPIResponse.status()).toBe(200);

    //Assertions must match your 'values' array above
    expect(jsonPostapiResponse.booking.firstname).toBe('Jon');
    expect(jsonPostapiResponse.booking.lastname).toBe('Junior');
    expect(jsonPostapiResponse.booking.totalprice).toBe(1000);
});

test('Create Post API dynamic request 2', async ({ request }) => {
    // Point to the JSON file
    const filepath = path.join(__dirname, '../../test-data/API_Requests/Dynamic_postRequest.json');
    const jsonTemplate = fs.readFileSync(filepath, 'utf-8');

    // Values to inject into {0}, {1}, {2}
    const values = ['Jon', 'Junior', 1000];

    // Format the string
    const formattedString = await formatAPIRequest(jsonTemplate, values);

    // Convert the formatted string BACK to a JSON Object for Playwright
    // const requestBody = JSON.parse(formattedString);

    // Create api response
    const postAPIResponse = await request.post(`https://restful-booker.herokuapp.com/booking`, {
        data: JSON.parse(formattedString)
    });

    const jsonPostapiResponse = await postAPIResponse.json();
    console.log('Response:', JSON.stringify(jsonPostapiResponse, null, 2));

    // Validating the response
    expect(postAPIResponse.status()).toBe(200);

    //Assertions must match your 'values' array above
    expect(jsonPostapiResponse.booking.firstname).toBe('Jon');
    expect(jsonPostapiResponse.booking.lastname).toBe('Junior');
    expect(jsonPostapiResponse.booking.totalprice).toBe(1000);
});
