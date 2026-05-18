import { test, expect } from '@playwright/test'
import { PostAPIRequestBody } from '../../src/utils/APIhelper';

import { faker } from '@faker-js/faker';
import tokenApiRequest from '../../test-data/API_Requests/Token_API_Request.json';
import patchApiRequest from '../../test-data/API_Requests/Patch_API_Request.json'
test.use({

    baseURL: process.env.BASE_API_URL,
})


test('Create PATCH Request ', async ({ request }) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });

    const postAPIRequest = await PostAPIRequestBody(firstName, lastName, totalPrice,
        true, "breakfast", "2026-01-26", "2026-01-27");


    const postAPIResponse = await request.post(`/booking`, { data: postAPIRequest });

    const jsonPostapiResponse = await postAPIResponse.json();
    console.log('Response:', JSON.stringify(jsonPostapiResponse, null, 2));

    // Validating the response
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // get api response
    const bookingID = jsonPostapiResponse.bookingid;
    console.log('bookingID' + ':' + bookingID)

    const getRequestResponse = await request.get(`/booking/${bookingID}`)


    // generating token
    const tokenApiResponse = await request.post(`/auth`, { data: tokenApiRequest });

    const jsontokenApiResponse = await tokenApiResponse.json();
    const tokenId = await jsontokenApiResponse.token;
    console.log("token :" + tokenId);



    // create patch api request

    const PatchApiResponse = await request.patch(`/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token= ${tokenId}`
        },
        data: patchApiRequest,

    })

    expect(PatchApiResponse.status()).toBe(200);
    expect(PatchApiResponse.statusText()).toBe('OK');

    const JsonPatchApiResponse = await PatchApiResponse.json();
    console.log('Response:', JSON.stringify(JsonPatchApiResponse, null, 2));

});


