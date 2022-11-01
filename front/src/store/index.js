import Vuex from 'vuex'
import Vue from 'vue'
import question from './modules/question'
import quiz from './modules/quiz'
import history from './modules/history'
import login from './modules/login'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    question,
    quiz,
    history,
    login
  }
});
