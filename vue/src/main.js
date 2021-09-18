import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";
import router from "@/router";
import store from "./store"

// axios setup
axios.defaults.baseURL = 'http://localhost:8000'
const jwt = localStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

Vue.use(BootstrapVue)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('date_format', function (value) {
  value = value.substr(0, value.indexOf('T'))
  return value
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
