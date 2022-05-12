import Vuex from 'vuex'
import Vue from 'vue'
import bookStore from './modules/bookStore'
import typeStore from './modules/booktypeStore'
import bookstudentStore from './modules/borrowStore'
import studentStore from './modules/studentinfoStore'
import restoreStore from './modules/restoreStore'
import loginStore from './modules/loginStore'
 
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    bookStore,
    bookstudentStore,
    studentStore,
    typeStore,
    restoreStore,
    loginStore
  }
})
