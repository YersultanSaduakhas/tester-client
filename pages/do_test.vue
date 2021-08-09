<template>
  <v-card class="pb-2">
    <v-row
      align="center"
      justify="center"
    >
      <v-card-title>Synaq bastaldy</v-card-title>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-progress-linear
        v-model="answeredQuestionPercentage"
        class="v-progress-linear"
        height="25"
        color="blue-grey"
      >
        <strong>{{ $store.state.answeredQuestions.length }}</strong>
      </v-progress-linear>
    </v-row>
    <v-row
      align="center"
      justify="center"
      class=""
    >
      <v-card-subtitle>
        <v-list subheader two-line>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="currentLessonId"
                :items="lessons"
                item-text="name"
                item-value="lesson_id"
                :label="$t('lessons')"
                @change="onChangeLesson"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="currentQuestionIndex"
                :items="questionIndexes"
                :label="$t('questions')"
                @change="onChangeQuestion"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-subtitle>
    </v-row>
    <v-card>
      <p v-if="currentQuestion" class="ml-1">
        {{ currentQuestion.text }}
      </p>
      <v-divider />
      <v-radio-group
        v-if="currentQuestion&&(currentQuestion.right_answer_count===1)"
        class="ml-1"
      >
        <v-radio
          v-for="option in currentQuestion.options"
          :key="option.id"
          :label="option.text"
          :value="option.id"
        />
      </v-radio-group>
      <template v-if="currentQuestion&&currentQuestion.right_answer_count>1">
        <v-checkbox
          v-for="(option_, ind_) in currentQuestion.options"
          :key="'cbx_'+ind_"
          multiple
          :hide-details="ind_ !== currentQuestion.options.length - 1"
          :value="ind_+1"
          :label="option_.text"
        />
      </template>
    </v-card>
    <v-row
      align="center"
      justify="center"
      class="mt-2 mb-2"
    >
      <v-btn
        left
        rounded
        class="mr-2"
        @click="goToQuestion(-1)"
      >
        {{ $t('back') }}
      </v-btn>
      <v-btn
        right
        rounded
        @click="goToQuestion(1)"
      >
        {{ $t('next') }}
      </v-btn>
    </v-row>
    <v-row
      align="center"
      justify="center"
      class="mt-10 mb-5"
    >
      <v-btn color="primary">
        {{ $t('end_a_test') }}
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  auth: false,
  data: () => ({
    lessons: [],
    questionIndexes: [],
    currentQuestion: null,
    currentLessonId: null,
    currentQuestionIndex: null
  }),
  computed: {
    answeredQuestionPercentage () {
      return this.$store.state.answeredQuestions.length * 100 / 120
    }
  },
  mounted () {
    // init lessons select-dropdown
    if (this.$store.state.currentQuizRules) {
      this.lessons = this.$store.state.currentQuizRules
    } else {
      this.$router.push('/choose_lessons')
    }
    // init lessons select-dropdown
    this.currentLessonId = localStorage.current_lesson_id ? parseInt(localStorage.current_lesson_id) : this.$store.state.currentQuizRules[0].lesson_id
    this.currentQuestionIndex = localStorage.current_question_index ? parseInt(localStorage.current_question_index) : 1
    this.countQuestionIndexes()
    this.loadCurrentQuestion(this.currentLessonId, this.currentQuestionIndex - 1)
  },
  methods: {
    onChangeLesson (lessonId) {
      this.countQuestionIndexes()
      this.currentQuestionIndex = 1
      this.updateLocalStorageCurrentData()
      this.loadCurrentQuestion(this.currentLessonId, this.currentQuestionIndex - 1)
    },
    onChangeQuestion (questionId) {
      this.updateLocalStorageCurrentData()
      this.loadCurrentQuestion(this.currentLessonId, this.currentQuestionIndex - 1)
    },
    async loadCurrentQuestion (lessonId, questionIndex) {
      const currentLesson_ = this.$store.state.currentQuizRules.filter((e) => {
        return e.lesson_id === lessonId
      })[0]
      let currentQuestionId_ = -1
      if (currentLesson_.type === 'profile' && questionIndex > 24) {
        currentQuestionId_ = currentLesson_.no_5_optioned_question_ids[questionIndex - 25]
      } else {
        currentQuestionId_ = currentLesson_.question_ids[questionIndex]
      }
      const res = await axios.get(`/api/open/data/questions/${currentQuestionId_}`)
      this.currentQuestion = res.data
    },
    updateLocalStorageCurrentData () {
      localStorage.setItem('current_lesson_id', this.currentLessonId)
      localStorage.setItem('current_question_index', this.currentQuestionIndex)
    },
    goToQuestion (ind) {
      const tmpIndex = this.currentQuestionIndex + ind
      const lessonIndex = this.lessons.map(function (e) { return e.lesson_id }).indexOf(this.currentLessonId)
      if (tmpIndex === 0) {
        // backwards

        const currentLessonIndex = lessonIndex - 1 === -1 ? 4 : lessonIndex - 1
        this.currentLessonId = this.lessons[currentLessonIndex].lesson_id
        this.currentQuestionIndex = this.lessons[currentLessonIndex].type === 'profile' ? 34 : this.lessons[currentLessonIndex].question_count
      } else if (tmpIndex > this.questionIndexes.length) {
        // forwards
        this.currentQuestionIndex = 1
        const currentLessonIndex = lessonIndex + 1 === 5 ? 0 : lessonIndex + 1
        this.currentLessonId = this.lessons[currentLessonIndex].lesson_id
      } else {
        this.currentQuestionIndex = tmpIndex
      }
      this.countQuestionIndexes()
      this.updateLocalStorageCurrentData()
      this.loadCurrentQuestion(this.currentLessonId, this.currentQuestionIndex - 1)
    },
    countQuestionIndexes () {
      this.questionIndexes = []
      const currentLesson = this.lessons.filter((e) => {
        return e.lesson_id === this.currentLessonId
      })[0]
      const questionCount = currentLesson.type === 'profile' ? 35 : currentLesson.question_count
      for (let i = 1; i <= questionCount; i++) {
        this.questionIndexes.push(i)
      }
    }
  }
}
</script>
<style>
.v-progress-linear {
  display: block;
  margin: 0 auto;
  width: 200px;
  background-color: teal;
}
</style>
