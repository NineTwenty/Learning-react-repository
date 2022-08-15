describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Loads by default', () => {
    cy.location('pathname').should('equal', '/login');
    cy.findByRole('heading', { name: /sign in/i });
    cy.findByRole('button', { name: /sign in/i });
  });
});
