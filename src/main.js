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

import { LocationFilled,Stopwatch ,Calendar,ArrowRightBold,Share } from '@element-plus/icons'

import {howLong, ymdFormat,ymdFormatTimestamp} from "./utils";
import store from "./store";

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


const app = createApp(App)
app.component('LocationFilled',LocationFilled )
app.component('Stopwatch',Stopwatch )
app.component('Calendar',Calendar )
app.component('ArrowRightBold',ArrowRightBold )
app.component('Share',Share)

app.use(router)
app.use(store)
app.use(ElementPlus, {locale: zhCn, size: 'small', zIndex: 2000})
app.use(i18n)
app.use(VTypical, {
    /* options */
})


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
app.mount('#app')
