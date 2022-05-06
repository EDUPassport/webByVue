<template>
  <div class="events-bg">
    <el-row class="banner-row" :gutter="0" align="middle" justify="center">
      <el-col class="banner-bg" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-image :src="bannerImg" fit="cover"></el-image>
      </el-col>
    </el-row>
    <el-row class="content-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

        <div class="events-top-container">
          <div class="events-filter-container">
            <el-select v-model="categoryId"
                       clearable
                       @change="getEventsList(eventPage,eventLimit)"
                       placeholder="Category" size="large">
              <el-option
                  v-for="item in categoryOptions"
                  :key="item.id"
                  :label="item.name_en"
                  :value="item.id"
              />
            </el-select>
          </div>

          <div class="post-event-btn-container">
            <el-button type="primary" round @click="postEvent()">Post an Event</el-button>
          </div>

        </div>

        <div class="events-list-container">

          <div class="events-item"
               v-for="(item,i) in eventsList" :key="i"
          >
            <div class="events-item-l">
              <el-image class="events-item-banner"

                        :src="item.file !='' ? item.file : 'https://cdn.jsdelivr.net/gh/unilei/images@master/20220324/xxx.2ntb45gjv1g0.webp' "
              >

              </el-image>
              <el-tag class="events-item-l-tag"
                      :hit="true"
                      effect="dark"
                      color="#00b3d2"
              >FEATURED</el-tag>

              <div class="vendor-company-1-open"
                   v-if="showVendorCompanyData.indexOf(i) != -1"
                   @click="closeVendorCompany(i)"
              >
                ^
              </div>
              <!--              vendor company info-->
              <div class="vendor-company-info"
                   v-if="showVendorCompanyData.indexOf(i) == -1">
                <div class="vendor-company-1">

                  <div class="vendor-company-1-close"
                      @click="closeVendorCompany(i)"
                  >
                    -
                  </div>
                  <div class="vendor-company-1-category">
                    <el-tag
                            style="border: 1px solid #b1c452"
                            :hit="true"
                              effect="dark"
                             color="#b1c452"
                    >
                      <template v-if="item.identity == 3 && item.user_info">
                        {{ item.user_info.vendor_type_name }}
                      </template>
                      <template v-if="item.identity == 2 && item.business_info">
                        {{ item.business_info.business_type_name }}
                      </template>
                    </el-tag>
                  </div>
                </div>

                <div class="vendor-company-2">

                  <div class="vendor-company-2-l">
                    <template v-if="item.identity == 3 ">
                      <el-image class="vendor-company-logo"
                                :src="item.user_info ? item.user_info.logo : '' "
                      ></el-image>
                    </template>
                    <template v-if="item.identity == 2">
                      <el-image class="vendor-company-logo"
                                :src="item.business_info ? item.business_info.logo : '' "
                      ></el-image>
                    </template>

                  </div>
                  <div class="vendor-company-2-r">
                    <div class="vendor-company-2-name">
                      <template v-if="item.identity == 3 && item.user_info">
                        {{ item.user_info.vendor_name_en }}
                      </template>
                      <template v-if="item.identity == 2 && item.business_info">
                        {{ item.business_info.business_name }}
                      </template>
                    </div>
                    <div class="vendor-company-2-title">
                      <template v-if="item.identity == 3 && item.user_info">
                        {{ item.user_info.job_title }}
                      </template>
                      <template v-if="item.identity == 2 && item.business_info">
                        {{ item.business_info.job_title }}
                      </template>
                    </div>
                    <div class="vendor-company-2-event-name">
                      {{item.name}}
                    </div>
                  </div>
                </div>

                <div class="vendor-company-3">
                  <template v-if="item.is_online == 2 || item.is_online == 3">
                    {{item.location}}
                  </template>

                </div>

              </div>

              <div class="events-item-r">
                <div class="events-item-r-content">
                  <h3 class="event-r-title" v-if="item.name">{{item.name}}</h3>
                  <div class="event-r-title-underline"></div>
                  <div  class="event-r-desc-tag" >
                    <p class="event-r-desc" v-if="item.desc">
                      {{item.desc}}
                    </p>
                    <div class="event-r-tags">
                      <div class="event-r-tag" v-if="item.is_online == 1">Online</div>
                      <div class="event-r-tag" v-if="item.is_online == 2">Offline</div>
                      <div class="event-r-tag" v-if="item.is_online == 3">Both</div>

                      <div class="event-r-tag" v-if="item.is_all == 1">Social</div>
                      <div class="event-r-tag" v-if="item.is_all == 2">Professional</div>
                    </div>
                  </div>
                  <div class="event-r-category">
                    <template v-if="item.identity == 3 && item.user_info">
                      Category: {{ item.user_info.vendor_type_name }}
                    </template>
                    <template v-if="item.identity == 2 && item.business_info">
                      Category: {{ item.business_info.business_type_name }}
                    </template>
                  </div>
                  <div class="event-r-location">
                    <template v-if="item.is_online == 2 || item.is_online == 3">
                      Location: {{item.location}}
                    </template>
                  </div>
                  <div class="event-r-date">
                    Date: {{ $filters.ymdFormatEvent(item.date)  }}
                  </div>
                  <div class="event-r-time">
                    Time: {{$filters.timeFormatEvent(item.start_time,item.end_time)}}
                  </div>
                  <div class="event-r-btn">
                    <el-button class="event-r-btn-btn" type="default" round
                               @click="turnDetail(item.id)"
                    >RSVP</el-button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="events-pagination">
          <el-pagination layout="prev, pager, next" :default-current-page="1"
                         @size-change="eventPageSizeChange"
                         @current-change="eventPageChange"
                         :current-page="eventPage" :page-size="eventLimit"
                         :total="eventTotalNum"></el-pagination>
        </div>

      </el-col>
    </el-row>


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
      categoryId:undefined

    }
  },
  mounted() {
    this.getEventCategories()
    this.getEventsList(this.eventPage,this.eventLimit)
  },
  methods:{
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
          this.eventsList = res.message.data;
          this.eventTotalNum = res.message.total;
          this.showLoadingStatus=false

        }
      }).catch(err=>{
        console.log(err)
      })

    },
    turnDetail(id){
      this.$router.push({path:'/events/detail',query:{id:id}})
    }
  }
}
</script>

<style scoped>
.events-bg{
  background-color: #ececec;
}

.banner-bg{
  background-color:#ffffff;
}

.content-row{
  /*width: 1100px;*/
  margin: 0 auto;
}

@media screen and (min-width: 1200px){
  .content-row{
    width: 1100px;
  }


}

.events-top-container{
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.events-filter-container{


}

.events-filter-container /deep/ input::placeholder {
  color: #004956;
}

.events-list-container{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap:wrap;
  margin-top:20px;
}

.events-item{
  width:48%;
  border-radius:10px;

  overflow: hidden;

  display:flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top:20px;

}

.events-item-l{
  width:100%;
  position: relative;
}

.events-item-r{
  position: absolute;
  width:40%;
  padding-right:2%;
  background-color:#FFFFFF;
  height: 100%;
  right: 0;
  top:0;
  border-radius: 20px;
  border:1px solid #ffffff;
  box-shadow: 0 0 8px 0 rgba(100,100,100,0.1);
}
.events-item-r-content{
  padding-left:20px;
}

.events-item-banner{
  width:60%;
  min-height:440px;
  max-height:440px;
  border:1px solid #ffffff;
  border-radius:20px;
  z-index:100;
  background-color: #ececec;
  box-shadow: 0 0 8px 0 rgba(100,100,100,0.1);
}

.events-item-l-tag{
  position: absolute;
  top:20px;
  left:20px;
  z-index:110;
}


.vendor-company-1-open{
  width:40px;
  position:absolute;
  bottom:20px;
  left:20px;
  margin: auto;
  z-index:200;

  background-color: rgba(0,0,0,0.8);
  text-align: center;
  color:#FFFFFF;
  border-radius: 4px;
  cursor:pointer;

}


.vendor-company-info{
  background-color: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
  padding:10px;
  position:absolute;

  width:50%;
  border-radius: 10px;

  bottom:20px;
  left:0;
  right:40%;
  margin: auto;
  z-index:200;
}

.vendor-company-1{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.vendor-company-1-close{
  padding: 2px 10px;
  background-color: #ececec;
  text-align: center;
  color:#808080;
  border-radius: 4px;
  cursor:pointer;
}

.vendor-company-2{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:10px 0;
}
.vendor-company-2-l{
  width:30%;
}

.vendor-company-2-r{
  width:68%;
}

.vendor-company-logo{
  width:100%;
  border-radius: 50%;
  border: 1px solid #eaeaea;
}
.vendor-company-2-name{
  color:#808080;
  font-weight: bold;
  font-size: 14px;
}
.vendor-company-2-title{
  color: #B1C452;
  font-size: 12px;
}
.vendor-company-2-event-name{
  font-weight: bold;
  font-size: 14px;
}

.vendor-company-3{
  font-size: 12px;
  color:#808080;
  text-align: center;
}
.event-r-title{

  padding: 20px 0 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.event-r-title-underline{
  margin-top:4px;
  height: 3px;
  background-color:#B1C452;
  width:100%;
}

.event-r-desc{
  font-size: 12px;
  padding:0 10px;
  margin-top: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
.event-r-tags{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.event-r-desc-tag{
  padding-bottom: 20px;
  border-bottom:1px solid #ececec;
}
.event-r-tag{
  background-color: #ececec;
  color:#808080;
  margin: 10px;
  font-size: 12px;
  border-radius:4px;
  padding:4px 8px;
}

.event-r-category{
  font-size: 12px;
  padding: 4px 0 0 10px;

}
.event-r-location{
  font-size: 12px;
  padding: 4px 0 0 10px;
}
.event-r-date{
  font-size: 12px;
  padding: 4px 0 0 10px;

}

.event-r-time{
  font-size: 12px;
  padding: 4px 0 0 10px;

}

.event-r-btn{
  position: absolute;
  left:-50px;
  bottom:10px;

}

.event-r-btn-btn{
  background-color: #B1C452;
  padding:0 100px;
  color:#ffffff;
  font-weight: bold;
}

.events-pagination{
  text-align: center;
  padding:40px;
}

</style>
