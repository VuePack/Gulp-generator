/*
 * @Author: Leon
 * @Date: 2017-02-03 14:02:56
 * @Last Modified by: Leon
 * @Last Modified time: 2017-08-02 15:17:38
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [logger],
  state: {
    urlItems: [
      {linkTo: '/home', name: '首页', iconClass: 'icon-zhuyeicon'},
      {linkTo: '/category', name: '分类', iconClass: 'icon-wode'},
      {linkTo: '/about', name: '我的', iconClass: 'icon-wode'}
    ]
  }
})

export default store
