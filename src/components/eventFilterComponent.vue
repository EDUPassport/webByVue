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
                     placeholder="Filter by location"
                     size="default"
                     @change="locationChange"
          >
            <el-option
                v-for="item in locationData"
                :key="item.id"
                :label="item.name"
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
                     placeholder="Filter by tag"
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
          <div class="filter-label">Event type</div>

          <div class="filter-checkbox-container">

            <el-checkbox-group @change="eventTypeChange" v-model="checkedCateData"  :max="1">

              <el-checkbox v-for="(item,i) in categoryData" :key="i"
                           :label="item.id"
              >
                {{item.name_en}}
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
      Search Events
    </div>

    <div class="filter-mobile-1">
      <el-icon :size="25" @click="showMobileExpand()">
        <IconSystemUiconsFiltering />
      </el-icon>

      <el-select class="filter-select filter-mobile-1-input"
                 v-model="locationValue" clearable
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
          EVENT TYPE
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
               v-for="(item,i) in categoryData"
               :key="i"
               :class="checkedCateData.indexOf(item.id) == -1 ? '' : 'expand-tag-active'"
               @click="selectedCategory(item)"
          >
            {{item.name_en}}
          </div>

        </div>


      </div>

    </div>

  </div>


</div>
</template>

<script>
import thumbUpImg from '@/assets/newHome/thumb-up.png'
import feedback2img from '@/assets/newHome/feedback2.png'

export default {
  name: "eventFilterComponent",
  props:['identity','locationData','tagsData','categoryData'],
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
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

    },
    turnFeedback(){
      window.open('https://zfrmz.com/dPmO4eRCxYzpuSx0z6QA','_blank')
    },
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
    eventTypeChange(){
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

      if(online && online !== -1){
        params.is_online = online
      }

      if(sTags.length>0){
        params.tag_name = sTags
      }

      if(sCate.length > 0){
        params.category_id  = sCate[0]
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
    selectedCategory(item){
      // this.checkedCateData = [item.id]
      let index = this.checkedCateData.indexOf(item.id)
      if(index == -1){
        this.checkedCateData.splice(0,1,item.id)
      }else{
        this.checkedCateData.splice(0,1)
      }

      this.search()

    }

  }


}
</script>

<style scoped>

.container{
  padding-right: 12px;
}

.filter-bg-container {
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px;
}

.filter-bg{
  height: calc(100% - 90px);
}


.post-event-btn-container{
  width: 100%;
  text-align: center;
  padding-top: 20px;
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

/deep/ .el-checkbox{
  width: 100%;
  font-size: 18px;
  font-family: AssiRegular,"Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

@media screen and (min-width: 769px) {
  .filter-mobile-bg-container{
    display: none;
  }
}

@media screen and (max-width: 768px) {

  .container{
    padding-right: 0;
  }

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