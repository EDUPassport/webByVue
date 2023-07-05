<template>
    <div class="pool-bg">
        <div class="pool-container">
            <div class="pool-l">
                <hiring-filter></hiring-filter>
            </div>
            <el-scrollbar class="pool-r" always>

                <div class="profile-cards">
                    <div class="profile-card">
                        <div>
                            <el-avatar
                                class="profile-card-avatar"
                                src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230703/kkpansFrame-454.6u4ecgpkpys0.jpg">
                            </el-avatar>
                        </div>
                        <div class="profile-card-name">Emilia Jones </div>
                        <div class="profile-card-position">English High School Teacher</div>
                        <div class="profile-card-location">
                            <el-icon><Location /></el-icon>
                            Fatura, Japan
                        </div>
                        <div class="profile-card-actions">
                            <el-button type="info">View Profile</el-button>
                            <el-button plain >Message</el-button>
                        </div>
                    </div>
                    <div class="profile-card">
                        <div>
                            <el-avatar
                                class="profile-card-avatar"
                                src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230703/kkpansFrame-454.6u4ecgpkpys0.jpg">
                            </el-avatar>
                        </div>
                        <div class="profile-card-name">Emilia Jones </div>
                        <div class="profile-card-position">English High School Teacher</div>
                        <div class="profile-card-location">
                            <el-icon><Location /></el-icon>
                            Fatura, Japan
                        </div>
                        <div class="profile-card-actions">
                            <el-button type="info">View Profile</el-button>
                            <el-button plain >Message</el-button>
                        </div>
                    </div>

                    <div class="profile-card">
                        <div>
                            <el-avatar
                                class="profile-card-avatar"
                                src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230703/kkpansFrame-454.6u4ecgpkpys0.jpg">
                            </el-avatar>
                        </div>
                        <div class="profile-card-name">Emilia Jones </div>
                        <div class="profile-card-position">English High School Teacher</div>
                        <div class="profile-card-location">
                            <el-icon><Location /></el-icon>
                            Fatura, Japan
                        </div>
                        <div class="profile-card-actions">
                            <el-button type="info">View Profile</el-button>
                            <el-button plain >Message</el-button>
                        </div>
                    </div>

                    <div class="profile-card">
                        <div>
                            <el-avatar
                                class="profile-card-avatar"
                                src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230703/kkpansFrame-454.6u4ecgpkpys0.jpg">
                            </el-avatar>
                        </div>
                        <div class="profile-card-name">Emilia Jones </div>
                        <div class="profile-card-position">English High School Teacher</div>
                        <div class="profile-card-location">
                            <el-icon><Location /></el-icon>
                            Fatura, Japan
                        </div>
                        <div class="profile-card-actions">
                            <el-button type="info">View Profile</el-button>
                            <el-button plain >Message</el-button>
                        </div>
                    </div>

                </div>

            </el-scrollbar>
        </div>
    </div>
</template>

<script setup>
import HiringFilter from "@/components/pool/hiringFilter.vue";


</script>

<style scoped>
.pool-bg{
    width: 100%;
    height: calc(var(--i-window-height)  - 120px);
    background-color: #FFFFFF;
}

.pool-container{
    display: flex;
    flex-direction: row;
    margin: 0 40px 40px 40px;
}

.pool-l{
    width: 240px;
}

.pool-r{
    width: calc(100% - 240px);
    height: calc(var(--i-window-height) - 160px);
}

.profile-cards{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 30px;
}

.profile-card{
    width: calc( (100% - 184px) /3 );

    background-color: #F9FAFB;
    border-radius: 12px;
    padding: 24px 24px 16px 24px;
    text-align: center;
    margin-bottom: 20px;
    margin-right: 20px;
}

.profile-card:nth-child(3n){
    margin-right: 0;
}

.profile-card-avatar{
    width: 80px;
    height: 80px;
}

.profile-card-name{
    margin-top: 12px;
    color: #000000;
    font-size: 16px;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
}

.profile-card-position{
    color: #667085;
    font-size: 12px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
}

.profile-card-location{
    color:  #667085;
    font-size: 12px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
}

.profile-card-actions{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
}

</style>