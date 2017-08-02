<template>
  <router-link class="tab-item" :to="path" :class="activeClass">
    <i class="icon iconfont" :class="iconClass">
    </i>
    <div class="label" v-text="label">首页</div>
  </router-link>
</template>
<script>
  export default {
    name: 'tab-item',
    data() {
      return {}
    },
    props: {
      label: '',
      iconClass: '',
      path: '',
      activeClass: ''
    },
    computed: {},
    methods: {}
  }
</script>
<style lang='less' scoped>
</style>