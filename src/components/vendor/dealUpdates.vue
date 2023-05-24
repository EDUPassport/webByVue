<template>
  <div class="deals">
    <div class="deals-label">
      <span>Recent deals </span>

    </div>

    <el-scrollbar class="application-container">

      <template v-if="deals.length > 0">

        <div v-for="(item, i) in deals" :key="i">

          <div class="deal-container" link @click="turnDealDetail(item.id)">
            <el-row>
              <el-col :span="24" class="deal-name">{{item.title }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-row>
                  <el-col :span="24" class="deal-menu-name">Deals Posted</el-col>
                  <el-col :span="24" class="deal-menu-value">123</el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="24" class="deal-menu-name">Redeemed</el-col>
                  <el-col :span="24" class="deal-menu-value">45</el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="24" class="deal-menu-name">Total Views</el-col>
                  <el-col :span="24" class="deal-menu-value">{{ item.views }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="24" class="deal-menu-name">Total Click </el-col>
                  <el-col :span="24" class="deal-menu-value">7</el-col>
                </el-row>
              </el-col>
             </el-row>
          </div>
        </div>
      </template>
      <template v-else>
        <el-empty description="..."></el-empty>
      </template>

    </el-scrollbar>


  </div>
</template>

<script>

export default {
  name: "dealUpdates",
   props: {
    deals: {
      type: Array,
      default:()=>[]
    }
   },
  components: {

  },
  data() {
    return {
   
    }
  },
  methods: {
    turnDealDetail(id) {
      this.$router.push({
        path: '/deals/detail', query: {
          id: id
        }
      })
    },

  }
}
</script>

<style scoped>


.deals {
  box-sizing: border-box;
  width: 520px;
  height: 409px;
  border: 1px solid #EAECF0;
  filter: drop-shadow(0px 2px 3px rgba(16, 24, 40, 0.1));
  border-radius: 10px;
}

.deals-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #101828;

  margin-top: 26px;
  margin-left: 16px;
}

.application-container {
  margin-top: 20px;
  height: 340px;
}

.deal-container {
  margin: 15px;
  background-color: #F9FAFB;
  padding: 10px;
  cursor: pointer;
}

.deal-name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 45px;
  color: #101828;
}

.deal-menu-name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #667085;
}

.deal-menu-value {
  color: #344054;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 45px;
}
</style>
