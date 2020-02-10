import i18nConfig from './nuxt-i18n.config'
import vuetifyConfig from './vuetify.config'
import { APP_NAME, APP_DESCRIPTION } from './lang/ja'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: `${APP_NAME}: ${APP_DESCRIPTION}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: APP_DESCRIPTION }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/icon-1024x1024.png', sizes: '1024x1024' },
      { rel: 'icon', type: 'image/png', href: '/icon-512x512.png', sizes: '512x512' },
      { rel: 'icon', type: 'image/png', href: '/icon-256x256.png', sizes: '256x256' },
      { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png', sizes: '180x180' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/vuetify', vuetifyConfig]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-client-init-module',
    ['nuxt-i18n', i18nConfig]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
