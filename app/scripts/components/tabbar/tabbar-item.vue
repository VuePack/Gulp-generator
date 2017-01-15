<template>
  <a class="tab-item" :href="link" :class="activeClass">
    <i class="icon iconfont" :class="iconClass">
    </i>
    <div class="label" v-text="label">首页</div>
  </a>
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
      link: '',
      activeClass: ''
    },
    computed: {},
    methods: {}
  }
</script>
<style lang='sass' scoped>


</style>