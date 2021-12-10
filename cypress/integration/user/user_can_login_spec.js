'use strict'

// const testHelper = require('../../support/commands.js')

describe('User logs in', function() {
  it('User is directed to map page when correct credentials entered', function() {
    cy.visit('/users/new');
    cy.get('#new-user-form').find('[type="email"]').type('4321@4321.com');
    cy.get('#new-user-form').find('[type="password"]').type('MY_very_securePWD123!');
    cy.get('#new-user-form').submit();
    
    cy.visit('/sessions/new');
    cy.get('#new-session-form').find('[type="email"]').type('4321@4321.com');
    cy.get('#new-session-form').find('[type="password"]').type('MY_very_securePWD123!');
    cy.get('#new-session-form').submit();

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
