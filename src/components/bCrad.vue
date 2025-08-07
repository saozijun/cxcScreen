<template>
  <div class="crad-box">
    <div class="crad-main">
      <div class="title">
        <span>{{ title }}</span>
        <img src="../assets/c-t-bg.png" alt="">
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bCrad',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
@use '../assets/init.scss' as *;

.crad-box {
  width: 100%;
  padding: vh(20) vw(30);
  background-color: #00000022;
  .crad-main {
    width: 100%;
    color: #fff;
    overflow: hidden;


    .title {
      @include flex-between;
      gap: 2vw;

      span {
        display: block;
        min-width: vw(160);
        font-size: vw(22);
      }

      img {
        min-width: vw(460);
        position: relative;
        top: .2vh;
      }
    }

    .content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
