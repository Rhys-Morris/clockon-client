import { login, fillOutTimer } from "../support/helpers/helper";

const destroy = () => {
  cy.get("[data-cy=work]").find("[data-cy=work-delete]").click();
  cy.get("[data-cy=confirm-destroy]").click();
  // Remove flash
  cy.get("[data-cy=remove-flash]").click();
};

// ----- TESTS -----
describe("logging work functionality", () => {
  const checkFlashAndDestroy = () => {
    // Check flash
    cy.wait(500)
      .get("[data-cy=flash]")
      .should("have.text", "Work successfully logged!");

    // Check work period matching
    cy.get("[data-cy=work]").should("have.length", 1);

    destroy();
  };

  it("should create a work period using the timer", () => {
    login();

    // Navigate to timer
    cy.visit(Cypress.config().baseUrl + "/work");
    fillOutTimer();

    checkFlashAndDestroy();
  });

  it("should create a work period using the form", () => {
    cy.get("[data-cy=form]").click();

    // Fill out form
    cy.get("[data-cy=title]")
      .type("Test work period")
      .should("have.value", "Test work period");
    cy.get("[data-cy=project]").select("1").should("have.value", "1");
    cy.get("[data-cy=startDate]")
      .type("2021-05-05")
      .should("have.value", "2021-05-05");
    cy.get("[data-cy=startTime]").type("10:00").should("have.value", "10:00");
    cy.get("[data-cy=endDate]")
      .type("2021-05-05")
      .should("have.value", "2021-05-05");
    cy.get("[data-cy=endTime]").type("11:00").should("have.value", "11:00");

    // Submit
    cy.get("[data-cy=submit]").click();
  });
});

describe("Filter work periods", () => {
  it("should filter work periods by project name", () => {
    // Check listing present
    cy.get("[data-cy=work]").should("have.length", 1);

    // Filter by name
    cy.get("[data-cy=project-filter]")
      .type("Test Project 1")
      .should("have.value", "Test Project 1");

    // Check listing still present
    cy.get("[data-cy=work]").should("have.length", 1);

    // Alter filter text
    cy.get("[data-cy=project-filter]")
      .clear()
      .type("Blah")
      .should("have.value", "Blah");

    // Check listing not present
    cy.get("[data-cy=work]").should("have.length", 0);

    //Clean up
    cy.get("[data-cy=project-filter]").clear();
  });

  it("should filter work periods by title", () => {
    // Check listing present
    cy.get("[data-cy=work]").should("have.length", 1);

    // Filter by name
    cy.get("[data-cy=title-filter]")
      .type("Test Work Period")
      .should("have.value", "Test Work Period");

    // Check listing still present
    cy.get("[data-cy=work]").should("have.length", 1);

    // Alter filter text
    cy.get("[data-cy=title-filter]")
      .clear()
      .type("Blah")
      .should("have.value", "Blah");

    // Check listing not present
    cy.get("[data-cy=work]").should("have.length", 0);

    //Clean up
    cy.get("[data-cy=title-filter]").clear();
    destroy();
  });
});
