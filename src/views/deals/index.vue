<template>
  <div class="bg" v-loading="showLoadingStatus">
    <div class="xll-container">
      <el-row align="middle" justify="center">
        <el-col class="sub-cate-container" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="sub-cate-item" v-for="(item,i) in subCateData" :key="i"
               :class="sCateId == item.id ? 'sub-cate-item-active' : ''"
          @click="selectSubCate(item.id)">
            <el-image class="sub-cate-icon" :src="item.icon_url"></el-image>
            <span>{{item.identity_name}}</span>
          </div>
        </el-col>
      </el-row>

      <el-row class="content-container" align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="deals-events-filter-container">
            <div class="deals-events-filter-label">Deals & Events</div>
            <div class="deals-events-filter-location">
              <el-select class="deals-events-filter-select" v-model="locationValue" clearable
                         placeholder="Location"
                         size="medium"
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
            <div class="deals-events-filter-tags">
              <el-select class="deals-events-filter-select" v-model="tagValue" clearable multiple placeholder="Tags"
                         size="medium"
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
          </div>
          <featuredJobs></featuredJobs>
          <featuredDeals></featuredDeals>
          <latestIndustryNews></latestIndustryNews>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="deals-container">
            <div class="deals-item" v-for="(item,index) in dealsListData"  :key="index">
              <div class="deals-item-bg"
                   :style="item.user_info.header_photo !='' ? 'background-image:url('+ item.user_info.header_photo + ')' : ''">
                <div class="deals-item-t">
                  <div class="deals-item-t-l">
                    <template v-if="item.user_info">
                      <el-image class="deals-logo" :src="item.user_info.logo"></el-image>
                    </template>
                  </div>
                  <div class="deals-item-t-r" v-if="item.is_favorite && item.is_favorite == 1"
                       @click="cancelFavorite(2,item.id)">
                    <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
                  </div>
                  <div class="deals-item-t-r" v-else @click="addFavorite(item.id,2,item.title,item.user_info.logo)">
                    <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                  </div>
                </div>
<!--                <div class="deals-item-tag-container">-->
<!--                  <div class="deals-item-tag">Deal</div>-->
<!--                </div>-->

                <div class="deals-item-name-container">
                  <div class="deals-item-title" @click="turnDealDetail(item.id)">
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
                  <template v-if="item.vendor_type_icon">
                    <el-image class="hot-deal-type-icon" :src="item.vendor_type_icon.icon_url"></el-image>
                  </template>
                </div>
                <div class="deals-item-b-r">
                  {{item.location}}
                </div>
              </div>

            </div>

          </div>
          <div class="deals-pagination">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           @size-change="dealPageSizeChange"
                           @current-change="dealPageChange"
                           :current-page="dealPage" :page-size="dealLimit"
                           :total="dealTotalNum"></el-pagination>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>

</template>

<script>
import featuredJobs from "@/components/featuredJobs";
import featuredDeals from "@/components/featuredDeals";
import latestIndustryNews from "@/components/latestIndustryNews";
import {SUB_CATE_LIST, TAGS_LIST, DEALS_LIST, DEALS_AREA_LIST,ADD_FAVORITE,CANCEL_FAVORITE} from "@/api/api";

export default {
  name: "index",
  components:{
    featuredJobs,
    featuredDeals,
    latestIndustryNews
  },
  data(){
    return {
      subCateData:[],
      locationValue: '',
      locationOptions: [],
      tagValue:[],
      tagsData:[],
      dealsListData:[],
      dealPage:1,
      dealLimit:10,
      dealTotalNum:0,
      sCateId:0,
      showLoadingStatus:true
    }
  },
  mounted() {
    this.getSubCateList(3)
    this.getTagsList()
    this.getDealsAreaList()
    this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
  },
  methods: {
    turnDealDetail(id){
      this.$router.push({path:'/deals/detail',query:{
          id:id
        }})
    },
    selectSubCate(cateId){
      // console.log(cateId)
      this.dealsListData = []
      this.showLoadingStatus=true

      if(this.sCateId == cateId){
        this.sCateId = 0
      }else{
        this.sCateId = cateId
      }
      this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)

    },
    locationChange(e){
      // console.log(e)
      this.dealsListData = []
      this.showLoadingStatus=true
      this.locationValue = e
      this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
    },
    tagChange(e){
      // console.log(e)
      this.dealsListData = []
      this.showLoadingStatus=true
      this.tagValue = e
      this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
    },
    getSubCateList(pid) {
      let params = {
        pid: pid,
        tree: 0
      }

      SUB_CATE_LIST(params).then(res=>{
        console.log(res)
        if(res.code  == 200){
          this.subCateData = res.message
        }
      })

    },
    getTagsList(){
      let params = {
        page:1,
        limit:1000
      }
      TAGS_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.tagsData = res.message.data;
        }
      })
    },
    getDealsList(page,limit,sCateId) {
      let params = {
        page: page,
        limit: limit
      }
      if(sCateId != 0){
        params.vendor_type_id = sCateId
      }
      if(this.locationValue != ''){
        params.city = this.locationValue
      }

      let tagValue = this.tagValue

      if(tagValue.length>0){
        params.tag_name = this.tagValue
      }

      DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data;
          this.dealTotalNum = res.message.total
          this.showLoadingStatus=false
        }
      }).catch(err => {
        console.log(err.response)
      })
    },
    getDealsAreaList(){
      DEALS_AREA_LIST({}).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.locationOptions = res.message
        }
      })
    },
    dealPageSizeChange(e){
      console.log(e)
    },
    dealPageChange(e){
      this.showLoadingStatus=true
      this.dealPage = e
      this.getDealsList(e, this.dealLimit,this.sCateId)
    },
    addFavorite(id, type, title, url) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
        }
      })

    },
    cancelFavorite(type,typeId){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      CANCEL_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
        }
      })
    }




  }
}
</script>

<style scoped>
.bg{
  background-color: #f5f6f7;
}
.xll-container{
  width: 1100px;
  margin: 0 auto;
}
.sub-cate-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:10px 40px;
  /*border-bottom: 1px solid #eeeeee;*/
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.sub-cate-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}
.sub-cate-item-active{
  border: 1px solid #0AA0A8;
  border-radius: 8px;
}
.sub-cate-icon{
  width: 80px;
  height: 80px;
}
.sub-cate-item span{
  font-size: 14px;
}
.content-container{
  padding: 20px;
}
.deals-events-filter-container{
  background-color: #ffffff;
  /*border: 1px solid #eeeeee;*/
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.deals-events-filter-label{
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.deals-events-filter-location{
  margin-top: 10px;
}
.deals-events-filter-select{
  width: 100%;
}

.deals-events-filter-tags{
  margin-top: 10px;
}

.deals-container{
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
  /*border: 1px solid #eeeeee;*/
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.deals-item-bg {
  background-color: #faf7f7;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.deals-item:hover {
  /*border: 1px solid #eeeeee;*/
  /*box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);*/
}

.deals-item-t {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 10px 40px 10px;
  background-color: rgba(0,0,0,0.3);
}

.deals-item-t-l {

}

.deals-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #FFFFFF;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
}

.deals-item-title:hover{
  text-decoration: underline;

}

.deals-item-name {
  color: #ffffff;
  font-size: 14px;
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
  width: 20%;
  text-align: left;
}

.hot-deal-type-icon{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.deals-item-b-r {
  width: 79%;
  font-size: 12px;
  color: #808080;
  padding-right: 20px;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.deals-pagination{
  margin-top: 20px;
}

</style>