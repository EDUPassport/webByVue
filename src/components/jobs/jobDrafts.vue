<template>
    <div class="job-template-container">
        <template v-if="draftsData.length">
            <div class="job-item" v-for="(item,i) in draftsData" :key="i">
                <div class="job-item-t">
                    <div class="job-item-t-l">
                        <el-image :src="item.company_logo" class="job-item-avatar"></el-image>
                    </div>
                    <div class="job-item-t-r">
                        <div class="job-item-name">
                            {{ item.content.job_title }}
                            <span class="xll-tag xll-tag-1">Drafts</span>
                        </div>
                        <div class="job-item-desc">
                            {{ $filters.doRepAdvance(item.content.desc) }}
                        </div>
                    </div>
                </div>
                <div class="job-item-b">
                    <el-tooltip
                            effect="light"
                            :content="item.content.job_location"
                            placement="bottom"
                    >
                        <div class="job-item-location">
                            <el-image class="job-item-icon-24" :src="locationIconImg"></el-image>
                            <span>{{ item.content.job_location }}</span>
                        </div>

                    </el-tooltip>

                    <div class="job-item-salary">
                        <el-image class="job-item-icon-24" :src="salaryIconImg"></el-image>
                        <span>{{ item.content.currency }} {{
                            item.content.salary_min
                            }} - {{ item.content.salary_max }}</span>
                    </div>
                    <div class="job-item-btns">
                        <el-button type="primary" @click="postJobFromDrafts(item)">Post Job</el-button>
                    </div>
                </div>
                <div class="job-item-more-actions">
                    <el-dropdown :hide-on-click="false" trigger="click">
                        <span class="job-item-more-text"><el-icon><IconRiMore2Fill/></el-icon></span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <el-button link @click="editJobDrafts(item)">
                                        Edit
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-popconfirm
                                            title="Are you sure to delete this?"
                                            width="auto"
                                            @confirm="deleteJobDrafts(item.id)"
                                    >
                                        <template #reference>
                                            <el-button link>Delete</el-button>
                                        </template>
                                    </el-popconfirm>

                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>

        </template>
        <template v-else>
            <div class="job-template-empty-tips">
                You have zero job post draft. Create a draft from <el-button link @click="turnManualPosting()">Manual Posting</el-button>
            </div>
        </template>


    </div>

</template>

<script setup>
import {defineProps,defineEmits} from 'vue'
import locationIconImg from "@/assets/newHome/dashboard/location_nofill.svg";
import salaryIconImg from "@/assets/newHome/dashboard/salary_nofill.svg";

defineProps(['draftsData'])
const emit = defineEmits(['post','edit','delete','turnManualPosting'])
const editJobDrafts = (item) => {
    emit('edit', item)
}

const postJobFromDrafts = (item) => {
    emit('post', item)
}

const deleteJobDrafts = (id) => {
    emit('delete', id)
}

const turnManualPosting = () =>{
    emit('turnManualPosting')
}

</script>

<style scoped>

.job-template-container {

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

}

.job-item {
    flex-basis: calc(50% - 47px);
    margin-right: 30px;
    margin-bottom: 24px;

    padding: 18px 16px;
    background: #F9FAFB;
    border-radius: 12px;
    position: relative;
}

.job-item:nth-child(2n) {
    margin-right: 0;
}

.job-item-t {
    display: flex;
    flex-direction: row;
}

.job-item-avatar {
    width: 48px;
    height: 48px;
    background: #F7F5FF;
    border-radius: 6px;
}

.job-item-t-l {
    margin-right: 9px;
}

.job-item-name {
    display: flex;
    flex-direction: row;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
}

.job-item-desc {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #667085;

    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.job-item-b {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
}

.job-item-location span {
    width: 110px;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.job-item-location, .job-item-salary {
    display: flex;
    align-items: center;
}

.job-item-location span, .job-item-salary span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    color: #344054;
}

.job-item-icon-24 {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.job-item-more-actions {
    position: absolute;
    right: 10px;
    top: 10px;
}

.job-item-more-text {
    cursor: pointer;
}

.xll-tag{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left:12px ;
    padding: 4px 8px;
    gap: 2px;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
}

.xll-tag-1{
    color: #F79009;
    background: #FFFAEB;
}

.xll-tag-2{
    color: #12B76A;
    background: #ECFDF3;
}


.xll-tag-3{
    color: #F04438;
    background: #FEF3F2;
}

.job-template-empty-tips{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

</style>