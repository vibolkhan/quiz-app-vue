import axios from "axios"
import Swal from 'sweetalert2'

const URL = "http://localhost:3000/quiz"

const header = { headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
}}

const state = {
    quizzes: [],
    myQuizzes: [],
    profile: ''
}


const getters = {
    allQuiz: state => state.quizzes,
    myQuizzes: state => state.myQuizzes,
    profile: state => state.profile
}


const actions = {
    async fetchQuizzes({commit}) {
        const response = await axios.get(`${URL}`, header)
        commit('setQuizzes', response.data)
    },

    async fetchMyQuizzes({commit}) {
        const response = await axios.get(`${URL}/myQuiz/${sessionStorage.getItem('userId')}`, header)
        commit('setMyQuizzes', response.data)
    },

    async editQuiz({commit}, body) {
        await axios.put(`${URL}/${body.id}`, body, header)
        commit('updateQuiz', body)
    },

    async createQuiz({commit}, body) {
        await axios.post(`${URL}`, body, header)
        commit('pushQuiz', body)
    },

    deleteQuiz({commit}, id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${URL}/${id}`,header)
                commit('removeQuiz', id)
            }
        })
    }
}

    const mutations = {
    setQuizzes: (state, quiz) => (state.quizzes = quiz),
    
    setMyQuizzes: (state, quiz) => (state.myQuizzes = quiz),

    updateQuiz: (state, body) => {
        const index = state.myQuizzes.findIndex(quiz => quiz.id === body.id)
        if (index !== -1) {
          state.myQuizzes.splice(index, 1, body)
        }
    },

    setProfile: (state, profile) => {state.profile = profile},

    pushQuiz: (state, body) => {
        console.log(body);
        state.myQuizzes.unshift(body)
        state.quizzes.unshift(body)

    },

    removeQuiz: (state, id) => {
        state.myQuizzes = state.myQuizzes.filter(quiz => quiz.id !== id)
        state.quizzes = state.quizzes.filter(quiz => quiz.id !== id)
    },

}

export default {
    state,
    getters,
    actions,
    mutations,
  }