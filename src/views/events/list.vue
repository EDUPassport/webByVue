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

        <el-scrollbar ref="eventScroll"  class="events-list-bg-container">

          <template v-if="eventsList.length > 0">
            <div class="empty-post-event-btn-container">
              <el-button type="primary" round @click="postEventWhenEmpty()">
                Post an Event
              </el-button>
            </div>
            <div class="events-list-container">

              <div class="events-item-bg"
                   v-for="(item,i) in eventsList" :key="i">

                <div class="events-item">
                  <div class="events-item-t">
                    <el-image class="events-item-banner"
                              fit="cover"
                              :preview-src-list="[item.file]"
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

                        <span v-if="item.is_online == 1">online</span>
                        <span v-if="item.is_online == 2">offline</span>
                        <span v-if="item.is_online == 3">both</span>
                      </el-space>
                    </div>
<!--                    <div class="events-item-location">-->
<!--                      <span v-if="item.is_online == 2 || item.is_online == 3">-->
<!--                          {{item.location}}-->
<!--                      </span>-->
<!--                      <span v-else>online</span>-->
<!--                    </div>-->
                    <el-scrollbar class="events-item-name" always @click="showEventDialog(item)">
                      {{item.name}}
                    </el-scrollbar>
                    <el-scrollbar class="events-item-desc" always>
                      {{item.desc}}
                    </el-scrollbar>

<!--                    <div>-->
<!--                      <el-link>{{item.online_url}}</el-link>-->
<!--                    </div>-->

                    <div class="events-item-action-container">
                      <div class="events-item-action-l">
                        <!--                      <el-button link>ADD TO CALENDAR</el-button>-->
                      </div>
                      <div class="events-item-action-r">
                        <el-button link @click="showBookEvent(item)">
                          <el-icon :size="20">
                            <CollectionTag/>
                          </el-icon>
                          Rsvp
                        </el-button>
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
            <div class="empty-post-event-btn-container">
              <el-button type="primary" round @click="postEventWhenEmpty()">
                Post an Event
              </el-button>
            </div>
            <el-empty  v-if="loadingEvent" style="height: 100%;" description="loading......"></el-empty>
            <el-empty v-else style="height: 100%;" description="Sorry, there are no upcoming events at the moment..."></el-empty>
          </template>

        </el-scrollbar>

      </el-col>
    </el-row>

    <eventDetailCard :info="eventDetailData"
                     :visible="eventDialogVisible"
                     @rsvp="showBookEvent"
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
import {
  EVENT_APPLICATIONS,
  EVENT_LOCATION_LIST,
  EVENTS_CATEGORY,
  EVENTS_LIST,
  TAGS_LIST,
  USER_BROWSING_HISTORY_ADD
} from "@/api/api";
import eventDetailCard from "@/components/eventDetailCard";
import bookEventForm from "@/components/bookEventForm";
import BookEventList from "@/components/bookEventList";
import {updateWindowHeight} from "@/utils/tools";

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
      loadingEvent:false,
      bannerImg,
      eventPage:1,
      eventLimit:6,
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
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted() {

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      updateWindowHeight()
    }


    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
      }
    }
    this.getEventLocationList()
    this.getEventCategories()
    this.getEventTags()
    this.getEventsList(this.eventPage,this.eventLimit)
  },
  methods:{
    addUserBrowsingHistory(id){
      let params = {
        type:3,
        type_id:id
      }
      USER_BROWSING_HISTORY_ADD(params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    },
    getEventLocationList(){
      let params = {}
      EVENT_LOCATION_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.locationOptions = res.message;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    showBookEvent(item){
      this.addUserBrowsingHistory(item.id)

      if(item.online_url){
        window.open(item.online_url,'_blank')
      }else{
        this.eventDetailData = item
        this.bookEventDialogVisible = true
      }

    },
    showBookList(item){
      this.bookListDialogVisible = true

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
      this.eventPage = 1;
      this.getEventsList(this.eventPage,this.eventLimit)
    },
    showEventDialog(item){
      // console.log(item)
      this.eventDetailData  = item;
      this.eventDialogVisible = true;
      this.addUserBrowsingHistory(item.id)

      // console.log(item)
      // let params = {
      //   event_id: item.id
      // }
      // EVENTS_DETAIL(params).then(res => {
      //   console.log(res)
      //   if (res.code == 200) {
      //     this.eventData = res.message;
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })

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
    getEventTags(){
      let params = {
        type:2,
        page:1,
        limit:10000
      }
      TAGS_LIST(params).then(res=>{
        if(res.code == 200){
          this.tagsData = res.message.data;
        }
      }).catch(err=>{
        console.log(err)
      })
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
      this.$refs.eventScroll.scrollTo(0,0)
      this.getEventsList(e, this.eventLimit)
    },
    getEventsList(page,limit){

      this.loadingEvent= true
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
          this.loadingEvent= false

        }
      }).catch(err=>{
        console.log(err)
      })

    },
    turnDetail(id,t){
      this.$router.push({path:'/events/detail',query:{id:id,t:t}})
    },
    postEventWhenEmpty(){
      let token = localStorage.getItem('token')

      if(token){

        this.$router.push({path:'/events/post'})

      }else{

        this.$router.push({path:'/post-event',query:{}})

      }

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
  align-items: flex-start;
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
  /*border-radius:40px;*/
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}

.events-item-t{
  max-height: 700px;
  overflow: hidden;
  /*aspect-ratio: 2 / 3;*/
}

.events-item-banner{
  width: 100%;
  aspect-ratio: 2 / 3;

  border:1px solid #ffffff;
  /*border-radius:20px;*/

  background-color: #ececec;
  box-shadow: 0 0 8px 0 rgba(100,100,100,0.1);
  cursor: pointer;

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
  font-size: 14px;
  color: #262626;

  height: 66px;

  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*display: -webkit-box;*/
  /*-webkit-line-clamp: 3;*/
  /*-webkit-box-orient: vertical;*/

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
  font-size: 18px;
  color: #262626;
  cursor: pointer;
  height: 24px;
}

.events-item-name:hover{
  color: #000000;
  text-decoration: underline;

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


.empty-post-event-btn-container{
  text-align: right;
  padding: 50px;
}


@media screen and (min-width: 1200px){


}

@media screen and (max-width: 768px){
  .events-list-col{
    padding-left: 0;

  }

  .empty-post-event-btn-container{
    padding: 15px;
  }

  .events-list-bg-container{
    height: calc( var(--i-window-height) - 180px);
    padding: 0;
    background-color: #FFFFFF;
  }

  .events-list-container{
    flex-direction: column;
  }

  .events-item-bg{
    width: 100%;
    padding: 0;
  }

  .events-item{
    margin: 15px;
  }

  .events-item-t{
    max-height: 180px;
  }

  .events-item-banner{
    aspect-ratio: auto;
    height: 100%;
  }

  .events-item-b{
    padding: 15px;
  }
  .events-item-item span{
    font-size: 12px;
  }

  .events-item-name{
    margin-top: 15px;
    font-size: 18px;
    height: auto;
  }

  .events-item-desc{
    margin-top: 15px;
    font-size: 14px;
  }



}

</style>
