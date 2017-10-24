<template>
  <div class="container">
    <!-- 底部标签 -->
    <tabbar>
      <tabbar-item v-for='item in urlItems' :label='item.name' :path='item.linkTo' :iconClass='item.iconClass'>
      </tabbar-item>
    </tabbar>
    <transition name="fade" mode="out-in">
      <router-view keep-alive></router-view>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Tabbar from '@/components/tabbar/tabbar'
import TabbarItem from '@/components/tabbar/tabbar-item'

export default {
  name: 'form',
  computed: {
    ...mapState(['urlItems'])
  },
  components: {
    Tabbar,
    TabbarItem
  },
  watch: {
    '$route'(to, from) { }
  }
}

</script>
<style lang="less">
@import "../../assets/style/likr.less";
.v-link-active {
  color: #f66 !important;
}
</style>
