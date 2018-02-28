const axios = require('axios')

module.exports = {

  generate: {
    routes: function () {
      return axios.get('https://staging2.cipt.be/toolbox/wp-json/toolbox/v1/infofiches')
        .then((res) => {
          return res.data.entries.map((fiche) => {
            return '/' + fiche.Slug
          })
        })
    }
  },
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Formatief Evalueren',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    { src: 'bulma/bulma.sass', lang: 'sass' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' },
    { src: 'assets/main.css' }
  ]
}
