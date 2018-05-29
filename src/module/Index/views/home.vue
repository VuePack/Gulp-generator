<template>
  <div>home</div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  async created() {
    const res = await this.$http.get('/v1/topics/')
  },
  components: {},
  props: [],
  computed: {},
  methods: {}
}
</script>
<style lang='less' scoped>
</style>