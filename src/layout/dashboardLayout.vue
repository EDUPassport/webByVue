<template>
  <div class="dashboard-layout">
    <div class="aside">
      <Aside></Aside>
    </div>
    <div class="r-container">
      <div class="header">
        <DashboardHeader></DashboardHeader>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from "@/layout/components/DashboardHeader.vue";
import Aside from "@/layout/components/Aside.vue";
export default {
  name: "dashboardLayout",
  components:{
    DashboardHeader,
    Aside
  }

}
</script>

<style scoped>

.dashboard-layout{
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.r-container{
  width: 100%;
}

.dashboard-layout >>> .profile-r-bg-container {
  box-shadow: none;
  border-radius: 0;
  height: calc(100vh - 120px);
}
.dashboard-layout >>> .profile-r-container{
  width: 100%;
}

</style>