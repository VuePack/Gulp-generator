let Snake = {}
Snake.install = function(Vue, options) {
  let SnakeTpl = Vue.extend({
    template: '<div id="preloader-snake" class="preloader-wrap"><div class="pw-snake"></div><div class="pw-text">正在拼命加载中 ...</div></div>'
  })
  let tpl = new SnakeTpl().$mount().$el
  Vue.prototype.$showSnake = (tips) => {
    if (!document.getElementById('preloader-snake')) document.body.appendChild(tpl)
  }
  Vue.prototype.$closeSnake = (tips) => {
    tpl.classList.add('fadeOut')
    if (document.getElementById('preloader-snake')) document.body.removeChild(tpl)
  }
}

module.exports = Snake
