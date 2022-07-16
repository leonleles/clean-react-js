Cypress.Commands.add("getByTestId", (id) => cy.get(`[data-cy=${id}]`));
