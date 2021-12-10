'use strict'

const testHelper = require("../../support/commands");

// const testHelper = require('../../support/commands.js')

describe('User logs in', function() {
  it('User is directed to map page when correct credentials entered', function() {
    testHelper.signUpTestUser('4321@4321.com', 'MY_very_securePWD123!');
    testHelper.loginTestUser('4321@4321.com', 'MY_very_securePWD123!');

    cy.get('#title').should('contain', 'Map');
  });
});

// describe('Loggin fails', function() { 
//   it('when user is unknown', function() { 
//     testHelper.signUpTestUser('123@123.com', 'MY_very_securePWD123!')
//     testHelper.loginTestUser('456@123.com', 'MY_very_securePWD123!')

//     cy.get('#error-form').should('contain', 'Either password is wrong or user does not exist');
//   });

//   it('when password is wrong', function() { 
//     testHelper.signUpTestUser('456@123.com', 'MY_very_securePWD123!')
//     testHelper.loginTestUser('456@123.com', 'Whoops_wrong_PWD123!')

//     cy.get('#error-form').should('contain', 'Either password is wrong or user does not exist');

//   });
// });
