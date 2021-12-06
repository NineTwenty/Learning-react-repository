describe('Dialogs', () => {
  beforeEach(() => {
    cy.reload();
    cy.visit('/');
    cy.login('admin', 'admin');
    cy.location('pathname').should('contain', '/profile/');
  });

  describe('Button to create dialog with profile owner', () => {
    it('Unavailable on user own profile page', () => {
      // Find create dialog button
      cy.findAllByText('Message').should('not.exist');
    });
  });

  it('Create new dialog by button on profile page', () => {
    cy.visit('/dialogs');
    // Find dialogs list
    cy.findAllByRole('navigation')
      .find('ul')
      .then((ul) => {
        // Save its length
        const dialogsCount = ul.children.length;

        // Visit someone profile
        cy.visit('/profile/1');
        // Find and click create dialog button
        cy.findAllByText('Message').click();

        // Wait for redirect
        cy.location('pathname').should('have.string', '/dialogs/');

        // Find dialogs list
        cy.findAllByRole('navigation')
          .find('ul')
          .children()
          // Compare its length with previous
          .should('have.length.greaterThan', dialogsCount);
      });
  });
});
