<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="add-agent-bg">
            <h2>Add an Agent</h2>
            <div class="add-agent-container">
              <h3>Account & Access</h3>
              <div class="add-agent-underline"></div>

              <div class="email-container" v-if="action != 'edit' ">
                <el-input placeholder="Email" v-model="email"></el-input>
              </div>

              <div class="qx-container">
                <el-collapse accordion>
                  <template v-if="identity == 1">
                    <el-collapse-item name="1">
                      <template #title>
                        Educator Account
                      </template>
                      <div>
                        Choose what the added user will have access to:
                      </div>
                      <div class="qx-checked-container">
                        <div class="qx-checked-item" v-for="(item,i) in educatorMenuData" :key="i"
                             @click="menuItemSelected(item)"
                        >
                          <div class="qx-checked-label">{{ item.menu_name_en }}</div>
                          <div class="qx-checked-square"
                               :class="sMenuItemData.indexOf(item.id) == -1 ? '' : 'qx-checked-square-active' "
                          ></div>
                        </div>
                      </div>
                      <!--                    <div class="qx-done-btn-container">-->
                      <!--                      <el-button class="qx-done-btn" plain >Done</el-button>-->
                      <!--                    </div>-->
                    </el-collapse-item>

                  </template>

                  <template v-if="identity == 2">
                    <el-collapse-item title="Edu Business Account (Recruiter)" name="2">
                      <div>
                        Choose what the added user will have access to:
                      </div>
                      <div class="qx-checked-container">
                        <div class="qx-checked-item" v-for="(item,i) in recruiterMenuData" :key="i"
                             @click="menuItemSelected(item)"
                        >
                          <div class="qx-checked-label">{{ item.menu_name_en }}</div>
                          <div class="qx-checked-square"
                               :class="sMenuItemData.indexOf(item.id) == -1 ? '' : 'qx-checked-square-active' "
                          ></div>
                        </div>

                      </div>
                      <!--                    <div class="qx-done-btn-container">-->
                      <!--                      <el-button class="qx-done-btn" plain >Done</el-button>-->
                      <!--                    </div>-->
                    </el-collapse-item>

                  </template>

                  <template v-if="identity == 3">
                    <el-collapse-item title="Edu Business Account (School)" name="3">
                      <div>
                        Choose what the added user will have access to:
                      </div>
                      <div class="qx-checked-container">
                        <div class="qx-checked-item" v-for="(item,i) in schoolMenuData" :key="i"
                             @click="menuItemSelected(item)"
                        >
                          <div class="qx-checked-label">{{ item.menu_name_en }}</div>
                          <div class="qx-checked-square"
                               :class="sMenuItemData.indexOf(item.id) == -1 ? '' : 'qx-checked-square-active' "
                          ></div>
                        </div>

                      </div>
                      <!--                    <div class="qx-done-btn-container">-->
                      <!--                      <el-button class="qx-done-btn" plain >Done</el-button>-->
                      <!--                    </div>-->
                    </el-collapse-item>

                  </template>

                  <template v-if="identity == 4">
                    <el-collapse-item title="Edu Business Account (Other)" name="4">
                      <div>
                        Choose what the added user will have access to:
                      </div>
                      <div class="qx-checked-container">
                        <div class="qx-checked-item" v-for="(item,i) in otherMenuData" :key="i"
                             @click="menuItemSelected(item)"
                        >
                          <div class="qx-checked-label">{{ item.menu_name_en }}</div>
                          <div class="qx-checked-square"
                               :class="sMenuItemData.indexOf(item.id) == -1 ? '' : 'qx-checked-square-active' "
                          ></div>
                        </div>

                      </div>
                      <!--                    <div class="qx-done-btn-container">-->
                      <!--                      <el-button class="qx-done-btn" plain >Done</el-button>-->
                      <!--                    </div>-->
                    </el-collapse-item>

                  </template>

                  <template v-if="identity == 5">
                    <el-collapse-item title="Vendor Account" name="5">
                      <div>
                        Choose what the added user will have access to:
                      </div>
                      <div class="qx-checked-container">
                        <div class="qx-checked-item" v-for="(item,i) in vendorMenuData" :key="i"
                             @click="menuItemSelected(item)"
                        >
                          <div class="qx-checked-label">{{ item.menu_name_en }}</div>
                          <div class="qx-checked-square"
                               :class="sMenuItemData.indexOf(item.id) == -1 ? '' : 'qx-checked-square-active' "
                          ></div>
                        </div>

                      </div>
                      <!--                    <div class="qx-done-btn-container">-->
                      <!--                      <el-button class="qx-done-btn" plain >Done</el-button>-->
                      <!--                    </div>-->
                    </el-collapse-item>

                  </template>

                </el-collapse>
              </div>
              <div class="add-agent-btn-container">
                <el-button type="primary" :loading="addLoading" @click="addMenu()">
                  <template v-if="action == 'edit' ">
                    Update
                  </template>
                  <template v-else>
                    Add
                  </template>
                </el-button>
              </div>

            </div>
          </div>


        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {ALL_MENU_LIST, USER_ADD_MENU, USER_ADMIN_MENU_INFO, USER_MENU_DELETE, USER_MENU_LIST} from "@/api/api";


export default {
  name: "add",
  components: {
    meSideMenu
  },
  setup() {

  },
  data() {
    return {
      educatorMenuData: [],
      recruiterMenuData: [],
      schoolMenuData: [],
      otherMenuData: [],
      vendorMenuData: [],
      sMenuItemData: [],
      email:'',
      addLoading:false,
      action:''


    }
  },
  computed: {
    identity: {
      get() {
        return this.$store.state.identity
      }
    }

  },
  async mounted() {
    await this.getAllMenuList()
    this.action = this.$route.query.action
    let action = this.$route.query.action
    let uid = this.$route.query.uid
    let companyId = this.$route.query.cId

    if(action == 'edit'){
      await this.getUserAdminMenuList(uid,this.identity,companyId)
    }

  },
  methods: {
    async getUserAdminMenuList(uid,identity,companyId){
      let params = {
        user_id:uid,
        identity:identity,
        company_id:companyId
      }

      await USER_ADMIN_MENU_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          let resData = res.message;
          resData.forEach(item=>{
            this.sMenuItemData.push( Number(item.menu_id) )
          })

          // console.log(this.sMenuItemData)
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    addMenu() {
      let identity = this.identity;
      let email = this.email;
      let companyId = localStorage.getItem('company_id');

      let actionValue = this.$route.query.action;

      if(actionValue != 'edit'){
        if(this.email == ''){
          this.$message.warning('Please enter email')
          return;
        }
      }

      let sMenuData = this.sMenuItemData;

      if(sMenuData.length<=0){
        this.$message.warning('Choose what the added user will have access to')
        return;
      }

      this.addLoading = true;

      let params = {}

      if(actionValue == 'edit'){
        let userId = this.$route.query.uid
        let companyId = this.$route.query.cId

        USER_MENU_DELETE({
          user_id: Number(userId),
          company_id: Number(companyId)
        }).then(res=>{
          console.log(res)
          if(res.code == 200){
            params =  {
              user_id:userId,
              identity:identity,
              company_id: companyId,
              menu_id:sMenuData.join(',')
            }

            USER_ADD_MENU(params).then(res=>{
              console.log(res)
              if(res.code == 200){
                this.addLoading =false;
                this.$message.success('Success ')
                this.$router.push({path:'/overview',query:{identity:identity}})
              }
            }).catch(err=>{
              console.log(err)
              this.addLoading = false;
            })

          }
        }).catch(err=>{
          console.log(err)
        })


      }else{
        params =  {
          email:email,
          identity:identity,
          company_id: companyId,
          menu_id:sMenuData.join(',')
        }

        USER_ADD_MENU(params).then(res=>{
          console.log(res)
          if(res.code == 200){
            this.addLoading =false;
            this.$message.success('Success ')
            this.$router.push({path:'/overview',query:{identity:identity}})
          }
        }).catch(err=>{
          console.log(err)
          this.addLoading = false;
        })

      }

    },
    menuItemSelected(item) {
      // console.log(item)
      let sMenuItemData = this.sMenuItemData;
      let index = sMenuItemData.indexOf(item.id);
      if (index === -1) {
        this.sMenuItemData.push(item.id)
      } else {
        this.sMenuItemData.splice(index, 1)
      }
      console.log(this.sMenuItemData)
    },
    getUserMenuList(){
      let self = this;
      let params = {
        user_id:localStorage.getItem('uid'),
        identity:self.identity,
        company_id:localStorage.getItem('company_id'),
        create_user_id: localStorage.getItem('uid'),
        page:1,
        limit:1000
      }
      USER_MENU_LIST(params).then(res=>{
        // console.log(res)
        if(res.code === 200){
          let pcAllData = res.message.pc;
          if(self.identity == 1){
            this.educatorMenuData = pcAllData

          }
          if(self.identity == 2){
            this.recruiterMenuData = pcAllData

          }
          if(self.identity == 3){
            this.schoolMenuData = pcAllData

          }
          if(self.identity == 4){
            this.otherMenuData = pcAllData

          }

          if(self.identity == 5){
            this.vendorMenuData = pcAllData
          }

        }
      }).catch(err=>{
        console.log(err)
      })
    },
    async getAllMenuList() {
      let params = {}
      await ALL_MENU_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let resData = res.message

          let educatorMenuData = resData.educator
          let recruiterMenuData = resData.recruiting
          let schoolMenuData = resData.school
          let otherMenuData = resData.other
          let vendorMenuData = resData.vendor

          this.educatorMenuData = educatorMenuData
          this.recruiterMenuData = recruiterMenuData
          this.schoolMenuData = schoolMenuData
          this.otherMenuData = otherMenuData
          this.vendorMenuData = vendorMenuData


        }
      }).catch(err => {
        console.log(err)
      })
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

.add-agent-bg {
  padding: 40px;
}

.add-agent-container {
  background-color: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  margin-top: 40px;
}

.add-agent-underline {
  width: 100px;
  height: 4px;
  background-color: #DD4A68;
}

.email-container {
  margin-top: 60px;
}

.qx-container {
  margin-top: 60px;
}

.add-agent-btn-container {
  text-align: right;
  margin-top: 20px;
}

.qx-checked-container {

}

.qx-checked-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.qx-checked-square {
  border: 1px solid #808080;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
}

.qx-done-btn-container {
  text-align: right;
  margin-top: 20px;
}

.qx-checked-square-active {
  background-color: #00B2D2;
}
</style>