import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './plugins/element.js'
import './assets/css/font_2902601_t0zdbcodwpi/iconfont.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'

Vue.prototype.$http = axios
// 配置请求的根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios.interceptors.request.use(config =>{
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
