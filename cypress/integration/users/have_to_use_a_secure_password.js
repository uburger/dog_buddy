describe('Users have to enter a secure password', function() {
  it('does not accept an not secure password', function(){
    cy.visit('/users/new');
    cy.get("#email").type("happy@test.com");
    cy.get("#password").type("123");
    cy.get(".submit").click()
    cy.url().should("contain", "/users/new")
  });
})