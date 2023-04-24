<template>

    <div style="max-width:1920px;margin:0 auto;">
        <router-view></router-view>
    </div>

</template>

<script>

import {onBeforeUnmount, onMounted, getCurrentInstance} from 'vue'
const version = require('../public/verison.json')
export default {
    name: 'App',
    setup() {
        const instance = getCurrentInstance()
        const instanceData = instance.appContext.config.globalProperties
        const checkVersion = ()=>{

            if(instanceData.$cookies.isKey('version')){
                if(version.version !== instanceData.$cookies.get('version')){
                    instanceData.$cookies.set('version',version.version)
                    window.location.reload()
                }
            }else{
                instanceData.$cookies.set('version',version.version)
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

            // let checkVV = window.setInterval(function () {
            //     checkVersion()
            //
            //     if(instanceData.$cookies.isKey('version')){
            //         if(version.version === instanceData.$cookies.get('version')){
            //            window.clearInterval(checkVV)
            //         }
            //     }
            //
            // }, 6000)

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

    },
    data() {
        return {}
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
    font-family: BCSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

h2 {
    font-size: 35px;
    font-family: BSemiBold, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

h3 {
    font-size: 30px;
    font-family: BSemiBold, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

h4 {
    font-size: 24px;
    font-family: BCM, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

h5 {
    font-size: 22px;
    font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

    color: #262626;
}

button {
    font-family: BCM, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

input {
    font-size: 18px;
}

</style>
