<template>
<div class="metrics-container">
  <div class="metrics-t">
    <div class="metrics-t-label">Metrics</div>
    <div class="metrics-t-actions">
      <div class="metrics-t-actions-top">
        <el-button class="action-btn" plain @click="exportPdf">Export PDF</el-button>
        <el-button class="action-btn" plain @click="exportExcel">Export CSV</el-button>
      </div>
      <div class="metrics-t-actions-date">
        <div class="metrics-t-actions-date-item">12 Months</div>
        <div class="metrics-t-actions-date-item">3 Months</div>
        <div class="metrics-t-actions-date-item">30 Days</div>
        <div class="metrics-t-actions-date-item">7 Days</div>
      </div>
    </div>
  </div>

  <div class="metrics-chart">
    <v-chart class="chart" :option="polar" />
  </div>

</div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart , BarChart, LineChart  } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
  name: "metrics",
  components:{
    VChart
  },
  setup(){

    provide(THEME_KEY, "light");

    const polar =ref({
      title: {
        // text: "参与情况",
        textStyle: {
          color: "#667085",
          fontSize: 12,
          fontWeight: 400,
          fontFamily: "Inter, PingFang SC",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      color: ["#F9B019", "#7F56D9"], // 设置折线颜色
      legend: {
        data: ["Profile Visits", "Jobs Shortlisted"],
        right: "2%",
      },
      grid: {
        left: "3%",
        right: "1%",
        bottom: "0%",
        containLabel: true, // 是否居中显示图表
      },
      xAxis: [
        {
          type: "category",
          axisLabel: {
            // interval: 0, // 让横坐标每一项都显示
          },
          axisTick: {
            alignWithLabel: true, // 将刻度显示在中间
          },
          data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              // 设置坐标轴刻度设置为虚线
              type: "dashed",
            },
          },
        },
        {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              // 设置坐标轴刻度设置为虚线
              type: "dashed",
            },
          },
        },
      ],
      series: [
        {
          name: "Profile Visits",
          type: "line",
          yAxisIndex: 1,
          symbol: "circle", //将小圆点改成实心 不写symbol默认空心
          symbolSize: 5, //小圆点的大小
          data: [1,2,6,8,10,4,6]
        },
        {
          name: "Jobs Shortlisted",
          type: "line",
          yAxisIndex: 1,
          symbol: "circle", //将小圆点改成实心 不写symbol默认空心
          symbolSize: 5, //小圆点的大小
          data: [0,2,4,6,8,10,0]
        },
      ],

    })

    function exportPdf(){
      window.print()
      console.log('pdf')
    }

    function exportExcel(){
      console.log('excel')
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['Name', 'Index']
        // const data = [{"Id":'1',"Title":'title1',"Author":'author1'}]
        const data =  [
          { Name: "Bill Clinton", Index: 42 },
          { Name: "GeorgeW Bush", Index: 43 },
          { Name: "Barack Obama", Index: 44 },
          { Name: "Donald Trump", Index: 45 },
          { Name: "Joseph Biden", Index: 46 }
        ]
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: 'excel-list', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx' //非必填
        })
      })

    }

    return {
      polar,
      exportExcel,
      exportPdf
    }
  }
}
</script>

<style scoped>
.chart {
  height: 240px;
}

.metrics-container{
  box-sizing: border-box;
  width: 528px;
  height: 409px;

  background: #FFFFFF;
  border: 1px solid #EAECF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}

.metrics-t{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.metrics-t-label{

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;

  color: #101828;
  margin-top: 16px;
  margin-left: 20px;
}


.metrics-t-actions{
  margin: 16px 20px 20px 0;
}
.metrics-t-actions-top{
  text-align: right;
}
.metrics-t-actions-date{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  border-top: 1px solid #D0D5DD;
  border-bottom: 1px solid #D0D5DD;
  border-right: 1px solid #D0D5DD;
  border-radius: 8px;
  margin-top: 20px;
  overflow: hidden;
}

.metrics-t-actions-date-item{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;

  text-align: right;
  color: #1D2939;

  flex: none;
  order: 0;
  flex-grow: 0;
  padding: 8px 12px;

  border-left: 1px solid #D0D5DD;
  cursor: pointer;

}

.action-btn{
  border-color: #6648FF;
  color: #6648FF;
}

</style>