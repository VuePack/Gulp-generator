<style lang='sass'>
@import '../../../assets/style/components/list.scss'
</style>
<template>
  <div class="list-icon">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'icon-list',
  data() {
    return {
    }
  },
  props: {},
  computed: {},
  methods: {}
}
</script>