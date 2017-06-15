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
    },
    addBlog(state,data){
      state.blogs.push(data)
    }
  },
  mutations:{
    changeLoginStatus(state,status){
      state.isLogin = status
  }
},
  actions:{
    // createBlog({commit},payload){
    //   axios.post(`http://localhost:3000/createBlog`,payload){
    //     .then(response=>{
    //       commit('addBlog',response.data)
    //     })
    //   }
    // }
  }
})