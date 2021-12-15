'use strict'

const testHelper = require("../../support/commands");



describe('A user can see a map', function() {
    it('has a map', function() {
      testHelper.signUpTestUser('4321@4321.com', 'MY_very_securePWD123!');
      testHelper.loginTestUser('4321@4321.com', 'MY_very_securePWD123!');
      
      cy.get('#map').should('be.visible'); 
    });

    it('and randomly click on map to view pop up box', function() {

      testHelper.signUpTestUser('432@4321.com', 'MY_very_securePWD123!');
      testHelper.loginTestUser('432@4321.com', 'MY_very_securePWD123!');
      
      cy.get('#map').click();
      expect('.leaflet-popup-content').to.not.be.empty; 
    });
  });

  describe('User input', function() {
    it('allows user to input coordinates', function() {

      testHelper.signUpTestUser('43@4321.com', 'MY_very_securePWD123!');
      testHelper.loginTestUser('43@4321.com', 'MY_very_securePWD123!');
      
      cy.get('#coordinateInput').find('#lat').type("51.1");
      cy.get('#coordinateInput').find('#lon').type("60.1");
      cy.get('#update-map').click();
    });
  });

  describe('User input', function() {
    it('coordinates can be viewed on map in pop up box', function() {
      testHelper.signUpTestUser('4@4321.com', 'MY_very_securePWD123!');
      testHelper.loginTestUser('4@4321.com', 'MY_very_securePWD123!');
      
      cy.get('#coordinateInput').find('#lat').type("51.1");
      cy.get('#coordinateInput').find('#lon').type("60.1");
      cy.get('#update-map').click();
      cy.get('.leaflet-popup-content').contains(' LAT: 51.1 LON: 60.1');
    });
  });


 