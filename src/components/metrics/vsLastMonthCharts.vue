<template>
<div class="base-chart">
  <v-chart class="chart" :option="polar" />
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
  DataZoomComponent,
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
  GridComponent,
  DataZoomComponent
]);

export default {
  name: "vsLastMonthCharts",
  props:['color','areaColor'],
  components:{
    VChart
  },
  setup(props){

    const pngLoadingStatus = ref(false)
    const pdfLoadingStatus = ref(false)
    const csvLoadingStatus = ref(false)

    provide(THEME_KEY, "light");

    const polar =ref({
      title: {
        text: "vs last month",
        textStyle: {
          color: "#667085",
          fontSize: 12,
          fontWeight: 400,
          fontFamily: "Inter, PingFang SC",
        },
      },
      xAxis: {
        type: 'time',
        show:false,

        axisLine:{
          show:false
        },
        axisTick:{
          show:false,
          length:100
        },
        splitLine:{
          show:false
        }
      },
      yAxis: {
        type: 'value',
        scale:true,
        show:false,
        grid:{
          containLabel:true
        },
        axisLine:{
          show:false
        },
        axisTick:{
          show:false
        },
        splitLine:{
          show:false
        },

      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: [
            ["2019-10-01", 10],
            ["2019-10-02", 30],
            ["2019-10-03", 40],
            ["2019-10-04", 22],
            ["2019-10-05", 30],
            ["2019-10-06", 33],
            ["2019-10-07", 33],
            ["2019-10-08", 20],
            ["2019-10-09", 20],
            ["2019-10-10", 34],
            ["2019-10-11", 30],
            ["2019-10-12", 20],
            ["2019-10-13", 40],
            ["2019-10-14", 20],
            ["2019-10-15", 50],
            ["2019-10-16", 50],
            ["2019-10-17", 20],
            ["2019-10-18", 30],
            ["2019-10-19", 55],
            ["2019-10-20", 20],
            ["2019-10-21", 121],
            ["2019-10-22", 30],
            ["2019-10-23", 20],
            ["2019-10-24", 30],
            ["2019-10-25", 33],
            ["2019-10-26", 33],
            ["2019-10-27", 44],
            ["2019-10-28", 20],
            ["2019-10-29", 30],
            ["2019-10-30", 10],
            ["2019-10-31", 30]
          ],
          itemStyle:{
            color: props.color,
            opacity:0
          },
          lineStyle:{
            width:2,
            color:props.color
          },
          areaStyle:{
            color: props.areaColor
          }
        }
      ],

    })

    return {
      polar,
      pngLoadingStatus,
      pdfLoadingStatus,
      csvLoadingStatus
    }
  }

}
</script>

<style scoped>
.base-chart{
  width: 100%;
}
.chart {
  height: 60px;
}
</style>
