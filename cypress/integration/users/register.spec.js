describe("user registration", () => {
  const baseUser = (
    name = "Cypress",
    email = "cypresstest@email.com",
    password = "password"
  ) => {
    cy.get("[data-cy=name]").type(name).should("have.value", name);
    cy.get("[data-cy=email]").type(email).should("have.value", email);
    cy.get("[data-cy=password]").type(password).should("have.value", password);

    cy.get("[data-cy=submit]").click();
  };

  it("should allow user creation and deletion", () => {
    // Creation
    cy.visit("/register");
    baseUser();
    cy.url("eq", Cypress.config().baseUrl + "/dashboard");

    // Deletion
    cy.get("[data-cy=trigger-destroy]").click();
    cy.get("[data-cy=confirm-destroy]").click();
    cy.url("eq", Cypress.config().baseUrl + "/");
  });

  it("should reject an existing user being recreated", () => {
    cy.visit("/register");
    // Existing User in DB
    cy.get("[data-cy=name]").type("Test").should("have.value", "Test");
    cy.get("[data-cy=email]")
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get("[data-cy=password]")
      .type("password")
      .should("have.value", "password");

    cy.get("[data-cy=submit]").click();

    cy.get("[data-cy=error]").should(
      "have.text",
      "Email has already been taken"
    );
  });

  it("should prevent a user from being created with a non-alphabet name", () => {
    cy.visit("/register");
    baseUser("0100");
    cy.get("[data-cy=error]").should(
      "have.text",
      "Name can only contain alphabet characters"
    );
  });

  it("should prevent a user from being created with a name > 40 chars", () => {
    cy.visit("/register");
    baseUser(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    cy.get("[data-cy=error]").should(
      "have.text",
      "Name is too long (maximum is 40 characters)"
    );
  });

  it("should prevent a user from being created with a password < 8 chars", () => {
    cy.visit("/register");
    baseUser("Cypress", "cypresstest@email.com", "short");
    cy.get("[data-cy=error]").should(
      "have.text",
      "Password is too short (minimum is 8 characters)"
    );
  });
});
