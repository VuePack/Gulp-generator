<template>
  <div>
    首页
  </div>
</template>
<script>
import { topics } from '@/api/getData'

export default {
  name: '',
  data() {
    return {
    }
  },
  props: {},
  computed: {},
  methods: {},
  async created() {
    const res = await topics()
    console.log(res)
  }
}
</script>
<style lang='less' scoped>
</style>