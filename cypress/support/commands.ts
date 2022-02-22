import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (login = 'admin', password = 'admin') => {
  cy.findByTestId('loginForm').then(($form) => {
    cy.wrap($form).findByLabelText('Login').type(login);
    cy.wrap($form).findAllByLabelText('Password').type(password);
  });

  cy.findAllByRole('button', { name: 'Sign in' }).click();
});
