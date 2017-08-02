export default {
  get(url, data = {}, success = () => {}) {
    this.ajax('GET', url, data, success)
  },
  post(url, data = {}, success = () => {}) {
    this.ajax('POST', url, data, success)
  },
  put(url, data = {}, success = () => {}) {
    this.ajax('PUT', url, data, success)
  },
  delete(url, data = {}, success = () => {}) {
    this.ajax('DELETE', url, data, success)
  },
  ajax(type, url, data, success) {
    let conf = ''
    if (localStorage.hasOwnProperty('sessionid')) {
      conf = { 'X-SESSIONID': localStorage.sessionid }
    }

    if (type === 'GET') {
      axios({
        url: url,
        params: data,
        method: type,
        headers: conf
      }).then(res => {
        if (res.data.code === 401) {
          location.href = '/h5/login.html'
          return
        }
        success(res.data)
      }).catch(() => { alert('网络请求失败，请重试') })
    } else {
      axios({
        url: url,
        data: data,
        method: type,
        headers: conf
      }).then(res => {
        if (res.data.code === 401) {
          location.href = '/h5/login.html'
          return
        }
        success(res.data)
      }).catch(() => { alert('网络请求失败，请重试') })
    }
  }
}