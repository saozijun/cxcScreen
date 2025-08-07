<template>
  <div ref="myChart" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import * as echarts from 'echarts'
import { computeFontSize } from "../../utils/index";

export default {
  name: "bLine",

  props: {
    unit: {
      type: String,
      default: '辆'
    }
  },

  data() {
    return {
      myChart: null,
      baseFontSize: 13,
      originalData: [
        ['10-01', 26],
        ['10-02', 39],
        ['10-03', 135],
        ['10-04', 86],
        ['10-05', 33],
        ['10-06', 85],
        ['10-07', 93],
      ]
    };
  },

  mounted() {
    this.drawLine();
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.myChart) {
      this.myChart.dispose();
    }
  },

  methods: {
    drawLine() {
      this.myChart = echarts.init(this.$refs.myChart);
      this.updateChart();
      
      // 监听缩放事件
      this.myChart.on('dataZoom', (params) => {
        // 根据缩放比例调整字体大小
        if (params.batch) {
          params = params.batch[0];
        }
        const zoomRatio = (params.end - params.start) / 100;
        this.baseFontSize = Math.max(10, 13 * (1 / zoomRatio));
        this.updateChart();
      });
    },

    updateChart() {
      const dateList = this.originalData.map((item) => item[0]);
      const valueList = this.originalData.map((item) => item[1]);
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
              fontSize: computeFontSize(this.baseFontSize)
            }
          },
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgba(0,0,0,0)',
          className: 'tooltip-box',
          formatter: (params) => {
            return `<div class='tooltip-style'>
              <div>${params[0].name}</div>
              <p>${params[0].value} ${this.unit}</p>
            </div>`;
          },
          textStyle: {
            fontSize: computeFontSize(this.baseFontSize)
          }
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '0%',
          top: '15%',
          containLabel: true
        },
        visualMap: {
          show: false,
          type: 'continuous',
          min: 0,
          max: 400,
          seriesIndex: 0,
          inRange: {
            color: ['#a8b447']
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#052941'
            }
          },
          data: dateList,
          axisLabel: {
            color: '#fff',
            fontSize: computeFontSize(this.baseFontSize),
            interval: 0,
            rotate: this.baseFontSize < 11 ? 45 : 0 // 字体太小时倾斜显示
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#052941'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: computeFontSize(this.baseFontSize),
            interval: 0,
          }
        },
        series: [
          {
            type: 'line',
            data: valueList,
            showSymbol: this.baseFontSize > 11, // 字体太小时隐藏符号
            symbolSize: computeFontSize(8),
            lineStyle: {
              width: 2,
              color: '#a8b447'
            },
            itemStyle: {
              color: '#a8b447'
            },
            areaStyle: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#20bcb680'
                },
                {
                  offset: 1,
                  color: '#20bcb600'
                }
              ])
            }
          }
        ]
      };

      this.myChart.setOption(option, true);
    },

    handleResize() {
      if (this.myChart) {
        this.myChart.resize();
      }
    }
  }
};
</script>

<style>
.tooltip-style {
  background: rgba(5, 41, 65, 0.8);
  border: 1px solid #20bcb6;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>