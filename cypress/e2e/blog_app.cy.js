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

    describe('When logged in (only blog add)', function () {
      beforeEach(function () {
        cy.get('#username').type('tite');
        cy.get('#password').type('salasana');
        cy.get('#loginButton').click();
      });

      it('A blog can be created', function () {
        cy.contains('create new blog').click();
        cy.get('#title').type('A new blog');
        cy.get('#author').type('Toni Oksanen');
        cy.get('#url').type('www.testi.fi');
        cy.get('#create').click();

        cy.contains('A new blog Toni Oksanen');
      });
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'tite', password: 'salasana' });
      });

      describe('When blog has been created', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'A new blog',
            author: 'Toni Oksanen',
            url: 'www.testi.fi',
          });
        });

        it('A blog can be liked', function () {
          cy.get('#viewButton').click();
          cy.contains('A new blog');
          cy.contains(0);
          cy.get('#likeButton').click();
          cy.contains(1);
        });

        it('A blog can be deleted', function () {
          cy.contains('Timo Testaaja logged in');
          cy.get('#viewButton').click();
          cy.get('#creator').contains('Timo Testaaja');
          cy.get('#removeButton').click();
          cy.visit('http://localhost:3000');
          cy.contains('A new blog Toni Oksanen').should('not.exist');
        });

        describe('When second blog has been created', function () {
          beforeEach(function () {
            cy.createBlog({
              title: 'A second blog',
              author: 'Timo Viljanen',
              url: 'www.toinentesti.fi',
            });
          });

          it('Likes are sorted from most to least', function () {
            cy.get('.blog').eq(0).should('contain', 'A new blog');
            cy.get('.blog').eq(1).should('contain', 'A second blog');
            cy.contains('A second blog')
              .contains('view')
              .click()
              .get('#likeButton')
              .click();
            cy.visit('http://localhost:3000');
            cy.get('.blog').eq(0).should('contain', 'A second blog');
          });
        });
      });
    });
  });
});
