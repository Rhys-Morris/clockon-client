import { login } from "../support/helpers/helper";

describe("sidebar navigation", () => {
  it("should navigate to the dash", () => {
    login();
    cy.get("[data-cy=dash]").click();
    cy.url("eq", Cypress.config().baseUrl + "/dashboard");
  });
  it("should navigate to the clients page", () => {
    cy.get("[data-cy=clients]").click();
    cy.url("eq", Cypress.config().baseUrl + "/clients");
  });
  it("should navigate to the projects page", () => {
    cy.get("[data-cy=projects]").click();
    cy.url("eq", Cypress.config().baseUrl + "/projects");
  });
  it("should navigate to the work page", () => {
    cy.get("[data-cy=work-link]").click();
    cy.url("eq", Cypress.config().baseUrl + "/work");
  });
});
