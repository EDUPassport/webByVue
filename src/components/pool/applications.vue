<template>
    <div>
        <el-drawer
                :model-value="visible"
                direction="rtl"
                size="780px"
                :show-close="false"
                :with-header="false"
                @close="closeVisible"
        >
            <div class="drawer-container">
                <el-tabs v-model="activeTabName" @tab-change="tabChange">
                    <el-tab-pane :label="'All ('+ totalNum + ' Candidates)'" name="all">
                        <div class="profile-card-container" v-if="totalNum>0">
                            <div class="profile-card" v-for="(item,i) in applicationsData" :key="i">
                                <div class="profile-card-l">
                                    <el-avatar
                                        class="profile-card-avatar"
                                        :src="item.user_contact.headimgurl"
                                        @click="showEducatorProfile(item)"
                                    >
                                    </el-avatar>
                                </div>
                                <div class="profile-card-r">
                                    <div class="profile-card-name" @click="showEducatorProfile(item)">
                                        {{item.user_contact.first_name}} {{item.user_contact.last_name}}
                                    </div>
                                    <div class="profile-card-position">
                                        {{item.user_contact.educator_contact.job_title}}
                                    </div>
                                    <div class="profile-card-location">
                                        <el-icon><Location /></el-icon>
                                        {{ item.user_contact.educator_contact.nationality }}
                                    </div>
                                    <div class="profile-card-resume">
                                        ResumeUpdated.doc <el-icon><Download /></el-icon>
                                    </div>
                                    <div class="profile-card-actions">
                                        <el-button type="danger">Decline</el-button>
                                        <el-button type="primary" >Shortlist</el-button>
                                    </div>
                                </div>
                                <div class="profile-card-favorite">
                                    <template v-if="item.is_favorite ">
                                        <el-button link type="info" @click="cancelFavorite(item,i)">
                                            <IconFlatColorIconsLike/>
                                        </el-button>
                                    </template>
                                    <template v-else>
                                        <el-button link type="info" @click="addFavorite(item,i)">
                                            <IconIconParkOutlineLike/>
                                        </el-button>
                                    </template>
                                </div>

                            </div>

                        </div>
                        <div v-else>
                            <el-empty :image="emptyImg" description="No data"></el-empty>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="Shortlisted" name="shortlisted">
                        <div class="profile-card-container" v-if="totalNum>0">
                            <div class="profile-card" v-for="(item,i) in applicationsData" :key="i">
                                <div class="profile-card-l">
                                    <el-avatar
                                        class="profile-card-avatar"
                                        :src="item.user_contact.headimgurl"
                                        @click="showEducatorProfile(item)"
                                    >
                                    </el-avatar>
                                </div>
                                <div class="profile-card-r">
                                    <div class="profile-card-name" @click="showEducatorProfile(item)">
                                        {{item.user_contact.first_name}} {{item.user_contact.last_name}}
                                    </div>
                                    <div class="profile-card-position">
                                        {{item.user_contact.educator_contact.job_title}}
                                    </div>
                                    <div class="profile-card-location">
                                        <el-icon><Location /></el-icon>
                                        {{ item.user_contact.educator_contact.nationality }}
                                    </div>
                                    <div class="profile-card-resume">
                                        ResumeUpdated.doc <el-icon><Download /></el-icon>
                                    </div>
                                    <div class="profile-card-actions">
                                        <el-button type="danger">Decline</el-button>
                                        <el-button type="primary" >Remove</el-button>
                                    </div>
                                </div>
                                <div class="profile-card-favorite">
                                    <template v-if="item.is_favorite ">
                                        <el-button link type="info" @click="cancelFavorite(item,i)">
                                            <IconFlatColorIconsLike/>
                                        </el-button>
                                    </template>
                                    <template v-else>
                                        <el-button link type="info" @click="addFavorite(item,i)">
                                            <IconIconParkOutlineLike/>
                                        </el-button>
                                    </template>
                                </div>

                            </div>

                        </div>
                        <div v-else>
                            <el-empty :image="emptyImg" description="No data"></el-empty>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-drawer>

        <educator :visible="educatorVisible" :data="educatorInfo" @close="educatorVisible=false"></educator>
    </div>
</template>

<script setup>
import {defineProps, defineEmits, ref, computed} from 'vue'
import {ADD_FAVORITE, CANCEL_FAVORITE} from "@/api/api";
import emptyImg from "@/assets/newHome/dashboard/empty.svg";
import Educator from "@/components/info/educator.vue";

const props = defineProps(['visible', 'data','totalNum'])
const emit = defineEmits(['close','favoriteSuccess','cancelFavoriteSuccess'])

const activeTabName = ref('all')
const applicationsData = computed(()=>props.data)

const tabChange = (e)=>{
    console.log(e)
}

const closeVisible = () => {
    emit('close')
}
const educatorVisible = ref(false)
const educatorInfo = ref({})
const showEducatorProfile = (item)=>{
    educatorVisible.value = true
    educatorInfo.value = item.user_contact
    emit('close')
}

const addFavorite = (item,i) => {

    let params = {
        type: 4,
        type_id: item.user_contact.id
    }
    // console.log(params)
    ADD_FAVORITE(params).then(res => {
        if (res.code == 200) {
            applicationsData.value[i].is_favorite = 1
        }
    }).catch(err => {
        console.log(err)

    })

}

const cancelFavorite = (item,i) => {
    let params = {
        type: 4,
        type_id: item.user_contact.id
    }
    CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            applicationsData.value[i].is_favorite = 0
        }
    }).catch(err => {
        console.log(err)
    })
}

</script>

<style scoped>
:deep(.el-drawer__body){
    padding: 0;
}

:deep(.el-tabs__item) {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #98A2B3;
}

:deep(.el-tabs__item.is-active)  {
    color: #6648FF;
}

:deep(.el-tabs__active-bar) {
    background-color: #6648FF;
}

.drawer-container{
    margin: 40px 40px 30px 30px;
    padding: 20px 12px;
    border-radius: 8px;
    border: 1px solid  #D0D5DD;
    background: #FFFFFF;
}

.profile-card-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.profile-card{
    width: calc((100% - 120px) / 2);
    margin: 10px;
    padding: 20px;
    border-radius: 12px;
    background: #F9FAFB;

    display: flex;
    flex-direction: row;
    position: relative;
}

.profile-card:nth-child(2n){
    margin-right: 0;
}

.profile-card-r{
    margin-left: 12px;
}

.profile-card-favorite{
    position: absolute;
    right: 10px;
    top:10px;
    z-index:100;
}

.profile-card-avatar{
    width: 80px;
    height: 80px;
    cursor: pointer;
}
.profile-card-name{
    margin-top: 12px;
    color: #000000;
    font-size: 16px;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    cursor: pointer;
}

.profile-card-name:hover{
    text-decoration: underline;
}

.profile-card-position{
    margin-top: 2px;
    color: #667085;
    font-size: 12px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;

}

.profile-card-location{
    margin-top: 6px;
    color:  #667085;
    font-size: 12px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;

}

.profile-card-resume{
    margin-top: 8px;
    color:  #1D2939;
    font-size: 12px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
}

.profile-card-actions{
    margin-top: 16px;
}

</style>