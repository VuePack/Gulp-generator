/*
 * @Author: Leon
 * @Date: 2017-02-03 14:02:56
 * @Last Modified by: Leon
 * @Last Modified time: 2017-02-03 15:07:52
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [logger],
  state: {
    urlItems: [
      {linkTo: '/home', name: '首页', iconClass: 'icon-index'},
      {linkTo: '/category', name: '分类', iconClass: 'icon-category'},
      {linkTo: '/cart', name: '购物车', iconClass: 'icon-cart'},
      {linkTo: '/about', name: '我的', iconClass: 'icon-me'}
    ]
  }
})

export default store
