const login = (email = "test@test.com", password = "password") => {
  // Clear token if present
  cy.window().its("sessionStorage").invoke("clear");

  cy.visit(Cypress.config().baseUrl);
  cy.get("[data-cy=login]").click();
  cy.get("[data-cy=email]").type(email).should("have.value", email);
  cy.get("[data-cy=password]").type(password).should("have.value", password);
  cy.get("[data-cy=submit]").click();

  // Check token created correctly
  cy.window().its("sessionStorage").invoke("getItem", "token").should("exist");
};

const mockClient = (
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

const mockProject = (
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

const mockUser = (
  name = "Cypress",
  email = "cypresstest@email.com",
  password = "password"
) => {
  cy.get("[data-cy=name]").type(name).should("have.value", name);
  cy.get("[data-cy=email]").type(email).should("have.value", email);
  cy.get("[data-cy=password]").type(password).should("have.value", password);

  cy.get("[data-cy=submit]").click();
};

const fillOutTimer = (title = "Test work period", project = "1") => {
  cy.get("[data-cy=timer]").click();

  // Fill in details
  cy.get("[data-cy=title]").type(title).should("have.value", title);
  cy.get("[data-cy=project]").select(project).should("have.value", project);

  // Hit play
  cy.get("[data-cy=play]").click();

  // Wait 2 seconds before stopping
  cy.wait(2000).get("[data-cy=play]").click();
};

export { login, mockUser, mockClient, mockProject, fillOutTimer };
