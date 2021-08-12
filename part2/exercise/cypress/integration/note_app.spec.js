describe('Note app', function () {
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 

    cy.visit('http://localhost:3000')
})
  it('front page can be opened', function () {
    
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, Aalto University 2021')
})

  it('login form can be opened', function() {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#loginButton').click()

        cy.contains('mluukkai logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#loginButton').click()
    })

    it('a new note can be created', function() {
      cy.contains('add note').click()
      cy.get('input').type('a note created by cypress 2')
      cy.contains('save').click()
      cy.contains('show all').click()
      cy.contains('a note created by cypress 2')
    })

    describe('and a note exists', function () {
        beforeEach(function () {
          cy.contains('add note').click()
          cy.get('input').type('another note cypress')
          cy.contains('save').click()
          
        })
  
        it('it can be made important', function () {
            cy.contains('show all').click()
          cy.contains('another note cypress')
            .contains('make important')
            .click()
  
          cy.contains('another note cypress')
            .contains('make not important')
        })
      })

  })
  
})

