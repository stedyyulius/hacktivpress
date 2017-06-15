import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    blogs: [],
    isLogin: false
  },
  getters:{
    blogs(state){
      return state.blogs
    },
    changeLoginStatus(state){
      return state.isLogin
    }
  },
  mutations:{
    changeLoginStatus(state,status){
      state.isLogin = status
  },
  actions:{
  
  }
})