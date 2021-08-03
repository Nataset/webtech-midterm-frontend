import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthService from '@/services/AuthService'

let end_point = process.env.SHOP_ENDPOINT || 'http://localhost:1337'

Vue.use(Vuex)

let auth_key = "auth-shop"
let auth = JSON.parse(localStorage.getItem(auth_key))
const initialStateUser = {
  user: auth ? auth.user : "",
  jwt: auth ? auth.jwt : "",
  isAuthen :auth ? true : false
}

export default new Vuex.Store({
  state: {
      currentUser: initialStateUser,
      allUser: [],
      product: [],
      reward: [],
      point: [],
  },
  getters:{
      getAllUser: (state) => state.allUser,
      getCurrentUser: (state) => state.currentUser
  },
  mutations: {
    fetchAllUser(state, { res }){
        state.allUser = res.data
    },
    fetchProduct(state, { res }){
        state.product = res.data
    },
    fetchReward(state, { res }){
        state.reward = res.data
    },
    setCurrentUser(state, user , jwt){
        state.currentUser.user = user,
        state.currentUser.jwt = jwt,
        state.currentUser.isAuthen = true
    },
    
  },
  actions: {
    async fetchAllUser({commit}){
      let res = await axios.get(end_point + "/userdata")
      // console.log(res)
      commit('fetchAllUser',{res})
    },
    async fetchAllproduct({commit}){
      let res = await axios.get(end_point + "/products")
      // console.log(res)
      commit('fetchProduct',{res})
    },
    async fetchAllreward({commit}){
      let res = await axios.get(end_point + "/rewards")
      // console.log(res)
      commit('fetchReward',{res})
    },
    setCurrentUser({commit},payload){
      console.log(payload);
      commit('setCurrentUser',payload)
    },
    async login({commit},{username, password}){
      let res = await AuthService.login({username, password})
      if(res.success){
        commit('setCurrentUser', res.user, res.jwt)
      }
      return res
    }
  },
  modules: {
  }
})
