import axios from "axios";
const URL = 'http://localhost:3000/question'
const header = { headers: {
  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
}}

const state = {
  questions: [],
}

const getters = {
  allQuestion: state => state.questions
};

const actions = {
  async fetchQuestion({ commit }) {
    const id = sessionStorage.getItem('quiz_id')
    const response = await axios.get(`${URL}/${id}`, header);
    commit('setQuestions', response.data);
  },

  async deleteQuestion({ commit }, id) {
    await axios.delete(`${URL}/${id}`, header);
    commit('deleteQuestion', id);
  },

  async createQuestion({ commit }, body) {
    await axios.post(URL, body, header);
    commit('createQuestion', body);
  },

  async editQuestion({ commit }, body) {
    await axios.put(`${URL}/${body.id}`, body,header);
    commit('editQuestion', body);
  },
}

const mutations = {
  setQuestions: (state, questions) => (state.questions = questions),
  deleteQuestion: (state, id) => (state.questions = state.questions.filter(question => question.id !== id)),
  createQuestion: (state, body) => (state.questions.push(body)),
  editQuestion: (state, updTodo) => {
    const index = state.questions.findIndex(question => question.id === updTodo.id);
    if (index !== -1) {
      state.questions.splice(index, 1, updTodo);
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
};