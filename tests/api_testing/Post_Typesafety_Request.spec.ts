import { test, expect } from '@playwright/test'
import { PostAPIRequestBody } from '../../src/utils/APIhelper';

import { faker } from '@faker-js/faker';
test.use({

  baseURL: process.env.BASE_API_URL,
})


test('Create post typesafety dynamic Request ', async ({ request }) => {
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

  //validating key name
  // expect(jsonPostapiResponse.booking).toHaveProperty('totalPrice');
  expect(jsonPostapiResponse.booking).toHaveProperty('firstname');
  expect(jsonPostapiResponse.booking).toHaveProperty('lastname');
  expect(jsonPostapiResponse.booking.bookingdates).toHaveProperty('checkin');
  expect(jsonPostapiResponse.booking.bookingdates).toHaveProperty('checkout');

  //validate response body
  expect(jsonPostapiResponse.bookingid).toBeGreaterThan(0);
  //  expect(jsonPostapiResponse.booking.firstname).toBe('totalPrice');
  expect(jsonPostapiResponse.booking.firstname).toBe(firstName);
  expect(jsonPostapiResponse.booking.lastname).toBe(lastName);
  expect(jsonPostapiResponse.booking.bookingdates.checkin).toBe("2026-01-26");
  expect(jsonPostapiResponse.booking.bookingdates.checkout).toBe("2026-01-27");

});
