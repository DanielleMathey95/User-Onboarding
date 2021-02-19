describe("Test form inputs", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("adds text to inputs", function () {
    cy.get('[data-cy="name"]')
      .type("Danielle")
      .should("have.value", "Danielle");
  });
});
