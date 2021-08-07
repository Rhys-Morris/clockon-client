describe("create/destroy functionality", () => {
  const baseLogin = (email = "test@test.com", password = "password") => {
    cy.visit(Cypress.config().baseUrl);
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=email]").type(email).should("have.value", email);
    cy.get("[data-cy=password]").type(password).should("have.value", password);
    cy.get("[data-cy=submit]").click();
  };

  // Mock basic project
  const baseProject = (
    name = "Testing",
    color = "#ff00ff",
    client = "Test Client 2",
    dueDate = "2022-10-10",
    rate = "45.0"
  ) => {
    cy.get("[data-cy=name]").type(name).should("have.value", name);
    cy.get("[data-cy=color]").invoke("val", color).should("have.value", color);
    cy.get("[data-cy=client]").select(client).should("have.value", 2);
    cy.get("[data-cy=dueDate]").type(dueDate).should("have.value", dueDate);
    cy.get("[data-cy=rate]").type(rate).should("have.value", rate);
  };

  it("should create a project and destroy it", () => {
    // Login as test user
    cy.window().its("sessionStorage").invoke("clear");
    baseLogin();

    // Token check
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("exist");

    // Add new project
    cy.visit(Cypress.config().baseUrl + "/projects");
    cy.get("[data-cy=new]").click();

    // Fill out form
    baseProject();

    // Submit
    cy.get("[data-cy=submit]").click();

    // Check created - should be 3 active projects
    cy.wait(500).get("[data-cy=project-card]").should("have.length", 3);

    // Destroy new project
    cy.get("[data-cy=project-card]")
      .last()
      .find("[data-cy=destroy-project]")
      .click();

    // Confirm in modal
    cy.get("[data-cy=confirm-destroy").click();

    // Check back to 2 active projects
    cy.wait(500).get("[data-cy=project-card]").should("have.length", 2);
  });
});
