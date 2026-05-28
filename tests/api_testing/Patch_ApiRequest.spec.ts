import { test, expect } from '../../src/fixture/testFixture.ts';
import patchApiRequest from '../../test-data/API_Requests/Patch_API_Request.json';

test.use({
    baseURL: process.env.BASE_API_URL,
});

test('Create PATCH Request', async ({ request, createdBooking, authToken }) => {

    // createdBooking and authToken come from fixtures — no setup needed here!
    const { bookingId } = createdBooking;
    console.log('Booking ID:', bookingId);
    console.log('Token:', authToken);

    // PATCH request
    const patchApiResponse = await request.patch(`/booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${authToken}`
        },
        data: patchApiRequest,
    });

    expect(patchApiResponse.status()).toBe(200);
    expect(patchApiResponse.statusText()).toBe('OK');

    const jsonPatchApiResponse = await patchApiResponse.json();
    console.log('PATCH Response:', JSON.stringify(jsonPatchApiResponse, null, 2));
});
