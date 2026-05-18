import { test, expect } from '@playwright/test'
import { PostAPIRequestBody } from '../../src/utils/APIhelper';

import { faker } from '@faker-js/faker';
import tokenApiRequest from '../../test-data/API_Requests/Token_API_Request.json';

test.use({

    baseURL: process.env.BASE_API_URL,
})


test('Create Delete Request ', async ({ request }) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });

    const postAPIRequest = await PostAPIRequestBody(firstName, lastName, totalPrice,
        true, "breakfast", "2026-01-26", "2026-01-27");
    const postAPIResponse = await request.post(`/booking`, { data: postAPIRequest });

    const jsonPostapiResponse = await postAPIResponse.json();
    console.log('Response:', JSON.stringify(jsonPostapiResponse, null, 2));
    const bookingID = jsonPostapiResponse.bookingid;
    console.log('bookingID' + ':' + bookingID)

    const getRequestResponse = await request.get(`/booking/${bookingID}`)


    // generating token
    const tokenApiResponse = await request.post(`/auth`, { data: tokenApiRequest });

    expect(tokenApiResponse.status()).toBe(200);
    expect(tokenApiResponse.statusText()).toBe('OK');

    const jsontokenApiResponse = await tokenApiResponse.json();
    const tokenId = await jsontokenApiResponse.token;
    console.log("token :" + tokenId);


    // create  Delete api request

    const DeleteApiResponse = await request.delete(`/booking/${bookingID}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token= ${tokenId}`
        },

    })

    expect(DeleteApiResponse.status()).toBe(201);
    expect(DeleteApiResponse.statusText()).toBe('Created');

    const DeleteResponseBody = await DeleteApiResponse.body(); // here we using body() as delete api response body is not a json data 
    console.log('Delete API Response:' + DeleteResponseBody);

});


