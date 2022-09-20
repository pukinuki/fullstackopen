describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials and notification error color is red', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('4321')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: '1234' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()

      cy.contains('title author')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'title',
        author: 'author',
        url: 'url'
      })

      cy.contains('view').click()
      cy.get('.blog-details').contains('likes 0')
      cy.contains('like').click()
      cy.get('.blog-details').contains('likes 1')
    })

    it('A user that created the blog can delete it', function() {
      cy.createBlog({
        title: 'title',
        author: 'author',
        url: 'url'
      })

      cy.get('.blog').should('have.length', 1)
      cy.contains('view').click()
      cy.get('.remove-button').click()
      cy.get('.blog').should('have.length', 0)
    })

    it('Other users can no delete a blog', function() {
      cy.createBlog({
        title: 'title',
        author: 'author',
        url: 'url'
      })

      const otherUser = {
        name: 'Other user',
        username: 'other',
        password: '4321'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
      cy.contains('logout').click()

      cy.login({ username: 'other', password: '4321' })

      cy.contains('view').click()
      cy.get('.blog').should('have.length', 1)
      cy.get('.remove-button').should('not.exist')

    })

    it('Blogs are ordered according to likes with the blog with the most likes being first', function() {
      cy.createBlog({
        title: 'title1',
        author: 'author1',
        url: 'url1',
      })

      cy.createBlog({
        title: 'title2',
        author: 'author2',
        url: 'url2',
        likes: 1
      })

      cy.get('.blog').eq(0).should('contain', 'title2 author2')
      cy.get('.blog').eq(1).should('contain', 'title1 author1')

      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(500)
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(500)
      cy.get('.blog').eq(0).should('contain', 'title1 author1')
      cy.get('.blog').eq(1).should('contain', 'title2 author2')
    })
  })
})