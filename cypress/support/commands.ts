import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', (login = 'admin', password = 'admin') => {
  cy.findByLabelText('Login').type(login);
  cy.findByLabelText('Password').type(password);

  cy.findAllByRole('button', { name: 'Sign in'}).click()
})
