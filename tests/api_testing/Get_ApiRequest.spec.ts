import { test, expect } from '../../src/fixture/testFixture.ts';
test.use({

  baseURL: process.env.BASE_API_URL,
})

test('Create GET Request', async ({ request, bookingId }) => {
    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(200);
    expect (getResponse.statusText()).toBe('OK');

     const GetResponseJson = await getResponse.json();
  console.log('Response:', JSON.stringify(GetResponseJson, null, 2));
})