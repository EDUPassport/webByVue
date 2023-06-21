<template>
<div class="container">

  <div class="filter-bg-container">

    <el-scrollbar class="filter-bg">
      <div class="filter-container">

        <div class="filter-item">
          <div class="filter-label">Location</div>
          <el-select class="filter-select"
                     v-model="locationValue"
                     filterable
                     clearable
                     placeholder="Location"
                     size="default"
                     @change="locationChange"
          >
            <el-option
                v-for="item in locationData"
                :key="item.id"
                :label="item.Pinyin"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <div class="filter-item">
          <el-checkbox @change="selectIsOnline" v-model="filterIsOnlineValue" label="Online" />
        </div>

        <div class="filter-item">
          <div class="filter-label">Tags</div>
          <el-select class="filter-select"
                     v-model="tagValue"
                     clearable multiple
                     placeholder="Tags"
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

        <div class="filter-item">
          <div class="filter-label">Deal Category</div>

          <div class="filter-checkbox-container">

            <el-checkbox-group @change="dealCategoryChange" v-model="checkedCateData"  :max="1">

              <el-checkbox v-for="(item,i) in subCateData" :key="i"
                           :label="item.id"
              >
                {{item.identity_name}}
              </el-checkbox>

            </el-checkbox-group>

          </div>

        </div>

      </div>
      <div class="filter-search-btn-container">
        <el-button type="primary" round @click="search()">
          SEARCH
        </el-button>
      </div>

    </el-scrollbar>

    <div class="filter-xll-action-container">
      <div class="filter-xll-action" @click="turnFeedback()">
        <el-image style="width: 45px;height: 45px;" fit="cover" :src="thumbUpImg"></el-image>
        <span>Feedback</span>
      </div>
      <div class="filter-xll-action">
        <el-icon :size="45" color="#6648FF" @click="contactUs()">
          <IconIcBaselineLiveHelp/>
        </el-icon>
        <span @click="contactUs()">Contact Us</span>
      </div>
    </div>

  </div>
  
  <div class="filter-mobile-bg-container">
    <div class="filter-mobile-title">
      Search Deals
    </div>

    <div class="filter-mobile-1">
      <el-icon :size="25" @click="showMobileExpand()">
        <IconSystemUiconsFiltering />
      </el-icon>

      <el-select class="filter-select filter-mobile-1-input"
                 v-model="locationValue"
                 clearable
                 placeholder="Location"
                 size="default"
                 @change="locationChange"
      >
        <el-option
            v-for="item in locationData"
            :key="item.id"
            :label="item.Pinyin"
            :value="item.id"
        >
        </el-option>
      </el-select>

      <el-button type="primary" round  @click="search()">Search</el-button>

    </div>

    <div class="filter-mobile-2" v-if="showMobileExpandStatus">
      <div class="filter-mobile-tabs">

        <el-button link type="primary"
                   :class="filterType == 1 ? 'mobile-tab-active' : ''"
                   @click="chooseFilterType(1)">
          ONLINE
        </el-button>
        <el-button link type="primary"
                   :class="filterType == 2 ? 'mobile-tab-active' : ''"
                   @click="chooseFilterType(2)">
          TAGS
        </el-button>
        <el-button link type="primary"
                   :class="filterType == 3 ? 'mobile-tab-active' : ''"
                   @click="chooseFilterType(3)">
          DEAL CATEGORY
        </el-button>

      </div>

      <div class="filter-mobile-expand" >

        <div class="filter-mobile-expand-item" v-if="filterType == 1">
          <el-checkbox @change="selectIsOnline" v-model="filterIsOnlineValue" label="Online" />
        </div>

        <div class="filter-mobile-expand-tags" v-if="filterType == 2">

          <div class="filter-mobile-expand-tag"
               v-for="(item,i) in tagsData"
               :key="i"
               @click="selectedTag(item)"
               :class="tagValue.indexOf(item.id) == -1 ? '' : 'expand-tag-active'"
          >
            {{item.name_en}}
          </div>

        </div>

        <div class="filter-mobile-expand-tags" v-if="filterType == 3">

          <div class="filter-mobile-expand-tag"
               v-for="(item,i) in subCateData"
               :key="i"
               :class="checkedCateData.indexOf(item.id) == -1 ? '' : 'expand-tag-active'"
               @click="selectedSubCate(item)"
          >
            {{item.identity_name}}
          </div>

        </div>


      </div>

    </div>

  </div>


</div>
</template>

<script>
import {encode} from "js-base64";
import thumbUpImg from '@/assets/newHome/thumb-up.png'
import feedback2img from '@/assets/newHome/feedback2.png'

export default {
  name: "dealFilterComponent",
  props:['identity','locationData','tagsData','subCateData'],
  data(){
    return {
      locationValue:'',
      filterIsOnlineValue: false,
      onlineValue: -1,
      tagValue:[],
      sCateId:0,
      checkedCateData:[],
      thumbUpImg,
      feedback2img,
      showMobileExpandStatus:false,
      filterType:0
    }
  },
  methods:{
    contactUs(){
      window.open('https://forms.zohopublic.com/edupassport/form/ContactUs1/formperma/W3VqHmZCLc7oBTIm0cBDz43WsPoDWS0NrHdhGyqdadU', '_blank')

    },
    turnFeedback(){
      window.open('https://zfrmz.com/dPmO4eRCxYzpuSx0z6QA','_blank')
    },
    offerDeal() {
      let token = localStorage.getItem('token')
      let self = this
      if (!token || token == '') {
        return this.$msgbox({
          title: 'Offer a Deal',
          message: 'Before offer a deal, you need to log in',
          type: 'warning',
          confirmButtonText: 'Log in',
          callback(action) {
            console.log(action)
            if (action === 'confirm') {
              let redirectParamsObj = {
                path: '/deals',
                query: {
                  id: self.$route.query.id
                }
              }

              let redirectParamsStr = encode(JSON.stringify(redirectParamsObj))

              self.$router.push({path: '/edupassport', query: {redirect_params: redirectParamsStr}})
            }
          }
        })
      }

      let identity = localStorage.getItem('identity')

      if (identity != 5) {
        return this.$message.error('Oops! Your current identity is not an vendor, please switch to Vendor')
      }

      self.$router.push({path: '/deals/offer', query: {}})
    },
    locationChange(){
      this.search()
    },
    selectIsOnline(e){
      console.log(e)
      if(e){
        this.onlineValue = 1
      }else{
        this.onlineValue = 0
      }

      this.search()

    },
    tagChange(){
      this.search()
    },
    dealCategoryChange(){
      this.search()
    },
    selectSubCate(){

    },
    search(){

      let location = this.locationValue
      let online = this.onlineValue
      let sTags = this.tagValue
      let sCate = this.checkedCateData

      let params = {}

      if(location){
        params.city = location
      }

      if(online){
        params.is_online = online
      }

      if(sTags.length>0){
        params.tag_name = sTags
      }

      if(sCate.length > 0){
        params.company_category_id  = sCate[0]
      }

      this.$emit('search',params)

    },
    showMobileExpand(){
      this.showMobileExpandStatus = !this.showMobileExpandStatus;
      this.filterType = 0
    },
    chooseFilterType(value){
      this.filterType = value
    },
    selectedTag(item){
      let index = this.tagValue.indexOf(item.id)
      if(index == -1){
        this.tagValue.push(item.id)
      }else{
        this.tagValue.splice(index,1)
      }

      this.search()
    },
    selectedSubCate(item){
      let index = this.checkedCateData.indexOf(item.id)
      if(index == -1){
        this.checkedCateData.push(item.id)
      }else{
        this.checkedCateData.splice(index,1)
      }

      this.search()

    }

  }


}

</script>

<style scoped>

.container{

}

.filter-bg-container {
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px;
}

.filter-bg{
  height: calc(100% - 90px);
}

.offer-deal {
  width: 100%;
  text-align: center;
  padding-top: 20px;
}

.offer-deal-btn {
  width: 98%;
  font-size: 14px;
}

.filter-container {
  margin-top: 20px;
}

.filter-label {
  text-align: left;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
  margin-bottom: 10px;
}

.filter-select {
  width: 100%;
}

.filter-item {
  margin-top: 25px;
}

.filter-search-btn-container {
  margin-top: 50px;
  text-align: center;
}
.filter-xll-action-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90px;
}

.filter-xll-action{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  cursor: pointer;

}

.filter-xll-action span{
  font-family: BCRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

.filter-checkbox-container{
  display: flex;
  flex-direction: column;
}

:deep(.el-checkbox){
  width: 100%;
  font-size: 18px;
  font-family: AssiRegular,"Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

:deep(.el-select){
  display: block;
}

@media screen and (min-width: 769px) {
  .filter-mobile-bg-container{
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .filter-bg-container {
    display: none;
  }

  .filter-mobile-bg-container {
    padding: 15px;
    min-height: 70px;
    background-color: #F0F2F5;
  }

  .filter-mobile-title {
    font-size: 20px;
    font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    color: #262626;
  }

  .filter-mobile-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }

  .filter-mobile-1-input {
    margin: 0 15px;
  }

  .filter-mobile-2 {
    margin-top: 15px;
  }

  .filter-mobile-expand-location{
    margin-top: 15px;
  }

  .filter-mobile-expand-salary{
    margin-top: 15px;
  }

  .filter-mobile-expand-tags{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .filter-mobile-expand-tag{
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #262626;
    margin-right: 8px;
    margin-top: 8px;
    font-size: 12px;
    font-family: Assistant-SemiBold , Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

  }

  .expand-tag-active{
    background-color: #9173ff;
    color: #FFFFFF;
  }

  .mobile-tab-active{
    color: #9173ff;
  }
}

</style>