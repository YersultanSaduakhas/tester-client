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
          v-if="isAdmin"
          :to="getLocalizedRoute('/user/admin/lessons')"
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
          v-if="isAdmin"
          :to="getLocalizedRoute('/user/admin/questions')"
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
          v-if="isAuthenticated"
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    isAdmin () {
      return this.$auth.state.loggedIn && this.$auth.state.loggedIn === true && this.$auth.user.is_admin === true
    }
  },
  mounted () {
    this.$auth.$storage.watchState('loggedIn', (newValue) => {
      console.log(newValue)
    })
  },
  methods: {
    getLocalizedRoute (path) {
      const langPrefix =
        this.$root.context.app.i18n.defaultLocale ===
        this.$root.context.app.i18n.locale
          ? ''
          : `/${this.$root.context.app.i18n.locale}`
      return `${langPrefix}${path}`
    },
    async logout () {
      await this.$auth.logout()
      this.$router.push({ path: this.getLocalizedRoute('/login') })
    },
    switchLocalePath (lang) {
      this.$root.context.app.i18n.setLocale(lang)
      this.$root.context.app.switchLocalePath(lang)
    }
  }
}
</script>
