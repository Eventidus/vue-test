import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  login({ commit }, data) {
    console.log(data)

    commit('setToken', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
