<template>
<v-card
    class="mx-auto"
  >
    <v-img
      class="white--text align-end"
      src="img/banner_main_2.jpg"
    >
    </v-img>

    <v-card-subtitle class="pb-0">
      Dal kazir
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Tirkeludi qajet etpeydi</div>
      <!-- <div>Whitsunday Island, Whitsunday Islands</div> -->
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
        to="choose_lessons"
      >
        Testti bastau
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
  components: {
    // Logo,
    // VuetifyLogo
  }
}
</script>
