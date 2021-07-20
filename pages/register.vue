<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="registerForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              :label="$t('first_name')"
              maxlength="20"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="lastName"
              :rules="[rules.required]"
              :label="$t('last_name')"
              maxlength="20"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :label="$t('email')"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="show1 ?'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              :label="$t('password')"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="verify"
              block
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, passwordMatch]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              :label="$t('retype_password')"
              counter
              @click:append="show1 = !show1"
            />
          </v-col>
          <v-spacer />
          <v-alert
            v-if="alertError"
            border="top"
            color="red lighten-2"
            transition="slide-y-transition"
            dark
          >
            {{ errorText }}
          </v-alert>
          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn
              x-large
              block
              :disabled="!valid"
              color="success"
              @click="validate"
            >
              {{ $t('register') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  auth: false,
  data: () => ({
    darkTheme: true,
    platformName: 'Platform name',
    password: null,
    username: null,
    valid: true,
    firstName: '',
    lastName: '',
    email: '',
    verify: '',
    alertError: false,
    errorText: '',
    emailRules: [
      v => !!v || '*.*',
      v => /.+@.+\..+/.test(v) || 'E-mail*'
    ],
    show1: false,
    rules: {
      required: value => !!value || '*.*',
      min: v => (v && v.length >= 8) || 'Min 8 characters'
    }
  }),
  computed: {
    passwordMatch () {
      return () => this.password === this.verify || 'Password must match'
    }
  },
  methods: {
    async validate () {
      if (this.$refs.registerForm.validate()) {
        // submit form to server/API here...
        // axios.post()
        // await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     name: this.firstName,
        //     email: this.email,
        //     password: this.password
        //   })
        // })
        try {
          this.$toast.show('Registering ...')
          await axios.post('/api/register', {
            name: this.firstName + ' ' + this.lastName,
            email: this.email,
            password: this.password
          })
          this.$router.push(this.getLocalizedRoute('/login'))
          this.$toast.success('successfully registered...')
        } catch (err) {
          console.log(err)
          this.$toast.error('Error while registering')
        }
      }
    },
    getLocalizedRoute (path) {
      const langPrefix = this.$root.context.app.i18n.defaultLocale === this.$root.context.app.i18n.locale ? '' : `/${this.$root.context.app.i18n.locale}`
      return `${langPrefix}${path}`
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style>
</style>
