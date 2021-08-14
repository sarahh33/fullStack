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
    beforeEach(function() {cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    describe('several notes exist', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'first note',
          important: false
        })
        cy.createNote({ content: 'second note', important:false})
        cy.createNote({ content: 'third note', important: false})

      })

      it('one of those can be made important', function () {
        cy.contains('show all').click()
        cy.contains('second note')
          .contains('make important') //chain is important here to continue focuses on the second note
          .click()

        cy.contains('second note')
          .contains('make not important')
      })

      it('then example', function(){
          cy.get('button').then(buttons => {
              console.log('number of buttons', buttons.length)
              cy.wrap(buttons[0]).click()
          })
      })
    })

  })


})

