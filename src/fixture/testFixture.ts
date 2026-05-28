import { test as base, expect, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { PostAPIRequestBody } from '../utils/APIhelper';
import tokenApiRequest from '../../test-data/API_Requests/Token_API_Request.json';

// Define fixture types
type ApiFixtures = {
    authToken: string;
    bookingId: number;
    createdBooking: {
        bookingId: number;
        firstName: string;
        lastName: string;
        totalPrice: number;
    };
};


export const test = base.extend<ApiFixtures>({

    // Fixture 1 - Generate auth token
    authToken: async ({ request }, use) => {
        const tokenApiResponse = await request.post(`/auth`, { data: tokenApiRequest });
        const jsonTokenApiResponse = await tokenApiResponse.json();
        const token = jsonTokenApiResponse.token;
        console.log('Token generated:', token);
        await use(token);
    },

    // Fixture 2 - Create a booking and return its ID
    bookingId: async ({ request }, use) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const totalPrice = faker.number.int({ min: 1000, max: 10000 });

        const postAPIRequest = await PostAPIRequestBody(
            firstName, lastName, totalPrice,
            true, "breakfast", "2026-01-26", "2026-01-27"
        );

        const postAPIResponse = await request.post(`/booking`, { data: postAPIRequest });
        const jsonPostApiResponse = await postAPIResponse.json();
        const bookingId = jsonPostApiResponse.bookingid;
        console.log('Booking created, ID:', bookingId);

        await use(bookingId);
    },

    // Fixture 3 - Create booking and return full details


    createdBooking: async ({ request }, use) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const totalPrice = faker.number.int({ min: 1000, max: 10000 });

        const postAPIRequest = await PostAPIRequestBody(
            firstName, lastName, totalPrice,
            true, "breakfast", "2026-01-26", "2026-01-27"
        );

        const postAPIResponse = await request.post(`/booking`, { data: postAPIRequest });
        const jsonPostApiResponse = await postAPIResponse.json();

        // Validate POST response status
        expect(postAPIResponse.status()).toBe(200);
        expect(postAPIResponse.statusText()).toBe('OK');
        expect(postAPIResponse.headers()['content-type']).toContain('application/json');

        // Validate POST response keys exist
        expect(jsonPostApiResponse.booking).toHaveProperty('firstname');
        expect(jsonPostApiResponse.booking).toHaveProperty('lastname');
        expect(jsonPostApiResponse.booking.bookingdates).toHaveProperty('checkin');
        expect(jsonPostApiResponse.booking.bookingdates).toHaveProperty('checkout');

        // Validate POST response values
        expect(jsonPostApiResponse.bookingid).toBeGreaterThan(0);
        expect(jsonPostApiResponse.booking.firstname).toBe(firstName);
        expect(jsonPostApiResponse.booking.lastname).toBe(lastName);

        await use({
            bookingId: jsonPostApiResponse.bookingid,
            firstName,
            lastName,
            totalPrice
        });
    },

});

export { expect };