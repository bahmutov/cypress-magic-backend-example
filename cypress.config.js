const { defineConfig } = require('cypress')
// https://github.com/bahmutov/cypress-magic-backend
const registerMagicBackend = require('cypress-magic-backend/src/plugin')

module.exports = defineConfig({
  defaultBrowser: 'electron',
  e2e: {
    // baseUrl, etc
    baseUrl: 'http://127.0.0.1:3000',
    fixturesFolder: false,
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
        // where to store recorded API calls?
        // local: store all API calls locally in JSON files
        // remote: send API calls to a remote server at cypress.tips
        store: 'remote',
      },

      // list the files and file patterns to watch
      // https://github.com/bahmutov/cypress-watch-and-reload
      'cypress-watch-and-reload': {
        watch: ['index.html', 'app.js'],
      },
    },
    setupNodeEvents(on, config) {
      registerMagicBackend(on, config)

      require('cypress-watch-and-reload/plugins')(on, config)

      // IMPORTANT: return the config object
      // because it might be modified by the plugin function
      return config
    },
  },
})
