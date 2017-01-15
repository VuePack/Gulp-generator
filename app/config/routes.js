/*
 * @Author: Leon
 * @Date: 2017-01-01 14:20:01
 * @Last Modified by: Leon
 * @Last Modified time: 2017-01-05 21:15:00
 */

import App from 'pages/mobile/index/app.vue'

export default [
  {
    path: '/home',
    component: resolve => require(['view/index/'], resolve)
  },
  {
    path: '/category',
    component: resolve => require(['view/category/'], resolve)
  },
  {
    path: '/cart',
    component: resolve => require(['view/cart/'], resolve)
  },
  {
    path: '/about',
    component: resolve => require(['view/about/'], resolve)
  },
  {
    path: '*', // 其他页面
    redirect: '/home'
  }
]