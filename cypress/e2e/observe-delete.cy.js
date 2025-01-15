/// <reference types="cypress" />

const twoItems = [
  { title: 'item 1', id: 1, completed: false },
  { title: 'item 2', id: 2, completed: false },
]

beforeEach(() => {
  const mode = Cypress.env('magic_backend_mode')
  if (mode !== 'playback') {
    mode && cy.log(`during the test the mode is "${mode}"`)
    cy.request('POST', '/reset', { todos: twoItems })
  }
})

it('spies on the delete call', () => {
  cy.visit('/')
  cy.get('li.todo').should('have.length', 2)

  // spy on the DELETE calls the application
  // will make when we click on the destroy item button
  cy.intercept('DELETE', '/todos/*').as('delete')

  cy.contains('li.todo', 'item 2')
    .find('.destroy')
    .click({ force: true })

  // confirm the DELETE call happens
  cy.wait('@delete').its('response.statusCode').should('eq', 200)

  cy.get('li.todo').should('have.length', 1)
})
