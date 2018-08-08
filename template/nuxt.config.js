const webpack = require('webpack')
require('dotenv').config()
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    // loading: {
    //   color: '#FFB536',
    //   height: '2px'
    // },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  env: {
  },
  /*
  ** Global CSS
  */
  css: [
    {src: '~/assets/css/main.css', lang: 'scss' }
  ],
  plugins: [
    // new LodashModuleReplacementPlugin(),
    { src: '~plugins/app-plugins' },
    // { src: '~plugins/vue-bootstrap' },
    { src: '~plugins/app-ssr-plugins', ssr: false }
  ],
  modules: [
    'nuxt-trailingslash-module',
    ['assets/js/bs-common/custom-bs-styles-module', { css: false }],
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
    ['@nuxtjs/pwa', { }],
  ],
  workbox: {
    // PWA workbox options
    // https://pwa.nuxtjs.org/modules/workbox.html
    importScripts: [
      'custom-sw.js'
    ]
  },
  meta: {
    // PWA meta options
    // https://pwa.nuxtjs.org/modules/meta.html
  },
  manifest: {
    //https://pwa.nuxtjs.org/modules/manifest.html
    // name: 'My Awesome App',
    // lang: 'fa'
  },
  icon: {
    // Icon options
    // https://pwa.nuxtjs.org/modules/icon.html
  },
  /*
  ** Add axios globally
  */
  build: {
    vendor: [
      'axios',
      'babel-polyfill'
      // 'transform-es2015-spread',
      // 'bootstrap-vue/dist/bootstrap-vue.common',
      // 'bootstrap-vue',
      // 'vue2-google-maps'
    ],
    plugins: [
      new webpack.ProvidePlugin({
        Popper: ['popper.js', 'default']
        // '_': 'lodash'
      }),
      new webpack.ContextReplacementPlugin(
        /moment[\/\\]locale$/,
        /en-gb/
      )
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^bootstrap-vue/]
          })
        ]
      }
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
