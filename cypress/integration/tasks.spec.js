import { login, mockTask } from "../support/helpers/helper";

const createNewTasks = (title, dueDate, hours) => {
  cy.get("[data-cy=new]").first().click();
  mockTask(title, dueDate, hours);
  cy.get("[data-cy=submit]").click();
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
    cy.get("[data-cy=trigger-destroy]").last().click();
    cy.get("[data-cy=confirm-destroy]").click();

    cy.get("[data-cy=task-card]").should("not.exist");
  });

  it("should prevent creation with a title > 100 characters", () => {
    createNewTasks(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    cy.get("[data-cy=task-error]").should(
      "have.text",
      "Title is too long (maximum is 100 characters)"
    );
    cy.get("[data-cy=close]").click();
  });

  it("should prevent creation with hours < 0.0", () => {
    createNewTasks("New task", "2022-10-10", -1);
    cy.get("[data-cy=task-error]").should(
      "have.text",
      "Estimated hours must be greater than 0.0"
    );
    cy.get("[data-cy=close]").click();
  });

  it("should prevent creation with hours > 1000.00", () => {
    createNewTasks("New task", "2022-10-10", 1001.0);
    cy.get("[data-cy=task-error]").should(
      "have.text",
      "Estimated hours must be less than 1000.0"
    );
    cy.get("[data-cy=close]").click();
  });

  it("should allow editing of a task", () => {
    // Create task
    cy.get("[data-cy=new]").first().click();
    mockTask();
    cy.get("[data-cy=submit]").click();

    // Navigate to edit
    cy.get("[data-cy=open-popover]").click();
    cy.get("[data-cy=edit]").last().click();

    // Edit details
    mockTask("Edited task", "2022-10-10", 20);
    cy.get("[data-cy=submit]").click();

    // Check fields have changed
    cy.wait(500).get("[data-cy=task-title]").should("have.text", "Edited task");
    cy.get("[data-cy=task-date]").should("have.text", "2022-10-10");
    cy.get("[data-cy=task-hours]").should("have.text", 20);
  });

  it("should allow completion toggling", () => {
    // Tick completed
    cy.get("[data-cy=task-completed]").click();
    // Check cards viewable is 0
    cy.get("[data-cy=task-card]").should("not.exist");
    //Click toggle show completed
    cy.get("[data-cy=toggle-completed]").click();
    // Check cards viewable is 1
    cy.get("[data-cy=task-card]").should("have.length", 1);

    // Tidy up
    cy.get("[data-cy=task-completed]").click();
    cy.get("[data-cy=toggle-completed]").click();
    cy.get("[data-cy=open-popover]").click();
    cy.get("[data-cy=trigger-destroy]").last().click();
    cy.get("[data-cy=confirm-destroy]").click();
  });
});

describe("sorting functionality", () => {
  it("should sort by hours", () => {
    // Create tasks
    for (let i = 1; i < 7; i++) {
      createNewTasks("Test task", `2025-01-0${i}`, i);
    }
    // Sort
    cy.get("[data-cy=sort-hours]").click();
    // Check first and last
    cy.get("[data-cy=task-card]")
      .first()
      .find("[data-cy=task-hours]")
      .should("have.text", 6);

    cy.get("[data-cy=task-card]")
      .last()
      .find("[data-cy=task-hours]")
      .should("have.text", 1);
    // Sort
    cy.get("[data-cy=sort-hours]").click();
    // Check first to last
    cy.get("[data-cy=task-card]")
      .first()
      .find("[data-cy=task-hours]")
      .should("have.text", 1);

    cy.get("[data-cy=task-card]")
      .last()
      .find("[data-cy=task-hours]")
      .should("have.text", 6);
  });

  it("should sort by due date", () => {
    // Sort
    cy.get("[data-cy=sort-date]").click();
    // Check first and last
    cy.get("[data-cy=task-card]")
      .first()
      .find("[data-cy=task-date]")
      .should("have.text", "2025-01-06");

    cy.get("[data-cy=task-card]")
      .last()
      .find("[data-cy=task-date]")
      .should("have.text", "2025-01-01");
    // Sort
    cy.get("[data-cy=sort-date]").click();
    // Check first to last
    cy.get("[data-cy=task-card]")
      .first()
      .find("[data-cy=task-date]")
      .should("have.text", "2025-01-01");

    cy.get("[data-cy=task-card]")
      .last()
      .find("[data-cy=task-date]")
      .should("have.text", "2025-01-06");
  });
});
