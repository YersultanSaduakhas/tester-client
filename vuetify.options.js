/*
vuetify.config.js
*/

import colors from 'vuetify/es5/util/colors'

export default {
  customVariables: ['~/assets/variables.scss'],
  optionsPath: './vuetify.options.js',
  theme: {
    dark: false,
    custom:true,
    themes: {
      dark: {
        primary: '#00bcd4',//colors.blue.darken2,
        accent: '#cddc39',//colors.grey.darken3,
        secondary: '#03a9f4',//colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      },
      custom: {
        primary: '#00bcd4',
        secondary: '#03a9f4',
        accent: '#cddc39',
        error: '#f44336',
        warning: '#e91e63',
        info: '#2196f3',
        success: '#4caf50'
        }
    }
  }
}