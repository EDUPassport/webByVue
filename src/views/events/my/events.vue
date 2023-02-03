<template>
  <div class="bg">
    <div class="profile-container">
      <div class="profile-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="profile-r-container">
        <el-scrollbar class="profile-r-bg-container">
          <div class="deals-list-container">

            <div class="deals-list-t">
              <div class="deals-list-label">My Events</div>
              <div class="deals-list-t-r">
                <el-button class="post-event-btn" type="primary" round @click="turnPostEvent()">
                  POST AN EVENT
                </el-button>

              </div>
            </div>

            <div class="events-list-container" v-if="eventsList.length > 0">

              <div class="events-item-bg"
                   v-for="(item,i) in eventsList" :key="i">

                <div class="events-item">
                  <div class="list-item-tag actived-0" v-if="item.status==0">
                    Pending
                  </div>
                  <div class="list-item-tag actived-1" v-if="item.status==1">
                    Active
                  </div>
                  <div class="list-item-tag actived-2" v-if="item.status==2">
                    Rejected
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

<!--                        <span v-if="item.is_all == 1">Social</span>-->
<!--                        <span v-if="item.is_all == 2">Professional</span>-->
                      </el-space>
                    </div>

                    <div class="events-item-name" >
                      {{item.name}}
                    </div>
                    <div class="events-item-desc">
                      {{item.desc}}
                    </div>

                    <div class="events-item-action-container">
                      <div class="events-item-action-l">
                        <el-button link @click="showEventDialog(item)">
                          PREVIEW
                        </el-button>
                        <el-button link @click="editEvent(item)">
                          EDIT
                        </el-button>
<!--                        <el-button link @click="deleteEvent(item.id)">-->
<!--                          DELETE-->
<!--                        </el-button>-->
                      </div>
                      <div class="events-item-action-r">
                        <el-button link
                                   @click="showBookList(item)"
                                   type="primary">
                          BOOKED LIST
                        </el-button>
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>
            <div class="events-list-container-empty" v-else>
              <el-empty description="-"></el-empty>
            </div>

            <div class="events-pagination" v-if="eventsList.length>0">
              <el-pagination layout="prev, pager, next" :default-current-page="1"
                             @size-change="eventPageSizeChange"
                             @current-change="eventPageChange"
                             :current-page="eventPage" :page-size="eventLimit"
                             :total="eventTotalNum">
              </el-pagination>
            </div>


          </div>

        </el-scrollbar>
      </div>

    </div>

    <eventDetailCard :info="eventDetailData" :visible="eventDialogVisible"
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
import eventDetailCard from "@/components/eventDetailCard";
import bookEventForm from "@/components/bookEventForm";
import BookEventList from "@/components/bookEventList";
import meSideMenu from "@/components/meSideMenu";
import {EVENTS_MY_EVENT, EVENTS_CATEGORY, EVENT_APPLICATIONS, EVENTS_ADD_EVENT} from '@/api/api';
import {encode} from 'js-base64'
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "events",
  components: {
    meSideMenu,
    eventDetailCard,
    bookEventForm,
    BookEventList
  },
  data() {
    return {
      userInfo: {},
      basicUserInfo: {},
      eventsList: [],
      eventPage: 1,
      eventLimit: 10,
      eventTotalNum: 0,
      options: [],
      categoryId: '',
      showVendorCompanyData: [],
      categoryOptions: [],
      eventDialogVisible:false,
      eventDetailData:{},
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

    this.getEventCategories()
    this.getMyEvents(this.eventPage, this.eventLimit)
  },
  methods: {
    showBookEvent(){
      this.bookEventDialogVisible = true;
      // this.eventDialogVisible = false;
    },
    deleteEvent(eventId){
      let params = {
        event_id:eventId,
        is_delete:1
      }
      EVENTS_ADD_EVENT(params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    editEvent(item){
      let s = encode(JSON.stringify(item))

      this.$router.push({path:'/events/post',query:{str:s}})
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
    showEventDialog(item){

      this.eventDetailData = item;
      this.eventDialogVisible = true;
    },
    getEventCategories() {
      let params = {
        page: 1,
        limit: 10000
      }
      EVENTS_CATEGORY(params).then(res => {
        this.categoryOptions = res.message.data;
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    closeVendorCompany(i) {
      let index = this.showVendorCompanyData.indexOf(i)

      if (index == -1) {
        this.showVendorCompanyData.push(i);
      } else {
        this.showVendorCompanyData.splice(index, 1)
      }

    },
    turnDealDetail(id) {
      this.$router.push({
        path: '/deals/detail', query: {
          id: id
        }
      })
    },
    eventPageSizeChange(e) {
      console.log(e)
    },
    eventPageChange(e) {
      this.jobPage = e
      this.getMyJobs(e, this.eventLimit)
      console.log(e)
    },
    getMyEvents(page, limit) {
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }

      if(this.categoryId){
        params.category_id = this.categoryId
      }

      EVENTS_MY_EVENT(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.eventsList = res.message.data
          // console.log(res.message.data)
          this.eventTotalNum = res.message.total
        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    turnDetail(id,t){
      this.$router.push({path:'/events/detail',query:{id:id,t:t}})
    },
    turnPostEvent(){
      this.$router.push({path:'/events/post',query:{}})
    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.profile-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.profile-l-container {

}

.profile-r-container {
  padding: 50px;
  width: calc(100% - 260px);
  height: calc(100vh - 240px);
}

.profile-r-bg-container{
  width: 100%;
  height: calc(100vh - 240px);
  background-color: #FFFFFF;
  border-radius: 18px;
  box-shadow: 0 3px 23px #00000012;
}

.deals-list-container {
  padding: 25px 50px;
}

.deals-list-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
}

.deals-list-label {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}


.events-list-container{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap:wrap;
}
.events-list-container-empty{
  text-align: center;
}
.events-item-bg{
  width:31%;
  padding: 1%;
}

.events-item{

  box-shadow: 0px 0px 23px #00000033;
  background:#F0F2F5;

  overflow: hidden;
  border-radius:18px;

  position: relative;

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

  min-height: 92px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
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
  /*cursor: pointer;*/

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

/*.events-item-name:hover{*/
/*  color: #000000;*/
/*}*/

.events-item-action-container{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.events-pagination {
  text-align: center;
  padding: 40px;
}


.list-item-tag {
  position: absolute;
  top: 8px;
  right: -60px;
  color: #FFFFFF;
  transform: rotate(30deg);
  padding: 4px 80px 4px 160px;
  text-align: center;
  font-size: 14px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.actived-0 {
  background-color: #00B3D2;
}

.actived-1 {
  background-color: #B1C452;
}

.actived-2 {
  background-color: #FF2870;
}

.events-pagination{
  padding:40px;
  display:flex;
  justify-content: center;
}


@media screen and (min-width: 1200px){

}

@media screen and (max-width: 768px){
.profile-r-container{
  width: 100%;
  height: calc( var(--i-window-height) - 160px);
  padding: 0;
}

  .profile-r-bg-container{
    background-color: #F0F2F5;
    box-shadow: none;
    border-radius: 0;
    height: calc( var(--i-window-height) - 160px);
  }

  .deals-list-container{
    padding: 15px;
  }
  .deals-list-label{
    font-size: 18px;
  }

  .events-item-bg{
    width: 100%;
    padding: 0;
  }

  .events-item{
    width: 100%;
    margin: 15px 0;
  }
  .events-item-b{
    padding: 15px;
  }
  .events-item-item span{
    font-size: 12px;
  }

  .events-item-name{
    font-size: 18px;
    margin-top: 15px;
  }

  .events-item-desc{
    font-size: 14px;
  }
}


</style>
