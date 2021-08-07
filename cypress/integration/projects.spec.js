import { login, mockProject } from "../support/helpers/helper";

describe("create/destroy functionality", () => {
  it("should create a project and destroy it", () => {
    // Login as test user
    login();

    // Add new project
    cy.visit(Cypress.config().baseUrl + "/projects");
    cy.get("[data-cy=new]").click();

    // Fill out form
    mockProject();

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

  it("should navigate to a project page on click", () => {
    cy.get("[data-cy=project-card]").first().click();
    cy.url("eq", Cypress.config().baseUrl + "/project/1");
  });
});

describe("filter/search functionality", () => {
  // Filter by active
  it("should filter active projects correctly", () => {
    cy.visit(Cypress.config().baseUrl + "/projects");
    cy.get("[data-cy=filter-active]").select("both");
    cy.get("[data-cy=project-card]").should("have.length", 3);

    cy.get("[data-cy=filter-active]").select("false");
    cy.get("[data-cy=project-card]").should("have.length", 1);

    cy.get("[data-cy=filter-active]").select("true");
    cy.get("[data-cy=project-card]").should("have.length", 2);
  });

  // Filter by project name
  it("should filter by project name", () => {
    cy.get("[data-cy=filter-name]").type("1");
    cy.get("[data-cy=project-card]").should("have.length", 1);

    cy.get("[data-cy=filter-name]").clear();
  });

  // Filter by client name
  it("should filter by client name", () => {
    cy.get("[data-cy=filter-client]").type("1");
    cy.get("[data-cy=project-card]").should("have.length", 1);

    cy.get("[data-cy=filter-client]").clear();
  });

  // Filter by billable
  it("should filter by billable", () => {
    cy.get("[data-cy=filter-billable]").select("true");
    cy.get("[data-cy=project-card]").should("have.length", 1);

    cy.get("[data-cy=filter-billable]").select("both");
  });

  it("should filter in tandem", () => {
    // Filter together
    cy.get("[data-cy=filter-name]").type("1");
    cy.get("[data-cy=filter-client]").type("1");
    cy.get("[data-cy=filter-billable]").select("true");
    cy.get("[data-cy=filter-active]").select("true");
    cy.get("[data-cy=project-card]").should("have.length", 1);

    // Reset all
    cy.get("[data-cy=filter-billable]").select("both");
    cy.get("[data-cy=filter-client]").clear();
    cy.get("[data-cy=filter-name]").clear();
    cy.get("[data-cy=filter-active]").select("both");

    cy.get("[data-cy=project-card]").should("have.length", 3);
  });
});
