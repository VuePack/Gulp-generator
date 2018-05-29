/*
 * @Author: Leon
 * @Date: 2017-02-03 14:02:39
 * @Last Modified by: Leon
 * @Last Modified time: 2018-05-29 18:35:06
 */

import Vue from 'vue'
import moment from 'moment'

import App from './app.vue'
import store from './manage/store'
import router from './manage/router'
import Snake from '../../util/preloader'
import http from '../../util/httpRequest'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog'

Vue.use(Snake, router)
Vue.prototype.$dialog = { confirm: Confirm, alert: Alert, toast: Toast, notify: Notify, loading: Loading }
Vue.prototype.$http = http

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
window.moment = moment
