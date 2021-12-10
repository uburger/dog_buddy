describe('A user can see a map', function() {
    it('has a map', function() {
      cy.visit('/');
      cy.get('#map').should('be.visible'); 
    });

    it('and randomly click on map to view pop up box', function() {
      cy.visit('/');
      cy.get('#map').click();
      expect('.leaflet-popup-content').to.not.be.empty; 
    });
  });

  describe('User input', function() {
    it('allows user to input coordinates', function() {
      cy.visit('/');
      cy.get('#coordinateInput').find('#lat').type("51.1");
      cy.get('#coordinateInput').find('#lon').type("60.1");
      cy.get('#update-map').click();
    });
  });

  describe('User input', function() {
    it('coordinates can be viewed on map in pop up box', function() {
      cy.visit('/');
      cy.get('#coordinateInput').find('#lat').type("51.1");
      cy.get('#coordinateInput').find('#lon').type("60.1");
      cy.get('#update-map').click();
      cy.get('.leaflet-popup-content').contains(' LAT: 51.1 LON: 60.1');
    });
  });


 