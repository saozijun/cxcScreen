<template>
    <div class="scrollable-table-container">
        <!-- 表头 -->
        <div class="table-header">
            <table>
                <colgroup>
                    <col v-for="(header, index) in headers" :key="`header-${index}`"
                        :style="{ width: columnWidths[index] }" />
                    <col v-if="hasOperation" style="width: 80px" />
                </colgroup>
                <thead>
                    <tr>
                        <th v-for="(header, index) in headers" :key="`th-${index}`">{{ header }}</th>
                        <th v-if="hasOperation">操作</th>
                    </tr>
                </thead>
            </table>
        </div>

        <!-- 表体 -->
        <div class="table-body" ref="tableBody" :style="tableBodyStyle" @mouseenter="pauseScroll"
            @mouseleave="resumeScroll">
            <div class="scroll-wrapper" ref="scrollWrapper">
                <!-- 双份DOM元素实现无缝滚动 -->
                <table class="scroll-table">
                    <colgroup>
                        <col v-for="(header, index) in headers" :key="`body-1-${index}`"
                            :style="{ width: columnWidths[index] }" />
                        <col v-if="hasOperation" style="width: 80px" />
                    </colgroup>
                    <tbody>
                        <tr v-for="(row, index) in tableData" :key="`row-1-${index}`">
                            <td v-for="(value, key, cellIndex) in row" :key="`cell-1-${cellIndex}`">{{ value }}</td>
                            <td v-if="hasOperation">
                                <slot name="operation" :row="row" :index="index" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="scroll-table">
                    <colgroup>
                        <col v-for="(header, index) in headers" :key="`body-2-${index}`"
                            :style="{ width: columnWidths[index] }" />
                        <col v-if="hasOperation" style="width: 80px" />
                    </colgroup>
                    <tbody>
                        <tr v-for="(row, index) in tableData" :key="`row-2-${index}`">
                            <td v-for="(value, key, cellIndex) in row" :key="`cell-2-${cellIndex}`">{{ value }}</td>
                            <td v-if="hasOperation">
                                <slot name="operation" :row="row" :index="index" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BList',
    props: {
        headers: {
            type: Array,
            required: true
        },
        tableData: {
            type: Array,
            required: true
        },
        scrollable: {
            type: Boolean,
            default: true
        },
        scrollHeight: {
            type: Number,
            default: 300
        },
        scrollSpeed: {
            type: Number,
            default: 1000
        },
        hasOperation: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tableBodyStyle() {
            const vh = (this.scrollHeight / 1080) * 100;
            return {
                '--table-body-height': `${vh}vh`
            };
        }
    },
    data() {
        return {
            isScrolling: true,
            columnWidths: [],
            scrollTimer: null,
            translateY: 0,
            containerHeight: 0
        }
    },
    watch: {
        tableData: {
            handler() {
                this.$nextTick(() => {
                    this.syncColumnWidths()
                    this.calculateContainerHeight()
                    // 重新启动滚动以确保同步
                    if (this.scrollable) {
                        this.stopScrolling()
                        this.$nextTick(() => {
                            this.startScrolling()
                        })
                    }
                })
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.syncColumnWidths()
            this.calculateContainerHeight()
            if (this.scrollable) {
                // 延迟启动滚动以确保DOM完全渲染
                setTimeout(() => {
                    this.startScrolling()
                }, 100)
            }
        })
    },
    beforeUnmount() {
        this.stopScrolling()
    },
    methods: {
        calculateContainerHeight() {
            // 计算单个表格的高度
            this.$nextTick(() => {
                const scrollWrapper = this.$refs.scrollWrapper
                if (scrollWrapper) {
                    // 获取单个表格的高度（两个表格高度相同）
                    const singleTable = scrollWrapper.querySelector('.scroll-table')
                    if (singleTable) {
                        this.containerHeight = singleTable.offsetHeight
                    }
                }
            })
        },

        startScrolling() {
            const scrollWrapper = this.$refs.scrollWrapper
            if (!scrollWrapper || !this.containerHeight) return

            // 根据scrollSpeed计算步长，数值越大滚动越慢
            const step = 100 / this.scrollSpeed
            // 获取单份数据的高度
            const singleDataHeight = this.containerHeight

            // 确保初始位置正确
            this.translateY = 0
            scrollWrapper.style.transform = `translateY(0px)`

            const scrollFn = () => {
                if (this.isScrolling) {
                    this.translateY -= step

                    // 实现无缝滚动效果
                    if (Math.abs(this.translateY) >= singleDataHeight) {
                        this.translateY = 0
                    }

                    scrollWrapper.style.transform = `translateY(${this.translateY}px)`
                }

                this.scrollTimer = requestAnimationFrame(scrollFn)
            }

            this.scrollTimer = requestAnimationFrame(scrollFn)
        },

        stopScrolling() {
            if (this.scrollTimer) {
                cancelAnimationFrame(this.scrollTimer)
                this.scrollTimer = null
            }
        },

        pauseScroll() {
            this.isScrolling = false
        },

        resumeScroll() {
            this.isScrolling = true
        },

        syncColumnWidths() {
            const firstRow = this.$refs.tableBody?.querySelector('.scroll-table tr')
            if (firstRow) {
                const cells = firstRow.children
                this.columnWidths = Array.from(cells).map(cell => `${cell.offsetWidth}px`)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/init.scss' as *;

.scrollable-table-container {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.table-header {
    width: 100%;
    overflow: hidden;
}

.table-header table,
.table-body table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.table-body {
    width: 100%;
    height: var(--table-body-height);
    overflow: hidden;
    position: relative;
}

.scroll-wrapper {
    will-change: transform;
    display: flex;
    flex-direction: column;
}

th,
td {
    padding: vh(12) vw(12);
    text-align: center;
    font-size: vw(12);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 1px solid #009dff67;
    border-left: 1px solid #009dff67;
}

th {
    background-color: hsl(202.15deg 96.11% 50.08% / 23%);
    font-weight: bold;
    border-right: 1px solid #009dff67;
    border-left: 1px solid #009dff67;
}

/* 单行红色 */
tr:nth-child(odd) td {
    background-color: rgba(0, 89, 255, 0.1);
}

/* 双行蓝色 */
tr:nth-child(even) td {
    background-color: rgba(0, 187, 255, 0.135);
}

tr:hover td {
    background-color: #ffffff1d;
}
</style>
