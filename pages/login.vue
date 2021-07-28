<template>
  <v-card elevation="4" light tag="section">
    <v-divider />
    <v-card-text>
      <p>{{ $t('login_info') }}:</p>
      <v-form>
        <v-text-field
          v-model="email"
          outline
          :label="$t('email')"
          type="text"
          :rules="emailRules"
          required
        />
        <v-text-field
          v-model="password"
          outline
          hide-details
          :label="$t('password')"
          type="password"
          required
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
      <v-btn color="info" text>
        {{ $t('forgot_password') }}?
      </v-btn>
      <v-spacer />
      <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" @click="userLogin">
        <v-icon left>
          mdi-lock
        </v-icon>
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
        this.$toast.show('Logging in...')
        await this.$auth.loginWith('cookie', { data: { email: this.email, password: this.password } })
        this.$router.push('/profile')
        this.$toast.success('Successfully authenticated')
      } catch (err) {
        console.log(err)
        this.$toast.error('Error while authenticating')
      }
    },
    getLocalizedRoute (path) {
      const langPrefix = this.$root.context.app.i18n.defaultLocale === this.$root.context.app.i18n.locale ? '' : `/${this.$root.context.app.i18n.locale}`
      return `${langPrefix}${path}`
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
