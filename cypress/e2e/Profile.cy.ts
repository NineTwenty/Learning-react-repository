describe('Profile page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('admin', 'admin');
    cy.location('pathname').should('contain', '/profile/');
  });

  it('Can navigate to posts subpage', () => {
    cy.findByRole('link', { name: /posts/i }).click();
    cy.location('pathname').should('match', /posts/);
    cy.findByText(/create post/i);
  });

  it('Can navigate to about subpage', () => {
    cy.findByRole('link', { name: /about/i }).click();
    cy.location('pathname').should('match', /about/);
    cy.findByText(/first name/i);
  });

  it('Can navigate to friends subpage', () => {
    cy.findByRole('link', { name: /friends/i }).click();
    cy.location('pathname').should('match', /friends/);
  });

  it('Can navigate to photos subpage', () => {
    cy.findByRole('link', { name: /photos/i }).click();
    cy.location('pathname').should('match', /photos/);
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
