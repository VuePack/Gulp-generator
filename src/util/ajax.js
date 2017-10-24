/*
 * @Author: Leon
 * @Date: 2017-08-20 00:16:20
 * @Last Modified by: Leon
 * @Last Modified time: 2017-10-24 21:16:39
 */
import axios from 'axios'

const HTTP = (type, url, params, config = {
  'headers': {
    'Authorization': 'Token ' + (sessionStorage.hasOwnProperty('user') ? JSON.parse(sessionStorage.getItem('user')).token : '')
  }
}) => {
  const args = [url, params, config].filter(x => Boolean(x))
  return axios[type](...args).then(
    res => {
      if (res.data && res.data.code !== '0') {
        // vm.$dialog.toast({ mes: res.data.msg, timeout: 1500, icon: 'error' })
      }
      return res.data
    }
  ).catch(err => {
    if (err.response && err.response.status === 401) {
      vm.$router.replace('/login')
      sessionStorage.clear()
    } else {
      vm.$dialog.toast({ mes: '网络连接失败，请重试!', timeout: 1500, icon: 'error' })
    }
  })
}

export default {
  get: HTTP.bind(null, 'get'),
  post: HTTP.bind(null, 'post'),
  put: HTTP.bind(null, 'put'),
  delete: HTTP.bind(null, 'delete')
}
