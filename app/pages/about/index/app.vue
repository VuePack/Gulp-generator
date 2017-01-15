<template>
  <div class="app member-section">

    <!-- 底部标签 -->
    <tabbar>
      <tabbar-item label="首页" iconClass="icon-index" link="/mobile/"></tabbar-item>
      <tabbar-item label="分类" iconClass="icon-category" link="/category/"></tabbar-item>
      <tabbar-item label="购物车" iconClass="icon-cart" link="/cart/"></tabbar-item>
      <tabbar-item label="我的" iconClass="icon-mefill" activeClass="active" link="/about/"></tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import Tabbar from 'com/tabbar/tabbar'
  import TabbarItem from 'com/tabbar/tabbar-item'

  export default {
    data() {
      return {
        name: '个人中心',
        user: ''
      }
    },
    mounted() {
      let self = this
      // util.get('/v2/member/self/', {}, res => { self.user = res.data })
    },
    components: {
      Tabbar,
      TabbarItem
    },
    watch: {},
    methods: {}
  }
</script>
<style lang="sass">
  @import '../../../assets/style/member.scss'
</style>