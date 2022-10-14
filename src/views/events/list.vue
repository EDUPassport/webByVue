<template>
  <div class="events-bg">

    <el-row class="content-row" :gutter="0" align="top" justify="center">

      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <eventFilterComponent
            :locationData="locationOptions"
            :tagsData = "tagsData"
            :categoryData="categoryOptions"
            @search="confirmFilterSearch"
        >
        </eventFilterComponent>
      </el-col>

      <el-col class="events-list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

        <el-scrollbar class="events-list-bg-container">

          <template v-if="eventsList.length > 0">
            <div class="events-list-container">

              <div class="events-item-bg"
                   v-for="(item,i) in eventsList" :key="i">

                <div class="events-item">
                  <div class="events-item-t">
                    <el-image class="events-item-banner"
                              :src="item.file !='' ? item.file : '' "
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
                        <!--                      <el-button link>ADD TO CALENDAR</el-button>-->
                      </div>
                      <div class="events-item-action-r">
                        <!--                      <el-button link>-->
                        <!--                        FAVORITE-->
                        <!--                      </el-button>-->
                      </div>

                    </div>
                  </div>



                </div>

              </div>

            </div>

            <div class="events-pagination">
              <el-pagination layout="prev, pager, next"
                             :default-current-page="1"
                             @size-change="eventPageSizeChange"
                             @current-change="eventPageChange"
                             :current-page="eventPage" :page-size="eventLimit"
                             :total="eventTotalNum"></el-pagination>
            </div>


          </template>
          <template v-else>
            <el-empty description="..."></el-empty>
          </template>

        </el-scrollbar>

      </el-col>
    </el-row>

    <eventDetailCard :info="eventDetailData"
                     :visible="eventDialogVisible"
                     @rsvp="showBookEvent()"
                     @close="eventDialogVisible=false">
    </eventDetailCard>
    <bookEventForm :visible="bookEventDialogVisible"
                   :info="eventDetailData"
                   @close="bookEventDialogVisible=false">
    </bookEventForm>

    <BookEventList :visible="bookListDialogVisible"
                   :info="bookedListData"
                   @close="bookListDialogVisible=false"
    >
    </BookEventList>


  </div>
</template>

<script>
import eventFilterComponent from "@/components/eventFilterComponent";
import bannerImg from '../../assets/events/banner.png'
import {EVENT_APPLICATIONS, EVENTS_CATEGORY, EVENTS_LIST} from "@/api/api";
import eventDetailCard from "@/components/eventDetailCard";
import bookEventForm from "@/components/bookEventForm";
import BookEventList from "@/components/bookEventList";

export default {
  name: "list",
  component:{
    eventFilterComponent,
    eventDetailCard,
    bookEventForm,
    BookEventList
  },
  data(){
    return {
      bannerImg,
      eventPage:1,
      eventLimit:4,
      eventTotalNum:0,
      showLoadingStatus:false,
      eventsList:[],
      showVendorCompanyData:[],
      categoryOptions:[],
      categoryId:undefined,
      locationValue: '',
      locationOptions: [],
      tagValue: [],
      tagsData: [],
      filterIsOnlineValue: false,
      eventDialogVisible:false,
      eventDetailData:{},
      filterResultData:{},
      bookEventDialogVisible:false,
      bookListDialogVisible:false,
      bookedListData:[]

    }
  },
  mounted() {
    this.getEventCategories()
    this.getEventsList(this.eventPage,this.eventLimit)
  },
  methods:{
    showBookEvent(){
      this.bookEventDialogVisible = true;
      // this.eventDialogVisible = false;
    },
    showBookList(item){
      this.bookListDialogVisible = true;
      let params = {
        event_id:item.id
      }
      EVENT_APPLICATIONS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.bookedListData = res.message.data;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    confirmFilterSearch(e){
      console.log(e)
      this.filterResultData = e;
      this.getEventsList(this.eventPage,this.eventLimit)
    },
    showEventDialog(item){
      this.eventDialogVisible = true;
      this.eventDetailData  = item;
    },
    selectIsOnline(){
      this.filterIsOnlineValue = !this.filterIsOnlineValue

      this.eventsList = []
      this.showLoadingStatus = true

      this.getEventsList(this.dealPage, this.dealLimit)

    },
    locationChange(e) {
      // console.log(e)
      this.eventsList = []
      this.showLoadingStatus = true
      this.locationValue = e
      this.getEventsList(this.dealPage, this.dealLimit)
    },
    tagChange(e) {
      // console.log(e)
      this.eventsList = []
      this.showLoadingStatus = true
      this.tagValue = e
      this.getEventsList(this.dealPage, this.dealLimit)
    },
    getEventCategories(){
      let params = {
        page: 1,
        limit: 10000
      }
      EVENTS_CATEGORY(params).then(res=>{
        this.categoryOptions = res.message.data;
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    closeVendorCompany(i){
      let index = this.showVendorCompanyData.indexOf(i)

      if(index == -1){
        this.showVendorCompanyData.push(i);
      }else{
        this.showVendorCompanyData.splice(index,1)
      }

    },
    eventPageSizeChange(e){
      console.log(e)
    },
    eventPageChange(e){
      this.showLoadingStatus=true
      this.eventPage = e
      this.getEventsList(e, this.eventLimit)
    },
    getEventsList(page,limit){

      let filterResult = this.filterResultData;

      let paramsA = {
        page: page,
        limit: limit
      }

      let params = Object.assign(paramsA,filterResult)

      EVENTS_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.eventsList = res.message.data;
          this.eventTotalNum = res.message.total;
          this.showLoadingStatus=false

        }
      }).catch(err=>{
        console.log(err)
      })

    },
    turnDetail(id,t){
      this.$router.push({path:'/events/detail',query:{id:id,t:t}})
    }
  }
}
</script>

<style scoped>
.events-bg{
  background-color: #FFFFFF;
}

.events-list-col{
  padding-left: 12px;
}

.events-list-bg-container{
  background-color: #F0F2F5;
  height: calc(100vh - 170px);
  padding: 0 30px 30px 30px;
}


.events-list-container{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap:wrap;
}

.events-item-bg{
  width:31%;
  padding: 1%;
}

.events-item{

  box-shadow: 0px 3px 10px #0000001A;
  background:#FFFFFF;

  overflow: hidden;
  border-radius:40px;

}

.events-item-banner{
  width: 100%;
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


.events-pagination{
  padding:40px;
  display:flex;
  justify-content: center;
}

.event-dialog-container{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;

}

.event-dialog-l{}
.event-dialog-r{
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
}

.event-dialog-r-3{
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
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
}

.event-dialog-r-price{
  margin-top: 20px;
}

.event-dialog-r-price-label{
  font-family:BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}
.event-dialog-r-price-content{
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}
.event-dialog-r-btn-1-container{
  margin-top: 25px;
}
.event-dialog-r-btn-container{

}

.event-dialog-r-btn{
  font-size: 20px;
}

.event-dialog-r-b{
  margin-top: 50px;
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 17px;
  color: #262626;
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



@media screen and (min-width: 1200px){


}

@media screen and (max-width: 768px){

}

</style>
