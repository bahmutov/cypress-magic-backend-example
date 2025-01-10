const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultBrowser: 'electron',
  env: {
    // https://github.com/bahmutov/cypress-magic-backend
    magicBackend: {
      // this app makes "XHR" calls to load and update "/todos"
      apiCallsToIntercept: {
        method: '*',
        // match calls like
        // GET /todos
        // POST /todos
        // DELETE /todos/1234
        pathname: '/todos{/*,}',
      },
    },
  },
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
})
