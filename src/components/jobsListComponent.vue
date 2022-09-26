<template>
<el-scrollbar class="jobs-list-bg-container">
  <div class="back-btn-container" v-if="isOther">
    <el-button class="back-btn" link type="primary"
               @click="backToSearchResults()"
    >
      BACK TO SEARCH RESULTS
    </el-button>
  </div>
  <div class="jobs-list-container">
    <div class="jobs-list-label-container">
      <div class="jobs-list-label">All jobs <span v-if="isOther">at {{companyInfo.company_name}}</span></div>
    </div>

    <div class="jobs-list-content">
      <template  v-for="(item,index) in jobListData" :key="index">
        <div class="jobs-list-item "
             :class="item.id == selectedJobId ? 'jobs-list-item-active' : '' ">

          <div class="jobs-favorite" v-if="item.is_favorite && item.is_favorite == 1"
               @click="cancelFavorite(1,item.id,index)">
            <el-icon :size="30" color="#9173ff">
              <CollectionTag />
            </el-icon>
          </div>
          <div class="jobs-favorite" v-else
               @click="addFavorite(item.id,1,item.job_title,item.logo,index)">
            <el-icon :size="30">
              <CollectionTag />
            </el-icon>
          </div>
          <div class="jobs-list-item-l">
            <el-image class="jobs-item-logo"
                      :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
                      fit="contain">
              <template #error>
                <div class="image-slot">
                  <el-icon :size="60" color="#808080">
                    <Picture/>
                  </el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="jobs-list-item-r">
            <div class="jobs-list-item-name">
              {{ item.company_name }} {{selectedJobId}}
            </div>

            <div class="jobs-list-item-title" @click="turnJobDetail(item.id)">
              {{ item.job_title }}
            </div>
            <view class="jobs-list-item-salary">
              <!--    Hourly:112 Daily:113 Weekly:114 Monthly:115 Annually:116                -->
              {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
              <span v-if="item.payment_period == 112">hourly</span>
              <span v-if="item.payment_period == 113">daily</span>
              <span v-if="item.payment_period == 114">weekly</span>
              <span v-if="item.payment_period == 115">monthly</span>
              <span v-if="item.payment_period == 116">annually</span>
            </view>
            <div class="jobs-list-item-address">
              {{ item.address }}
            </div>

            <div class="jobs-list-item-b">
              <div class="jobs-list-item-b-l">
                <view class="jobs-list-item-work-type">
                  <i class="iconfont el-icon-alishijian"></i>
                  <span v-if="item.employment_type==1">FT</span>
                  <span v-if="item.employment_type==2">PT</span>
                  <span v-if="item.employment_type==3">S</span>
                </view>

              </div>

              <div class="jobs-list-item-b-r">
                <view class="jobs-list-item-date">
                  <el-icon>
                    <Calendar/>
                  </el-icon>&nbsp;
                  {{ $filters.howLongFormat(item.refresh_time) }}
                </view>

              </div>
            </div>
          </div>

        </div>

      </template>
    </div>
    <div class="jobs-list-pagination">
      <el-pagination layout="prev, pager, next"
                     :default-current-page="jobPage"
                     @size-change="jobPageSizeChange"
                     @current-change="jobPageChange"
                     :current-page="jobPage"
                     :page-size="jobLimit"
                     :total="jobTotalNum">
      </el-pagination>
    </div>

  </div>

</el-scrollbar>
</template>

<script>

export default {
  name: "jobsListComponent",
  props:['jobListData','jobPage','jobLimit','jobTotalNum','selectedJobId','isOther','companyInfo'],
  data(){
    return {

    }
  },
  methods:{
    jobPageSizeChange(){
      console.log('job page size')
      this.$emit('jobPageSize')
    },
    jobPageChange(e){
      console.log('job page')
      if(this.isOther){
        this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:e,from:1}})
      }else{
        this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:e}})
      }

      this.$emit('jobPageChange', e)
    },
    addFavorite(id, type, title, url, index) {
      this.$emit('addFavorite',id,type,title,url,index)
    },
    cancelFavorite(type, typeId, index) {
      this.$emit('cancelFavorite',type, typeId, index)
    },
    backToSearchResults(){
      this.$emit('backToResults')
    },
    turnJobDetail(id){
      this.$emit('jobDetailEvent',id,this.jobPage,this.isOther)
      // <router-link :to="{'path':'/jobs',query:{id:item.id,page:jobPage}}">
      // this.$router.push({path:'/jobs',query:{id:id,page:this.jobPage}})
    }

  }
}
</script>

<style scoped>
.back-btn-container{
  margin-top: 25px;
  padding-left: 25px;
}
.back-btn{
  font-size: 20px;
}
.jobs-list-bg-container {
  height: calc(100vh - 140px);
  background-color: #F0F2F5;
}

.jobs-list-container {

}

.jobs-list-label-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0 10px 25px;
}

.jobs-list-label {
  text-align: left;
  font-size: 45px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;

}

.jobs-list-content {
  margin-top: 10px;
}

.jobs-list-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;

  padding: 25px;

  text-align: left;
  border-bottom: 1px solid #262626;

}


.jobs-list-item-active{
  background-color: #FFFFFF;
  box-shadow: 0 0 12px #6650B329;
  border-bottom: none;
}

.jobs-favorite {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.xll-heart-icon {
  font-size: 24px;
}

.jobs-list-item-l {
  width: 60px;

}

.jobs-item-logo {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
}

.image-slot {
  padding: 40px;
  text-align: center;
}

.jobs-list-item-r {
  width: calc(100% - 80px);

}

.jobs-list-item-title {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
  text-decoration: none;
  cursor: pointer;
}

.jobs-list-item-title:hover {
  text-decoration: underline;
  font-size: 26px;
}

.jobs-list-item-name {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-item-address {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
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
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-item-work-type span {
  margin-left: 4px;
}

.jobs-list-item-gender {
  margin-left: 5px;
  font-size: 12px;
}

.jobs-list-item-gender span {
  margin-left: 4px;
}

.jobs-list-item-work-exp {
  margin-left: 5px;
  font-size: 12px;
}

.jobs-list-item-work-exp span {
  margin-left: 4px;
}

.jobs-list-item-date {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-item-salary {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-pagination {
  margin: 20px;
  display: flex;
  justify-content: center;
}

</style>