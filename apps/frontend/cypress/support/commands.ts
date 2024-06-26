Cypress.Commands.add("getModal", () => cy.get('[data-cy="modal"]'));
Cypress.Commands.add("getTodo", () => cy.get('[data-cy="todo"]'));
Cypress.Commands.add("getTodosLink", () => cy.get('[data-cy="todos"]'));
Cypress.Commands.add("getModalCloseButton", () =>
	cy.get('[data-cy="modal-close-button"]')
);
