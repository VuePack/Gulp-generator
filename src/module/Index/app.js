/*
 * @Author: Leon
 * @Date: 2017-02-03 14:02:39
 * @Last Modified by: Leon
 * @Last Modified time: 2017-02-04 09:51:44
 */

import App from './app.vue'
import Vue from 'vue'

import store from './manage/store'
import router from './manage/router'
import axios from 'axios'
import 'lib-flexible'

window.axios = axios

// import util from 'jspath/common/util'
// Vue.prototype.utilHelper = util

new Vue({ // eslint-disable-line no-new
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
