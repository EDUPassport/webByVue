<template>
<div class="container">

  <div class="filter-bg-container">

    <div class="post-event-btn-container">
      <el-button type="primary" round @click="postEvent()">Post an Event</el-button>
    </div>
    <div class="filter-container">

      <div class="filter-item">
        <div class="filter-label">Location</div>
        <el-select class="filter-select"
                   v-model="locationValue" clearable
                   placeholder="Filter by location"
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

          <el-checkbox-group v-model="checkedCateData"  :max="1">

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

    <div class="filter-contact-us-container">
      <el-icon :size="45" color="#6648FF">
        <IconIcBaselineLiveHelp />
      </el-icon>
      <span>Contact Us</span>
    </div>

  </div>

</div>
</template>

<script>

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
      checkedCateData:[]

    }
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
    locationChange(){

    },
    selectIsOnline(e){
      console.log(e)
      if(e){
        this.onlineValue = 1
      }else{
        this.onlineValue = 0
      }

    },
    tagChange(){

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
        params.category_id  = sCate[0]
      }

      this.$emit('search',params)

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
  position: relative;
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

.filter-contact-us-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;

}

.filter-contact-us-container span {
  font-family: BCRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 25px;
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

</style>