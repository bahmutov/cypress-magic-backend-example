const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultBrowser: 'electron',
  env: {
    // https://github.com/bahmutov/cypress-magic-backend
    magicBackend: {
      // this app makes "XHR" calls to load and update "/todos"
      // match calls like
      // GET /todos
      // POST /todos
      // DELETE /todos/1234
      apiCallsToIntercept: [
        {
          method: '+(GET|POST)',
          pathname: '/todos',
        },
        {
          method: 'DELETE',
          pathname: '/todos/*',
        },
      ],
    },

    'cypress-watch-and-reload': {
      watch: ['app.js', 'index.html'],
    },
  },
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // https://github.com/bahmutov/cypress-watch-and-reload
      return require('cypress-watch-and-reload/plugins')(on, config)
    },
  },
})
