<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="deals-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <div class="deals-list-container">

            <div class="deals-list-t">
              <div class="deals-list-label">My Events</div>
              <div class="deals-list-t-r">
                <el-select v-model="categoryId"
                           clearable
                           @change="getMyEvents(eventPage,eventLimit)"
                           class="m-2" placeholder="Select" size="large">
                  <el-option
                      v-for="item in categoryOptions"
                      :key="item.id"
                      :label="item.name_en"
                      :value="item.id"
                  />
                </el-select>
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
                  <!--                  <el-tag class="events-item-l-tag"-->
                  <!--                          :hit="true"-->
                  <!--                          effect="dark"-->
                  <!--                          color="#00b3d2"-->
                  <!--                  >FEATURED</el-tag>-->

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
                          <template v-if="item.company_category_name">
                            {{ item.company_category_name }}
                          </template>
                        </el-tag>
                      </div>
                    </div>

                    <div class="vendor-company-2">

                      <div class="vendor-company-2-l">

                        <el-avatar class="vendor-company-logo"
                                  :src="item.third_company_logo ? item.third_company_logo : item.company_logo "
                        ></el-avatar>
                      </div>
                      <div class="vendor-company-2-r">
                        <div class="vendor-company-2-name">
                          <template v-if="item.company_name">
                            {{ item.company_name }}
                          </template>
                        </div>
<!--                        <div class="vendor-company-2-title">-->
<!--                          <template v-if="item.identity == 3 && item.user_info">-->
<!--                            {{ item.user_info.job_title }}-->
<!--                          </template>-->
<!--                          <template v-if="item.identity == 2 && item.business_info">-->
<!--                            {{ item.business_info.job_title }}-->
<!--                          </template>-->
<!--                        </div>-->
                        <div class="vendor-company-2-event-name">
                          {{ item.name }}
                        </div>
                      </div>
                    </div>

                    <div class="vendor-company-3">
                      <template v-if="item.is_online == 2 || item.is_online == 3">
                        {{ item.location }}
                      </template>

                    </div>

                  </div>

                  <div class="events-item-r">

                    <h3 class="event-r-title" v-if="item.name">{{ item.name }}</h3>
                    <div class="event-r-title-underline"></div>
                    <div class="event-r-desc-tag">
                      <p class="event-r-desc" v-if="item.desc">
                        {{ item.desc }}
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
                      <template v-if="item.company_category_name">
                        Category: {{ item.company_category_name }}
                      </template>
                    </div>
                    <div class="event-r-location">
                      <template v-if="item.is_online == 2 || item.is_online == 3">
                        Location: {{ item.location }}
                      </template>
                    </div>
                    <div class="event-r-date">
                      Date: {{ $filters.ymdFormatEvent(item.date) }}
                    </div>
                    <div class="event-r-time">
                      Time: {{ $filters.timeFormatEvent(item.start_time, item.end_time) }}
                    </div>
                    <div class="event-r-btn">
                      <el-button class="event-r-btn-btn" type="default" round
                                 @click="turnDetail(item.id)"
                      >RSVP
                      </el-button>
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
  </div>
</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {EVENTS_MY_EVENT, EVENTS_CATEGORY} from '@/api/api';

export default {
  name: "events",
  components: {
    meSideMenu
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
      categoryOptions: []
    }
  },
  mounted() {
    this.getEventCategories()
    this.getMyEvents(this.eventPage, this.eventLimit)
  },
  methods: {
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
    turnDetail(id){
      this.$router.push({path:'/events/detail',query:{id:id}})
    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.profile-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.deals-r-container {
  padding: 0 20px;
}

.deals-list-container {
  padding: 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
}

.deals-list-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #EEEEEE;
}

.deals-list-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.events-list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}

.events-item {
  width: 48%;
  border-radius: 10px;

  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;

}

.events-item-l {
  width: 100%;
  position: relative;
}

.events-item-r {
  position: absolute;
  width: 38%;
  padding-right: 2%;
  background-color: #FFFFFF;
  height: 100%;
  right: 0;
  top: 0;
  border-radius: 20px;
  border: 1px solid #ececec;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.1);
}

.events-item-banner {
  width: 60%;
  min-height: 400px;
  max-height: 400px;
  border: 1px solid #ffffff;
  border-radius: 20px;
  z-index: 100;
  background-color: #ececec;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}

.events-item-l-tag {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 110;
}


.vendor-company-1-open {
  width: 40px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: auto;
  z-index: 200;

  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  color: #FFFFFF;
  border-radius: 4px;
  cursor: pointer;

}


.vendor-company-info {
  background-color: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  padding: 10px;
  position: absolute;

  width: 50%;
  border-radius: 10px;

  bottom: 20px;
  left: 0;
  right: 40%;
  margin: auto;
  z-index: 200;
}

.vendor-company-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.vendor-company-1-close {
  padding: 2px 10px;
  background-color: #ececec;
  text-align: center;
  color: #808080;
  border-radius: 4px;
  cursor: pointer;
}

.vendor-company-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.vendor-company-2-l {
  width: 30%;
}

.vendor-company-2-r {
  width: 68%;
}

.vendor-company-logo {
  width: 50px;
  height:50px;
  border-radius: 50%;
  border: 1px solid #eaeaea;
}

.vendor-company-2-name {
  color: #808080;
  font-weight: bold;
  font-size: 14px;
}

.vendor-company-2-title {
  color: #B1C452;
  font-size: 12px;
}

.vendor-company-2-event-name {
  font-weight: bold;
  font-size: 14px;
}

.vendor-company-3 {
  font-size: 12px;
  color: #808080;
  text-align: center;
}

.event-r-title {
  padding: 20px 0 10px 20px;
}

.event-r-title-underline {
  height: 3px;
  background-color: #B1C452;
  width: 100%;
}

.event-r-desc {
  font-size: 12px;
  padding: 0 10px;
  margin-top: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

.event-r-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.event-r-desc-tag {
  padding-bottom: 20px;
  border-bottom: 1px solid #ececec;
}

.event-r-tag {
  background-color: #ececec;
  color: #808080;
  margin: 10px;
  font-size: 12px;
  border-radius: 4px;
  padding: 4px 8px;
}

.event-r-category {
  font-size: 12px;
  padding: 4px 0 0 10px;

}

.event-r-location {
  font-size: 12px;
  padding: 4px 0 0 10px;
}

.event-r-date {
  font-size: 12px;
  padding: 4px 0 0 10px;

}

.event-r-time {
  font-size: 12px;
  padding: 4px 0 0 10px;

}

.event-r-btn {
  position: absolute;
  left: -50px;
  bottom: 10px;

}

.event-r-btn-btn {
  background-color: #B1C452;
  padding: 0 80px;
  color: #ffffff;
  font-weight: bold;
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
</style>