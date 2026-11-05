/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

export function authLogin(username: string, password: string, baseUrl: string) {
  return cy
    .request({
      method: "POST",
      url: `${baseUrl}/auth`,
      body: {
        username: username,
        password: password,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      return response.body;
    });
}

export function apiRequest(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | string,
  url: string,
  body?: object,
  headers?: object,
) {
  return cy.request({
    method: method as any,
    url: url,
    body: body,
    headers: headers,
    failOnStatusCode: false,
  });
}

export function generateDados() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: "2027-01-01",
      checkout: "2027-02-01",
    },
    additionalneeds: faker.helpers.arrayElement([
      "Breakfast",
      "Dinner",
      "Lunch",
      "Extra Pillow",
    ]),
  };
}

export function createBooking(dados: any, urlApi: string) {
  return cy.request({
    method: "POST",
    url: `${urlApi}/booking`,
    body: {
      firstname: dados.firstname,
      lastname: dados.lastname,
      totalprice: dados.totalprice,
      depositpaid: dados.depositpaid,
      bookingdates: {
        checkin: dados.bookingdates.checkin,
        checkout: dados.bookingdates.checkout,
      },
      additionalneeds: dados.additionalneeds,
    },
    failOnStatusCode: true,
  });
}

export function alterBookingCom(bookingId: any, token: any, dados: any, baseUrl: string) {
  return cy.request({
    method: "PUT",
    url: `${baseUrl}/booking/${bookingId}`,
    headers: { Cookie: `token=${token}` },
    body: {
      firstname: dados.firstname,
      lastname: dados.lastname,
      totalprice: dados.totalprice,
      depositpaid: dados.depositpaid,
      bookingdates: {
        checkin: dados.bookingdates.checkin,
        checkout: dados.bookingdates.checkout,
      },
      additionalneeds: dados.additionalneeds,
    },
    failOnStatusCode: false,
  });
}

export function alterBookingPar(bookingId: any, token: any, dados: any, baseUrl: string) {
  return cy.request({
    method: "PATCH",
    url: `${baseUrl}/booking/${bookingId}`,
    headers: { Cookie: `token=${token}` },
    body: {
      firstname: dados.firstname,
      lastname: dados.lastname,
    },
    failOnStatusCode: false,
  });
}

export function deleteBooking(bookingId: any, token: any, baseUrl: string) {
  return cy.request({
    method: "DELETE",
    url: `${baseUrl}/booking/${bookingId}`,
    headers: { Cookie: `token=${token}` },
    failOnStatusCode: false,
  });
}

export function expectResponse(response: any, expectedDados: any) {
  expect(response).to.have.property("firstname", expectedDados.firstname);
  expect(response).to.have.property("lastname", expectedDados.lastname);
  expect(response).to.have.property("totalprice", expectedDados.totalprice);
  expect(response.depositpaid).to.eq(expectedDados.depositpaid);
  expect(response.bookingdates).to.have.property(
    "checkin",
    expectedDados.bookingdates.checkin,
  );
  expect(response.bookingdates).to.have.property(
    "checkout",
    expectedDados.bookingdates.checkout,
  );
  expect(response).to.have.property(
    "additionalneeds",
    expectedDados.additionalneeds,
  );
}