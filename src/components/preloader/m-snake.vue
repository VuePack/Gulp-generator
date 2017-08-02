<template>
  <div class="preloader-wrap">
    <div class="pw-snake"></div>
    <div class="pw-text">正在拼命加载中 ...</div>
  </div>
</template>
<script>
export default {
  name: 'snake',
  data() {
    return {}
  },
  props: {},
  computed: {},
  methods: {
    aa() {
      console.log(222)
    }
  }
}
</script>
<style lang='less' scoped>
.preloader-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.68);
  z-index: 999;
  .pw-snake {
    width: 68px;
    height: 68px;
    border: 6rpx solid transparent;
    border-radius: 50%;
    border-top-color: #58b7ff;
    border-left-color: #58b7ff;
    border-bottom-color: #58b7ff;
    animation: snake-rotate .8s infinite linear;
  }
  .pw-text{
    color: #58b7ff;
    padding: 20px 0;
  }
}

@-webkit-keyframes snake-rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes snake-rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
