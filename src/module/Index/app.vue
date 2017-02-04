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
  import Tabbar from 'components/tabbar/tabbar'
  import TabbarItem from 'components/tabbar/tabbar-item'

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
      '$route' (to, from) {
        // console.log(to)
        // const toDepth = to.path.split('/').length
        // const fromDepth = from.path.split('/').length
        // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }

</script>
<style lang="less">
  @import '../../assets/style/likr.less';
  @import './index.less';

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
  .v-link-active {
    color: #f66 !important
  }
</style>
