<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="jobs-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="jobs-list-container">
            <div class="jobs-list-t">
              <div class="jobs-list-label">My Posted Jobs</div>
              <div class="jobs-list-t-r">
                <el-button type="default" round class="post-job-btn"  @click="postJob()">Post a Job</el-button>
              </div>
            </div>

            <div class="jobs-list-content">
              <div class="jobs-list-item" v-for="(item,index) in jobListData" :key="index">
                <div class="jobs-list-item-l">
                  <el-image class="jobs-item-logo" :src="item.logo" fit="contain"></el-image>
                </div>
                <div class="jobs-list-item-r">
                  <div class="jobs-list-item-title">
                    <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">{{ item.job_title }}</router-link>
                  </div>
                  <div class="jobs-list-item-name">
                    {{ item.business_name }}
                  </div>
                  <div class="jobs-list-item-address">
                    {{ item.address }}
                  </div>
                  <div class="jobs-list-item-desc">
                    {{ item.desc }}
                  </div>
                  <div class="jobs-list-item-readmore">
                    <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">Read More...</router-link>
                  </div>
                </div>

                <div class="jobs-list-item-b">
                  <div class="jobs-list-item-b-l">
                    <view class="jobs-list-item-work-type">
                      <i class="iconfont el-icon-alishijian"></i>
                      <template v-if="item.employment_type==1">FT</template>
                      <template v-if="item.employment_type==2">PT</template>
                      <template v-if="item.employment_type==3">S</template>
                    </view>
                    <view class="jobs-list-item-gender" v-if="item.sex == 1 || item.sex == 2">
                      <i class="iconfont el-icon-alimale-female"></i>
                      <template v-if="item.sex == 1">Male</template>
                      <template v-if="item.sex == 2">Female</template>
                    </view>
                    <view class="jobs-list-item-work-exp">
                      <i class="iconfont el-icon-aligongzuojingyan"></i>
                      1-2 yrs
                    </view>
                  </div>

                  <div class="jobs-list-item-b-r">
                    <view class="jobs-list-item-date">
                      <el-icon>
                        <Calendar/>
                      </el-icon>&nbsp;
                      {{ $filters.howLongFormat(item.c_time) }}
                    </view>
                    <view class="jobs-list-item-salary">
                      {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
                    </view>
                  </div>
                </div>

                <div class="list-item-tag actived-0" v-if="item.status==0">
                  Pending
                </div>
                <div class="list-item-tag actived-1" v-if="item.status==1">
                  Active
                </div>
                <div class="list-item-tag actived-2" v-if="item.status==2">
                 Rejected
                </div>

              </div>
            </div>
            <div class="jobs-list-pagination">
              <el-pagination layout="prev, pager, next" :default-current-page="1"
                             @size-change="jobPageSizeChange"
                             @current-change="jobPageChange"
                             :current-page="jobPage" :page-size="jobLimit"
                             :total="jobTotalNum"></el-pagination>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {randomString} from "../../../utils";
import meSideMenu from "@/components/meSideMenu";
import {VISITOR_USER_INFO,MY_JOBS} from '@/api/api';

export default {
  name: "jobs",
  components: {
    meSideMenu
  },
  data() {
    return {
      userInfo: {},
      basicUserInfo: {},
      jobListData:[],
      jobPage: 1,
      jobLimit: 5,
      jobTotalNum: 0,
      versionTime:randomString()
    }
  },
  mounted() {
    // this.getVisitorBasicInfo()
    this.getMyJobs(this.jobPage,this.jobLimit)
  },
  methods: {
    postJob(){
      this.$router.push({
        path:'/jobs/post',query:{version_time:this.versionTime}
      })
    },
    jobPageSizeChange(e) {
      console.log(e)
    },
    jobPageChange(e) {
      this.jobPage = e
      this.getMyJobs(e, this.jobLimit)
      console.log(e)
    },
    getMyJobs(page,limit){
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      MY_JOBS(params).then(res=>{
        console.log(res)
        if (res.code == 200) {
          this.jobListData = res.message.data
          // console.log(res.message.data)
          this.jobTotalNum = res.message.total
        } else {
          console.log(res.msg)
        }
      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    getVisitorBasicInfo() {
      let uid = localStorage.getItem('uid')
      let identity = localStorage.getItem('identity')
      let params = {
        id: uid,
        identity: identity
      }
      VISITOR_USER_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.basicUserInfo = res.message
          if (identity == 1 && res.message.educator_info) {
            this.userInfo = res.message.educator_info
          }
          if (identity == 2 && res.message.business_info) {
            this.userInfo = res.message.business_info
          }
          if (identity == 3 && res.message.vendor_info) {
            this.userInfo = res.message.vendor_info
          }

        }
      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
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
.jobs-r-container{
  padding: 0 20px;
}
.jobs-list-container {
  padding: 20px;
  border-radius:10px;
  background-color: #FFFFFF;
}

.jobs-list-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #EEEEEE;
}

.jobs-list-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.post-job-btn{
  background-color: #0AA0A8;
  color: #FFFFFF;
}
.jobs-list-content {
  margin-top: 10px;
}

.jobs-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  background-color: #ffffff;
  padding:10px 20px;
  border-radius: 10px;
  text-align: left;
  border: 1px solid #EEEEEE;
  position: relative;
  overflow:hidden;
}

.jobs-list-item-l {
  width: 30%;
  height: 180px;
}

.jobs-item-logo {
  width: 80%;
  height: 80%;
  border-radius: 10px;
}

.jobs-list-item-r {
  width: 70%;
}

.jobs-list-item-title a {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}

.jobs-list-item-name {
  font-size: 16px;
  color: #808080;
  margin-top: 20px;
}

.jobs-list-item-address {
  font-size: 14px;
  color: #808080;
  margin-top: 10px;
}

.jobs-list-item-desc {
  font-size: 12px;
  color: #808080;
  margin-top: 10px;
}
.jobs-list-item-readmore{
  margin-top: 20px;
}
.jobs-list-item-readmore a {
  font-size: 14px;
  color: #808080;
  text-decoration: none;
}

.jobs-list-item-b {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.jobs-list-item-work-type {
  font-size: 12px;
}

.jobs-list-item-gender {
  font-size: 12px;
  margin-left: 10px;
}

.jobs-list-item-work-exp {
  font-size: 12px;
  margin-left: 10px;
}

.jobs-list-item-date {
  font-size: 12px;
}

.jobs-list-item-salary {
  font-size: 12px;
  margin-left: 10px;
  color: #00b3d2;
}

.jobs-list-pagination {
  margin-top: 20px;
  text-align: center;
}

.list-item-tag {
  position: absolute;
  top: 8px;
  right: -60px;
  color: #FFFFFF;
  transform: rotate(30deg);
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 160px;
  padding-right: 80px;
  text-align: center;
  font-size:14px;
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