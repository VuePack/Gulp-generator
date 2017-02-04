/*
 * @Author: Leon
 * @Date: 2017-02-03 14:03:01
 * @Last Modified by: Leon
 * @Last Modified time: 2017-02-04 10:16:56
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * require.ensure() 引入的多个模块
 * 打包列如 ：
 * 1.home.js
 * 2.about.js ...
 */

const Home = r => require.ensure([], () => r(require('../../../components/home')))
const Category = r => require.ensure([], () => r(require('../../../components/category')))
const Cart = r => require.ensure([], () => r(require('../../../components/cart')))
const About = r => require.ensure([], () => r(require('../../../components/about')))

const baseUrl = '' // 多页面路径配置

const routes = [
  {
    name: 'root',
    path: baseUrl + '/',
    redirect: baseUrl + '/home'
  },
  {
    name: 'home',
    path: baseUrl + '/home',
    component: Home
  },
  {
    name: 'category',
    path: baseUrl + '/category',
    component: Category
  },
  {
    name: 'cart',
    path: baseUrl + '/cart',
    component: Cart
  },
  {
    name: 'about',
    path: baseUrl + '/about',
    component: About
  }
]

const router = new VueRouter({
  hashbang: true, // 将路径格式化为#!开头
  history: true, // use history=false when testing
  // mode: 'history',
  base: __dirname,
  linkActiveClass: 'v-link-active',
  routes // （缩写）相当于 routes: routes
})

export default router
