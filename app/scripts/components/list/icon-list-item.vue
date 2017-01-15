<style lang='sass'>
</style>
<template>
  <li class="item-content">
    <a :href="link">
      <div class="item-icon">
        <i class="icon iconfont" :class="iconLabel"></i>
        <span class="label" v-text="label"></span>
      </div>
      <div class="item-arrow">
        <i class="icon iconfont" :class="iconArrow"></i>
      </div>
    </a>
  </li>
</template>
<script>
export default {
  name: 'list-item',
  data() {
    return {
    }
  },
  props: {
    iconLabel: '',
    link: '',
    label: '',
    iconArrow: ''
  },
  computed: {},
  methods: {}
}
</script>