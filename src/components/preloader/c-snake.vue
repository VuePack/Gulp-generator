<template>
  <div class="preloader-snake">
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
    methods: {}
  }
</script>
<style lang='less' scoped>
  .preloader-snake {
    width: 60px;
    height: 60px;
    border: 8rpx solid transparent;
    border-radius: 50%;
    border-top-color: #58b7ff;
    border-left-color: #58b7ff;
    border-bottom-color: #58b7ff;
    animation: snake-rotate .8s infinite linear;
    margin: 60px auto
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
