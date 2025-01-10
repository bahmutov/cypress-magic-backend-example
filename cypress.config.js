const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    magicBackend: {
      apiCallsToIntercept: {
        method: '*',
        // GET /todos
        // POST /todos
        // DELETE /todos/1235
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
