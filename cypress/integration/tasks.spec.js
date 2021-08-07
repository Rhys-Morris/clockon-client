import { login } from "../support/helpers/helper";

const mockTask = (title = "New task", dueDate = "2022-10-10", time = 10) => {
  cy.get("[data-cy=title]").type(title).should("have.value", title);
  cy.get("[data-cy=date]").type(dueDate).should("have.value", dueDate);
  cy.get("[data-cy=time]").clear().type(time).should("have.value", time);
};

describe("task functionality", () => {
  it("should create and destroy task", () => {
    login();

    // Go to first project page
    cy.visit("/projects");
    cy.get("[data-cy=project-card]").first().click();
    cy.url("eq", Cypress.config().baseUrl + "/project/1");

    // Create task
    cy.get("[data-cy=new]").first().click();
    mockTask();
    cy.get("[data-cy=submit]").click();

    // Check present
    cy.get("[data-cy=task-card]").should("have.length", 1);

    // Destroy task
    cy.get("[data-cy=open-popover]").click();
    cy.get("[data-cy=trigger-destroy]").first().click();
    cy.get("[data-cy=confirm-destroy]").click();

    cy.get("[data-cy=task-card]").should("not.exist");
  });
});
