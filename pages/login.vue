<template>
  <v-card elevation="4" light tag="section">
      <!-- <v-card-title>
        <v-layout align-center justify-space-between>
          <h3 class="headline">
            {{ platformName }}
          </h3>
          <v-flex>
            <v-img
              :alt="platformName"
              class="ml-3"
              contain
              height="48px"
              position="center right"
              src="https://www.mobygames.com/images/i/12/25/1435075.png"
            ></v-img>
          </v-flex>
        </v-layout>
      </v-card-title> -->
      <v-divider></v-divider>
      <v-card-text>
        <p>{{ $t('login_info') }}:</p>
        <v-form>
          <v-text-field
            outline
            :label="$t('email')"
            type="text"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            outline
            hide-details
            :label="$t('password')"
            type="password"
            v-model="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
        <v-btn color="info" flat> {{ $t('forgot_password') }}? </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="userLogin" color="info" :large="$vuetify.breakpoint.smAndUp">
          <v-icon left>mdi-lock</v-icon>
          {{ $t('login') }}
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
export default {
  data: () => ({
    darkTheme: true,
    platformName: 'Platform name',
    password: null,
    email: null,
    emailRules: [
      v => !!v || '*.*',
      v => /.+@.+\..+/.test(v) || 'E-mail*'
    ]
  }),
  methods: {
    async userLogin () {
      try {
        debugger
        const response = await this.$auth.loginWith('cookie', { data: {email: this.email, password: this.password} })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
.v-btn,
.v-card{
  border-radius: 4px
}
.v-card__title{
    text-transform:uppercase
}
</style>
