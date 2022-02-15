<template>
  <div class="bg">
    <div class="favorites-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="list-container">
            <div class="list-label">
              FAQ
            </div>
            <div class="list-label-underline"></div>

            <div class="faq-content-container">
              <el-collapse accordion>
                <el-collapse-item name="1">
                  <template #title>
                    Do I need to pay to apply to a job?
                  </template>
                  <div>
                    No. It's free.
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template #title>
                    How to I find out all the data you have on me?
                  </template>
                  <div>
                    Please contact us.
                  </div>

                </el-collapse-item>
                <el-collapse-item name="3">
                  <template #title>
                    What do I need to be a vendor?
                  </template>
                  <div>
                    You just need to register our platform.
                  </div>
                </el-collapse-item>

              </el-collapse>
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
  name: "list",
  components: {
    meSideMenu
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

.favorites-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.list-col {
  padding: 0 20px;
}

.list-container {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
}
.list-label{
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.list-label-underline{
  width: 80px;
  border-bottom:2px solid #ff2870;
  margin-bottom: 20px;
}

</style>
