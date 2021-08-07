describe("user registration", () => {
  // CLean up previously registered user

  it("creates a new user", () => {
    // Navigate to signup page
    cy.visit("/register");
    // fill out the fields
    cy.get("[data-cy=name]").type("Fake").should("have.value", "Fake");

    cy.get("[data-cy=email]")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    cy.get("[data-cy=password]")
      .type("fakepassword")
      .should("have.value", "fakepassword");
    // click the sign up buttons
    cy.get("[data-cy=submit]").click();
    // CHeck for token

    // Redirects to Dashboard
    cy.url().should("eq", "/dashboard");
  });

  it("should reject the same use being rejected", () => {
    cy.visit("/register");
    // fill out the fields
    cy.get("[data-cy=name]").type("Fake").should("have.value", "Fake");

    cy.get("[data-cy=email]")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");

    cy.get("[data-cy=password]")
      .type("fakepassword")
      .should("have.value", "fakepassword");
    // click the sign up buttons
    cy.get("[data-cy=submit]").click();
    // Redirects to Dashboard
    cy.get("[data-cy]=error").should(
      "have.value",
      "Email has already been taken"
    );
  });
});
