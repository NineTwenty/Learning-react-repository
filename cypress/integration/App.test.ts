describe('App', () => {
  beforeEach(() => {
    cy.reload();
    cy.visit('/');
    cy.login('admin', 'admin');
  });

  it('Redirect to profile on login', () => {
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/profile/4/posts');
    });
  });
});
