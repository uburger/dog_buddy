'use strict'

const testHelper = require("../../support/commands");

describe('User logs in', function() {
  it('User is directed to map page when correct credentials entered', function() {
    testHelper.signUpTestUser('4321@4321.com', 'MY_very_securePWD123!');
    testHelper.loginTestUser('4321@4321.com', 'MY_very_securePWD123!');

    cy.get('#title').should('contain', 'Map');
  });
});
