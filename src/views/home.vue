<template>
  <div>
    首页
  </div>
</template>
<script>
import util from 'util'

export default {
  name: '',
  data() {
    return {
    }
  },
  props: {},
  computed: {},
  methods: {},
  mounted() {
    util.get('/api/v1/topics/', {}, res => {})
  }
}
</script>
<style lang='less' scoped>
</style>