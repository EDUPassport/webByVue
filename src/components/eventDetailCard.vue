<template>
<div>
  <el-dialog  :model-value="visible"
              width="auto"
              center
              :show-close="false"
              :before-close="beforeClose"
  >

    <div class="event-dialog-container">
      <div class="event-dialog-l">
        <el-image class="event-dialog-l-img"
                  fit="cover"
                  :src="info.file !='' ? info.file : '' ">
        </el-image>
      </div>
      <div class="event-dialog-r">
        <div class="event-dialog-close-container">
          <el-icon class="event-dialog-close-icon"
                   @click="close()"
                   :size="20">
            <CloseBold />
          </el-icon>
        </div>
        <div class="event-dialog-r-bg">
          <div class="event-dialog-r-1">
            {{info.company_name}}
          </div>
          <div class="event-dialog-r-2">
            {{info.location}}
          </div>
          <div class="event-dialog-r-3">
            {{ $filters.ymdFormatEvent(info.date)  }}, {{$filters.timeFormatEvent(info.start_time,info.end_time)}}
          </div>
          <div class="event-dialog-r-4">
            {{info.name}}
          </div>
          <div class="event-dialog-r-5">
            {{info.desc}}
          </div>
          <div class="event-dialog-r-lc">
            <div class="event-dialog-r-lc-label">
              For EDU Passport members
            </div>
            <div class="event-dialog-r-lc-content">
              {{info.type_desc}}
            </div>
          </div>
          <div class="event-dialog-r-lc">
            <div class="event-dialog-r-lc-label">Price</div>
            <div class="event-dialog-r-lc-content">
              {{info.currency}} {{info.pay_money}}
            </div>
          </div>

          <!--            <div class="event-dialog-r-btn-1-container">-->
          <!--              <el-button class="event-dialog-r-btn" link>-->
          <!--                ADD TO CALENDAR-->
          <!--              </el-button>-->
          <!--            </div>-->
          <div class="event-dialog-r-btn-container">

            <el-icon :size="20" >
              <CollectionTag />
            </el-icon>
            <span @click="rsvp()" >RSVP</span>

          </div>

          <div class="event-dialog-r-b">
            <div class="event-dialog-r-b-l">
              <el-space :size="5" wrap spacer="·">
                <span v-if="info.company_category_name">{{info.company_category_name}}</span>
                <span v-if="info.is_online == 1">online</span>
                <span v-if="info.is_online == 2">offline</span>
                <span v-if="info.is_online == 3">both</span>
              </el-space>
            </div>
            <div class="event-dialog-r-b-r">
              Posted by: <span>{{info.company_name}}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: "eventDetailCard",
  props:['visible','info'],
  methods:{
    close(){
      this.$emit('close')
    },
    rsvp(){
      this.$emit('rsvp')
    },
    beforeClose(done){
      this.$emit('close')
      done()
    }

  }
  
}
</script>

<style scoped>

.event-dialog-container{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  background-color: #FFFFFF;
  box-shadow: 0 3px 10px #0000001A;

  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;

  width: 1038px;
  height: 720px;
  margin: 0 auto;



}

/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

.event-dialog-l{
  width: 480px;
}

.event-dialog-l-img{
  width: 100%;
  height: 100%;
}

.event-dialog-r{
  width: 558px;
  padding-bottom: 25px;
  position: relative;

}

.event-dialog-close-container{
  text-align: right;
  padding: 25px 50px 0 0;

}

.event-dialog-close-icon{
  cursor: pointer;
}

.event-dialog-r-bg{
  /*padding: 50px;*/
  padding-left: 25px;
}

.event-dialog-r-1{
  font-family:BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}
.event-dialog-r-2{
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  margin-top: 10px;
}

.event-dialog-r-3{
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  margin-top: 10px;
}

.event-dialog-r-4{
  font-family:BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 35px;
  color: #262626;
  margin-top: 50px;
}
.event-dialog-r-5{
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  margin-top: 10px;

  min-height: 115px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.event-dialog-r-lc{
  margin-top: 25px;
}

.event-dialog-r-lc-label{
  font-family:BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}


.event-dialog-r-lc-content{
  margin-top: 10px;
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.event-dialog-r-btn-1-container{
  margin-top: 25px;
}

.event-dialog-r-btn-container{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.event-dialog-r-btn-container span{
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
  margin-left: 10px;
  cursor: pointer;
}

.event-dialog-r-btn-container span:hover{
  color: #808080;

}

.event-dialog-r-btn{

}

.event-dialog-r-b{

  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 17px;
  color: #262626;

  padding-left: 25px;
  padding-right: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  margin:50px auto 0;

}

.event-dialog-r-b-l{

}
.event-dialog-r-b-r{

}
.event-dialog-r-b-r span{
  font-family:BCM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

</style>