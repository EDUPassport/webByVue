<template>

  <div class="container">
    <div class="container-label">
      Active events
      <el-button link type="primary" @click="viewAllEvents()">
        VIEW ALL
      </el-button>
    </div>

    <el-scrollbar class="container-c">
      <template v-if="listData.length>0">
        <div class="events-item-bg"
             v-for="(item,i) in listData" :key="i">

          <div class="events-item">
            <div class="events-item-t">
              <el-image class="events-item-banner"
                        :src="item.file !='' ? item.file : '' "
                        fit="cover"
              >
              </el-image>
            </div>
            <div class="events-item-b">
              <div class="events-item-item">
                <el-space :size="5" wrap spacer="·">
                  <span>{{ $filters.ymdFormatEvent(item.date)  }}</span>
                  <span>
                    {{$filters.timeFormatEvent(item.start_time,item.end_time)}}
                  </span>

                  <span v-if="item.is_all == 1">Social</span>
                  <span v-if="item.is_all == 2">Professional</span>
                </el-space>
              </div>
              <div class="events-item-location">
                  <span v-if="item.is_online == 2 || item.is_online == 3">
                    {{item.location}}
                  </span>
                <span v-else>online</span>
              </div>
              <div class="events-item-name" @click="showEventDialog(item)">
                {{item.name}}
              </div>
              <div class="events-item-desc">
                {{item.desc}}
              </div>

              <div class="events-item-action-container">
                <div class="events-item-action-l">
                  <!--                  <el-button link>ADD TO CALENDAR</el-button>-->
                </div>
                <div class="events-item-action-r">
                  <!--                  <el-button link>FAVORITE</el-button>-->
                </div>

              </div>
            </div>



          </div>

        </div>

      </template>
      <template v-else>
        <el-empty style="width: 100%;" description="..."></el-empty>
      </template>

    </el-scrollbar>

    <eventDetailCard :info="eventDetailData"
                     :visible="eventDialogVisible"
                     @rsvp="showBookEvent()"
                     @close="eventDialogVisible=false">
    </eventDetailCard>
    <bookEventForm :visible="bookEventDialogVisible"
                   :info="eventDetailData"
                   @close="bookEventDialogVisible=false">
    </bookEventForm>

  </div>

</template>

<script>
import eventDetailCard from "@/components/eventDetailCard";
import bookEventForm from "@/components/bookEventForm";
import BookEventList from "@/components/bookEventList";

export default {
  name: "activeEventsDashboard",
  props:['listData'],
  component:{
    eventDetailCard,
    bookEventForm,
    BookEventList
  },
  data(){
    return {
      eventDialogVisible:false,
      eventDetailData:{},
      bookEventDialogVisible:false,


    }
  },
  methods:{
    showEventDialog(item){
      this.eventDialogVisible = true;
      this.eventDetailData  = item;

    },
    showBookEvent(){
      this.bookEventDialogVisible = true;
    },
    viewAllEvents(){
      this.$router.push('/events')
    }

  }

}
</script>

<style scoped>

.container{
  min-width: 550px;
  background-color: #FFFFFF;
  /*padding: 25px 50px;*/
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
}

.container-label{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
  padding: 25px 50px;
}

.container-c{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap:wrap;
  height: 600px;
}

.events-item-bg{
   width: 580px;
}

.events-item{

  margin:0 50px 25px 50px;
  box-shadow: 0px 3px 10px #0000001A;
  background:#FFFFFF;

  overflow: hidden;
  border-radius:40px;

}

.events-item-banner{
  width: 100%;
  height: 260px;

  border:1px solid #ffffff;
  border-radius:20px;

  background-color: #ececec;
  box-shadow: 0 0 8px 0 rgba(100,100,100,0.1);
}
.events-item-b{
  padding: 25px;
}
.events-item-item{

}
.events-item-item span{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;

}
.events-item-desc{
  margin-top: 25px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

}

.events-item-location{
  margin-top: 25px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.events-item-name{
  margin-top: 25px;
  font-family: BCM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 24px;
  color: #262626;
  cursor: pointer;
}

.events-item-name:hover{
  color: #000000;
}

.events-item-action-container{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

@media screen and (max-width: 768px) {
  .container{
    background-color: #F0F2F5;
    box-shadow: none;
    padding: 0;
    min-width: auto;

  }

  .container-label{
    font-size: 20px;
    padding: 0;
    margin: 15px 15px 8px 15px;
  }

  .events-item-bg{
    width: 100%;
  }

  .events-item{
    margin: 7px 15px 15px 15px;
  }

}

</style>