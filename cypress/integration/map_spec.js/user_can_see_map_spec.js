describe('A user can see a map', function() {
    it('has a map', function() {
      cy.visit('/');
      cy.get('#map').should('be.visible'); 
    });
  });

