/*
 * @Author: Leon
 * @Date: 2017-02-03 14:02:56
 * @Last Modified by: Leon
 * @Last Modified time: 2017-10-24 20:15:22
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [logger],
  state: {
    urlItems: [
      {linkTo: '/home', name: '首页', iconClass: 'icon-shouye-weixuanzhong'},
      {linkTo: '/about', name: '我的', iconClass: 'icon-wode-weixuanzhong'}
    ]
  }
})

export default store
