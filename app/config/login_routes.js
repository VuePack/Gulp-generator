/*
 * @Author: Leon
 * @Date: 2017-01-09 11:15:50
 * @Last Modified by: Leon
 * @Last Modified time: 2017-01-09 11:50:46
 */

import App from 'pages/member/login/app.vue'

export default [
  {
    path: '/login',
    component: App,
    children: [
      {
        path: '/login/phone',
        component: resolve => require(['view/about/'], resolve)
      }
    ]
  },
  {
    path: '/login/about',
    component: resolve => require(['view/about/'], resolve)
  }
  // {
  //   path: '*', // 其他页面
  //   redirect: '/login'
  // }
]