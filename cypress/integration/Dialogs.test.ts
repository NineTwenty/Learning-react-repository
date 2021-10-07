describe('Dialogs', () => {
  beforeEach(() => {
    cy.reload();
    cy.visit('/');
    cy.login('admin', 'admin');
    cy.wait(1000);
  });

  it('Create new dialog by button on profile page', () => {
    cy.visit('/dialogs');
    // Wait for dialogs loading
    cy.wait(1000);
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
        // Wait for dialogs loading
        cy.wait(1000);

        // Find dialogs list
        cy.findAllByRole('navigation')
          .find('ul')
          .children()
          // Compare its length with previous
          .should('have.length.greaterThan', dialogsCount);
      });
  });
});
