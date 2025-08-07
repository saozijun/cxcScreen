<template>
  <div id="app">
    <div class="main main-bay">
      <bTop></bTop>
      <div class="content">
        <div class="left">
          <bCrad title="列车概况">
            <div class="b-list">
              <div class="b-item">
                <span>总列车数</span>
                <p><ScrollNumber :value="30" class="bg-scroll-number"/> <span>辆</span></p>
              </div>
              <div class="b-right">
                <ul>
                  <li>
                    <span>运营中</span>
                    <p><ScrollNumber :value="25"/> <span>辆</span></p>
                  </li>
                  <li>
                    <span>停运</span>
                    <p><ScrollNumber :value="3"/> <span>辆</span></p>
                  </li>
                  <li>
                    <span>告警</span>
                    <p><ScrollNumber :value="5"/> <span>辆</span></p>
                  </li>
                </ul>
              </div>
            </div>
          </bCrad>
          <bCrad title="列车告警走势">
            <div class="line-box">
              <bLine />
            </div>
          </bCrad>
          <bCrad title="列车最新告警">
            <div class="list-box">
              <bList :headers="['列车号', '平均间隔', '业务类型', '告警时间']" :table-data="tableData" :has-operation="true"
                :scroll-height="700">
                <template #operation>
                  <div style="width: 100%;color: #686ddb;text-align: center;cursor: pointer;">详情</div>
                </template>
              </bList>
            </div>
          </bCrad>
        </div>
        <div class="map">
          <div class="map-box"></div>
          <div class="chars-box">
            <gLine />
          </div>
        </div>
        <div class="right">
          <bCrad title="CBTC告警统计">
            <div class="b-list">
              <div class="b-item">
                <span>总计告警</span>
                <p><ScrollNumber :value="482" class="bg-scroll-number"/></p>
              </div>
              <div class="b-right">
                <ul>
                  <li>
                    <span>CI</span>
                    <p><ScrollNumber :value="357" color="#efcd1d" /></p>
                    
                  </li>
                  <li>
                    <span>ZC</span>
                    <p><ScrollNumber :value="87" color="#f5790d" /></p>
                  </li>
                  <li>
                    <span>ATS</span>
                    <p><ScrollNumber :value="17" color="#e33938" /></p>
                  </li>
                </ul>
              </div>
            </div>
          </bCrad>
          <bCrad title="CBTC告警走势">
            <div class="line-box">
              <bLine unit="次"/>
            </div>
          </bCrad>
          <bCrad title="CBTC最新告警">
            <div class="list-box">
              <div class="list-box-title">
                <el-select size="mini" v-model="value" placeholder="请选择" class="select-bay" popper-class="el_select_popper">
                  <el-option label="全部" value=""></el-option>
                </el-select>
                <el-date-picker style="width: 80%;" class="select-bay" size="mini" v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <div class="btn">查询</div>
              </div>
              <bList :headers="['列车号', '平均间隔', '业务类型', '告警时间']" :table-data="tableData" :has-operation="true"
                :scroll-height="700">
                <template #operation>
                  <div style="width: 100%;color: #686ddb;text-align: center;cursor: pointer;">详情</div>
                </template>
              </bList>
            </div>
          </bCrad>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bTop from './components/bTop.vue'
import bCrad from './components/bCrad.vue'
import bLine from './components/chars/bLine.vue'
import gLine from './components/chars/gLine.vue'
import bList from './components/bList.vue'
import ScrollNumber from './components/ScrollNumber.vue'
export default {
  name: 'App',
  components: {
    bTop, bCrad, bLine, bList, gLine, ScrollNumber
  },
  data() {
    return {
      tableData: [
        { '列车号': 'a0001', '平均间隔': '3.15s', '业务类型': 'CI', '告警时间': '2025-08-05 11:20' },
        { '列车号': 'a0002', '平均间隔': '4.55s', '业务类型': 'CI', '告警时间': '2025-08-05 11:20' },
        { '列车号': 'a0001', '平均间隔': '3', '业务类型': 'CI', '告警时间': '2025-08-05 11:20' },
        { '列车号': 'a0002', '平均间隔': '5', '业务类型': 'ZC', '告警时间': '2025-08-05 11:20' },
        { '列车号': 'a0001', '平均间隔': '3', '业务类型': 'ATS', '告警时间': '2025-08-05 11:20' },
        { '列车号': 'a0002', '平均间隔': '4', '业务类型': 'ATS', '告警时间': '2025-08-05 11:20' }
      ],
      value: '',
      value1: ''
    }
  },
}
</script>

<style lang="scss" scoped>
@use './assets/init.scss' as *;

li {
  list-style: none;
}

#app {
  .main {
    width: 100vw;
    height: 100vh;
    padding: vh(20) vw(20);
    overflow: hidden;
    background: url('./assets/bg.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;

    .content {
      @include flex-between;
      margin-top: 2vh;
      height: 87vh;
      gap: 1vw;

      .left,
      .right {
        width: 26vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5vh;
      }

      .right {
        .b-right {
          ul li {
            p {
              color: #efcd1d;
            }

            &:nth-child(2) {
              p {
                color: #f5790d;
              }
            }

            &:nth-child(3) {
              p {
                color: #e33938;
              }
            }
          }
        }
      }

      .b-list {
        display: flex;
        align-items: flex-start;
        gap: vw(20);
        margin-top: 2vh;

        .b-item {
          flex: 1;
          font-size: vw(22);
          .bg-scroll-number{
            font-size: vw(36);
          }
          >span {
            color: #03fafb;
          }

          p {
            font-size: vw(36);
            margin-top: vh(20);
            >span {
              font-size: vw(18);
            }
          }
        }

        .b-right {
          flex: 2;

          ul {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            li {
              flex: 1;
              position: relative;
              >span {
                font-size: vw(14);
              }

              p {
                font-size: vw(28);
                margin-top: vh(32);

                >span {
                  font-size: vw(18);
                }
              }

              &::after {
                content: '';
                position: absolute;
                width: vw(1);
                height: vh(65);
                background: #ffffff31;
                left: vw(-10);
                top: vh(8);
              }

              &::before {
                content: '';
                position: absolute;
                width: vw(4);
                height: vh(6);
                border-radius: vw(1);
                background: #efcd1d;
                left: vw(-11);
                top: vh(8);
              }

              &:nth-child(2) {
                &::before {
                  background: #f5790d;
                }
              }

              &:nth-child(3) {
                &::before {
                  background: #e33938;
                }
              }
            }
          }
        }
      }

      .line-box {
        width: 100%;
        height: 25vh;
      }

      .list-box {
        width: 100%;
        margin-top: 2vh;
        height: 29.8vh;
        .list-box-title{
          display: flex;
          align-items: center;
          gap: vw(10);
          margin-bottom: vh(10);
          .btn{
            width: vw(130);
            border-radius: vw(50);
            background: #159bd583;
            color: #fff;
            padding: vh(8) 0;
            font-size: vw(14);
            text-align: center;
            cursor: pointer;
            &:hover{
              background: #0f7fae;
            }
          }
        }
      }

      .map {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 2vh;
        .map-box{
          width: 100%;
          flex: 1;
          opacity: .5;
          background: url('./assets/dq.gif') no-repeat center center;
          background-size: cover;
        }
        .chars-box{
          width: 100%;
          height: 30%;
          padding: vh(10) vw(10);
          background-color: #00000022;
        }
      }
    }
  }
}
</style>
