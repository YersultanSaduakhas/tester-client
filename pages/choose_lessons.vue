<template>
  <v-card max-width="600" class="mx-auto">
    <v-toolbar color="light-blue" dark>
      <v-toolbar-title>{{ $t('choose_lessons') }}</v-toolbar-title>
    </v-toolbar>
    <v-list subheader two-line>
      <v-list-item>
        <v-list-item-content>
          <v-select
            v-model="quizRules.subjectLanguage"
            :items="langs"
            item-text="title"
            item-value="key"
            :label="$t('quiz_language')"
            @change="onChangeLanguage"
          />
        </v-list-item-content>
      </v-list-item>
      <v-subheader inset>
        {{ $t('required_lessons') }}
      </v-subheader>
      <v-list-item v-for="mainSubject in mainSubjects" :key="mainSubject.title">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark>
            mdi-folder
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="$t(mainSubject.title)" />

          <v-list-item-subtitle v-text="$t('total_question_count') + ' ' + mainSubject.questions_count" />
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-btn icon>
            <v-icon color='grey lighten-1'>mdi-information</v-icon>
          </v-btn>
        </v-list-item-action> -->
      </v-list-item>

      <v-divider inset />

      <v-subheader inset>
        {{ $t('additional_lessons') }}
      </v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-select
            v-model="quizRules.profile_lesson_1"
            :items="additionalSubjects"
            item-text="name"
            item-value="id"
            :label="$t('additional_lessons') + ' #1'"
            @change="onChangeProfileLesson1"
          />
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="additionalSubjects2.length>0">
        <v-list-item-content>
          <v-select
            v-model="quizRules.profile_lesson_2"
            :items="additionalSubjects2"
            item-text="name"
            item-value="id"
            :label="$t('additional_lessons') + ' #2'"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-alert
        v-if="!quizRules.profile_lesson_1||!quizRules.profile_lesson_2"
        dense
        outlined
        type="error"
        class="ml-5 mr-5"
      >
        {{ $t('additional_lessons_not_choosen_error') }}
      </v-alert>
      <v-btn
        class="white--text"
        tile
        color="primary"
        :disabled="!quizRules.profile_lesson_1||!quizRules.profile_lesson_2"
        @click="startTest()"
      >
        {{ $t('start_a_test') }}
        <v-icon left>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  auth: false,
  data: () => ({
    quizRules: {
      subjectLanguage: 'kz',
      profile_lesson_1: null,
      profile_lesson_2: null
    },
    langs: [
      { key: 'kz', title: 'Қазақша' },
      { key: 'ru', title: 'Русский' }
    ],
    additionalSubjects: [],
    additionalSubjects2: [],
    mainSubjects: [
      {
        questions_count: 15,
        title: 'math',
        id: 1
      },
      {
        questions_count: 20,
        title: 'qazaq_tili',
        id: 2
      },
      {
        questions_count: 15,
        title: 'history',
        id: 3
      }
    ]
  }),
  beforeMount () {
    this.loadLessons(this.quizRules.subjectLanguage)
    if (this.$store.state.setCurrentQuizRules) {
      this.$router.push('/do_test')
    }
  },
  methods: {
    async loadLessons (lang) {
      const res = await axios.get('/api/open/data/lessons?only_additional=true&&lang=' + lang)
      res.data = res.data.filter(function (e) {
        return e.cross_lessons && e.cross_lessons.length > 0
      })
      this.additionalSubjects = res.data
    },
    onChangeLanguage (item) {
      this.quizRules.profile_lesson_1 = null
      this.quizRules.profile_lesson_2 = null
      this.additionalSubjects = []
      this.additionalSubjects2 = []
      this.loadLessons(this.quizRules.subjectLanguage)
    },
    onChangeProfileLesson1 (profileLesson1Id) {
      this.quizRules.profile_lesson_2 = null
      this.additionalSubjects2 = this.additionalSubjects.filter(function (e) {
        return e.id === profileLesson1Id
      })[0].cross_lessons
    },
    startTest () {
      axios.get(`/api/open/data/quiz_questions?language=${this.quizRules.subjectLanguage}&profile_lesson_1_id=${this.quizRules.profile_lesson_1}&profile_lesson_2_id=${this.quizRules.profile_lesson_2}`)
        .then((response) => {
          // finishing all startedt tests before starting new
          this.$store.commit('endTest', response.data)
          this.$store.commit('setCurrentQuizRules', response.data)
          this.$router.push('/do_test')
        }).catch((error) => {
          this.$toast.error(error + ' ,Қате, кейін көріңіз')
        })
    }
  }
}
</script>
