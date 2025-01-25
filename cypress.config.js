const { defineConfig } = require('cypress')
// https://github.com/bahmutov/cypress-magic-backend
const registerMagicBackend = require('cypress-magic-backend/src/plugin')

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
  },
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      registerMagicBackend(on, config)
      // IMPORTANT: return the config object
      // because it might be modified by the plugin function
      return config
    },
  },
})
