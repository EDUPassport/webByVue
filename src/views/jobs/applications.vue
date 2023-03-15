<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="jobs-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="jobs-list-container">

            <div class="admin-container" >
              <h3>Applications</h3>
              <div class="admin-content-underline"></div>
              <div class="admin-list-container">
                <template v-if="applicationData.length>0">
                  <div class="admin-item-container"
                       v-for="(item,i) in applicationData" :key="i"
                       @click="turnEducatorProfile(item.educator)"
                  >
                    <div class="admin-item-img-container">
                      <el-image class="admin-item-img"
                                :src="item.educator.profile_photo ? item.educator.profile_photo : defaultAvatar ">

                      </el-image>
                    </div>
                    <div class="admin-item-name">{{ item.educator.first_name }} {{item.educator.last_name}}</div>

                  </div>


                </template>

              </div>

            </div>


            <div class="jobs-list-pagination">
              <el-pagination layout="prev, pager, next" :default-current-page="1"
                             @size-change="pageSizeChange"
                             @current-change="pageChange"
                             :current-page="page" :page-size="limit"
                             :total="totalNum"></el-pagination>
            </div>


            <el-dialog title="Educator Info"  v-model="dialogTableVisible">

              <div class="educator-info-container">
                <div class="educator-info-item" v-if="educatorData.first_name">
                  <div class="educator-info-item-l">First Name</div>
                  <div class="educator-info-item-r">{{educatorData.first_name}}</div>
                </div>
                <div class="educator-info-item" v-if="educatorData.last_name">
                  <div class="educator-info-item-l">Last Name</div>
                  <div class="educator-info-item-r">{{educatorData.last_name}}</div>
                </div>
                <div class="educator-info-item" v-if="educatorData.email">
                  <div class="educator-info-item-l">Email</div>
                  <div class="educator-info-item-r">{{educatorData.email}}</div>
                </div>
                <div class="educator-info-item" v-if="educatorData.phone">
                  <div class="educator-info-item-l">Phone</div>
                  <div class="educator-info-item-r">{{educatorData.phone}}</div>
                </div>
                <div class="educator-info-item" v-if="educatorData.nationality">
                  <div class="educator-info-item-l">Nationality</div>
                  <div class="educator-info-item-r">{{educatorData.nationality}}</div>
                </div>
                <div class="educator-info-item" v-if="educatorData.resume_pdf">
                  <div class="educator-info-item-l">Resume PDF</div>
                  <div class="educator-info-item-r">
                    <el-link :href="educatorData.resume_pdf" underline type="success"  target="_blank">
                      Click to view
                    </el-link>
                  </div>
                </div>
                <div class="educator-info-item" v-if="educatorData.sub_identity_name">
                  <div class="educator-info-item-l">Category</div>
                  <div class="educator-info-item-r">{{educatorData.sub_identity_name}}</div>
                </div>
                <div class="educator-info-item" v-if="educatorData.wx_id">
                  <div class="educator-info-item-l">Wechat ID</div>
                  <div class="educator-info-item-r">{{educatorData.wx_id}}</div>
                </div>
              </div>

              <div class="more-info-container">
                <el-button type="primary" round @click="turnInfoPerson(educatorData.user_id)" >
                  More Information
                </el-button>
              </div>

            </el-dialog>


          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {JOBS_APPLICATIONS} from "@/api/api";
import defaultAvatar from '@/assets/default/avatar.png'
export default {
  name: "applications",
  components: {
    meSideMenu
  },
  data(){
    return {
      dialogTableVisible:false,
      defaultAvatar,
      applicationData:[],
      educatorData:[],
      page:1,
      limit:10,
      totalNum:0,
      jobId:0

    }
  },
  mounted() {
    this.jobId = this.$route.query.id
    this.getJobResumes(this.jobId,this.page,this.limit)
  },
  methods:{
    turnEducatorProfile(educatorData){
      console.log(educatorData)
      this.dialogTableVisible = true
      this.educatorData  = educatorData
    },
    getJobResumes(jobId,page,limit){
      let params = {
        page: page,
        limit: limit,
        job_id: jobId
      }
      JOBS_APPLICATIONS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.applicationData = res.message.data
          // console.log(res.message.data)
          this.totalNum = res.message.total
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    pageSizeChange(e) {
      console.log(e)
    },
    pageChange(e) {
      this.page = e
      this.getJobResumes(e, this.limit)

    },
    turnInfoPerson(id){
      this.$router.push({path:'/info/personal',query:{id:id,identity:1}})
    }

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



.admin-container {
  padding: 20px;

}

.admin-container h3 {

}

.admin-content-container h4 {
  margin-left: 20px;
}

.admin-content-underline {
  width: 60px;
  height: 4px;
  background-color: #DD4A68;
}

.admin-list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 0;
}

.admin-item-container {
  margin-left: 20px;
  margin-top: 20px;
  cursor:pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.admin-item-img-container {
  width: 80px;
  height: 80px;
  border: 4px solid #004956;
  border-radius: 80px;
  overflow: hidden;
}

.admin-item-img {
  width: 100%;
}

.admin-item-name {
  text-align: center;
  font-weight: bold;
  line-height: 24px;
  margin-top: 10px;
}

.educator-info-container{

  border-radius: 10px;
  overflow: hidden;
}

.educator-info-item{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  border-bottom: 1px solid #e8e8e8;
}

.educator-info-item-l{
  width: 20%;
  background-color: #f4f5f6;
  padding: 10px;
}

.educator-info-item-r{
  width: 80%;
  background-color: #eeeeee;
  padding: 10px;
}
.jobs-list-pagination{
  text-align: center;
}

.more-info-container{
  text-align: center;
  margin-top: 20px;
}

</style>