// import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - tester-client',
    title: 'tester-client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', {
      fix: true
    }],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
       strategy: 'no_prefix',
      locales: [
        {
          name: 'kz',
          code: 'kz',
          iso: 'kz-KZ',
          file: 'kz.js'
        },
        {
          name: 'ru',
          code: 'ru',
          iso: 'ru-RU',
          file: 'ru.js'
        }
      ],
      langDir: 'lang/',
      defaultLocale: 'kz'
    }],
    '@nuxtjs/toast'
  ],
  proxy: {
    // see Proxy section
    '/api': { target: 'https://bilim.api.icatalog.kz/api', pathRewrite: { '^/api': '' } }

  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  router: {
    middleware: ['auth']
  },

  vuetify: {
    optionsPath: './vuetify.options.js'
  },
  // // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: false,
  //     custom:true,
  //     themes: {
  //       dark: {
  //         primary: '#00bcd4',//colors.blue.darken2,
  //         accent: '#cddc39',//colors.grey.darken3,
  //         secondary: '#03a9f4',//colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       },
  //       custom: {
  //         primary: '#00bcd4',
  //         secondary: '#03a9f4',
  //         accent: '#cddc39',
  //         error: '#f44336',
  //         warning: '#e91e63',
  //         info: '#2196f3',
  //         success: '#4caf50'
  //         }
  //     }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: false
    },
    strategies: {
      local: false,
      cookie: {
        // cookie: {
        //   name: 'jwt',
        // },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: {
            url: 'api/login',
            method: 'post'
          },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/user', method: 'get' }
        }
      }
    },
    watchLoggedIn: true
  },
  toast: {
    position: 'bottom-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ],
    duration: 5000
  }
}
