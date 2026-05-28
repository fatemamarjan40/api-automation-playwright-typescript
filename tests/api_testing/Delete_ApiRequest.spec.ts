import { test, expect } from '../../src/fixture/testFixture.ts';

test.use({

    baseURL: process.env.BASE_API_URL,
})

test('Create DELETE Request', async ({ request, createdBooking, authToken }) => {
    const { bookingId } = createdBooking;
    const deleteResponse = await request.delete(`/booking/${bookingId}`, {
        headers: {
            "Cookie": `token=${authToken}`
        },
    });
    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe('Created');

    const DeleteResponseBody = await deleteResponse.body(); // here we using body() as delete api response body is not a json data 
    console.log('Delete API Response:' + DeleteResponseBody);

});


