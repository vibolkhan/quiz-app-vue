import router from "@/router";
import axios from "axios";
const URL = 'http://localhost:3000/question'
const header = { headers: {
  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
}}

const state = {
  questions: [],
}

const getters = {
  allQuestionToPlay: state => state.questions
};

const actions = {
  async fetchQuestionToPlay({ commit }) {
    const id = router.currentRoute.params.quizId
    sessionStorage.setItem('quizId', id)
    const response = await axios.get(`${URL}/${id}`, header);
    commit('setQuestions', response.data);
  },
}

const mutations = {
  setQuestions: (state, questions) => (state.questions = questions),
}

export default {
  state,
  getters,
  actions,
  mutations,
};