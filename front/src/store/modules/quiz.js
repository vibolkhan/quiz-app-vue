import axios from "axios"

const URL = "http://localhost:3000/quiz"

const header = { headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
}}

const state = {
    quizzes: []
}


const getters = {
    allQuiz: state => state.quizzes
}


const actions = {
    async fetchQuizzes({commit}) {
        const response = await axios.get(`${URL}`, header)
        commit('setQuizzes', response.data)
    },

    async editQuiz({commit}, body) {
        await axios.put(`${URL}/${body.id}`, body, header)
        commit('updateQuiz', body)
    },

    async createQuiz({commit}, body) {
        console.log(body)
        await axios.post(`${URL}`, body, header)
        // console.log(response.data)
        commit('pushQuiz', body)
    },

    async deleteQuiz({commit}, id) {
        await axios.delete(`${URL}/${id}`,header)
        commit('removeQuiz', id)
    }
}

    const mutations = {
    setQuizzes: (state, quiz) => (state.quizzes = quiz),
    
    updateQuiz: (state, body) => {
        const index = state.quizzes.findIndex(quiz => quiz.id === body.id)
        if (index !== -1) {
          state.quizzes.splice(index, 1, body)
        }
    },

    pushQuiz: (state, body) => (state.quizzes.push(body)),

    removeQuiz: (state, id) => (state.quizzes = state.quizzes.filter(quiz => quiz.id !== id)),
}

export default {
    state,
    getters,
    actions,
    mutations,
  }