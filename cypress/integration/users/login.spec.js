import { login } from "../../support/helpers/helper";

describe("user login", () => {
  it("should login and logout an existing user", () => {
    login();
    cy.url("eq", Cypress.config().baseUrl + "/dashboard");
    cy.get("[data-cy=sign-out]").click();
    cy.url("eq", Cypress.config().baseUrl + "/");
  });

  it("should reject invalid email", () => {
    login("wrong@email.com");
    cy.get("[data-cy=error]").should("have.text", "Invalid email or password");
  });

  it("should reject invalid password", () => {
    login("test@test.com", "wrong");
    cy.get("[data-cy=error]").should("have.text", "Invalid email or password");
  });
});
