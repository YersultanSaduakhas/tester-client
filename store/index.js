export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedInUser (state) {
    return state.user
  }
}

export const state = () => ({
  user: null,
  currentQuizRules: [],
  testEnded: true,
  answeredQuestions: []
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setCurrentQuizRules (state, quizRules) {
    state.testEnded = false
    state.currentQuizRules = quizRules
  },
  setAnsweredQuestion (state, question) {
    const questionId = question.id
    const questionIndex = state.answeredQuestions.map(function (e) { return e.id }).indexOf(questionId)
    if (questionIndex > -1) {
      if (question.choosen_answers.length > 0) {
        state.answeredQuestions[questionIndex].choosen_answers = question.choosen_answers
      } else {
        state.answeredQuestions.splice(questionIndex, 1)
      }
    } else if (question.choosen_answers.length > 0) {
      state.answeredQuestions.push(question)
    }
  },
  endTest (state) {
    state.testEnded = true
    state.answeredQuestions = []
    state.currentQuizRules = []
  }
}
