let Snake = {}
Snake.install = function(Vue, options) {
  let SnakeTpl = Vue.extend({
    template: '<div class="preloader-wrap"><div class="pw-snake"></div><div class="pw-text">正在拼命加载中 ...</div></div>'
  })
  let tpl = new SnakeTpl().$mount().$el
  Vue.prototype.$showSnake = (tips) => {
    document.body.appendChild(tpl)
  }
  Vue.prototype.$closeSnake = (tips) => {
    tpl.classList.add('fadeOut')
    setTimeout(() => {
      document.body.removeChild(tpl)
    }, 800)
  }
}

module.exports = Snake