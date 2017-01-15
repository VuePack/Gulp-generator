/*
 * @Author: Leon
 * @Date: 2017-01-01 16:27:20
 * @Last Modified by: Leon
 * @Last Modified time: 2017-01-12 13:41:05
 */

import App from './app.vue'
import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from 'config/routes'
import 'lib-flexible'
import 'assets/style/reset.css'
import 'assets/style/likr.css'

window.axios = axios
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

const webApp = new Vue({
  // router,
  el: '#app',
  render: (h) => h(App)
})
