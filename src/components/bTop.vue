<template>
  <div class="top-main">
    <div class="title">大交通监测系统</div>
    <div class="meun">
      <div v-for="(item, index) in list" :class="{ 'active': index == lIndex }" @click="lIndex = index" :key="item.name">
        <span>{{ item.name }}</span>
        <div class="tips"></div>
      </div>
    </div>
    <div class="right">
      <div class="time">
        <div class="date"> {{ date }}</div>
        <img src="../assets/seting.png" alt="">
      </div>
      <div>
        
      </div>
      <div class="user">
        <img src="../assets/av.png" alt="">
        管理员
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'bTop',
  data() {
    return {
      list: [
        { name: '首页', path: '/' },
        { name: 'CBTC业务', path: '/cbtc' },
        { name: 'LTE-M业务', path: '/lte' },
      ],
      lIndex: 0,
      date: ''
    }
  },
  mounted() {
    setInterval(() => {
      this.initDate()
    }, 1000)
  },
  methods: {
    initDate() {
      this.date = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
}
</script>

<style lang="scss" scoped>
@use '../assets/init.scss' as *;

.top-main {
  width: 100%;
  height: vh(80);
  background: url('../assets/top-bg.png') no-repeat;
  background-position: -2.1vw 0;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: #fff;
  font-size: vw(16);
  .title {
    width: 22vw;
    text-align: center;
    font-size: vw(32);
    margin-top: vh(30);
    font-weight: bold;
    letter-spacing: .1vw;
    filter: drop-shadow(0 0 0.5vw #0478f3);
  }
  .right {
    width: 22vw;
    margin-top: vh(30);
    @include flex-between;
    .time{
      @include flex-between;
      font-size: vw(20);  
      gap: 1vw;
      img{
        width: vw(20);
        filter: drop-shadow(0 0 0.5vw #0478f3);
        cursor: pointer;
        &:hover {
          opacity: .8
        }
      }
    }
    .user{
      @include flex-between;
      gap: .5vw;
      img{
        width: vw(40);
      }
    }
  }
  .meun {
    @include absolute-center;
    width: 54.3vw;
    height: vh(80);
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: .3vw;

    >div {
      position: relative;
      top: vh(-5);
      flex: 1;
      height: 88%;
      font-size: vw(26);
      font-weight: bold;
      cursor: pointer;
      @include flex-center;
      transition: color 0.3s ease-in-out;
      color: #afafaf;
      &:nth-child(1) {
        position: relative;

        >span {
          margin-right: -2.2vw;
        }

        .tips {
          width: 100%;
          height: 96%;
          position: absolute;
          opacity: 0;
          z-index: -1;
          background: url('../assets/t-btn-active.png') no-repeat;
          background-size: 100% 100%;
          transition: all 0.3s;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: vh(40);
            background: url('../assets/t-btn-tips.png') no-repeat;
            background-size: 50% 100%;
            bottom: -30%;
            left: 32%;
          }
        }

        &:hover {
          .tips {
            opacity: 1;
          }
        }
      }

      &:nth-child(2) {
        height: 83%;
        flex: 0.88;
        border: .15vw solid transparent;
        .tips {
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0;
          z-index: -1;
          background: #1495ff19;
          box-shadow: inset 0 0 2vw 0vw rgb(22 103 253 / 65%);
          transition: all 0.3s;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: vh(40);
            background: url('../assets/t-btn-tips.png') no-repeat;
            background-size: 50% 100%;
            bottom: -38%;
            left: 27%;
          }
        }

        &:hover {
          border: .15vw solid #e6f4ff30;
          .tips {
            opacity: 1;
          }
        }
      }

      &:nth-child(3) {
        >span {
          margin-left: -2.2vw;
        }

        .tips {
          width: 100%;
          height: 96%;
          position: absolute;
          opacity: 0;
          z-index: -1;
          background: url('../assets/t-btn-active-r.png') no-repeat;
          background-size: 100% 100%;
          transition: all 0.3s;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: vh(40);
            background: url('../assets/t-btn-tips.png') no-repeat;
            background-size: 50% 100%;
            bottom: -30%;
            left: 22%;
          }
        }

        &:hover {
          .tips {
            opacity: 1;
          }
        }
      }
    }

    .active {
      color: #fff !important;
      &:nth-child(2) {
        border: .15vw solid #e6f4ff30;
      }
      .tips {
        opacity: 1 !important;
      }
    }
  }
}
</style>
