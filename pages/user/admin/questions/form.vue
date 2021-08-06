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
    <v-row class="ml-5 mt-5 mb-5 pr-5">
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
        <template v-for="(opt,ind) in currentQuestion.options">
          <v-checkbox
            :key="'cbx'+ind"
            v-model="opt.is_right"
            :label="$t('option')+' '+ (ind+1)"
          />
          <v-btn
            :key="'btn'+ind"
            class="sm"
            depressed
            color="error"
            @click="confirmRemoveOption(ind, opt)"
          >
            {{ $t('remove') }}
          </v-btn>
          <v-textarea
            :key="'txt'+ind"
            v-model="opt.text"
            :rules="[rules.required]"
            maxlength="2000"
            required
            auto-grow
            full-width
          />
        </template>
        <v-btn
          v-if="currentQuestion.options.length<10"
          tile
          color="success"
          @click="addOption()"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('add_option') }}
        </v-btn>
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
    <v-dialog
      v-model="showDeleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t('remove_option_confirm') }}
        </v-card-title>

        <v-card-text v-if="currentOption">
          {{ currentOption.id + ') '+ currentOption.text }}
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="deleteCurrentOption()"
          >
            OK
          </v-btn>
          <v-btn
            color="error"
            text
            @click="showDeleteDialog=false"
          >
            {{ $t('cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      showDeleteDialog: false,
      currentOption: null,
      currentQuestion: {
        id: null,
        text: null,
        options: [],
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
    confirmRemoveOption (ind, opt) {
      this.currentOption = {
        id: ind + 1,
        text: opt.text
      }
      this.showDeleteDialog = true
    },
    deleteCurrentOption () {
      this.currentQuestion.options.splice(this.currentOption.id - 1, 1)
      this.currentOption = null
      this.showDeleteDialog = false
    },
    addOption () {
      if (!this.currentQuestion.options) {
        this.currentQuestion.options = []
      }
      this.currentQuestion.options.push({
        is_right: 0,
        question_id: this.currentQuestion.id,
        text: ''
      })
    },
    cancel () {
      this.$router.back()
    }
  }
}
</script>
