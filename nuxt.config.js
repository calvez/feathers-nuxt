const {
  resolve
} = require('path');
const package = require('./package.json');

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  srcDir: resolve(__dirname, './client'),
  router: {
    middleware: ['auth', 'i18n']
  },
  env: {
    apiURL: process.env.API_URL || 'http://localhost:3030'
  },
  head: {
    title: `${package.name} — ${package.description}`,
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    ]
  },
  modules: [
    // Simple usage
    'nuxt-buefy',

    ['nuxt-buefy', {
      /* buefy options */
    }]
  ],
  plugins: ['~/plugins/i18n.js'],
  css: [
    'normalize.css/normalize.css',
    './client/styles.css'
  ]
};
