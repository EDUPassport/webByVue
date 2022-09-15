<template>
  <div class="events-bg">

    <el-row class="content-row" :gutter="0" align="top" justify="center">

      <el-col class="filter-col" :xs="24" :sm="24" :md="4" :lg="4" :xl="4">

        <div class="filter-bg-container">

          <div class="post-event-btn-container">
            <el-button type="primary" round @click="postEvent()">Post an Event</el-button>
          </div>
          <div class="deals-events-filter-container">

            <div class="deals-events-filter-item">
              <div class="deals-events-filter-label">Location</div>
              <el-select class="deals-events-filter-select"
                         v-model="locationValue" clearable
                         placeholder="Filter by location"
                         size="default"
                         @change="locationChange"
              >
                <el-option
                    v-for="item in locationOptions"
                    :key="item.id"
                    :label="item.Pinyin"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </div>

            <div class="deals-events-filter-item">
              <div class="qx-checked-container">
                <div class="qx-checked-item"
                     @click="selectIsOnline()"
                >
                  <div class="qx-checked-square"
                       :class="filterIsOnlineValue ? 'qx-checked-square-active' : '' "
                  ></div>
                  <div class="qx-checked-label">Online</div>
                </div>
              </div>

            </div>

            <div class="deals-events-filter-item">
              <div class="deals-events-filter-label">Tags</div>
              <el-select class="deals-events-filter-select"
                         v-model="tagValue"
                         clearable multiple
                         placeholder="Filter by tag"
                         size="default"
                         @change="tagChange"
              >
                <el-option
                    v-for="item in tagsData"
                    :key="item.id"
                    :label="item.name_en"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </div>

            <div class="deals-events-filter-item">
              <div class="deals-events-filter-label">Event type</div>

              <div class="qx-checked-container">
                <div class="qx-checked-item" v-for="(item,i) in categoryOptions" :key="i"
                     @click="getEventsList(eventPage,eventLimit)"
                >
                  <div class="qx-checked-square"
                       :class="categoryId == item.id ? 'qx-checked-square-active' : '' "
                  ></div>
                  <div class="qx-checked-label">{{ item.name_en }}</div>
                </div>
              </div>

            </div>

          </div>

          <div class="filter-search-btn-container">
            <el-button type="primary" round >
              SEARCH
            </el-button>
          </div>

          <div class="filter-contact-us-container">
            <el-icon :size="45" color="#6648FF">
              <IconIcBaselineLiveHelp />
            </el-icon>
            <span>Contact Us</span>
          </div>

        </div>

      </el-col>

      <el-col class="events-list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

        <el-scrollbar class="events-list-bg-container">
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
                      <el-button link>ADD TO CALENDAR</el-button>
                    </div>
                    <div class="events-item-action-r">
                      <el-button link>FAVORITE</el-button>
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

        </el-scrollbar>

      </el-col>
    </el-row>

    <el-dialog class="event-detail-dialog" v-model="eventDialogVisible">
      <div class="event-dialog-container">
        <div class="event-dialog-l">
          <el-image  :src="eventDetailData.file !='' ? eventDetailData.file : '' "></el-image>
        </div>
        <div class="event-dialog-r">
          <div class="event-dialog-r-1">
            {{eventDetailData.company_name}}
          </div>
          <div class="event-dialog-r-2">
            {{eventDetailData.location}}
          </div>
          <div class="event-dialog-r-3">
              {{ $filters.ymdFormatEvent(eventDetailData.date)  }}, {{$filters.timeFormatEvent(eventDetailData.start_time,eventDetailData.end_time)}}
          </div>
          <div class="event-dialog-r-4">
            {{eventDetailData.name}}
          </div>
          <div class="event-dialog-r-5">
            {{eventDetailData.desc}}
          </div>
          <div class="event-dialog-r-6">

          </div>
          <div class="event-dialog-r-price">
            <div class="event-dialog-r-price-label">Price</div>
            <div class="event-dialog-r-price-content">
              {{eventDetailData.currency}} {{eventDetailData.pay_money}}
            </div>
          </div>

          <div class="event-dialog-r-btn-1-container">
            <el-button class="event-dialog-r-btn" link>
              ADD TO CALENDAR
            </el-button>
          </div>
          <div class="event-dialog-r-btn-container">
            <el-button class="event-dialog-r-btn" link>
              RSVP
            </el-button>
          </div>

          <div class="event-dialog-r-b">
            <div class="event-dialog-r-b-l">

            </div>
            <div class="event-dialog-r-b-r">
              Posted by: <span>{{eventDetailData.company_name}}</span>
            </div>
          </div>

        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import bannerImg from '../../assets/events/banner.png'
import {EVENTS_CATEGORY, EVENTS_LIST} from "@/api/api";

export default {
  name: "list",
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
      eventDetailData:{}

    }
  },
  mounted() {
    this.getEventCategories()
    this.getEventsList(this.eventPage,this.eventLimit)
  },
  methods:{
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
    postEvent(){
      let token = localStorage.getItem('token')
      let identity = localStorage.getItem('identity')
      if(token){
        if(identity != 1){
          this.$router.push('/events/post')
        }else{
          window.open('https://zfrmz.com/5A8Bl4Gg8unV4HVE0lX4','_blank')
        }
      }else{
        window.open('https://zfrmz.com/5A8Bl4Gg8unV4HVE0lX4','_blank')
      }
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
      let params = {
        page: page,
        limit: limit
      }
      if(this.categoryId){
        params.category_id = this.categoryId
      }

      EVENTS_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.eventsList = this.eventsList.concat(res.message.data).concat(res.message.data).concat(res.message.data).concat(res.message.data).concat(res.message.data).concat(res.message.data).concat(res.message.data).concat(res.message.data) ;
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

.filter-col{
  padding-right: 13px;
}

.filter-bg-container{
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px;
  position: relative;
}


.deals-events-filter-container {
  margin-top: 20px;
}

.deals-events-filter-label {
  text-align: left;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
  margin-bottom:10px;
}

.deals-events-filter-select {
  width: 100%;
}

.deals-events-filter-item {
  margin-top: 25px;
}

.filter-search-btn-container{
  margin-top: 50px;
  text-align: center;
}

.filter-contact-us-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom:30px;
  left:0;
  right:0;
  margin:auto;
  cursor:pointer;

}

.filter-contact-us-container span{
  font-family: BCRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size:25px;
  color:#262626;
}


.qx-checked-container {

}

.qx-checked-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
}

.qx-checked-square {
  border: 1px solid #808080;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
}

.qx-checked-label{
  text-align: left;
  margin-left: 10px;
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color:#262626;
}

.qx-done-btn-container {
  text-align: right;
  margin-top: 20px;
}

.qx-checked-square-active {
  background-color: #6650B3;
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
