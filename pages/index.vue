<template>
<v-container>
<v-card
    class="mx-auto"
  >
    <v-img
      class="white--text align-end"
      src="img/banner_main_2.jpg"
    >
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ $t('right_now') }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ $t('registration_not_necessary') }}</div>
      <div>{{ $t('full_test') }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
        :to="getLocalizedRoute('/choose_lessons')"
      >
        {{ $t('start_a_test') }}
      </v-btn>

      <!-- <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn> -->
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  auth: false,
  components: {
    // Logo,
    // VuetifyLogo
  },
  methods: {
    getLocalizedRoute (path) {
      const langPrefix = this.$root.context.app.i18n.defaultLocale === this.$root.context.app.i18n.locale ? '' : `/${this.$root.context.app.i18n.locale}`
      return `${langPrefix}${path}`
    }
  }
}
</script>
