/*
 * @Author: Leon
 * @Date: 2017-08-20 00:16:20
 * @Last Modified by: Leon
 * @Last Modified time: 2018-05-25 14:03:21
 */

import axios from 'axios'
import { Loading } from 'element-ui'

axios.defaults.baseURL = '/api'
axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
let loadinginstace
axios.interceptors.request.use(config => {
  if (localStorage.hasOwnProperty('token')) {
    config.headers['token'] = localStorage.getItem('token')
  }
  loadinginstace = Loading.service({
    lock: true,
    text: '拼命加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)'
  })
  return config
}, error => {
  loadinginstace.close()
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(response => {
  loadinginstace.close()
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        vm.$message({
          type: 'error',
          message: '未授权，请重新登录'
        })
        localStorage.clear()
        vm.$router.replace('/login')
        break
      case 404:
        vm.$message({
          type: 'error',
          message: '404 请求错误,未找到该资源'
        })
        break
      case 502:
        vm.$message({
          type: 'error',
          message: '502 网络错误'
        })
        break;
      case 503:
        vm.$message({
          type: 'error',
          message: '503 服务不可用'
        })
        break
      case 504:
        vm.$message({
          type: 'error',
          message: '504 网络超时'
        })
        break
      case 505:
        vm.$message({
          type: 'error',
          message: '505 http版本不支持该请求'
        })
        break
    }
  } else {
    vm.$message({
      type: 'error',
      message: '连接到服务器失败'
    })
  }
  loadinginstace.close()
  return Promise.reject(error)
})

let HTTP = (type, url, params, config = {
}) => {
  let args = [url, params, config].filter(x => Boolean(x))
  return axios[type](...args).then(
    res => {
      if (res.data && res.data.code !== 0) {
        vm.$message({
          type: 'error',
          message: res.data.msg
        })
      }
      return res.data
    }
  )
}

export default {
  get: HTTP.bind(null, 'get'),
  post: HTTP.bind(null, 'post'),
  put: HTTP.bind(null, 'put'),
  delete: HTTP.bind(null, 'delete')
}
