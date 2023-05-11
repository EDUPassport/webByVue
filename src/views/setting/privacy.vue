<template>
    <div class="privacy-bg">

        <div class="privacy-top-container">
            <div class="privacy-label">
                <span>Privacy</span>
            </div>
            <div class="privacy-tips">
                <span>Privacy Privacy Privacy Privacy Privacy Privacy Privacy!</span>
            </div>

        </div>

        <div class="privacy-profile-container" v-if="identity == 1">
            <div class="privacy-profile-l">
                <span>Profile Visibility</span>
            </div>
            <div class="privacy-profile-r">
                <el-checkbox
                        v-model="profileVisibleValue"
                        @change="profileVisibleChange"
                        label="Make my profile visible to others"/>
                <br>
                <span>
                    <el-icon><Warning/></el-icon>
                    Your profile is no longer visible from the candidate pool
                </span>
            </div>

        </div>

<!--        <div class="privacy-profile-container" v-if="identity == 2 || identity == 3 || identity == 4">-->
<!--            <div class="privacy-profile-l">-->
<!--                <span>Job Post Visibility</span>-->
<!--            </div>-->
<!--            <div class="privacy-profile-r">-->
<!--                <el-radio-group v-model="jobPostVisible">-->
<!--                    <el-radio label="1">Candidates on Favourites</el-radio>-->
<!--                    <el-radio label="2">Everyone</el-radio>-->
<!--                </el-radio-group>-->
<!--            </div>-->

<!--        </div>-->

        <div class="privacy-alerts-container">
            <div class="privacy-alerts-label">
                <span>Notifications & Alerts</span>
            </div>
            <div class="alert-loading-container" v-loading="alertLoadingStatus">
                <div class="privacy-alert" v-for="(item,i) in alertsData" :key="i">
                    <div class="privacy-alert-t">
                        <div class="privacy-alert-label">
                            <span v-if="item.type === '1' "> Job Alerts </span>
                            <span v-if="item.type === '2' "> Event Alerts </span>
                            <span v-if="item.type === '3' "> Deal Alerts </span>
                        </div>
                        <div class="privacy-alert-line"></div>
                        <div class="privacy-alert-icon-container" @click="handleExpandAlert(i)">

                            <el-image
                                    v-if="expandKeysData.indexOf(i) === -1"
                                    class="privacy-alert-icon"
                                    :src="arrowDownIcon">
                            </el-image>
                            <el-image
                                    v-else
                                    class="privacy-alert-icon"
                                    :src="arrowUpIcon">
                            </el-image>

                        </div>
                    </div>
                    <el-collapse-transition>
                        <div class="privacy-alert-b" v-show="expandKeysData.indexOf(i) === -1">
                            <!--                        <el-checkbox-group :model-value="alertCheckedData">-->
                            <div v-for="(cItem,index) in item.data" :key="index">
                                <el-checkbox :label="cItem.value"
                                             :checked="alertCheckedData.indexOf(cItem.id) !== -1"
                                             @change="privacyChange($event,cItem.id)">
                                </el-checkbox>
                            </div>
                            <!--                        </el-checkbox-group>-->
                        </div>
                    </el-collapse-transition>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import arrowDownIcon from '@/assets/newHome/arrow-circle-down.svg'
import arrowUpIcon from '@/assets/newHome/arrow-circle-up.svg'
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import {
    EDUCATOR_VISIBLE_EDIT, EDUCATOR_VISIBLE_STATUS,
    PRIVACY_CATEGORY_ADD,
    PRIVACY_CATEGORY_LIST,
    PRIVACY_USER_SELECTED_LIST
} from "@/api/api";
import {ElLoading} from 'element-plus'

export default {
    name: "privacy",
    components: {},
    data() {
        return {
            arrowUpIcon,
            arrowDownIcon
        }

    },
    setup() {
        const store = useStore()
        const identity = store.state.identity
        const userId = localStorage.getItem('uid')
        const companyId = store.state.currentCompanyId

        const alertLoadingStatus = ref(true)
        const profileVisible = ref(false)
        const alertsData = ref([])
        const jobPostVisible = ref('1')
        const alertCheckedData = ref([])

        const getAlertsDataByIdentity = async () => {
            await PRIVACY_CATEGORY_LIST().then(res => {
                console.log(res)
                if (res.code === 200) {
                    alertsData.value = res.message
                    alertLoadingStatus.value = false
                }

            }).catch(err => {
                console.log(err)
            })

        }

        const expandKeysData = ref([])

        const handleExpandAlert = (i) => {

            let index = expandKeysData.value.indexOf(i)
            if (index === -1) {
                expandKeysData.value.push(i)
            } else {
                expandKeysData.value.splice(index, 1)
            }

        }

        const profileVisibleChange = (e) => {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(255, 255, 255, 0.7)',
            })

            let params = {
                is_visible: e === true ? 1 : 0
            }

            EDUCATOR_VISIBLE_EDIT(params).then(res => {
                console.log(res)
                if (res.code === 200) {
                    console.log('change profile visible success')
                    loading.close()
                }
            }).catch(err => {
                console.log(err)
                profileVisibleValue.value = e === true ? 1 : 0
                loading.close()
            })

        }

        const profileVisibleValue = ref(false)
        const getEducatorVisibleStatus = async () => {
            await EDUCATOR_VISIBLE_STATUS().then(res => {
                console.log(res)
                if (res.code === 200) {

                    profileVisibleValue.value = res.message.is_visible === 1

                }
            }).catch(err => {
                console.log(err)
            })
        }

        const privacyChange = (e, id) => {
            console.log(e, id)
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(255, 255, 255, 0.7)',
            })

            let params = {
                user_id: userId,
                identity: identity,
                companyId: companyId,
                privacy_category_id: id
            }

            PRIVACY_CATEGORY_ADD(params).then(res => {
                // console.log(res)
                if (res.code === 200) {
                    userSelectedPrivacyList()
                    loading.close()
                }

            }).catch(err => {
                console.log(err)
                loading.close()
            })

        }

        const userSelectedPrivacyList = async () => {
            await PRIVACY_USER_SELECTED_LIST().then(res => {
                // console.log(res)
                if (res.code === 200) {
                    let resMessage = res.message
                    resMessage.forEach(item => {
                        let cateId = parseInt(item.privacy_category_id)
                        alertCheckedData.value.push(cateId)
                    })

                }

            }).catch(err => {
                console.log(err)
            })
        }

        onMounted(async () => {
            await getEducatorVisibleStatus()
            await userSelectedPrivacyList()
            await getAlertsDataByIdentity()

        })

        return {
            identity,
            profileVisible,
            jobPostVisible,
            alertsData,
            getAlertsDataByIdentity,
            handleExpandAlert,
            expandKeysData,
            alertCheckedData,
            privacyChange,
            profileVisibleChange,
            alertLoadingStatus,
            profileVisibleValue
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

.privacy-profile-l span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #101828;
}

.privacy-profile-r {
    margin-left: 115px;
}

.privacy-profile-r span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* or 133% */


    /* Grey/500 */

    color: #667085;

}

.privacy-alerts-container {
    margin: 24px 40px;
}

.privacy-alerts-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #101828;
}

.alert-loading-container {
    min-height: 300px;
}

.privacy-alert {
    margin-top: 25px;

}

.privacy-alert-t {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.privacy-alert-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #101828;
    min-width: 80px;

}

.privacy-alert-line {
    width: 420px;
    height: 1px;
    background-color: #D0D5DD;
    margin: 0 15px;
}

.privacy-alert-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

</style>
