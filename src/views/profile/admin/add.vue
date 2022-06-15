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

              <div class="email-container">
                <el-input placeholder="Email"></el-input>
              </div>

              <div class="qx-container">
                <el-collapse accordion>
                  <el-collapse-item name="1">
                    <template #title>
                      Educator Account
                    </template>
                    <div>
                      Choose what the added user will have access to:
                    </div>
                    <div class="qx-checked-container">
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                    </div>
                    <div class="qx-done-btn-container">
                      <el-button class="qx-done-btn" plain >Done</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="Edu Business Account" name="2">
                    <div>
                      Choose what the added user will have access to:
                    </div>
                    <div class="qx-checked-container">
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                    </div>
                    <div class="qx-done-btn-container">
                      <el-button class="qx-done-btn" plain >Done</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="Vendor Account" name="3">
                    <div>
                      Choose what the added user will have access to:
                    </div>
                    <div class="qx-checked-container">
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                      <div class="qx-checked-item">
                        <div class="qx-checked-label">Post a Job</div>
                        <div class="qx-checked-square"></div>
                      </div>
                    </div>
                    <div class="qx-done-btn-container">
                      <el-button class="qx-done-btn" plain >Done</el-button>
                    </div>
                  </el-collapse-item>

                </el-collapse>
              </div>
              <div class="add-agent-btn-container">
                <el-button type="primary">Add</el-button>
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


export default {
  name: "add",
  components: {
    meSideMenu
  },
  setup() {

  },
  data() {
    return {


    }
  },
  mounted() {


  },
  methods: {


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
  padding: 40px ;
}
.add-agent-container{
  background-color: #FFFFFF;
  padding:40px;
  border-radius: 20px;
  margin-top: 40px;
}

.add-agent-underline{
  width:100px;
  height: 4px;
  background-color: #DD4A68;
}

.email-container{
  margin-top: 60px;
}

.qx-container{
  margin-top:60px;
}

.add-agent-btn-container{
  text-align: right;
  margin-top: 20px;
}

.qx-checked-container{

}

.qx-checked-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top:10px;
}

.qx-checked-square{
  border: 1px solid #808080;
  width:14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
}

.qx-done-btn-container{
  text-align: right;
  margin-top: 20px;
}

</style>