export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },
  loggedInUser (state) {
    return state.auth.user
  }
}

export const state = () => ({
  currentQuizRules: {
  },
  currentQuizQuestion: {
  },
  answeredQuestions: []
})

export const mutations = {
  setCurrentQuizRules (state, quizRules) {
    state.currentQuizRules = quizRules
  },
  setCurrentQuizQuestion (state, currentQuizQuestion) {
    state.currentQuizQuestion = currentQuizQuestion
  },
  setQuestionAnswer (state, question) {
    const questionId = question.id
    const exists_ = state.answeredQuestions.filter(function (e) {
      return e.id === questionId
    })
    if (exists_ && exists_.length > 0) {
      state.answeredQuestions.filter(function (e) {
        return e.id === questionId
      })[0].answer = question.answer
    } else {
      state.answeredQuestions.push(question)
    }
  }
}
