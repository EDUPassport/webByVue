<template>
    <div class="privacy-bg">

        <div class="privacy-top-container">
            <div class="privacy-top-l">
                <div class="privacy-label">
                    <span>Privacy</span>
                </div>
                <div class="privacy-tips">
                    <span>Privacy Privacy Privacy Privacy Privacy Privacy Privacy!</span>
                </div>
            </div>
            <div class="privacy-top-r">
                <el-button type="info">Cancel</el-button>
                <el-button type="primary">Save & Continue</el-button>
            </div>

        </div>

        <div class="privacy-profile-container">
            <div class="privacy-profile-l">
                <span>Profile Visibility</span>
            </div>
            <div class="privacy-profile-r">
                <el-checkbox v-model="profileVisible" label="Make my profile visible to others" />
                <br>
                <span>
                    <el-icon><Warning /></el-icon>
                    Your profile is no longer visible from the candidate pool
                </span>
            </div>

        </div>

        <div class="privacy-alerts-container">
            <div class="privacy-alerts-label">
                <span>Notifications & Alerts</span>
            </div>
            <div class="privacy-alert" v-for="(item,i) in alertsData" :key="i">
                <div class="privacy-alert-t">
                    <div class="privacy-alert-label">
                        <span>{{item.label}}</span>
                    </div>
                    <div class="privacy-alert-line"></div>
                    <div class="privacy-alert-icon-container">
                        <el-image class="privacy-alert-icon" :src="arrowDownIcon"></el-image>
                    </div>
                </div>
                <div class="privacy-alert-b">
                    <div v-for="(cItem,index) in item.data" :key="index">
                        <el-checkbox :label="cItem.value"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import arrowDownIcon from '@/assets/newHome/arrow-circle-down.svg'
import arrowUpIcon from '@/assets/newHome/arrow-circle-up.svg'
import {ref} from 'vue'

export default {
    name: "privacy",
    components: {},
    data(){
        return {
            arrowUpIcon,
            arrowDownIcon
        }

    },
    setup() {
        const profileVisible = ref(false)
        const alertsData = [
            {
                label:'Job Alerts',
                data:[
                    {
                        key:'j1',
                        value:'Latest Job Listings'
                    },
                    {
                        key:'j2',
                        value:'Resume/Cover letter Tips'
                    },
                    {
                        key:'j3',
                        value:'Jobs that match your location'
                    },
                    {
                        key:'j4',
                        value:'Featured Jobs'
                    },
                    {
                        key:'j5',
                        value:'Jobs that best match your preferences settings'
                    },
                ]
            },
            {
                label:'Deal Alerts',
                data:[
                    {
                        key:'d1',
                        value:'Upcoming Events'
                    },
                    {
                        key:'d2',
                        value:'Featured Events'
                    },
                    {
                        key:'d3',
                        value:'Events that best match your preferences settings'
                    },
                    {
                        key:'d4',
                        value:'Career Development events'
                    }
                ]
            },
            {
                label:'Event Alerts',
                data:[
                    {
                        key:'e1',
                        value:'Discounted Products and Services'
                    },
                    {
                        key:'e2',
                        value:'Promotions and Giveaways'
                    }
                ]
            }
        ]
        return {
            profileVisible,
            alertsData
        }
    }
}
</script>

<style scoped>
.privacy-bg {
    height: calc(var(--i-window-height) - 144px);
    display: flex;
    flex-direction: column;

}

.privacy-top-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 40px 40px 0 40px;
    border-bottom: 1px solid #D0D5DD;
}

.privacy-label {

}

.privacy-label span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.privacy-tips {
    padding-bottom: 24px;
}

.privacy-tips span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

.privacy-profile-container {
    margin: 24px 40px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

}

.privacy-profile-l span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #101828;
}

.privacy-profile-r{
    margin-left: 115px;
}

.privacy-profile-r span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* or 133% */


    /* Grey/500 */

    color: #667085;

}

.privacy-alerts-container{
    margin: 24px 40px;
}

.privacy-alerts-label{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #101828;
}

.privacy-alert{
    margin-top: 25px;

}

.privacy-alert-t{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.privacy-alert-label{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #101828;

}
.privacy-alert-line{
    width: 420px;
    height: 1px;
    background-color: #D0D5DD;
    margin: 0 15px;
}


</style>
