describe('A user can see a map', function() {
    it('has a map', function() {
      cy.visit('/');
      cy.get('#map').should('be.visible'); 
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