
import axios from 'axios'

const URL = 'http://localhost:3000/user/login'

const state = {
  users: [],
}

const getters = {
  allUser: state => state.users
}

const actions = {
  async login({ commit }, body) {
    const response = await axios.post(URL, body)
    sessionStorage.setItem('token', response.data.token)
    console.log(response.data.user)
    sessionStorage.setItem('userId', response.data.user[0].id)
    commit('login', response)
},
}

const mutations = {
    
    login: () => {
      window.location.reload()
    },

}

export default {
  state,
  getters,
  actions,
  mutations,
}