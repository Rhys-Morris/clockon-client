describe("client creation and deletion", () => {
  const baseLogin = (email = "test@test.com", password = "password") => {
    cy.visit(Cypress.config().baseUrl);
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=email]").type(email).should("have.value", email);
    cy.get("[data-cy=password]").type(password).should("have.value", password);
    cy.get("[data-cy=submit]").click();
  };

  const baseClient = (
    name = "CypressTest",
    email = "cypress@test.com",
    contact = "Mr. Cypress"
  ) => {
    cy.get("[data-cy=new]").click();
    cy.get("[data-cy=name]").type(name).should("have.value", name);
    cy.get("[data-cy=contact]").type(contact).should("have.value", contact);
    cy.get("[data-cy=email]").type(email).should("have.value", email);
    cy.get("[data-cy=submit]").click();
  };

  it("should create and destroy a client", () => {
    baseLogin();
    cy.url("eq", Cypress.config().baseUrl + "/dashboard");

    // Token check
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("exist");

    cy.visit("/clients");

    baseClient();

    cy.wait(500)
      .get("[data-cy=client-card]")
      .last()
      .find("[data-cy=popover-trigger]")
      .click();

    cy.get("[data-cy=client-card]").last().find("[data-cy=delete]").click();

    cy.get("[data-cy=confirm-destroy]").click();

    // Can this not be hardcoded?
    cy.wait(500).get("[data-cy=client-card]").should("have.length", 3);
  });

  it("should reject clients with a name > 40 chars", () => {
    baseClient(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    cy.get("[data-cy=error]").should(
      "have.text",
      "Name must be < 40 characters"
    );
  });

  it("should reject clients with an email > 40 chars", () => {
    cy.visit("/clients");
    baseClient(
      "CypressTest",
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@test.com"
    );
    cy.get("[data-cy=error]").should(
      "have.text",
      "Email must be < 40 characters"
    );
  });

  it("should reject clients with an invalid email format", () => {
    cy.visit("/clients");
    baseClient("CypressTest", "invalidformat");
    cy.get("[data-cy=error]").should("have.text", "Email is an invalid format");
  });

  it("should reject clients with a contact > 40 chars", () => {
    cy.visit("/clients");
    baseClient(
      "CypressTest",
      "cypress@test.com",
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    cy.get("[data-cy=error]").should(
      "have.text",
      "Contact must be < 40 characters"
    );
  });
});

describe("client editing", () => {
  it("should allow editing of a client", () => {
    cy.visit("/clients");

    cy.get("[data-cy=client-card]")
      .first()
      .find("[data-cy=popover-trigger]")
      .click();

    cy.get("[data-cy=client-card]").first().find("[data-cy=edit]").click();

    cy.get("[data-cy=client-card]")
      .first()
      .find("[data-cy=edit-contact]")
      .clear()
      .type("Edited")
      .should("have.value", "Edited");

    // Confirm
    cy.get("[data-cy=client-card]").first().find("[data-cy=edit]").click();

    cy.wait(500)
      .get("[data-cy=client-card]")
      .last()
      .find("[data-cy=contact-text]")
      .should("have.text", "Contact: Edited");

    // Restore
    cy.get("[data-cy=client-card]")
      .last()
      .find("[data-cy=popover-trigger]")
      .click();

    cy.get("[data-cy=client-card]").last().find("[data-cy=edit]").click();

    cy.get("[data-cy=client-card]")
      .last()
      .find("[data-cy=edit-contact]")
      .clear()
      .type("John Doe")
      .should("have.value", "John Doe");

    // Confirm
    cy.get("[data-cy=client-card]").last().find("[data-cy=edit]").click();

    cy.wait(500)
      .get("[data-cy=client-card]")
      .last()
      .find("[data-cy=contact-text]")
      .should("have.text", "Contact: John Doe");
  });

  it("should display an error when the contact length > 40 whilst editing", () => {
    cy.get("[data-cy=client-card]")
      .first()
      .find("[data-cy=popover-trigger]")
      .click();

    cy.get("[data-cy=client-card]").first().find("[data-cy=edit]").click();

    cy.get("[data-cy=client-card]")
      .first()
      .find("[data-cy=edit-contact]")
      .clear()
      .type(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      )
      .should(
        "have.value",
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      );

    // Confirm
    cy.get("[data-cy=client-card]").first().find("[data-cy=edit]").click();

    // Check error
    cy.wait(1000)
      .get("[data-cy=client-card]")
      .first()
      .find("[data-cy=error]")
      .should(
        "have.text",
        "Card failed to update: Contact is too long (maximum is 40 characters)"
      );
  });
});

describe("search/filter functionality", () => {
  it("should filter the cards correctly by name", () => {
    cy.visit("/clients");
    cy.get("[data-cy=search]").clear().type("3");
    cy.get("[data-cy=client-card]").should("have.length", 1);

    // Clear
    cy.get("[data-cy=search]").clear();
  });

  it("should allow toggling of active status", () => {
    // Should be set to active only displayed on page load
    cy.visit("/clients");
    cy.get("[data-cy=client-card]")
      .first()
      .find("[data-cy=toggle-active]")
      .click();
    cy.wait(500).get("[data-cy=client-card]").should("have.length", 2);

    cy.get("[data-cy=active-select]").select("inactive");
    cy.wait(500).get("[data-cy=client-card]").should("have.length", 1);

    cy.get("[data-cy=active-select]").select("both");
    cy.wait(500).get("[data-cy=client-card]").should("have.length", 3);

    // Restore
    cy.get("[data-cy=active-select]").select("inactive");
    cy.wait(500)
      .get("[data-cy=client-card]")
      .find("[data-cy=toggle-active]")
      .click();

    cy.get("[data-cy=active-select]").select("active");
    cy.wait(500).get("[data-cy=client-card]").should("have.length", 3);
  });
});
