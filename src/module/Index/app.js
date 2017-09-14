/*
 * @Author: Leon
 * @Date: 2017-02-03 14:02:39
 * @Last Modified by: Leon
 * @Last Modified time: 2017-09-14 14:53:01
 */

import App from './app.vue'
import Vue from 'vue'

import store from './manage/store'
import router from './manage/router'
import axios from 'axios'
import 'lib-flexible'
import Snake from '../../util/preloader'

Vue.use(Snake)
axios.defaults.timeout = 5000 // 允许ajax超时时间

let vm = new Vue({ // eslint-disable-line no-new
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

window.axios = axios
window.vm = vm

// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  vm.$showSnake()
  return config
}, error => {
  vm.$closeSnake()
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  vm.$closeSnake()
  return data
}, error => {
  vm.$closeSnake()
  return Promise.reject(error)
})

