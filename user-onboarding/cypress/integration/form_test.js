describe("Test our form inputs", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("adds text to inputs", function () {
    cy.get('[data-cy="name"]')
      .type("Danielle")
      .should("have.value", "Danielle");
    cy.get('[data-cy="email"]')
      .type("danielle.mathey@yahoo.com")
      .should("have.value", "danielle.mathey@yahoo.com");
    cy.get('input[name="password"]')
      .type('password');
    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked");
    cy.get("form").submit();

  
  });

});