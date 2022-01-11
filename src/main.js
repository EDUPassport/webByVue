import {createApp} from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '../theme/index.css'
import './style/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import 'element-plus/theme-chalk/index.css'

import {createI18n} from 'vue-i18n'
import xllZhCN from './language/zh-cn'
import xllEnUS from './language/en-us'
import router from "./routes"
import './assets/css/aliIcon/iconfont.css'
import 'animate.css'
import VTypical from 'vue-typical'
// import './assets/font/font.css'

import { LocationFilled,Stopwatch ,Calendar,ArrowRightBold,Share,Edit,ArrowDown,Menu,ChatLineSquare,
    MoreFilled, Mic,Picture, VideoCamera ,Folder} from '@element-plus/icons'

import {howLong, ymdFormat,ymdFormatTimestamp} from "./utils";
import store from "./store";
import VueSocialSharing from 'vue-social-sharing'

import gAuthPlugin from 'vue3-google-oauth2'
import GoEasy from "goeasy";
import IMService from "./assets/lib/imservice";

const messages = {
    en: {
        message: xllEnUS
    },
    ch: {
        message: xllZhCN
    }
}


const i18n = createI18n({
    locale: 'ch', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})

const goEasy = GoEasy.getInstance({
    host:'hangzhou.goeasy.io',//应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
    appkey: 'BC-875758c621384be0b4072dff74c062fd',// common key
    modules:["im"]
});

const app = createApp(App)
app.component('LocationFilled',LocationFilled )
app.component('Stopwatch',Stopwatch )
app.component('Calendar',Calendar )
app.component('ArrowRightBold',ArrowRightBold )
app.component('Share',Share)
app.component('edit',Edit)
app.component('ArrowDown',ArrowDown)
app.component('Menu',Menu)
app.component('ChatLineSquare',ChatLineSquare)
app.component('MoreFilled',MoreFilled)
app.component('Mic',Mic)
app.component('Picture',Picture)
app.component('VideoCamera',VideoCamera)
app.component('Folder',Folder)

app.use(router)
app.use(store)
app.use(ElementPlus, {locale: zhCn, size: 'small', zIndex: 2000})
app.use(i18n)
app.use(VTypical, {
    /* options */
})
app.use(VueSocialSharing)

let gAuthClientId = '898474067102-m3svsfqjshsqcuv2dde0sbmlb1rsq0ca.apps.googleusercontent.com'
const gAuthOptions = {clientId:gAuthClientId,scope:'email',prompt:'consent',fetch_basic_profile:false}
app.use(gAuthPlugin,gAuthOptions)

app.config.globalProperties.$filters = {
    newsDateFormat(value){
        let eParse = new Date(value)
        // console.log(eParse)
        return ymdFormat(eParse,'en-US')
    },
    ymdFormatTimestamp(value){
        return ymdFormatTimestamp(value,'en-US')
    },
    howLongFormat(value){
        let eParse = Date.parse(value) / 1000
        return howLong(eParse,'en-US')
    }
}
app.config.globalProperties.formatDate = function (t) {
    t = t || Date.now();
    let time = new Date(t);
    let str = time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
    str += '-';
    str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
    str += ' ';
    str += time.getHours();
    str += ':';
    str += time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
    return str;
}

app.config.globalProperties.GoEasy = GoEasy
app.config.globalProperties.goEasy = goEasy
app.config.globalProperties.service = new IMService(goEasy,GoEasy)

app.mount('#app')
