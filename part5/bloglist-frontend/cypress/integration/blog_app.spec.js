describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user= {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 


    cy.visit('http://localhost:3000')
  })
//5.17
  it('Login form is shown', function() {
    cy.contains('login')
  })
//5.18
  describe('Login', function(){
    it('login fails with wrong password', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('w')
      cy.get('#login').click()

      cy.contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('succeeds with correct credentials', function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login').click()

      cy.contains('Matti Luukkainen logged in')
    })
  })
//5.19
  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('a new note can be created', function(){
      cy.contains('create new blog').click()
      cy.get('#title').type('my 5.19 test')
      cy.get('#author').type('33')
      cy.get('#url').type('http://www.ss.com')
      cy.get('#likes').type('32')
      cy.contains('save').click()

      cy.contains('my 5.19 test')

      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('show').click()
      cy.contains('33')})
//5.20
    describe('when a blog is existed', function(){
      beforeEach(function(){
        cy.createBlog({
          title:'test for deleting',
          author:'mluukkai',
          url:'http://www.muuu/com',
          likes:20
        })
        cy.contains('test for deleting')
      })
      it('sucussfully delete', function(){
        cy.contains('remove').click()
        cy.contains('test for deleting is deleted')
      })
      it('delete the new blog with wrong user', function(){
        const user= {
          name: 'Sarah',
          username: 'sarah',
          password: 'hss'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'sarah', password: 'hss' })
          .contains('remove').click()
        cy.contains('test for deleting')

      })
    })
  })

})

