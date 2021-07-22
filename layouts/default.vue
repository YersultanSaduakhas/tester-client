<template>
  <v-app custom>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list-item @click.stop="drawer = !drawer">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-btn icon>
              <v-icon>mdi-school-outline</v-icon>
            </v-btn>BILIM.KZ
          </v-list-item-title>
          <v-list-item-subtitle>
            ubt-ga dayindik sinaktary
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list>
        <v-list-item :to="getLocalizedRoute('/')" router exactz>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('start_a_test')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!$auth.loggedIn || $auth.loggedIn === false"
          :to="getLocalizedRoute('/login')"
          router
          exactz
        >
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('login')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!$auth.loggedIn || $auth.loggedIn === false"
          :to="getLocalizedRoute('/register')"
          router
          exactz
        >
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('register')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="
            $auth.loggedIn &&
              $auth.loggedIn === true &&
              $auth.user.is_admin === true
          "
          :to="getLocalizedRoute('/lessons')"
          router
          exactz
        >
          <v-list-item-action>
            <v-icon>mdi-clipboard-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('lessons_admin')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="
            $auth.loggedIn &&
              $auth.loggedIn === true &&
              $auth.user.is_admin === true
          "
          :to="getLocalizedRoute('/questions')"
          router
          exactz
        >
          <v-list-item-action>
            <v-icon>mdi-file-question</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('questions_admin')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="$auth.loggedIn && $auth.loggedIn === true"
          :to="getLocalizedRoute('/profile')"
          router
          exactz
        >
          <v-list-item-action>
            <v-icon>mdi-account-arrow-left</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('profile')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="$auth.loggedIn && $auth.loggedIn === true"
          @click="logout()"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('logout')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title color="#d3008d">
        bilim.kz
      </v-toolbar-title>
      <v-spacer />
      <img class="mr-3" @click="switchLocalePath('kz')" src="img/flag_kazakhstan_24.png">
      <img @click="switchLocalePath('ru')" src="img/flag_russia_24.png">
      <!-- <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'bilim.kz'
    }
  },
  methods: {
    getLocalizedRoute (path) {
      const langPrefix =
        this.$root.context.app.i18n.defaultLocale ===
        this.$root.context.app.i18n.getLocaleCookie()
          ? ''
          : `/${this.$root.context.app.i18n.getLocaleCookie()}`
      const url = `${langPrefix}${path}`
      const url_ = url.endsWith('ru/') ? url.slice(0, -1) : url
      return url_
    },
    async logout () {
      await this.$auth.logout()
      this.$router.push(this.getLocalizedRoute('/login'))
    },
    goTo (url) {
      this.$router.push(this.getLocalizedRoute(url))
    },
    switchLocalePath (lang) {
      this.$root.context.app.i18n.setLocale(lang)
      this.$router.push(this.getLocalizedRoute(this.$route.fullPath === '/ru' || this.$route.fullPath === '/kz' ? '/' : this.$route.fullPath))
    }
  }
}
</script>
