'use strict'

const testHelper = require("../../support/commands");

describe('Loggin fails', function() { 
  it('when user is unknown', function() { 
    testHelper.signUpTestUser('123@123.com', 'MY_very_securePWD123!')
    testHelper.loginTestUser('456@123.com', 'MY_very_securePWD123!')

    cy.get('#title').should('contain', 'Log into Paw Pals');
  });

  it('when password is wrong', function() { 
    testHelper.signUpTestUser('456@123.com', 'MY_very_securePWD123!')
    testHelper.loginTestUser('456@123.com', 'Whoops_wrong_PWD123!')

    cy.get('#title').should('contain', 'Log into Paw Pals');

  });
});