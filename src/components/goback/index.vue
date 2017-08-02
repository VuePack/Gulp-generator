<template>
  <header class="goback">
    <a class="iconfont icon-fanhui" @click="goback"></a>
  </header>
</template>
<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  mounted() {},
  components: {},
  props: [],
  computed: {},
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='less' scoped>
  .goback{
    display: flex;
    align-items: center;
    height: 90px;
    color: #333;
    border-bottom: 1rpx solid #dedede;
    .iconfont{
      margin-left: 25px;
      font-size: 40px;
    }
  }
</style>