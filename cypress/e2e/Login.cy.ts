describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Loads by default', () => {
    cy.location('pathname').should('equal', '/login');
    cy.findByRole('heading', { name: /sign in/i });
    cy.findByRole('button', { name: /sign in/i });
  });

  it('Redirect to profile on login', () => {
    cy.login();
    cy.location().should('match', /profile\/\d+\/posts/);
  });

  it('Redirect to it on logout', () => {
    cy.login();
    cy.findByRole('button', { name: /logout/i }).click();
    cy.location('pathname').should('equal', '/login');
    cy.findByRole('heading', { name: /sign in/i });
    cy.findByRole('button', { name: /sign in/i });
  });
});
