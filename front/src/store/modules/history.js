
import axios from "axios";

const URL = 'http://localhost:3000/history'

const header = { headers: {
  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
}}

const state = {
  histories: [],
}

const getters = {
  allHistory: state => state.histories
};

const actions = {
  async fetchHistory({ commit }) {
    const id = sessionStorage.getItem('quiz_id')
    const response = await axios.get(`${URL}/${id}`, header);
    commit('setHistories', response.data.slice(-1));
  },

  async createHistory({ commit }, body) {
    await axios.post(URL, body, header);
    commit('createHistory', body);
  },

}

const mutations = {
  setHistories: (state, questions) => (state.histories = questions),
  createHistory: (state, body) => (state.histories.push(body)),
}

export default {
  state,
  getters,
  actions,
  mutations,
};