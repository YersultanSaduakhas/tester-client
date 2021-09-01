<template>
  <v-card>
    <v-card-title>
      {{ $route.query.mode === 'new' ? $t('new_lesson') : $t('lesson') + ': '+ currentLesson.name }}
    </v-card-title>
    <v-btn
      tile
      color="success"
      class="ml-5"
      @click="cancel()"
    >
      <v-icon>
        mdi-arrow-left
      </v-icon>
      {{ $t('go_back') }}
    </v-btn>
    <v-row class="ml-5 mt-5 mb-5">
      <v-form ref="lessonForm" v-model="valid" lazy-validation>
        <v-select
          v-model="currentLesson.l_type"
          :items="lessonTypes"
          :item-text="'title'"
          :item-value="'key'"
          :label="$t('lesson_type')"
          required
          @change="selectLessonType"
        />
        <v-text-field
          v-model="currentLesson.name"
          :rules="[rules.required]"
          :label="$t('name')"
          maxlength="50"
          required
          :disabled="currentLesson.l_type!='profile'"
        />
        <v-select
          v-model="currentLesson.language"
          :items="langs"
          :label="$t('language')"
          required
        />
        <v-card v-if="currentLesson.l_type==='profile'">
          <v-spacer />
          <v-combobox
            v-model="currentLesson.cross_lessons"
            :items="profileLessons"
            :item-text="'title'"
            :label="$t('second_additional_lessons')"
            multiple
            outlined
            dense
          />
          <v-spacer />
        </v-card>
        <v-container v-if="showQuestionOperation">
          <p>{{ $t('question_operation_warn') }}</p>
          <v-radio-group
            v-model="currentLesson.q_operation"
            mandatory
          >
            <v-radio
              :label="$t('no_touch_questions')"
              value="no_touch"
            />
            <v-radio
              :label="$t('only_new_questions')"
              value="new"
            />
            <v-radio
              :label="$t('merge_with_new_questions')"
              value="merge"
            />
          </v-radio-group>
        </v-container>
        <v-btn
          :disabled="!valid"
          class="mr-4"
          @click="submit"
        >
          {{ $t('save') }}
        </v-btn>
        <v-btn @click="cancel()">
          {{ $t('cancel') }}
        </v-btn>
      </v-form>
    </v-row>
    <v-spacer />
    <v-row class="mt-5 mb-5">
      <v-btn
        tile
        color="success"
        class="ml-5"
        :to="{ path:'/user/admin/questions/form', query : { mode:'new', lesson_id: currentLesson.id }}"
      >
        <v-icon>
          mdi-plus
        </v-icon>
        {{ $t('add_new_question') }}
      </v-btn>
    </v-row>
    <v-row class="ml-2">
      <v-flex
        xs4
      >
        <v-file-input
          v-model="filename"
          accept="file/*"
          :label="$t('select_file')"
          name="file"
          @change="selectFile"
        />
        <v-btn
          v-if="file"
          class="upload-button"
          color="primary"
          @click="upload_file"
        >
          {{ $t('upload_question_file') }}
        </v-btn>
      </v-flex>
    </v-row>
    <v-spacer />
    <v-flex
      xs4
    >
      <v-text-field
        v-model="search"
        class="ml-3"
        append-icon="mdi-magnify"
        :label="$t('search')"
        single-line
        hide-details
      />
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="questions"
      :search="search"
      show-select
      single-select
      :page="page"
      :page-count="numberOfPages"
      :server-items-length="totalQuestions"
      :loading="loading"
      :options.sync="options"
      @click:row="handleClick"
    >
      <template #item="{ item }">
        <tr :class="currentQuestion&&currentQuestion.id==item.id ? 'cyan':''" @click="handleClick(item)">
          <td>{{ item.id }}</td>
          <td>
            <span>{{ item.text }}</span>
            <ul>
              <li v-for="(opt_, ind) in item.options" :key="ind" :class="{ is_right: opt_.is_right === 1 }">
                {{ (ind+1) + ') ' + opt_.text }}
              </li>
            </ul>
            <br>
            <span>{{ $t('video_link') }} : {{ item.hint }}</span>
          </td>
          <td>
            <v-tooltip left>
              <template #activator="{ on, attrs }">
                <v-btn
                  tile
                  color="info"
                  v-bind="attrs"
                  :to="{ path:'/user/admin/questions/form', query : { mode:'edit', id: item.id, lesson_id: currentLesson.id }}"
                  v-on="on"
                >
                  <v-icon>
                    mdi-pen
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ $t('edit_question') }}</span>
            </v-tooltip>
            <v-tooltip right>
              <template #activator="{ on, attrs }">
                <v-btn
                  tile
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                  @click="showDeleteDialog=true"
                >
                  <v-icon>
                    mdi-close-box
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ $t('remove_question') }}</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="showDeleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t('remove_confirm') }}
        </v-card-title>

        <v-card-text>
          {{ currentQuestion.id + ') '+ currentQuestion.text }}
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="deleteCurrentQuestion()"
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
      valid: false,
      showDeleteDialog: false,
      showQuestionOperation: false,
      file: '',
      filename: null,
      allLessons: [],
      profileLessons: [],
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
        question_count_to_test: 0,
        q_operation: 'no_touch',
        cross_lessons: []
      },
      questions: [],
      search: '',
      headers: [
        { text: this.$t('question'), align: 'center' },
        { text: this.$t('action'), align: 'center' }
      ],
      page: 0,
      totalQuestions: 0,
      numberOfPages: 0,
      loading: false,
      options: {},
      lessons: [],
      langs: ['kz', 'ru'],
      lessonTypes: [
        { key: 'profile', title: this.$t('additional_lessons') },
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
  watch: {
    options: {
      handler () {
        const { page, itemsPerPage } = this.options
        this.loadQuestions(this.$route.query.id, page === 0 ? page + 1 : page, itemsPerPage)
      },
      deep: true
    },
    currentLesson: {
      handler () {
        localStorage.setItem('currentEditingLesson', JSON.stringify(this.currentLesson))
      },
      deep: true
    }
  },
  mounted () {
    if (localStorage.currentEditingLesson) {
      this.currentLesson = JSON.parse(localStorage.currentEditingLesson)
    } else if (this.$route.query.mode === 'edit') {
      this.loadLesson(this.$route.query.id, 1, 10)
    }
    this.loadAllLesson()
  },
  methods: {
    async loadAllLesson () {
      const res = await axios.get('/api/lesson')
      if (this.currentLesson.id) {
        const currentLessonId = this.currentLesson.id
        res.data = res.data.filter(function (e) {
          return e.id !== currentLessonId
        })
      }
      this.allLessons = res.data
      this.allLessons.forEach((_) => {
        _.title = _.name + ' (' + _.language + ')'
        delete _.pivot
      })
      this.profileLessons = this.allLessons.filter(function (e) {
        return !['math', 'qazaq_tili', 'history'].includes(e.l_type)
      })
    },
    async loadLesson (id) {
      const res = await axios.get('/api/lesson/' + id)
      this.currentLesson = res.data
      if (this.currentLesson.cross_lessons && this.currentLesson.cross_lessons.length) {
        this.currentLesson.cross_lessons.forEach((_) => {
          _.title = _.name + ' (' + _.language + ')'
          delete _.pivot
        })
      }
    },
    loadQuestions (lessonId, page, size) {
      this.loading = true
      let query = ''
      if (this.showQuestionOperation === true) {
        query = '?is_tmp=true'
      } else if (lessonId) {
        query = '?lesson_id=' + lessonId
      }
      query += '&page=' + page + '&size=' + size
      axios.get('/api/question' + query).then((resQuestions) => {
        this.questions = resQuestions.data.data
        this.totalQuestions = resQuestions.data.total
        this.numberOfPages = resQuestions.data.last_page
      }).catch(() => {
        this.$toast.error('Не удалось загрузить данные с сервера')
      }).finally(() => {
        this.loading = false
      })
    },
    handleClick (row) {
      this.currentQuestion = row
    },
    selectLessonType (item) {
      if (item !== 'profile') {
        this.currentLesson.name = this.$t(item)
      }
    },
    async submit () {
      if (this.$refs.lessonForm.validate()) {
        if (this.$route.query.mode === 'new') {
          this.currentLesson.q_operation = 'new'
          this.$toast.show('saving new...')
          await axios.post('/api/lesson', this.currentLesson)
          this.$router.back()
          this.$toast.success('successfully saved new')
        } else {
          this.$toast.show('saving existing...')
          await axios.put('/api/lesson/' + this.currentLesson.id, this.currentLesson)
          this.$router.back()
          this.$toast.success('successfully saved existing')
        }
      }
    },
    async cancel () {
      localStorage.setItem('currentEditingLesson', '')
      if (this.showQuestionOperation === true) {
        await axios.delete('/api/lesson/-1')
      }
      this.$router.back()
    },
    selectFile (file) {
      this.file = file
    },
    async upload_file () {
      const formData = new FormData()
      formData.append('select_file', this.file)
      const url = '/api/import_excel/import'
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await this.$axios({
        method: 'post',
        url,
        data: formData,
        config
      })
      this.showQuestionOperation = this.$route.query.mode === 'edit'
      this.loadQuestions(null, 1, 10)
      this.filename = null
      this.file = null
    },
    async deleteCurrentQuestion () {
      this.$toast.show('delete existing question ...')
      await axios.delete('/api/question/' + this.currentQuestion.id)
      this.showDeleteDialog = false
      this.$toast.success('successfully deleted existing question')
      this.loadQuestions(this.$route.query.id, 1, 10)
    }
  }
}
</script>
<style scoped>
.is_right{
  background-color: #20e54b;
  color: white;
}
.hide-input {
    display: none;
}
*{
    text-transform: none !important;
}
.upload-button {
    border-radius: 50px;
    color: white;
}
</style>
