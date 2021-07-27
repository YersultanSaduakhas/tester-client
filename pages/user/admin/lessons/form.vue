<template>
  <v-card>
    <v-card-title>
      {{ $route.query.mode === 'new' ? $t('new_lesson') : $t('lesson') + ': '+ currentLesson.name }}
    </v-card-title>
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
          :item-text="$t()"
          :label="$t('language')"
          required
          ></v-select>
          <v-select
          v-model="currentLesson.l_type"
          :items="lessonTypes"
          :item-text="'title'"
          :item-value="'key'"
          :label="$t('required_lesson_type')"
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
    <v-spacer />
    <v-row class="mt-5 mb-5">
      <v-btn
        tile
        color="success"
        class="ml-5"
        :to="{ path:'/user/admin/questions/form', query : { mode:'new' }}"
      >
      <v-icon>
          mdi-plus
        </v-icon>
        {{ $t('add_new_question') }}
      </v-btn>
    </v-row>
    <v-spacer />
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('search')"
        single-line
        hide-details
      />
    <v-data-table
      :headers="headers"
      :items="questions"
      :search="search"
      @click:row="handleClick"
      show-select
      single-select
      :page="page"
      :pageCount="numberOfPages"
      :server-items-length="totalQuestions"
      :loading="loading"
    >
     <template v-slot:item="{ item }">
        <tr :class="currentQuestion&&currentQuestion.id==item.id ? 'cyan':''" @click="handleClick(item)">
            <td>{{ item.id }}</td>
            <td>
              <v-subheader>{{ item.text }}</v-subheader>
              <v-subheader :dark="item.answer===1">1) {{ item.option_1 }}</v-subheader>
              <v-subheader :dark="item.answer===2">2) {{ item.option_2 }}</v-subheader>
              <v-subheader :dark="item.answer===3">3) {{ item.option_3 }}</v-subheader>
              <v-subheader :dark="item.answer===4">4) {{ item.option_4 }}</v-subheader>
              <v-subheader :dark="item.answer===5">5) {{ item.option_5 }}</v-subheader>
              <v-subheader>{{ $t('reason')}} : {{ item.reason }}</v-subheader>
              <v-subheader>{{ $t('hint')}} : {{ item.hint }}</v-subheader>
            </td>
            <td>
              <v-tooltip left>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile
                    color="info"
                    v-bind="attrs"
                    v-on="on"
                    :to="{ path:'/user/admin/questions/form', query : { mode:'edit', id: item.id }}"
                  >
                  <v-icon>
                      mdi-pen
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('edit_question')}}</span>
              </v-tooltip>
              <v-tooltip right>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    tile
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                  >
                  <v-icon>
                      mdi-close-box
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('remove_question')}}</span>
              </v-tooltip>
            </td>
        </tr>
      </template>
    </v-data-table>
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
        lesson_id: null
      },
      currentLesson: {
        id: null,
        l_type: null,
        language: 'kz',
        name: '',
        question_count: 0,
        question_count_to_test: 0
      },
      questions: [],
      search: '',
      headers: [
        { text: '#', value: 'id' },
        { text: this.$t('question') },
        { text: this.$t('action') }
      ],
      page: 0,
      totalQuestions: 0,
      numberOfPages: 0,
      loading: false,
      options: {},
      lessons: [],
      langs: ['kz', 'ru'],
      lessonTypes: [
        { key: 'math', title: this.$t('math') },
        { key: 'qazaq_tili', title: this.$t('qazaq_tili') },
        { key: 'history', title: this.$t('history') }
      ],
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
      this.loadLesson(this.$route.query.id, 1, 10)
      this.loadQuestions(this.currentLesson.id, 1, 10)
    }
  },
  methods: {
    async loadLesson (id) {
      const res = await axios.get('/api/lesson/' + id)
      this.currentLesson = res.data
    },
    async loadQuestions (lessonId, page, size) {
      this.loading = true
      let query = ''
      if (lessonId) {
        query = '?lesson_id=' + lessonId
      } else {
        query = '?is_tmp=true'
      }
      query += '&page=' + page + '&size' + size
      const resQuestions = await axios.get('/api/question' + query)
      this.currentLesson.questions = resQuestions.data
      this.totalQuestions = resQuestions.total
      this.numberOfPages = resQuestions.last_page
      this.loading = false
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
