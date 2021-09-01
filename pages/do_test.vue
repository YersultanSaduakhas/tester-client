<template>
  <v-card class="pb-2">
    <template v-if="$store.state.testEnded===true">
      <v-row
        align="center"
        justify="center"
      >
        <v-card-title>{{ $t('test_has_been_ended') }}</v-card-title>
      </v-row>
      <v-row
        v-if="!showHints"
        align="center"
        justify="center"
        class="mb-4"
      >
        <table class="table">
          <tr><td>{{ $t('all') }}</td><td>{{ overallScore }}/140</td></tr>
          <tr v-for="(lesson_, ind) in testResult" :key="ind">
            <td style="">
              {{ lesson_.name }}
            </td>
            <td>{{ lesson_.score }}/{{ lesson_.type==='profile'?35:lesson_.question_count }}</td>
          </tr>
        </table>
        <v-btn
          left
          rounded
          class="mr-2"
          @click="showHints=true"
        >
          {{ $t('analize_mistakes') }}
        </v-btn>
      </v-row>

      <v-row
        v-if="showHints"
        align="center"
        justify="center"
        class="mb-4"
      >
        <table class="table">
          <template v-for="lesson_ in testResult">
            <tr :key="lesson_.name">
              <td>{{ lesson_.name }}</td>
            </tr>
            <tr v-for="(questionResult,indQ) in lesson_.results" :key="questionResult.id+'_'+indQ">
              <td style="">
                <span>{{ questionResult.text }}</span>
                <ul>
                  <template v-for="(opt_, ind) in questionResult.options">
                    <li :key="'opt_'+ind" :class="{ is_right: opt_.is_right === 1, is_wrong: opt_.color==='red' }">
                      {{ (ind+1) + ') ' + opt_.text }}
                    </li>
                  </template>
                </ul>
                <br>
                <span>{{ $t('video_link') }} : {{ questionResult.hint }}</span>
              </td>
            </tr>
          </template>
        </table>
      </v-row>
    </template>
    <template v-if="$store.state.testEnded===false">
      <v-row
        align="center"
        justify="center"
      >
        <v-card-title>{{ $t('test_has_been_started') }}</v-card-title>
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
                >
                  <template slot="item" slot-scope="data">
                    <!-- <label :class="{ answered: is_question_answered(data.item) }">{{ data.item }}</label> -->
                    <label>{{ data.item }}</label>
                  </template>
                </v-select>
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
          v-model="singleAnswerValue"
          class="ml-1"
          @change="onChooseOne"
        >
          <v-radio
            v-for="(option,ind__) in currentQuestion.options"
            :key="option.id"
            :label="option.text"
            :value="ind__+1"
          />
        </v-radio-group>
        <template v-if="currentQuestion&&currentQuestion.right_answer_count>1">
          <v-checkbox
            v-for="(option_, ind_) in currentQuestion.options"
            :key="'cbx_'+ind_"
            v-model="multipleCheckValues"
            multiple
            :hide-details="ind_ !== currentQuestion.options.length - 1"
            :value="ind_+1"
            :label="option_.text"
            @change="onChoosMultiple"
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
        <v-btn color="primary" @click="showEndTestDialog = true">
          {{ $t('end_a_test') }}
        </v-btn>
      </v-row>
      <v-dialog
        v-model="showEndTestDialog"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ $t('end_test_confirm') }}
          </v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="endTest()"
            >
              {{ $t('yes') }}
            </v-btn>
            <v-btn
              color="error"
              text
              @click="showEndTestDialog=false"
            >
              {{ $t('no') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  auth: false,
  data: () => ({
    showHints: false,
    singleAnswerValue: null,
    lessons: [],
    showEndTestDialog: false,
    questionIndexes: [],
    currentQuestion: null,
    currentLessonId: null,
    currentQuestionIndex: null,
    multipleCheckValues: [],
    testResult: null,
    overallScore: 0
  }),
  computed: {
    answeredQuestionPercentage () {
      return this.$store.state.answeredQuestions.length * 100 / 120
    }
  },
  mounted () {
    // init lessons select-dropdown
    if (this.$store.state.currentQuizRules && this.$store.state.currentQuizRules.length) {
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
      this.multipleCheckValues = []
      this.singleAnswerValue = null
      this.currentQuestion = null
      const currentLesson_ = this.$store.state.currentQuizRules.filter((e) => {
        return e.lesson_id === lessonId
      })[0]
      let currentQuestionId_ = -1
      if (currentLesson_.type === 'profile' && questionIndex > 24) {
        currentQuestionId_ = currentLesson_.no_5_optioned_question_ids[questionIndex - 25]
      } else {
        currentQuestionId_ = currentLesson_.question_ids[questionIndex]
      }

      const anseweredQuestion = this.getQuestionIfAnswered(currentQuestionId_)
      if (anseweredQuestion) {
        debugger
        this.multipleCheckValues = anseweredQuestion.choosen_answers
        if (anseweredQuestion.choosen_answers.length === 1) {
          this.singleAnswerValue = anseweredQuestion.choosen_answers[0]
        }
      }
      const res = await axios.get(`/api/open/data/questions/${currentQuestionId_}`)
      this.currentQuestion = res.data
    },
    updateLocalStorageCurrentData () {
      if (!this.currentLessonId) {
        localStorage.removeItem('current_lesson_id')
      } else {
        localStorage.setItem('current_lesson_id', this.currentLessonId)
      }
      if (!this.currentQuestionIndex) {
        localStorage.removeItem('current_question_index')
      } else {
        localStorage.setItem('current_question_index', this.currentQuestionIndex)
      }
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
    },
    onChooseOne (val) {
      if (val) {
        const question_ = this.currentQuestion
        question_.choosen_answers = [val]
        this.$store.commit('setAnsweredQuestion', question_)
      }
    },
    onChoosMultiple (val) {
      if (this.multipleCheckValues.length > 3) {
        this.$toast.error(this.$t('max_answer_count_3_warn'))
        this.multipleCheckValues.splice(3, 1)
        return
      }
      const question_ = this.currentQuestion
      question_.choosen_answers = Object.values(this.multipleCheckValues)
      this.$store.commit('setAnsweredQuestion', question_)
    },
    is_question_answered (questionIndex) {
      const currentLesson_ = this.lessons.filter((e) => { return e.lesson_id === this.currentLessonId })[0]
      const questionIndex_ = currentLesson_.type === 'profile' && questionIndex > 25 ? questionIndex - 26 : questionIndex - 1
      const questionId = questionIndex > 25 ? currentLesson_.no_5_optioned_question_ids.question_ids[questionIndex_].id : currentLesson_.question_ids[questionIndex_].id
      return this.$store.state.answeredQuestions.map(function (e) { return e.id }).includes(questionId)
    },
    calcResult () {
      const rules = this.$store.state.currentQuizRules
      for (let i = 0; i < rules.length; i++) {
        rules[i].score = 0
        rules[i].results = []
        for (let h = 0; h < rules[i].question_ids.length; h++) {
          const questionId = rules[i].question_ids[h]
          const answeredQuestion = this.$store.state.answeredQuestions.filter(function (e) { return e.id === questionId })[0]
          if (answeredQuestion) {
            const correctAnswers = answeredQuestion.answers.split(',').map(Number)
            const choosenAnswers = answeredQuestion.choosen_answers
            if (answeredQuestion.is_5_optioned && answeredQuestion.right_answer_count === 1) {
              if (choosenAnswers.length > 1 || correctAnswers[0] !== choosenAnswers[0]) {
                rules[i].score += 0
                answeredQuestion.options[choosenAnswers[0] - 1].color = 'red'
                answeredQuestion.status = 'error'
              } else if (correctAnswers[0] === choosenAnswers[0]) {
                rules[i].score += 1
                answeredQuestion.status = 'correct'
              }
            } else if (!answeredQuestion.is_5_optioned) {
              let score_ = 0

              for (let h = 0; h < choosenAnswers.length; h++) {
                if (!correctAnswers.includes(choosenAnswers[h])) {
                  score_ -= 1
                  answeredQuestion.options[choosenAnswers[h] - 1].color = 'red'
                  answeredQuestion.status = 'error'
                } else {
                  score_ += 1
                }
              }
              score_ = score_ < 0 ? 0 : score_
              rules[i].score += score_
            }
            rules[i].results.push(answeredQuestion)
          }
        }
        this.overallScore += rules[i].score
      }
      return rules
    },
    endTest () {
      this.showEndTestDialog = false
      this.currentQuestion = null
      this.$nuxt.$loading.start()
      this.testResult = this.calcResult()
      this.currentLessonId = null
      this.currentQuestionIndex = null
      this.updateLocalStorageCurrentData()
      this.$store.commit('endTest')
      this.$nuxt.$loading.finish()
    },
    getQuestionIfAnswered (questionId) {
      const questionIndex = this.$store.state.answeredQuestions.map(function (e) { return e.id }).indexOf(questionId)
      if (questionIndex > -1) {
        return this.$store.state.answeredQuestions[questionIndex]
      }
      return null
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
.answerd{
    background-color: #15ead2;
    color: white;
    padding: 0 5px;
}
.table{
  border: 1px solid black;
}
.table th, .table td {
  border-top: 1px solid black !important;
}
.table td {
  padding: 5px;
}
.is_right{
  background-color: #20e54b;
  color: white;
}
.is_wrong{
  background-color: red;
  color: white;
}
</style>
