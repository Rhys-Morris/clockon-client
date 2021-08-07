describe("user login", () => {
  const baseLogin = (email = "test@test.com", password = "password") => {
    cy.visit(Cypress.config().baseUrl);
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=email]").type(email).should("have.value", email);
    cy.get("[data-cy=password]").type(password).should("have.value", password);
    cy.get("[data-cy=submit]").click();
  };

  it("should login and logout an existing user", () => {
    baseLogin();
    cy.url("eq", Cypress.config().baseUrl + "/dashboard");
    cy.get("[data-cy=sign-out]").click();
    cy.url("eq", Cypress.config().baseUrl + "/");
  });

  it("should reject invalid email", () => {
    baseLogin("wrong@email.com");
    cy.get("[data-cy=error]").should("have.text", "Invalid email or password");
  });

  it("should reject invalid password", () => {
    baseLogin("test@test.com", "wrong");
    cy.get("[data-cy=error]").should("have.text", "Invalid email or password");
  });
});
