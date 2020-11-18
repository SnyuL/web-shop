<template>
  <div>
    <bread :params1="'数据统计'" :params2="'数据报表'"></bread>
    <el-card> <div id="main"></div></el-card>
  </div>
</template>

<script>
import { reports_api } from "../../api/index";

var echarts = require("echarts");

export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  async mounted() {
    const { data: res } = await reports_api();
    console.log(res, 1211121);
    // 基于准备好的dom，初始化echarts实例

    var obj = { ...this.options, ...res.data };
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption(obj);
  }
};
</script>
<style scoped lang="less">
#main {
  height: 500px;
}
</style>
