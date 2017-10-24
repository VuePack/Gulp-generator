/*
 * @Author: Leon
 * @Date: 2017-02-03 14:02:39
 * @Last Modified by: Leon
 * @Last Modified time: 2017-10-24 21:15:12
 */

import Vue from 'vue'
import axios from 'axios'
import dtime from 'time-formater'
// import vueg from 'vueg'
// import 'vueg/css/transition-min.css'

import App from './app.vue'
import store from './manage/store'
import router from './manage/router'
import Snake from '../../util/preloader'
import http from '@/util/ajax'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog'

Vue.use(Snake, router)
Vue.prototype.$dialog = { confirm: Confirm, alert: Alert, toast: Toast, notify: Notify, loading: Loading }

const vm = new Vue({
  el: '#app',
  store,
  router,
  render: page => page(App),
  http: {
    header: {
      'Content-Type': 'application/json'
    }
  }
})

window.vm = vm
window.http = http
window.dtime = dtime
axios.defaults.timeout = 5000

// http请求拦截器
axios.interceptors.request.use(config => {
  vm.$showSnake(); return config
}, error => {
  vm.$closeSnake()
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {
  vm.$closeSnake(); return data
}, error => {
  vm.$closeSnake(); return Promise.reject(error)
})
