import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let end_point = process.env.SHOP_ENDPOINT || 'http://localhost:1337'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      allUser: [],
      currentUser:'',
      product: [],
      reward: [],
      point: [],
  },
  getters:{
      getAllUser: (state) => state.allUser,
      getCurrentUser: (state) => state.currentUser
  },
  mutations: {
    fetchUser(state, { res }){
        state.allUser = res.data
      },
    fetchProduct(state, { res }){
        state.product = res.data
      },
    fetchReward(state, { res }){
        state.reward = res.data
      },
    setCurrentUser(state, res){
        state.currentUser = res
    },
  },
  actions: {
    async fetchAlluser({commit}){
      let res = await axios.get(end_point + "/userdata")
      // console.log(res)
      commit('fetchUser',{res})

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
      // console.log(payload);
      commit('setCurrentUser',payload)
    }
  },
  modules: {
  }
})
