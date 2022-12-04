<template>
  <div class="bg">
    <div class="favorites-container">
      <div class="favorites-l">
        <meSideMenu></meSideMenu>
      </div>

      <el-scrollbar class="favorites-r">

        <div class="favorites-r-bg">

          <div class="favorites-label-container">

            <el-dropdown v-if="identity == 1">
              <span class="favorites-label">
                <template v-if="type == 1">Favorited jobs</template>
                <template v-if="type == 2">Favorited deals</template>
                <template v-if="type == 4">Favorited profiles</template>

                <el-icon class="el-icon--right">
                   <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="changeType(1)">
                    <span class="favorites-label-span">Favorited jobs</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="changeType(2)">
                    <span class="favorites-label-span">Favorited deals</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="changeType(4)">
                    <span class="favorites-label-span">Favorited profiles</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown v-if="identity == 2 || identity == 3 || identity == 4 || identity == 5">
              <span class="favorites-label">
                <template v-if="type == 1">Favorited jobs</template>
                <template v-if="type == 2">Favorited deals</template>
                <template v-if="type == 4">Favorited profiles</template>
                <el-icon class="el-icon--right">
                   <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="changeType(4)">
                    <span class="favorites-label-span">Favorited profiles</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="changeType(1)">
                    <span class="favorites-label-span">Favorited jobs</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click="changeType(2)">
                    <span class="favorites-label-span">Favorited deals</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>


          </div>

          <div class="list-container" v-if="type == 4 || type == 5 || type == 6 || type == 7 || type == 8">

            <template v-if="favoriteData.length>0">

              <div class="list-item-bg" v-for="(item,i) in favoriteData" :key="i">

                <div class="list-item" >
                  <div class="list-item-l">
                    <el-avatar class="list-item-l-img" :src="item.company_info.user_contact.headimgurl"></el-avatar>
                  </div>
                  <div class="list-item-r">
                    <div class="list-item-r-t" v-if="item.type==4">
                      <div class="list-item-r-t-name" @click="viewEducatorDetail(item.company_info)">
                        {{item.company_info.user_contact.educator_contact.name}}
                      </div>
                    </div>
                  </div>

                  <div class="list-item-favorite-icon-container"
                       @click="cancelFavorite(item.type,item.type_id)">
                    <el-icon color="#6650B3" :size="25">
                      <IconFontistoFavorite />
                    </el-icon>
                  </div>

                </div>

              </div>

            </template>

            <template v-else>
              <div class="empty-tips">
                You have no favorites yet. <br>
                Click on the
                <el-icon >
                  <CollectionTag />
                </el-icon>
                on any job, event or deal to favorite it.
              </div>
            </template>
          </div>

          <div class="list-container" v-if="type == 2">

            <template v-if="favoriteData.length>0">

              <div class="list-item-bg" v-for="(item,i) in favoriteData" :key="i">

                <div class="list-item" >
                  <div class="list-item-l">
                    <el-avatar class="list-item-l-img" :src="item.deal_info.company_logo"></el-avatar>
                  </div>
                  <div class="list-item-r">
                    <div class="list-item-r-t">
                      <div class="list-item-r-t-name" @click="turnDealDetail(item.type_id)">
                        {{item.deal_info.title }}
                      </div>
                    </div>
                  </div>

                  <div class="list-item-favorite-icon-container"
                       @click="cancelFavorite(item.type,item.type_id)">
                    <el-icon color="#6650B3" :size="25">
                      <IconFontistoFavorite />
                    </el-icon>
                  </div>

                </div>

              </div>

            </template>

            <template v-else>
              <div class="empty-tips">
                You have no favorites yet. <br>
                Click on the
                <el-icon >
                  <CollectionTag />
                </el-icon>
                on any job, event or deal to favorite it.
              </div>
            </template>
          </div>


          <div class="list-container" v-if="type == 1">

            <div class="da-item-container">
              <el-row :gutter="0" >
                <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">Company</el-col>
                <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">Position</el-col>
                <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">Status</el-col>
                <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">Action</el-col>
              </el-row>

              <div class="da-item-container-height">

                <div v-for="(item,i) in favoriteData" :key="i">
                  <el-row class="da-item">

                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                      <div class="da-item-basic">
                        <div class="da-item-basic-l-a">
                          <el-avatar class="da-item-avatar-img"
                                     :src="item.job_info.company_logo">
                          </el-avatar>
                        </div>
                        <div class="da-item-basic-r">
                          <div class="da-item-name">{{ item.job_info.company_name }}</div>
                          <div class="da-item-n">
                            <el-button link @click="turnBusinessProfile(item.job_info)">
                              Click to view profile
                            </el-button>
                          </div>
                        </div>

                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">

                      <div class="da-item-a-job-title">{{ item.job_info.job_title }}</div>
                      <div class="da-item-a-job-other">
                        {{ item.job_info.currency }} {{ item.job_info.salary_min }} - {{ item.job_info.salary_max }}
                        <span v-if="item.job_info.payment_period == 112">hourly</span>
                        <span v-if="item.job_info.payment_period == 113">daily</span>
                        <span v-if="item.job_info.payment_period == 114">weekly</span>
                        <span v-if="item.job_info.payment_period == 115">monthly</span>
                        <span v-if="item.job_info.payment_period == 116">annually</span>
                      </div>
                      <div class="da-item-a-job-other">{{item.job_info.job_location}}</div>
                      <div class="da-item-a-job-other">
                        <span v-if="item.employment_type==1">Full time</span>
                        <span v-if="item.employment_type==2">Part time</span>
                        <span v-if="item.employment_type==3">Seasonal</span>
                      </div>
                    </el-col>

                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">

                      <el-tag type="info" round  effect="plain"
                              v-if="item.job_info.is_open == 1">
                        Open
                      </el-tag>
                      <el-tag type="warning" round effect="plain"
                              v-else>
                        Position closed
                      </el-tag>

                    </el-col>

                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">

                      <div class="dashboard-view-application">

                        <applyJobButton
                                        :selectJobId = "item.job_info.id"
                                        btn-text="Apply"
                                        :job-info="item.job_info">
                        </applyJobButton>

                      </div>
                    </el-col>

                  </el-row>

                </div>

              </div>

            </div>



          </div>


          <div class="list-pagination-container" v-if="favoriteData.length>0">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           class="list-pagination"
                           @size-change="pageSizeChange"
                           @current-change="pageChange"
                           :current-page="page" :page-size="limit"
                           :total="totalNum">
            </el-pagination>
          </div>

        </div>
      </el-scrollbar>

    </div>
  </div>
</template>

<script>
import {GET_FAVORITE_LIST, CANCEL_FAVORITE, ADS_LIST, APPLY_JOBS} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu";
import {encode} from 'js-base64'
import applyJobButton from '@/components/jobs/applyButton';
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "favorites",
  components: {
    meSideMenu,
    applyJobButton
  },
  data() {
    return {
      dashboardAdsImg,
      favoriteData: [],
      page: 1,
      limit: 8,
      totalNum: 0,
      adsDataTop: [],
      type:0,
      identity:0,
      applyBtnLoading:false,
      applyJobId:0
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

    let identity = localStorage.getItem('identity')
    this.identity = identity;
    // 1.jobs 2.deals 3.Event 4.educator 5.recruitor 6.school 7.other 8.vendor

    if(identity == 1){
      this.type = 1
    }

    if(identity == 2){
      this.type = 4
    }
    if( identity == 3){
      this.type = 4
    }
    if(identity == 4){
      this.type = 4
    }
    if(identity == 5){
      this.type = 4
    }

    this.getFavoriteList(this.type, this.page, this.limit)
    // this.getAdsList()
  },
  methods: {
    turnDealDetail(id){
      let obj = {id:id}
      let { href } = this.$router.resolve({
        path: '/deals/detail', query: obj
      })
      window.open(href,'_blank')

    },
    applyJob(id) {
      this.applyBtnLoading = true;
      this.applyJobId = id;

      let identity = localStorage.getItem('identity')
      let token = localStorage.getItem('token')
      if (identity == 1) {
        let params = {
          job_id: id,
          token: token
        }
        APPLY_JOBS(params).then(res => {
          if (res.code == 200) {
            this.$message.success('Apply Success')
            this.applyBtnLoading = false;
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error(err.msg)
          this.applyBtnLoading = false;

        })

      } else {
        this.$message.warning('Please switch to an educator profile to be able to apply')
        this.applyBtnLoading = false;
      }


    },
    turnBusinessProfile(info){

      let obj = {
        jobId:info.id,
        uid:info.user_id,
        i:info.identity,
        cid:info.company_id
      }
      let { href } = this.$router.resolve({
        path: '/jobs/business/profile', query: obj
      })
      window.open(href,'_blank')

      // this.$router.push({path:'/jobs/business/profile',query:obj})

    },
    viewEducatorDetail(info) {
      console.log(info)
      let companyId = info.user_contact.company_id;
      let userId = info.user_contact.id;

      let obj = {
        cid: companyId,
        uid: userId,
        identity: 1,
        from:'other'
      }

      let str = encode(JSON.stringify(obj))
      let { href } = this.$router.resolve({
        path: '/educator/profile', query: {str: str}
      })
      window.open(href,'_blank')
      // this.$router.push({path: '/educator/profile', query: {str: str}})

    },
    changeType(type){
      this.type = type;
      this.favoriteData = [];
      this.page = 1
      this.limit = 8
      this.getFavoriteList(type, this.page, this.limit)
    },
    turnBanner(link) {
      console.log(link)
      if (link != '') {
        window.location.href = link
      } else {
        let token = localStorage.getItem('token')
        if (!token) {
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList() {
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res => {
        if (res.code == 200) {
          // console.log(rs.message)
          let adsDataTop = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            adsDataTop = res.message.filter(item => item.name == 'guest_h1');
          }
          if (identity == 1) {

            adsDataTop = res.message.filter(item => item.name == 'educator_h1');
          }
          if (identity == 2) {
            adsDataTop = res.message.filter(item => item.name == 'business_h1');
          }
          if (identity == 3) {
            adsDataTop = res.message.filter(item => item.name == 'vendor_h1');
          }

          if (adsDataTop.length > 0) {
            this.adsDataTop = adsDataTop[0].data;
          }

        }

      }).catch(err => {
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    getFavoriteList(type, page, limit) {
      let params = {
        page: page,
        limit: limit
      }
      if(type){
        params.type = type
      }

      GET_FAVORITE_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          this.favoriteData = res.message.data
          // console.log(res.message.data)
          this.totalNum = res.message.total
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })

    },
    pageSizeChange(e) {
      console.log(e)
    },
    pageChange(e) {
      this.page = e
      this.getFavoriteList(this.type, e, this.limit)
      console.log(e)
    },
    cancelFavorite(type, typeId) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getFavoriteList()
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}

.favorites-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.favorites-l{

}

.favorites-r{
  width: calc(100% - 260px);
  height: calc(100vh - 240px);
  padding: 50px;
  /*margin: 50px;*/
}

.favorites-r-bg{
  padding: 50px;
  /*margin: 50px;*/
  background-color: #FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
}
.favorites-label-container{

}
.favorites-label{
  font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
  cursor: pointer;
}

.favorites-label-span{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 22px;
  color: #262626;
  cursor: pointer;
}

.list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.list-item-bg{
  width: 25%;
  margin-top: 25px;
}


.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: relative;

  margin-right: 50px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 23px #14363833;
  border-radius: 18px;
  padding: 25px;
}

.list-item:hover {
  background-color: #EEEEEE;
}

.list-item-l {
  width:70px;
  text-align: center;
}

.list-item-l-img {
  width: 70px;
  height: 70px;
  border-radius: 70px;
  border: 1px solid #EEEEEE;
}

.list-item-r {
  width: calc(100% - 85px);

}

.list-item-r-t {
  text-align: left;
}

.list-item-r-t-name {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  cursor: pointer;
  color: #262626;
}

.list-item-r-t-name:hover{
  text-decoration: underline;
}


.list-item-type {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  background-color: #9173ff;
  color: #FFFFFF;
  padding: 4px 10px;
  border-radius: 4px;
}

.list-item-favorite-icon-container {
  position: absolute;
  top: 0;
  right: 20px;

}

.list-item-favorite-icon {
  font-size: 24px;
  cursor: pointer;

}

.list-pagination-container {
  margin-top: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-pagination {
  margin: 0 auto;
}

.ads-container {
  margin-top: 20px;
  text-align: center;
}

.empty-tips {
  font-size: 24px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  text-align: center;
  margin: 50px auto;
}


.xll-ads-container {
  padding: 20px 20px 0 20px;
}

.xll-ads-container-margin {
  margin-top: 20px;
  margin-bottom: 20px;
}

.xll-ads-swiper-item {
  cursor: pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-ads-l {
  width: 60%;
  height: 100%;
}

.xll-ads-l-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.xll-ads-r {
  width: 36%;
}

.xll-ads-r {
  padding-right: 4%;
}

.xll-ads-r h4 {
  color: #004956;
}

.xll-ads-r h5 {
  margin-top: 20px;
}

.xll-ads-r-desc {
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}



.da-item-container {
  width: 100%;
  margin-top: 20px;
  padding: 20px;
}

.da-item-container-height {
  /*height: 837px;*/
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto
}

.da-item-container-height::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.da-item-container-height {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

.da-item-t-item {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;

}


.da-total-applicants span {
  margin-left: 4px;
}


.da-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  /*border-bottom: 2px solid #f0f2f5;*/
}


.da-item-basic {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
}

.da-item-basic-l {
  padding-left: 20px;
}

.da-item-basic-l-a {

}

.da-item-avatar-img {
  width: 70px;
  height: 70px;
  border-radius: 70px;
}


.da-item-basic-r {
  margin-left: 10px;
}

.da-item-name {
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.da-item-n {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
}

.da-item-n-1 {
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
  margin-right: 10px;
}

.da-item-a-job-title {
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.da-item-a-job-other{
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-view-application {
  flex: 1;
}


@media screen and (min-width: 1200px) {


}

@media screen and (max-width: 768px) {

  .favorites-r{
    width: 100%;
    height: calc( var(--i-window-height) - 160px);
    padding: 0;
  }

  .favorites-r-bg{
    padding: 0;
    background-color: #F0F2F5;
    box-shadow: none;
  }

  .favorites-label-container{
    margin: 15px;
  }
  .favorites-label{
    font-size: 20px;

  }

  .empty-tips{
    font-size: 12px;
  }
  .list-item-bg{
    width: 100%;
    margin-top: 0;
  }
  .list-item{
    margin:0 15px 15px  15px;
    padding: 15px;
    background-color: #FFFFFF;
  }

  .list-item-l-img{
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }

  .list-item-r-t-name{
    font-size: 18px;
  }

  .list-pagination-container{
    margin: 15px;
  }

  .da-item-container{
    margin-top: 0px;
    padding: 15px;
  }

  .da-item{
    padding: 15px;
    background-color: #FFFFFF;
    border-radius: 18px;
    margin-bottom: 15px;
  }

  .da-item-avatar-img{
    width: 40px;
    height: 40px;
  }

  .da-item-basic-r{
    margin-left: 4px;
  }

  .da-item-name{
    font-size: 18px;
  }

  .da-item-n{
    margin-top: 4px;
  }

  .da-item-a-job-title{
    font-size: 18px;
  }

  .da-item-a-job-other{
    font-size: 12px;
  }

  .dashboard-view-application{
    text-align: right;
  }

}


</style>
