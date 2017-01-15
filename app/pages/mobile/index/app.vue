<template>
  <div class="app">
    <!-- 顶部菜单 -->
    <topbar></topbar>

    <!-- 预加载 -->
    <preloader v-if="!content"></preloader>

    <!-- 底部标签 -->
    <tabbar>
      <tabbar-item label="首页" iconClass="icon-indexfill" activeClass="active" link="/mobile/"></tabbar-item>
      <tabbar-item label="分类" iconClass="icon-category" link="/category/"></tabbar-item>
      <tabbar-item label="购物车" iconClass="icon-cart" link="/cart/"></tabbar-item>
      <tabbar-item label="我的" iconClass="icon-me" link="/about/"></tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import Tabbar from 'com/tabbar/tabbar'
  import TabbarItem from 'com/tabbar/tabbar-item'
  import Topbar from 'com/topbar'
  import Preloader from 'com/preloader/snake'

  export default {
    data() {
      return {
        content: ''
      }
    },
    mounted() {
      let self = this
      // axios.get('/mall/api/goods/', {}).then(function (res) {
      //   if (res.data.code === 0) {
      //     self.content = res.data.data
      //   }
      // }).catch(function (res) {
      //   console.log('error')
      // })
    },
    components: {
      Tabbar,
      TabbarItem,
      Topbar,
      Preloader
    },
    methods: {
    }
  }
</script>
<style lang="sass">

</style>