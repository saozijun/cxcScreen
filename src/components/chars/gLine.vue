<template>
    <div ref="myChart" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import { computeFontSize } from "../../utils/index";
export default {
    name: "gLine",

    data() {
        return {
            myChart: null,
            baseFontSize: 14 // 基准字体大小
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
            this.myChart = this.$echarts.init(this.$refs.myChart);
            this.updateChartOptions();
            
            // 监听dataZoom事件
            this.myChart.on('dataZoom', () => {
                this.updateChartOptions();
            });
        },
        
        updateChartOptions() {
            const option = {
                color: ['#4c7cff98', '#00b05098', '#ffc00098'],
                title: {
                    text: 'CBTC平均时间间隔',
                    top: '0%',
                    left: '1%',
                    textStyle: {
                        color: '#ddd',
                        fontSize: computeFontSize(this.baseFontSize)
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '10%',
                    top: '20%'
                },
                legend: {
                    data: ['CI', 'ZC', 'ATS'],
                    top: '0%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#ddd',
                        fontSize: computeFontSize(this.baseFontSize - 2) // 比标题小2px
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#fff',
                            fontSize: computeFontSize(this.baseFontSize - 1), // 比标题小1px
                            interval: 0,
                        },
                        axisTick: {
                            show: false
                        },
                        boundaryGap: false,
                        data: ['7月1日', '7月2日', '7月3日', '7月4日', '7月5日', '7月6日', '7月7日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#052941'
                            }
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: computeFontSize(this.baseFontSize - 1), // 比标题小1px
                            interval: 0,
                        }
                    }
                ],
                series: [
                    {
                        name: 'CI',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'ZC',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'ATS',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: [150, 232, 201, 154, 190, 330, 410]
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
    },
};
</script>