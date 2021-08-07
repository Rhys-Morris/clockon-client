// Prevent error from failing 401 test
Cypress.on("uncaught:exception", (err) => {
  return false;
});

describe("401 error", () => {
  it("should redirect user to a 401 page if unauthorised", () => {
    //   Clear tokens
    cy.window().its("sessionStorage").invoke("clear");

    cy.visit(Cypress.config().baseUrl + "/dashboard");
    cy.url("eq", Cypress.config().baseUrl + "/401");
  });
});

describe("404 error", () => {
  it("should redirect user to a 404 page if incorrect url", () => {
    cy.visit(Cypress.config().baseUrl + "/wrong", { failOnStatusCode: false });
    cy.wait(500).url("eq", Cypress.config().baseUrl + "/404");
  });
});
