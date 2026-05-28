import { test, expect } from '../../src/fixture/testFixture.ts';
test.use({
  baseURL: process.env.BASE_API_URL,
});

test('Get API Request using params', async ({ request, createdBooking }) => {

  // createdBooking fixture already created the booking for us
  const { bookingId, firstName, lastName } = createdBooking;
  console.log('Booking ID:', bookingId);

  // Validate bookingId
  expect(bookingId).toBeGreaterThan(0);

  // GET request using params
  const getRequestResponse = await request.get(`/booking/`, {
    params: {
      firstname: firstName,
      lastname: lastName
    },
  });

  // Validate GET response
  expect(getRequestResponse.status()).toBe(200);
  expect(getRequestResponse.statusText()).toBe('OK');

  const getRequestResponseJson = await getRequestResponse.json();
  console.log('GET Response:', JSON.stringify(getRequestResponseJson, null, 2));

});