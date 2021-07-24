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

  it('Can load friends profile page', () => {
    // Find any friend card
    cy.findAllByLabelText(/To \w+ \w+ profile/)
      .first()
      // Save for later click
      .as('friendCard')
      // Get friend name for later comparison
      .findByAltText(/\w+ \w+/)
      .invoke('attr', 'alt')
      .then((friendName) => {
        cy.get('@friendCard').click();

        // Assert that location changed to friend profile page
        cy.location().should((loc) => {
          const pathMatch = new RegExp(/profile\/\d+\/posts/);
          expect(loc.pathname).to.match(pathMatch);
        });

        // Assert that post subpage rendered
        cy.findByText('Create Post').should('be.visible');

        // Find any friend card
        cy.findAllByLabelText(/To \w+ \w+ profile/)
          .first()
          // Get friend name
          .findByAltText(/\w+ \w+/)
          .invoke('attr', 'alt')
          // Assert that it different set of friends
          .should('not.equal', friendName);
      });
  });
});
