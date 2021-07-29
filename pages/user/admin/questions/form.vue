<template>
  <v-card>
    <v-card-title>
      {{ $route.query.mode === 'new' ? $t('new_question') : $t('question') + ': '+ currentQuestion.id }}
    </v-card-title>
    <v-btn
      tile
      color="success"
      class="ml-5"
      @click="$router.back()"
    >
      <v-icon>
        mdi-arrow-left
      </v-icon>
      {{ $t('go_back') }}
    </v-btn>
    <v-row class="ml-5 mt-5 mb-5">
      <v-form ref="questionForm" v-model="valid" lazy-validation full-width style="width:100%;">
        <v-textarea
          v-model="currentQuestion.text"
          :rules="[rules.required]"
          :label="$t('question')"
          maxlength="2000"
          required
          auto-grow
          filled
          full-width
        />
        <v-textarea
          v-model="currentQuestion.option_1"
          :rules="[rules.required]"
          :label="$t('option')+' 1'"
          maxlength="2000"
          required
          auto-grow
          full-width
        />
        <v-textarea
          v-model="currentQuestion.option_2"
          :rules="[rules.required]"
          :label="$t('option')+' 2'"
          maxlength="2000"
          required
          auto-grow
          full-width
        />
        <v-textarea
          v-model="currentQuestion.option_3"
          :rules="[rules.required]"
          :label="$t('option')+' 3'"
          maxlength="2000"
          required
          auto-grow
          full-width
        />
        <v-textarea
          v-model="currentQuestion.option_4"
          :rules="[rules.required]"
          :label="$t('option')+' 4'"
          maxlength="2000"
          required
          auto-grow
          full-width
        />
        <v-textarea
          v-model="currentQuestion.option_5"
          :rules="[rules.required]"
          :label="$t('option')+' 5'"
          maxlength="2000"
          required
          auto-grow
          full-width
        />
        <v-select
          v-model="currentQuestion.answer"
          :items="answers"
          :label="$t('answer')"
          required
        />
        <v-textarea
          v-model="currentQuestion.reason"
          :rules="[rules.required]"
          :label="$t('reason')"
          maxlength="2000"
          required
          auto-grow
          full-width
        />
        <v-textarea
          v-model="currentQuestion.hint"
          :rules="[rules.required]"
          :label="$t('hint')"
          maxlength="2000"
          required
          auto-grow
          full-width
        />
        <v-btn
          class="mr-4"
          :disabled="!valid"
          @click="submit"
        >
          {{ $t('save') }}
        </v-btn>
        <v-btn @click="cancel()">
          {{ $t('cancel') }}
        </v-btn>
      </v-form>
    </v-row>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      currentQuestion: {
        id: null,
        text: null,
        option_1: null,
        option_2: null,
        option_3: null,
        option_4: null,
        option_5: null,
        answer: null,
        reason: null,
        hint: null,
        lesson_id: -1,
        tmp: 1
      },
      valid: false,
      answers: [1, 2, 3, 4, 5],
      rules: {
        required: value => !!value || '*.*',
        min: v => (v && v.length >= 8) || 'Min 8 characters'
      }
    }
  },
  computed: {
  },
  mounted () {
    if (this.$route.query.id) {
      this.loadQuestion(this.$route.query.id)
    }
  },
  methods: {
    async loadQuestion (id) {
      this.loading = true
      const resQuestion = await axios.get('/api/question/' + id)
      this.currentQuestion = resQuestion.data
      this.loading = false
    },
    async submit () {
      if (this.$refs.questionForm.validate()) {
        this.currentQuestion.lesson_id = this.$route.query.lesson_id ? this.$route.query.lesson_id : -1
        if (this.$route.query.mode === 'new') {
          this.$toast.show('saving new...')
          await axios.post('/api/question', this.currentQuestion)
          this.$toast.success('successfully saved new')
        } else {
          this.$toast.show('saving existing...')
          await axios.put('/api/question/' + this.currentQuestion.id, this.currentQuestion)
          this.$toast.success('successfully saved existing')
        }
      }
    },
    cancel () {
      this.$router.back()
    }
  }
}
</script>
