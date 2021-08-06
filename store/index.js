export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },
  loggedInUser (state) {
    return state.auth.user
  }
}

export const state = () => ({
  currentQuiz: {
  }
})

export const mutations = {
  setCurrentQuiz (state, quiz) {
    state.currentQuiz = quiz
  }
}
