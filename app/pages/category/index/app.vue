<template>
  <div class="app">
    <!-- 顶部菜单 -->
    <topbar></topbar>

    <!-- 预加载 -->
    <preloader v-if="!content"></preloader>

    <!-- 底部标签 -->
    <tabbar>
      <tabbar-item label="首页" iconClass="icon-index" link="/mobile/"></tabbar-item>
      <tabbar-item label="分类" iconClass="icon-categoryfill" activeClass="active" link="/category/"></tabbar-item>
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
        msg: '分类',
        content: ''
      }
    },
    mounted() {
      let self = this
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