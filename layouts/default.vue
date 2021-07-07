<template>
  <v-app custom>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
    <v-list-item @click.stop="drawer = !drawer">
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          <v-btn icon><v-icon>mdi-school-outline</v-icon></v-btn>BILIM.KZ
        </v-list-item-title>
        <v-list-item-subtitle>
          ubt-ga dayindik sinaktary
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
    dark
    app
    fixed
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title color="#d3008d">bilim.kz</v-toolbar-title>
      <v-spacer></v-spacer>
      <button class="mr-3"><img src="img/flag_kazakhstan_24.png"></button>
      <button><img src="img/flag_russia_24.png"></button>
      <!-- <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'test tapsyru',
          to: '/'
        },
        {
          icon: 'mdi-login',
          title: 'Kiru',
          to: '/login'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Tirkelu',
          to: '/register'
        },
        {
          icon: 'mdi-account-arrow-left',
          title: 'Profil',
          to: '/profile'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'bilim.kz'
    }
  }
}
</script>
