import {test, expect} from '@playwright/test'
import PostAPIRequest from '../../test-data/API_Requests/Post_API_Request.json'
test.use({

    baseURL: process.env.BASE_API_URL,
})

test('Create Post API request', async({request}) => {

    // create api response
    const postAPIResponse = await request.post(`/booking`, {data: PostAPIRequest});
    //printing the response
   const jsonPostapiResponse = await postAPIResponse.json();
   console.log('Post request response' + JSON.stringify(jsonPostapiResponse, null,2)); //converting to string, null-we don't want update the particular data, 2 - for space
   
   //validating the response
   expect(postAPIResponse.status()).toBe(200);// for negative test we may pass 201/500
   expect(postAPIResponse.statusText()).toBe('OK');
   expect(postAPIResponse.headers()['content-type']).toContain('application/json');
   
   //validating key name
   expect(jsonPostapiResponse.booking).toHaveProperty('firstname');
   expect(jsonPostapiResponse.booking).toHaveProperty('lastname');
   expect(jsonPostapiResponse.booking.bookingdates).toHaveProperty('checkin');
   expect(jsonPostapiResponse.booking.bookingdates).toHaveProperty('checkout');

   //validate response body
   expect(jsonPostapiResponse.bookingid).toBeGreaterThan(0);
   expect(jsonPostapiResponse.booking.firstname).toBe('Alif');
   expect(jsonPostapiResponse.booking.lastname).toBe("ABC");
   expect(jsonPostapiResponse.booking.bookingdates.checkin).toBe("2018-01-01");
   expect(jsonPostapiResponse.booking.bookingdates.checkout).toBe("2019-01-01");





});