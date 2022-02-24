<template>
  <div class="bg">
    <el-row align="top" justify="center">
      <el-col class="result-banner" :xs="24" :sm="24" :md="24" :lg="24" :xl="24"></el-col>
    </el-row>
    <el-row align="top" justify="center">
      <div class="result-container">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="result-label">
            Showing Search Results for "{{ keyword }}"
          </div>
          <!--          5 results found-->
          <div class="result-tips">

          </div>
          <div class="result-content-container" v-loading="searchLoadingStatus">
            <div class="content-l" >
              <div class="content-l-content" v-if="jobsData.length>0 || dealsData.length>0">
                <div v-if="jobsData.length>0">
                  <div class="content-item" v-for="(item,index) in jobsData" :key="index">
                    <div class="content-item-title">
                      <router-link target="_blank" :to="{'path':'/jobs/detail',query:{id:item.id}}">{{
                          item.job_title
                        }}
                      </router-link>
                      <span>Job</span></div>
                    <div class="content-item-desc">
                      {{ item.desc }}
                    </div>
                  </div>
                </div>
                <div v-if="dealsData.length>0">
                  <div class="content-item" v-for="(item,index) in dealsData" :key="index">
                    <div class="content-item-title">
                      <router-link target="_blank" :to="{'path':'/deals/detail',query:{id:item.id}}">{{
                          item.title
                        }}
                      </router-link>
                      <span>Deal</span></div>
                    <div class="content-item-desc">
                      {{ item.desc }}
                    </div>
                  </div>
                </div>
                <!--              <div>-->
                <!--                <div class="content-item" v-for="(item,index) in businessData" :key="index">-->
                <!--                  <div class="content-item-title">{{ item.business_name }} <span>Tag: Business</span></div>-->
                <!--                  <div class="content-item-desc">-->
                <!--                    {{ item.business_bio }}-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--              </div>-->
                <!--              <div>-->
                <!--                <div class="content-item" v-for="(item,index) in vendorData" :key="index">-->
                <!--                  <div class="content-item-title">{{ item.vendor_name_en }} <span>Tag: Vendor</span></div>-->
                <!--                  <div class="content-item-desc">-->
                <!--                    {{ item.vendor_bio }}-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--              </div>-->

                <!--              <div>-->
                <!--                <div class="content-item" v-for="(item,index) in eventsData" :key="index">-->
                <!--                  <div class="content-item-title">{{ item.name }} <span>Tag: Event</span></div>-->
                <!--                  <div class="content-item-desc">-->
                <!--                    {{ item.desc }}-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--              </div>-->
              </div>

              <div v-else class="empty-result-container" >
                No search results
              </div>

              <div class="pagination-container" v-show="showPaginationStatus">
                <el-button class="prev-container" type="primary"
                           :disabled="!showPrevPaginationStatus"
                           round
                           @click="showPrevPage()">Prev</el-button>
                <el-button class="next-container" type="primary"
                           :disabled="!showNextPaginationStatus"
                           round
                           @click="showNextPage()">Next</el-button>
              </div>

            </div>

            <div class="content-r">
              <div class="content-r-container">
                <div class="content-r-label">Search Site</div>
                <div class="content-r-input">
                  <el-input v-model="searchSiteValue" placeholder="Type Search here"
                            @change="siteSearch()"
                  ></el-input>
                </div>
                <div class="content-r-tips">
                  Search through thousands of jobs, Events and Deals. For better
                  results,search for keywords that are as unique your desired results
                  as possible.
                </div>
                <div class="content-r-tags">
                  <div class="content-r-tags-label">Tags</div>
                  <div class="content-r-tags-content">
                    <div class="content-r-tags-item" v-for="(item,index) in tagsData" :key="index"
                         @click="search(item.name_en)">
                      {{ item.name_en }}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!--          <div class="search-other-container">-->
          <!--            <div class="search-other-label">Find what you were looking for?</div>-->
          <!--            <div class="search-other-btn-container">-->
          <!--              <el-button class="search-other-btn" type="primary">Try ANOTHER SEARCH</el-button>-->
          <!--            </div>-->
          <!--          </div>-->
        </el-col>
      </div>

    </el-row>
  </div>
</template>

<script>
import {ES_SEARCH, TAG_LIST} from "../../api/api";

export default {
  name: "result",
  data() {
    return {
      searchLoadingStatus: true,
      searchSiteValue: '',
      tagsList: [],
      tagsData: [],

      keyword: '',
      page: 1,
      limit: 10,
      totalNum: 0,

      businessData: [],
      vendorData: [],
      dealsData: [],
      eventsData: [],
      jobsData: [],

      showPaginationStatus: false,
      showNextPaginationStatus:true,
      showPrevPaginationStatus:true,
    }
  },
  mounted() {
    let kw = this.$route.query.keyword
    if (kw && kw != '') {
      this.keyword = kw
      this.getEsSearch(this.page, this.limit, kw)
    } else {
      this.searchLoadingStatus = false
    }
    this.getTagsList()
  },
  methods: {
    getTagsList() {
      let params = {
        page: 1,
        limit: 10000
      }
      TAG_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tagsData = res.message.data;
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    search(keyword) {
      this.searchSiteValue = ''
      this.searchLoadingStatus = true
      this.keyword = keyword
      this.$router.push({path: '/search/result', query: {keyword: keyword}})
      this.getEsSearch(1, this.limit, keyword)
    },
    siteSearch() {
      this.searchLoadingStatus = true
      this.keyword = this.searchSiteValue
      this.$router.push({path: '/search/result', query: {keyword: this.keyword}})
      this.getEsSearch(1, this.limit, this.keyword)
    },
    getEsSearch(page, limit, kw) {
      let data = {
        page: page,
        limit: limit,
        kw: kw
      }

      ES_SEARCH(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          let businessData = res.message.business_list.data;
          let vendorData = res.message.vendor_list.data;
          let dealsData = res.message.deal_list.data;
          let jobsData = res.message.jobs_list.data;
          let eventsData = res.message.event_list.data;

          if (res.message.business_list) {
            this.businessData = businessData;
            this.businessLastPage = res.message.business_list.last_page;
          }

          if (res.message.vendor_list) {
            this.vendorData = vendorData;
            this.vendorLastPage = res.message.vendor_list.last_page;
          }

          if (res.message.deal_list) {
            this.dealsData = dealsData;
            this.dealsLastPage = res.message.deal_list.last_page;
          }

          if (res.message.event_list) {
            this.eventsData = eventsData;
            this.eventsLastPage = res.message.event_list.last_page;
          }

          if (res.message.jobs_list) {
            this.jobsData = jobsData;
            this.jobsLastPage = res.message.jobs_list.last_page;
          }
          let jobLen = jobsData.length
          let dealLen = dealsData.length
          if(page == 1){
            this.showPaginationStatus = jobLen + dealLen >= 10;
            this.showPrevPaginationStatus = false;
          }else{
            this.showPaginationStatus = true;
            this.showPrevPaginationStatus = true;
            this.showNextPaginationStatus = jobLen + dealLen > 0;
          }
          this.searchLoadingStatus = false
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    showPrevPage() {
      this.searchLoadingStatus = true
      this.page--
      if (this.page <= 0) {
        this.page = 1
      }
      this.getEsSearch(this.page, this.limit, this.keyword)
    },
    showNextPage() {
      this.searchLoadingStatus = true
      this.page++
      this.getEsSearch(this.page, this.limit, this.keyword)
    },
  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.result-banner {
  height: 120px;
  background-image: url("../../assets/bg/oriental-tiles.png");
  background-repeat: repeat;
  background-size: 20%;
  background-position: center;
}

.result-container {
  width: 1100px;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 20px;
}

.result-label {
  font-size: 24px;
  text-align: center;
  font-weight: bold;
}

.result-tips {
  text-align: center;
  font-size: 22px;
}

.result-content-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
}

.content-l {
  width: 70%;
}

.content-item {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #EEEEEE;
}

.content-item-title a {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}

.content-item-title a:hover {
  text-decoration: underline;
  font-size: 18px;
}

.content-item-title span {
  font-size: 12px;
  background-color: #00b3d2;
  color: #FFFFFF;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 10px;
}


.content-item-desc {
  font-size: 14px;
  margin-top: 10px;
  /*padding: 10px 0;*/
  color: #808080;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;

}

.content-r {
  width: 30%;
  padding: 20px;
}

.content-r-container {
  background-color: #0AA0A8;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.content-r-label {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
}

.content-r-input {
  margin-top: 20px;
}

.content-r-tips {
  font-size: 14px;
  color: #EEEEEE;
  margin-top: 40px;
}

.content-r-tags {
  margin-top: 20px;
}

.content-r-tags-label {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
}

.content-r-tags-content {
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.content-r-tags-item {
  margin: 10px;
  background-color: #00b3d2;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.content-r-tags-item:hover {
  background-color: #217CA3;
}

.search-other-container {
  background-color: #f5f6f7;
  padding: 40px;
  border-radius: 10px;
}

.search-other-label {
  font-size: 16px;
  font-weight: bold;
}

.search-other-btn-container {
  margin-top: 10px;
}

.search-other-btn {
  font-size: 14px;
}

.pagination-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  border: 1px solid #EEEEEE;
  background-color: #f5f6f7;
  border-radius: 10px;
  padding: 10px 20px;
}

.next-container {
  font-size: 14px;
}

.prev-container {
  font-size: 14px;
}

.content-l-content{
  min-height: 400px;
}
.empty-result-container {
  width: 70%;
  min-height: 400px;
  text-align: center;
  padding: 40px;
  font-size: 14px;
  color: #808080;
}
</style>
