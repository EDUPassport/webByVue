<template>
<div class="metrics-container">
  <div class="metrics-t">
    <div class="metrics-t-label">Metrics</div>
    <div class="metrics-t-actions" v-if="(percentage >= 80 && identity == 1) || (identity == 2) || (identity == 3) || (identity == 4)">
      <div class="metrics-t-actions-top">
<!--        <el-button class="action-btn"-->
<!--                   plain-->
<!--                   :loading="pdfLoadingStatus"-->
<!--                   @click="exportPNG">-->
<!--          <el-image class="download-icon" :src="downloadImg"></el-image>-->
<!--          Export PNG-->
<!--        </el-button>-->
        <el-button class="action-btn"
                   plain
                   :loading="pdfLoadingStatus"
                   @click="exportPDF">
          <el-image class="download-icon" :src="downloadImg"></el-image>
          Export PDF
        </el-button>
        <el-button class="action-btn"
                   plain
                   :loading="pngLoadingStatus"
                   @click="exportExcel">
          <el-image class="download-icon" :src="downloadImg"></el-image>
          Export CSV
        </el-button>
      </div>
      <div class="metrics-t-actions-date">
        <div class="metrics-t-actions-date-item" style="position: relative;" @click="showDatePicker">
          Custom date
          <el-date-picker
              style="position: absolute;z-index: -100;top: 0;left: 0;"
              v-model="dateRangeValue"
              ref="datePicker"
              type="daterange"
              :disabled-date="disabledDate"
              @change="dateChange"
          >
          </el-date-picker>
        </div>
        <div class="metrics-t-actions-date-item"
             :class="howLongValue === 365 ? 'metrics-t-actions-date-item-active' : ''"
             @click="changeHowLong(365)">12 Months</div>
        <div class="metrics-t-actions-date-item"
             :class="howLongValue === 90 ? 'metrics-t-actions-date-item-active' : ''"
             @click="changeHowLong(90)">3 Months</div>
        <div class="metrics-t-actions-date-item"
             :class="howLongValue === 30 ? 'metrics-t-actions-date-item-active' : ''"
             @click="changeHowLong(30)">30 Days</div>
        <div class="metrics-t-actions-date-item"
             :class="howLongValue === 7 ? 'metrics-t-actions-date-item-active' : ''"
             @click="changeHowLong(7)">7 Days</div>

      </div>
    </div>

  </div>
  <div class="metrics-chart" id="metrics-chart" v-if="(percentage >= 80 && identity == 1) || identity == 2 || identity == 3 || identity == 4">
    <v-chart class="chart" :option="options" />
  </div>
  <template v-else>
        <el-empty description="..."></el-empty>
      </template>

</div>
</template>

<script>
import downloadImg from '@/assets/newHome/dashboard/download.svg'
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import {nowDateYmdByTime} from "@/utils/tools";

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
  props:['options'],
  components:{
    VChart
  },
  data(){
    return {
      downloadImg,
      percentage:null,
      identity:null,
      
    }
  },

  mounted(){
     this.percentage=localStorage.getItem('profile_percentage')  
     this.identity=localStorage.getItem('identity')   
 
  },
  setup(props,context){

    const pngLoadingStatus = ref(false)
    const pdfLoadingStatus = ref(false)
    const csvLoadingStatus = ref(false)

    provide(THEME_KEY, "light");
    // function exportPNG(){
    //   console.log('pdf')
    //   const HTMLElement = document.getElementById('metrics-chart')
    //   html2canvas(HTMLElement).then(canvas=>{
    //     const contentWidth = canvas.width;
    //     const contentHeight = canvas.height;
    //     const ctx = canvas.getContext('2d')
    //     ctx.textAlign = 'center'
    //     ctx.textBaseline = 'middle'
    //     ctx.font = 'Inter'
    //     ctx.fillStyle = ''
    //
    //     for(let i = contentWidth + -1; i< contentWidth; i+=240){
    //       for(let j = contentHeight * -1; j< contentHeight; j += 100){
    //         ctx.fillText('EDU Passport', i , j)
    //       }
    //     }
    //
    //     const imgUrl = canvas.toDataURL('image/png')
    //     const tempLink = document.createElement('a')
    //     tempLink.style.display = 'none'
    //     tempLink.href = imgUrl
    //     tempLink.setAttribute('download','EDU Passport')
    //
    //     if(typeof tempLink.download === 'undefined'){
    //       tempLink.setAttribute('target','_blank')
    //     }
    //
    //     document.body.appendChild(tempLink)
    //     tempLink.click()
    //     document.body.removeChild(tempLink)
    //     window.URL.revokeObjectURL(imgUrl)
    //
    //   })
    // }

    function exportPDF(){
      pdfLoadingStatus.value = true;

      const HTMLElement = document.getElementById('metrics-chart')
      html2canvas(HTMLElement,{
        dpi:96, // 分辨率
        scale:2, //设置缩放
        useCORS:true, // 允许canvas画布内，可以跨域请求外部链接图片，允许跨域请求
        bgColor:'#ffffff',
        logging:false
      }).then(canvas=>{
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        // 一页pdf显示html页面生成canvas高度
        const pageHeight = (contentWidth / 592.28) * 841.89
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        // 页面偏移
        let position = 0;
        // a4纸的尺寸[595.28,841.89],html 页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28
        const imgHeight = (595.28 / contentWidth) * contentHeight
        const ctx = canvas.getContext('2d')
        // 添加水印
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.rotate((25 * Math.PI) / 180)
        ctx.font = '14px Inter'
        ctx.fillStyle = 'rgba(184,184,184,0.8)'

        for(let i = contentWidth * -1; i< contentWidth; i += 240){
          for(let j = contentHeight * -1; j< contentHeight; j+= 100){
            //填充文字 x间距 y间距
            ctx.fillText('EDU Passport',i,j)
          }
        }

        const pageData = canvas.toDataURL('image/jpeg',1.0)
        const pdf = new jsPDF('','pt','a4')

        if(leftHeight < pageHeight){
          // 在pdf.addImage(pageData,'JPEG',左,上,宽度,高度) 设置在pdf中显示
          pdf.addImage(pageData,'JPEG',0,0,imgWidth,imgHeight)
        }else{
          //分页
          while(leftHeight > 0){
            pdf.addImage(pageData,'JPEG',0,position,imgWidth,imgHeight)

            leftHeight -= pageHeight
            position -= 841.89;
            //避免添加空白页
            if(leftHeight>0){
              pdf.addPage()
            }

          }

        }

        pdf.save()

        pdfLoadingStatus.value = false;

      })
    }

    function exportExcel(){
      csvLoadingStatus.value = true;

      let seriesData = props.options.series;

      seriesData.forEach(item=>{

        import('@/utils/Export2Excel').then(excel => {
          const tHeader = [item.name, 'Number']
          // const data = [{"Id":'1',"Title":'title1',"Author":'author1'}]
          const data =  item.data
          excel.export_json_to_excel({
            header: tHeader, //表头 必填
            data, //具体数据 必填
            filename:item.name + 'csv-list', //非必填
            autoWidth: true, //非必填
            bookType: 'csv' //非必填 xlsx
          })

          csvLoadingStatus.value = false;

        })

      })

    }

    const datePicker = ref(null)
    const dateRangeValue = ref([])
    function showDatePicker(){
      datePicker.value.focus()
    }

    function dateChange(e){
      console.log(e)
      // console.log(dateRangeValue.value)
      let startTime = nowDateYmdByTime(e[0])
      let endTime = nowDateYmdByTime(e[1])

      context.emit('dateChange', startTime, endTime)
    }

    console.log(props)
    const howLongValue = ref(7)
    function changeHowLong(value){
      howLongValue.value = value
      context.emit('howLongChange', value)
    }

   function disabledDate(time){
    return time.getTime() > Date.now()
    }

    return {
      howLongValue,
      pngLoadingStatus,
      pdfLoadingStatus,
      csvLoadingStatus,
      exportExcel,
      exportPDF,
      datePicker,
      showDatePicker,
      changeHowLong,
      dateChange,
      dateRangeValue,
      disabledDate
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

  padding: 8px 12px;

  border-left: 1px solid #D0D5DD;
  cursor: pointer;

}

.metrics-t-actions-date-item:hover{
  background: #F2F4F7;
}
.metrics-t-actions-date-item-active{
  background: #F2F4F7;
}

.metrics-t-actions-top{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}


.action-btn{
  border-color: #6648FF;
  color: #6648FF;
  display: flex;
  align-items: center;
}

.download-icon{
  margin-right: 4px;
}


@media screen and (max-width: 768px) {
  .metrics-container{
    width: 100%;
  }

  .metrics-t{
    flex-direction: column;
  }
  .metrics-t-actions{
    margin: 0;
  }

  .metrics-t-actions-top{
    margin: 16px;
  }

  .metrics-t-actions-date{
    margin: 0 16px;
    flex-wrap: wrap;
  }


}
</style>
