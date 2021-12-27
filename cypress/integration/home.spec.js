/// <reference types="cypress" />

describe(`Homepage`, () => {
  it(`should render other button`, () => {
    cy.visit('/');

    cy.get('button').contains('Go to other').should('be.visible');
  });
});
