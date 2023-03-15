<template>
  <div>
    <div class="e-a">

      <div >
        <el-dropdown>
              <span class="e-a-label">
                <template v-if="type === 1">Favorited jobs</template>
                <template v-if="type === 2">Favorited deals</template>
                <template v-if="type === 4">Favorited profiles</template>

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

        <el-button link primary @click="viewAll()">VIEW ALL</el-button>
      </div>

      <el-scrollbar max-height="350px" class="e-a-c">

        <template v-if="favoriteData.length>0">
          <div class="e-a-item-bg" v-for="(item,i) in favoriteData" :key="i">
            <div class="e-a-item">
              <div class="e-a-item-l">
                <el-avatar class="e-a-item-avatar" :src="item.type_url"></el-avatar>
              </div>
              <div class="e-a-item-m">
                <div class="e-a-item-m-1">
                  <span v-if="item.type==1">Job</span>
                  <span v-if="item.type==2">Deal</span>
                </div>

                <div class="e-a-item-m-2">
                  <router-link v-if="item.type==1" :to="{path:'/jobs/detail',query:{id:item.type_id}}">
                    {{ item.type_title }}
                  </router-link>
                  <router-link v-if="item.type==2" :to="{path:'/deals/detail',query:{id:item.type_id}}">
                    {{ item.type_title }}
                  </router-link>

                </div>
                <!--              <div class="e-a-item-m-3">-->
                <!--                Salary: $240,000-280,000-->
                <!--              </div>-->
                <!--              <div class="e-a-item-m-3">-->
                <!--                Dubai, UAE-->
                <!--              </div>-->
                <!--              <div class="e-a-item-m-3">-->
                <!--                Full time-->
                <!--              </div>-->
              </div>
              <div class="e-a-item-r">
                <div class="e-a-item-r-1">
                  <el-button v-if="item.type == 1"
                             type="primary"
                             round
                             :loading="selectJobId == item.type_id ? true : false"
                             @click="applyJob(item.type_id, item.type_title)">
                    APPLY
                  </el-button>
                </div>
              </div>
            </div>

          </div>

          <!--        <div class="e-a-item-bg">-->
          <!--          <div class="e-a-item">-->
          <!--            <div class="e-a-item-l">-->
          <!--              <el-avatar class="e-a-item-avatar"></el-avatar>-->
          <!--            </div>-->
          <!--            <div class="e-a-item-m">-->
          <!--              <div class="e-a-item-m-1">Columbia University</div>-->
          <!--              <div class="e-a-item-m-2">-->
          <!--                Art History Teacher-->
          <!--              </div>-->
          <!--              <div class="e-a-item-m-3">-->
          <!--                Salary: $90,000-120,000-->
          <!--              </div>-->
          <!--              <div class="e-a-item-m-3">-->
          <!--                Paris, France-->
          <!--              </div>-->
          <!--              <div class="e-a-item-m-3">-->
          <!--                Seasonal-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="e-a-item-r">-->
          <!--              <div class="e-a-item-r-1">-->
          <!--                Position closed-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <!--        </div>-->

        </template>

        <template v-else>
          <el-empty description="You haven't saved any jobs yet">
            <el-button type="primary" round @click="searchJobs()">Search jobs</el-button>
          </el-empty>
        </template>

      </el-scrollbar>
    </div>

    <template v-if="applyVisible">
      <successMessage :visible="applyVisible"
                      :title="applyTitle"
                      :description="applyDescription"
                      @close="applyVisible=false" >
      </successMessage>
    </template>

  </div>
</template>

<script>
import {APPLY_JOBS, GET_FAVORITE_LIST} from "@/api/api";
import successMessage from "@/components/popup/successMessage";

export default {
  name: "favoritedJobsDashboard",
  components:{
    successMessage
  },
  data(){
   return {
     page:1,
     limit: 8,
     favoriteData:[],
     totalNum:0,
     type:1,

     selectJobId:0,
     applyBtnLoading:false,
     applyVisible:false,
     applyTitle:'',
     applyDescription:''

   }
  },
  mounted(){
    this.getFavoriteList(1,this.page,this.limit)
  },
  methods:{
    searchJobs(){
      this.$router.push('/jobs')
    },
    changeType(type){
      this.type = type;
      this.favoriteData = [];
      this.page = 1
      this.limit = 8
      this.getFavoriteList(type, this.page, this.limit)
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
          return this.$message.error(err.msg)
        }
        if (err.message) {
          return this.$message.error(err.message)
        }
      })

    },
    viewAll(){
      this.$router.push({path:'/favorites'})
    },
    applyJob(jobId, jobTitle) {
      let identity = localStorage.getItem('identity')
      let token = localStorage.getItem('token')
      this.selectJobId = jobId;

      if(token){

        if (identity == 1) {
          let params = {
            job_id: jobId,
            token: token
          }

          APPLY_JOBS(params).then(res => {
            if (res.code == 200) {
              // this.$message.success('Apply Success')
              this.selectJobId = 0;
              this.applyVisible = true;
              this.applyTitle = 'Success'
              this.applyDescription = 'Your Application to ' + jobTitle + ' has been successfully sent.'

            }
          }).catch(err=>{
            console.log(err)
            // this.$message.error(err.msg)
            this.applyVisible = true;
            this.applyTitle = 'Warning'
            this.applyDescription = err.msg

            this.selectJobId = 0;

          })

        } else {

          this.applyVisible = true;
          this.applyTitle = 'Warning'
          this.applyDescription = 'Please switch to an educator profile to be able to apply'

          // this.$message.warning('Please switch to an educator profile to be able to apply')
          this.selectJobId = 0;

        }


      }else{
        this.applyVisible = true;
        this.applyTitle = 'Warning'
        this.applyDescription = ' Please log in & fill in your profile to be able to apply.'
      }


    }


  }

}
</script>

<style scoped>

.e-a {
  /*width: calc(45% - 100px);*/
  /*width: 600px;*/
  padding: 25px 50px;
  box-shadow: 0px 0px 23px #00000012;
  border-radius: 18px;
  background-color: #FFFFFF;

}

.e-a-label {
  display: flex;
  align-items: flex-end;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
  cursor: pointer;
}

.e-a-c {
  margin-top: 25px;
}

.e-a-item-bg {
  border-bottom: 1px solid #F0F2F5;
  padding: 25px 0;
}

.e-a-item {

  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 25px;
}

.e-a-item-avatar {
  width: 70px;
  height: 70px;

}

.e-a-item-l {
  width: 70px;
}

.e-a-item-m {
  width: calc(100% - 260px);
}

.e-a-item-r {
  width: 175px;
  text-align: center;
}

.e-a-item-m-1 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.e-a-item-m-2 a{
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: #262626;
  text-decoration: none;
}

.e-a-item-m-3 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.e-a-item-r-1 {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.e-a-item-r-2 {
  margin-top: 25px;
}

.e-a-item-r-3 {
  margin-top: 25px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}


@media screen and (max-width: 768px){
  .e-a{
    background-color: #F0F2F5;
    box-shadow: none;
    padding: 0;
    margin-bottom: 20px;
  }

  .e-a-label{
    font-size: 20px;
    margin: 0 15px 8px 15px;
  }

  .e-a-c{
    margin-top: 0;
  }
  .e-a-item-bg{
    margin: 7px 15px 15px 15px;
    padding: 0;
  }
  .e-a-item{
    padding: 15px 15px 50px 15px;
    box-shadow: 0px 0px 10px #00000012;
    border-radius: 18px;
    position: relative;
  }

  .e-a-item-l{
    width: 40px;
  }

  .e-a-item-avatar{
    width: 40px;
    height: 40px;
  }


  .e-a-item-m{
    width: calc(100% - 55px);
  }

  .e-a-item-m-1{
    font-size: 12px;
  }

  .e-a-item-m-2{
    font-size: 18px;
  }

  .e-a-item-r{
    width: auto;
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
}

</style>