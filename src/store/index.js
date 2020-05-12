import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    token: ''
  },
  mutations: {
    userState(state, payload) {
      state.token = payload;
      state.isLogin = true;
    }
  },
  actions: {
    setState({commit}, user) {
      commit("userState", user)
    }
  },
  modules: {
  }
})
