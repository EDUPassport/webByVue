<template>
    <div class="bg">
        <div class="favorites-container">
            <el-row align="top" justify="center">
                <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                    <meSideMenu></meSideMenu>
                </el-col>
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <div class="jobs-container">
                        <div class="jobs-label">Jobs</div>
                        <div class="jobs-list-content">
                            <div class="jobs-list-item" v-for="(item,index) in myJobsData" :key="index">
                                <div class="jobs-list-item-l">
                                    <el-image class="jobs-item-logo" :src="item.logo" fit="cover"></el-image>
                                </div>
                                <div class="jobs-list-item-r">
                                    <div class="jobs-list-item-title">
                                        <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">{{ item.job_title
                                            }}
                                        </router-link>
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
                                        Read More...
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

                            </div>
                        </div>

                    </div>
                    <div class="deals-container">
                        <div class="deals-label">Deals</div>
                        <div class="deals-content">
                            <div class="deals-item" v-for="(item,index) in myDealsData" :key="index">

                                <div class="deals-item-bg"
                                     :style="'background-image:url('+ item.user_info.profile_photo + ')'">
                                    <div class="deals-item-t">
                                        <div class="deals-item-t-l">
                                            <template v-if="item.user_info">
                                                <el-image class="deals-logo" :src="item.user_info.logo"></el-image>
                                            </template>
                                        </div>
                                        <div class="deals-item-t-r">
                                            <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                                        </div>
                                    </div>
                                    <div class="deals-item-tag-container">
                                        <div class="deals-item-tag">Deal</div>
                                    </div>

                                    <div class="deals-item-name-container">
                                        <div class="deals-item-title">
                                            {{ item.desc }}
                                        </div>
                                        <div class="deals-item-name">
                                            <template v-if="item.user_info">
                                                {{ item.user_info.vendor_name_en }}
                                            </template>
                                        </div>
                                    </div>

                                </div>

                                <div class="deals-item-b">
                                    <div class="deals-item-b-l">
                                        Category
                                    </div>
                                    <div class="deals-item-b-r">
                                        Los Angeles, USA
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>


                    <div class="ads-container">
                        <el-image></el-image>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {JOB_LIST, DEALS_LIST} from "@/api/api";

    import meSideMenu from "@/components/meSideMenu";

    export default {
        name: "favorites",
        components: {
            meSideMenu
        },
        data() {
            return {
                myJobsData: [],
                jobPage: 1,
                jobLimit: 2,
                jobTotalNum: 0,
                myDealsData: [],
                dealPage: 1,
                dealLimit: 4,
                dealTotalNum: 0
            }
        },
        mounted() {
            this.getMyJobsList(this.jobPage, this.jobLimit)
            this.getMyDealsList(this.dealPage, this.dealLimit)
        },
        methods: {
            getMyJobsList(page, limit) {
                let params = {
                    page: page,
                    limit: limit
                }
                JOB_LIST(params).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.myJobsData = res.message.data
                        // console.log(res.message.data)
                        this.jobTotalNum = res.message.total
                    } else {
                        console.log(res.msg)
                    }
                })

            },
            getMyDealsList(page, limit) {
                let params = {
                    page: page,
                    limit: limit
                }

                DEALS_LIST(params).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.myDealsData = res.message.data;
                        this.dealTotalNum = res.message.total
                    }
                }).catch(err => {
                    console.log(err.response)
                })
            }
        }
    }
</script>

<style scoped>
    .bg {
        background-color: #f5f6f7;
    }

    .favorites-container {
        width: 1100px;
        margin: 0 auto;
        padding: 20px 0;
    }


    .jobs-container {
        padding: 20px;
        text-align: left;
    }

    .jobs-label {
        font-size: 20px;
        font-weight: bold;
    }

    .jobs-content {
        padding: 20px;
        margin-top: 20px;
        background-color: #ffffff;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

    }
    .jobs-list-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 10px;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      text-align: left;
    }

    .jobs-list-item-l {
      width: 30%;
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

    .jobs-list-item-readmore {
      font-size: 14px;
      color: #808080;
      margin-top: 20px;
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
    }

    .jobs-list-item-work-exp {
      font-size: 12px;
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
    }

    .deals-container{
      padding: 20px;
      text-align: left;
    }

    .deals-label{
      font-size: 20px;
      font-weight: bold;
    }

    .deals-content{
      padding-left: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .deals-item {
      width: 48%;
      margin-top: 20px;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid #eeeeee;
      background-color: #ffffff;
    }

    .deals-item-bg {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }

    .deals-item:hover {
      border: 1px solid #eeeeee;
      box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);
    }

    .deals-item-t {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
    }

    .deals-item-t-l {

    }

    .deals-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .deals-item-t-r {
      color: #ffffff;

    }

    .xll-heart-icon {
      font-size: 30px !important;
    }

    .deals-item-tag-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 10px 20px;
    }

    .deals-item-tag {
      background-color: #0AA0A8;
      color: #ffffff;
      padding: 4px 14px;
      border-radius: 4px;

    }

    .deals-item-name-container {
      padding: 10px 20px;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .deals-item-title {
      color: #ffffff;
      font-size: 16px;
      text-align: left;
    }

    .deals-item-name {
      color: #ffffff;
      font-size: 16px;
      text-align: left;
    }

    .deals-item-b {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
    }

    .deals-item-b-l {
      color: #000000;
    }

    .deals-item-b-r {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .deals-pagination{
      margin-top: 20px;
    }


    .ads-container {
        margin-top: 20px;
    }

</style>
