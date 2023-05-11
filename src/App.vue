<template>

    <div style="max-width:1920px;margin:0 auto;">
        <router-view></router-view>
        <div v-if="showCookiePopup" class="cookie-popup">
            <p>We use cookies to provide the best user experience. Click the button below to accept our cookie policy.</p>
            <el-button type="success" @click="acceptCookie">Accept Cookies</el-button>
        </div>

    </div>

</template>

<script>
import VueCookies from 'vue-cookies'
import {ref, onBeforeUnmount, onMounted} from 'vue'
const version = require('../public/verison.json')
export default {
    name: 'App',
    setup() {
        const showCookiePopup = ref(false)
        // 检查是否已经接受了cookie
        const checkCookie = ()=>{
            if(!VueCookies.isKey('cookie_accepted')){
                showCookiePopup.value = true;
            }else{
                if(!VueCookies.get('cookie_accepted')){
                    showCookiePopup.value = true;
                }
            }
        }

        // 接受cookie
        const acceptCookie = ()=>{
            VueCookies.set('cookie_accepted',true)
            showCookiePopup.value = false;
        }

        // const instance = getCurrentInstance()
        // const instanceData = instance.appContext.config.globalProperties
        const checkVersion = ()=>{

            if(VueCookies.isKey('version')){
                if(version.version !== VueCookies.get('version')){
                    VueCookies.set('version',version.version)
                    window.location.reload()
                }
            }else{
                VueCookies.set('version',version.version)
                window.location.reload()
            }
        }

        function updateWindowHeight() {
            let windowHeight = window.innerHeight;
            let html = document.querySelector(":root");
            if (windowHeight > 0 && html) {
                html.style.setProperty("--i-window-height", `${windowHeight}px`);
            }
        }

        onMounted(() => {
            checkCookie()
            checkVersion()
            updateWindowHeight();
            window.addEventListener('resize', () => {
                updateWindowHeight();
            })

        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', () => {
                updateWindowHeight();
            })

        });

        return {
            showCookiePopup,
            acceptCookie
        }

    }

}
</script>

<style>

:root {
    --i-window-height: 100vh;
}

#app {
    background-color: #F0F2F5;
}

/*css 初始化 */
html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img {
    margin: 0;
    padding: 0;
}

h1 {
    font-size: 45px;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

h2 {
    font-size: 35px;
    font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

h3 {
    font-size: 30px;
    font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
h4{
  font-size: 24px;
  font-family: Inter, 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
}

h5{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
}

button {
    font-family: Inter,BCM, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

input {
    font-size: 18px;
}

.cookie-popup {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    border-top: 1px solid #f0f0f0;

    text-align: center;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 40px;
}

.cookie-popup p{
    font-family: Inter;
}

.cookie-popup button {
    font-size: 12px;
    margin-left: 20px;
}

</style>
