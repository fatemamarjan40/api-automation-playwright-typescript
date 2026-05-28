import { test, expect } from '../../src/fixture/testFixture.ts';
import PutApiRequest from '../../test-data/API_Requests/Put_API_Request.json';

test.use({

  baseURL: process.env.BASE_API_URL,
})


test('Create PUT Request', async ({ request, createdBooking, authToken }) => {
  const { bookingId } = createdBooking;
  const putResponse = await request.put(`/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${authToken}`
    },
    data: PutApiRequest,
  });
  expect(putResponse.status()).toBe(200);
  expect(putResponse.statusText()).toBe('OK');



  const PutResponseJson = await putResponse.json();
  console.log('Response:', JSON.stringify(PutResponseJson, null, 2));
});

