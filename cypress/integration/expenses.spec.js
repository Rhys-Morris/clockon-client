import { login, mockExpense } from "../support/helpers/helper";

const createNewExpense = (name, date, cost) => {
  cy.get("[data-cy=new]").eq(1).click();
  mockExpense(name, date, cost);
  cy.get("[data-cy=submit]").click();
};

describe("expense functionality", () => {
  it("should create and destroy expense", () => {
    login();

    // Go to first project page
    cy.visit("/projects");
    cy.get("[data-cy=project-card]").first().click();
    cy.url("eq", Cypress.config().baseUrl + "/project/1");

    // Create expense
    cy.get("[data-cy=new]").eq(1).click();
    mockExpense();
    cy.get("[data-cy=submit]").click();

    // Check present
    cy.get("[data-cy=expense-card]").should("have.length", 1);

    // Destroy
    cy.get("[data-cy=open-popover]").click();
    cy.get("[data-cy=trigger-destroy]").click();
    cy.get("[data-cy=confirm-destroy]").click();

    cy.get("[data-cy=expense-card]").should("not.exist");
  });

  it("should prevent creation with a name > 40 characters", () => {
    createNewExpense(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    cy.get("[data-cy=expense-error]").should(
      "have.text",
      "Expense name must be < 40 characters"
    );
    cy.get("[data-cy=close]").click();
  });

  it("should prevent creation with cost < 0.0", () => {
    createNewExpense("New expense", "2020-10-10", 0);
    cy.get("[data-cy=expense-error]").should(
      "have.text",
      "Cost must be greater than 0"
    );
    cy.get("[data-cy=close]").click();
  });

  it("should prevent creation with cost > 1000.00", () => {
    createNewExpense("New expense", "2020-10-10", 10001.0);
    cy.get("[data-cy=expense-error]").should(
      "have.text",
      "Cost must be less than 10000.0"
    );
    cy.get("[data-cy=close]").click();
  });
});

// describe("edit an expense", () => {
//   it("should allow expense editing", () => {
//     // TRY WITHOUT
//     cy.get("[data-cy=new]").eq(1).click();
//     cy.get("[data-cy=expense-name]")
//       .type("New expense")
//       .should("have.value", "New expense");
//     cy.get("[data-cy=expense-date]")
//       .type("2020-10-10")
//       .should("have.value", "2020-10-10");
//     cy.get("[data-cy=cost]").type(10).should("have.value", 10);
//     cy.get("[data-cy=submit]").click();

//     cy.get("[data-cy=expense-name]").should("have.text", "New expense");
//     cy.get("[data-cy=expense-date]").should("have.text", "2020-10-10");
//     cy.get("[data-cy=expense-cost]").should("have.text", "$10");

//     // Edit
//     cy.get("[data-cy=open-popover]").click();
//     cy.get("[data-cy=edit]").last().click();
//     mockExpense("Edited Expense", "2021-10-10", 20);
//     cy.get("[data-cy=submit]").click();

//     // Confirm changed
//     cy.get("[data-cy=expense-name]").should("have.text", "Edited Expense");
//     cy.get("[data-cy=expense-date]").should("have.text", "2021-10-10");
//     cy.get("[data-cy=expense-cost]").should("have.text", "$20");

//     // Destroy
//     cy.get("[data-cy=open-popover]").click();
//     cy.get("[data-cy=trigger-destroy]").click();
//     cy.get("[data-cy=confirm-destroy]").click();
//   });
// });

// describe("sorting functionality", () => {
//   it("should sort by cost", () => {
//     // Create tasks
//     for (let i = 1; i < 7; i++) {
//       createNewExpense("Test expense", `2020-01-0${i}`, i);
//     }
//     // Sort
//     cy.get("[data-cy=sort-expenses-cost]").click();

//     // Check first and last
//     cy.get("[data-cy=expense-card]")
//       .first()
//       .find("[data-cy=expense-cost]")
//       .should("have.text", 6);

//     cy.get("[data-cy=expense-card]")
//       .last()
//       .find("[data-cy=expense-cost]")
//       .should("have.text", 1);
//     // Sort
//     cy.get("[data-cy=sort-expenses-cost]").click();
//     // Check first to last
//     cy.get("[data-cy=expense-card]")
//       .first()
//       .find("[data-cy=expense-cost]")
//       .should("have.text", 1);

//     cy.get("[data-cy=expense-card]")
//       .last()
//       .find("[data-cy=expense-cost]")
//       .should("have.text", 6);
//   });

//   it("should sort by date", () => {
//     // Sort
//     cy.get("[data-cy=sort-expenses-date]").click();
//     // Check first and last
//     cy.get("[data-cy=expense-card]")
//       .first()
//       .find("[data-cy=expense-date]")
//       .should("have.text", "2020--01-06");

//     cy.get("[data-cy=expense-card]")
//       .last()
//       .find("[data-cy=expense-date]")
//       .should("have.text", "2020-01-01");
//     // Sort
//     cy.get("[data-cy=sort-expenses-date]").click();
//     // Check first to last
//     cy.get("[data-cy=expense-card]")
//       .first()
//       .find("[data-cy=expense-date]")
//       .should("have.text", "2020-01-01");

//     cy.get("[data-cy=expense-card]")
//       .last()
//       .find("[data-cy=expense-date]")
//       .should("have.text", "2020-01-06");
//   });
// });

// describe("pagination", () => {
//   it("should paginate expenses correctly", () => {
//     // Check no next marker & card length is 6
//     cy.get("[data-cy=expense-card]").should("have.length", 6);
//     cy.get("[data-cy=expenses-next]").should("not.exist");

//     createNewExpenses("Test expense", "2020-01-07", 7);

//     // Check next marker
//     cy.get("[data-cy=expenses-next]").should("exist");
//     cy.get("[data-cy=expense-card]").should("have.length", 6);

//     // Navigate to next page - check card length and prev is visible
//     cy.get("[data-cy=expenses-next]").click();
//     cy.get("[data-cy=expenses-next]").should("not.exist");
//     cy.get("[data-cy=expenses-prev]").should("exist");
//     cy.get("[data-cy=expense-card]").should("have.length", 1);

//     // Delete tasks
//     cy.get("[data-cy=expenses-prev]").click();
//     for (let i = 1; i < 8; i++) {
//       cy.wait(300);
//       cy.get("[data-cy=open-popover]").first().click();
//       cy.get("[data-cy=trigger-destroy]").first().click();
//       cy.get("[data-cy=confirm-destroy]").click();
//     }
//   });
// });
