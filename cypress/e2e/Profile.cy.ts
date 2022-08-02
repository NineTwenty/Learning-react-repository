describe('Profile page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('admin', 'admin');
    cy.location('pathname').should('contain', '/profile/');
  });

  describe('Posting form', () => {
    const string = 'Testing string';
    it('Should reset value on submit', () => {
      // Find containing form
      cy.findByTestId('postingForm')
        .parent()
        .then(($form) => {
          // Assert that textarea has text in it
          cy.wrap($form)
            .findByRole('textbox')
            .type(string)
            .should('have.value', string);

          // Submit post
          cy.wrap($form).findByRole('button').click();

          // Assert that form reset work correctly
          cy.wrap($form).findByRole('textbox').should('have.value', '');
        });
    });
  });
});
