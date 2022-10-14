<template>
<div class="container">
  <div class="filter-bg-container">
<!--    <div class="offer-deal">-->
<!--      <el-button class="offer-deal-btn" type="primary" @click="offerDeal()" round>-->
<!--        Offer a Deal-->
<!--      </el-button>-->
<!--    </div>-->
    <el-scrollbar class="filter-bg">
      <div class="filter-container">

        <div class="filter-item">
          <div class="filter-label">Location</div>
          <el-select class="filter-select"
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
          <div class="filter-label">Deal type</div>

          <div class="filter-checkbox-container">

            <el-checkbox-group v-model="checkedCateData"  :max="1">

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

    <div class="filter-contact-us-container">
      <el-icon :size="45" color="#6648FF" @click="contactUs()">
        <IconIcBaselineLiveHelp/>
      </el-icon>
      <span @click="contactUs()">Contact Us</span>
    </div>

  </div>



</div>
</template>

<script>
import {encode} from "js-base64";

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
      checkedCateData:[]

    }
  },
  methods:{
    contactUs(){
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

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
        params.company_category_id  = sCate[0]
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

.filter-bg{
  height: calc(100% - 80px);
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
  background-color: #F0F2F5;

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

/deep/ .el-select{
  display: block;
}


</style>