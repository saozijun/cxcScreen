<template>
  <div class="scroll-number" :style="{ color: color }">
    <div class="number-container" ref="numberContainer">
      <span class="number-display">
        <template v-for="(char, index) in formattedChars">
          <span v-if="isDigit(char)" :class="{'digit-bg': isBg}" :key="index">{{ char }}</span>
          <span v-else class="separator" :key="index">{{ char }}</span>
        </template>
      </span>
      <span v-if="suffix" class="suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<script>
import { tween } from 'shifty'

export default {
  name: 'ScrollNumber',
  props: {
    // 目标数值
    value: {
      type: Number,
      default: 0
    },
    // 动画持续时间（毫秒）
    duration: {
      type: Number,
      default: 2000
    },
    // 小数位数
    decimals: {
      type: Number,
      default: 0
    },
    // 数字后缀
    suffix: {
      type: String,
      default: ''
    },
    // 字体颜色
    color: {
      type: String,
      default: '#ffffff'
    },
    // 是否自动开始动画
    autoStart: {
      type: Boolean,
      default: true
    },
    isBg: {
      type: Boolean,
      default: false
    },
    // 缓动函数类型
    easing: {
      type: String,
      default: 'easeInOutCubic',
      validator: (value) => ['linear', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic'].includes(value)
    }
  },

  data() {
    return {
      currentValue: 0,
      transitionValue: 0,
      isAnimating: false
    }
  },

  computed: {
    // 计算显示的数值（格式化）
    displayValue() {
      const value = this.transitionValue
      // 确保值是有效数字
      if (isNaN(value) || value === null || value === undefined) {
        return '0'
      }

      if (this.decimals === 0) {
        return Math.floor(value).toLocaleString()
      }
      return Number(value).toFixed(this.decimals)
    },

    // 将显示值分解为字符数组
    formattedChars() {
      return this.displayValue.split('')
    }
  },

  watch: {
    value(newValue, oldValue) {
      if (this.autoStart && newValue !== oldValue) {
        this.startAnimation(newValue)
      }
    }
  },

  mounted() {
    if (this.autoStart) {
      // 延迟一点开始动画，让组件完全渲染
      setTimeout(() => {
        this.startAnimation(this.value)
      }, 100)
    }
  },

  methods: {
    // 判断字符是否为数字
    isDigit(char) {
      return /\d/.test(char)
    },

    // 开始动画的方法
    startAnimation(targetValue = this.value) {
      // 确保目标值是有效数字
      const validTargetValue = isNaN(targetValue) || targetValue === null || targetValue === undefined ? 0 : Number(targetValue)
      
      this.isAnimating = true
      this.$emit('start')
      
      tween({
        from: { value: this.currentValue },
        to: { value: validTargetValue },
        duration: this.duration,
        easing: this.easing,
        step: (state) => {
          this.transitionValue = state.value
        },
        done: () => {
          this.currentValue = validTargetValue
          this.isAnimating = false
          this.$emit('finish')
        }
      })
    },

    // 重置动画
    reset() {
      this.currentValue = 0
      this.transitionValue = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-number {
  display: inline-block;
  font-weight: bold;
  line-height: 1;
  font-size: vw(26);
  .number-container {
    display: flex;
    align-items: baseline;
    white-space: nowrap;
    overflow: hidden;

    .number-display {
      transition: all 0.1s ease;
      font-variant-numeric: tabular-nums;
      display: flex;
      align-items: center;

      .digit-bg {
        background: rgb(255 255 255 / 10%);
        border: vw(1) solid rgb(255 255 255 / 30%);
        border-radius: vw(4);
        padding: vh(10) vw(10);
        margin: 0 vw(2);
        display: inline-block;
        min-width: vw(40);
        text-align: center;
        backdrop-filter: blur(vw(4));
        // font-family: 'Agency FB';
        box-shadow: 0 vw(2) vw(6) rgba(0, 0, 0, 0.1);
      }

      .separator {
        margin: 0 vw(2);
        display: inline-block;
      }
    }

    .suffix {
      margin-left: vw(6);
      font-size: vw(14);
      opacity: 0.8;
    }
  }
}

// 发光效果
.scroll-number.glow {
  .digit-bg {
    text-shadow: 0 0 vw(15) currentColor;
  }
}
</style>