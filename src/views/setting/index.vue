<template>
    <div class="setting-bg">
        <div class="setting-label">
            Setting
        </div>
        <div class="switch-container" >
            <template v-if="identity == 6">
                <div class="switch-contributor">
                    Update your Account Information
                </div>

            </template>
            <template v-else>
                <div class="switch-item switch-item-l"
                     :class="sPathName === '/setting/account' ? 'switch-item-active' : '' "
                     @click="turnAccount()">
                    <span>Account</span>
                </div>
                <div class="switch-item switch-item-m"
                     :class="sPathName === '/setting/profile/educator' ||
         sPathName === '/setting/profile/recruiter' ||
         sPathName === '/setting/profile/school' ||
         sPathName === '/setting/profile/other' ||
         sPathName === '/setting/profile/vendor'
         ? 'switch-item-active' : '' "
                     @click="turnProfile()">
                    <span>Profile</span>
                </div>
                <div class="switch-item switch-item-r"
                     :class="sPathName === '/setting/privacy' ? 'switch-item-active' : '' "
                     @click="turnPrivacy()">
                    <span>Privacy</span>
                </div>
            </template>

        </div>

        <router-view></router-view>

    </div>
</template>

<script>
import {onBeforeRouteUpdate, useRouter} from 'vue-router'
import {ref,computed} from 'vue'
import {useStore} from 'vuex'

export default {
    name: "index",
    setup() {
        const router = useRouter()
        const store = useStore()
        const identity = computed(() => store.state.identity)

        const sPathName = ref(window.location.pathname)
        // console.log(sPathName)
        onBeforeRouteUpdate((to) => {
            // console.log(from, to)
            sPathName.value = to.path
        })

        function turnAccount() {
            router.push({path: '/setting/account'})
        }

        function turnProfile() {

            if (identity.value == 1) {
                router.push({path: '/setting/profile/educator'})
            }
            if (identity.value == 2) {
                router.push({path: '/setting/profile/recruiter'})
            }
            if (identity.value == 3) {
                router.push({path: '/setting/profile/school'})
            }
            if (identity.value == 4) {
                router.push({path: '/setting/profile/other'})
            }
            if (identity.value == 5) {
                router.push({path: '/setting/profile/vendor'})
            }

        }

        function turnPrivacy() {
            router.push({path: '/setting/privacy'})
        }

        return {
            sPathName,
            turnAccount,
            turnProfile,
            turnPrivacy,
            identity
        }

    }
}
</script>

<style scoped>
.setting-bg {
    background-color: #FFFFFF;
    height: var(--i-window-height);
}

.setting-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    color: #000000;
    padding: 40px 0 0 40px;
}

.switch-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 30px 0 0 40px;
}
.switch-contributor{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;

}
.switch-item {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 89px;
    height: 42px;
    background: #FFFFFF;
    cursor: pointer;
}

.switch-item-l {
    border-left: 1px solid #D0D5DD;
    border-top: 1px solid #D0D5DD;
    border-bottom: 1px solid #D0D5DD;
    border-radius: 8px 0px 0px 8px;
}

.switch-item-m {
    border: 1px solid #D0D5DD;
}

.switch-item-r {
    border-right: 1px solid #D0D5DD;
    border-bottom: 1px solid #D0D5DD;
    border-top: 1px solid #D0D5DD;
    border-radius: 0px 8px 8px 0px;
}

.switch-item span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    /* identical to box height, or 129% */

    text-align: right;

    /* Grey/800 */

    color: #1D2939;
}

.switch-item:hover {
    background: #F2F4F7;
}

.switch-item-active {
    background: #F2F4F7;
}
</style>
