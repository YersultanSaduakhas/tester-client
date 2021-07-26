<template>
  <v-card>
    <v-btn
        tile
        color="success"
        class="ml-5"
        :to="{ path:'/user/admin/lessons' }"
      >
      <v-icon>
          mdi-arrow-left
        </v-icon>
        {{ $t('go_back') }}
      </v-btn>
    <v-card-title>
      {{ $route.query.mode === 'new' ? $t('new_lesson') : $t('lesson') + ': '+ currentLesson.name }}
      <v-spacer />
      <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('search')"
        single-line
        hide-details
      /> -->
    </v-card-title>
    <v-row class="ml-5 mt-5 mb-5">
        <form>
            <v-text-field
              v-model="currentLesson.name"
              :rules="[rules.required]"
              :label="$t('name')"
              maxlength="50"
              required
            ></v-text-field>
            <v-select
            v-model="currentLesson.language"
            :items="langs"
            :label="$t('language')"
            required
            ></v-select>
            <v-text-field
              v-model="currentLesson.question_count"
              :label="$t('total_question_count')"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="currentLesson.question_count_to_test"
              :label="$t('quiz_question_count')"
              disabled
            ></v-text-field>
            <v-btn
            class="mr-4"
            @click="submit"
            >
            {{ $t('save') }}
            </v-btn>
        </form>
    </v-row>
    <v-row class="mt-5 mb-5">
      <v-btn
        tile
        color="success"
        class="ml-5"
      >
      <v-icon>
          mdi-plus
        </v-icon>
        {{ $t('add_new_lesson') }}
      </v-btn>
      <v-btn
        tile
        color="info"
        class="ml-5"
        v-if="currentLesson"
      >
      <v-icon>
          mdi-pen
        </v-icon>
        {{ $t('edit_lesson') }}
      </v-btn>
      <v-btn
        tile
        color="error"
        class="ml-5"
        v-if="currentLesson"
      >
      <v-icon>
          mdi-close-box
        </v-icon>
        {{ $t('remove_lesson') }}
      </v-btn>
    </v-row>
    <!-- <v-data-table
      :headers="headers"
      :items="lessons"
      :search="search"
      @click:row="handleClick"
      show-select
      single-select
    /> -->
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      currentLesson: {
        id: null,
        language: 'kz',
        name: '',
        question_count: 0,
        question_count_to_test: 0,
        questions: []
      },
      search: '',
      select: 'kz',
      headers: [
        { text: '#', value: 'id' },
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('question_count'), value: 'question_count' }
      ],
      lessons: [],
      langs: ['kz', 'ru'],
      rules: {
        required: value => !!value || '*.*',
        min: v => (v && v.length >= 8) || 'Min 8 characters'
      }
    }
  },
  computed: {
  },
  mounted () {
    if (this.$route.query.mode === 'edit') {
      this.loadLesson(this.$route.query.id)
    }
  },
  methods: {
    async loadLesson (id) {
      const res = await axios.get('/api/lesson/' + id)
      this.currentLesson = res.data
    },
    handleClick (row) {
      this.currentLesson = row
    },
    submit () {
    },
    clear () {
    }
  }
}
</script>
