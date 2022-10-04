describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Timo Testaaja',
      username: 'tite',
      password: 'salasana',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tite');
      cy.get('#password').type('salasana');
      cy.get('#loginButton').click();
      cy.contains('Timo Testaaja logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tite');
      cy.get('#password').type('wrong');
      cy.get('#loginButton').click();
      cy.get('.error').should('contain', 'invalid username or password');
    });
  });
});
