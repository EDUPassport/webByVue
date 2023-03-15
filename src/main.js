import {createApp} from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import {createI18n} from 'vue-i18n'
import xllZhCN from './language/zh-cn'
import xllEnUS from './language/en-us'
import router from "./routes"
import './assets/css/aliIcon/iconfont.css'
import 'animate.css'
import VTypical from 'vue-typical'
import './assets/fonts/index.css'

import {howLong, ymdFormat,ymdFormatTimestamp} from "./utils";
import store from "./store";
import VueSocialSharing from 'vue-social-sharing'

// import gAuthPlugin from 'vue3-google-oauth2'
// import 'amfe-flexible';
import GoEasy from "goeasy";

import Vue3CountryIntl from 'vue3-country-intl';
// 引入css
import 'vue3-country-intl/lib/vue3-country-intl.css'

import VueQrcode from '@chenfengyuan/vue-qrcode';

import VueClipboard from 'vue-clipboard2'

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

for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

app.component(Vue3CountryIntl.name, Vue3CountryIntl)
app.component(VueQrcode.name, VueQrcode)

app.use(router)
app.use(store)
app.use(ElementPlus, {locale: en, size:'default', zIndex: 2000})
app.use(i18n)
app.use(VTypical, {
    /* options */
})
app.use(VueSocialSharing)

VueClipboard.config.autoSetContainer = true // add this line

app.use(VueClipboard)

// let gAuthClientId = '898474067102-m3svsfqjshsqcuv2dde0sbmlb1rsq0ca.apps.googleusercontent.com'
// const gAuthOptions = {clientId:gAuthClientId,scope:'email',prompt:'consent',fetch_basic_profile:false}
// app.use(gAuthPlugin,gAuthOptions)

app.config.globalProperties.$store = store
app.config.globalProperties.$filters = {
    formatPriceDescription(value){
      if(value){
          return value.split('||')
      }
    },
    newsDateFormat(value){
        if(value){
            let eParse = new Date(value.replace(/-/g,"/"))
            return ymdFormat(eParse,'en-US')
        }
    },
    ymdFormatTimestamp(value){
        return ymdFormatTimestamp(value,'en-US')
    },
    howLongFormat(value){
        if(value){
            let eParse = Date.parse(value.replace(/-/g,"/")) / 1000
            return howLong(eParse,'en-US')
        }
    },
    ymdFormatEvent(timeStr){
        let monthArr = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Spt.", "Oct.", "Nov.", "Dec."];

        if(timeStr){
            let time = new Date(timeStr.replace(/-/g,"/"))
            let year = time.getFullYear();
            let month = monthArr[time.getMonth()];
            let day = time.getDate();

            return  month + ' ' + day + ', ' + year;
        }
    },
    timeFormatEvent(startTimeStr,endTimeStr){

        if(startTimeStr && endTimeStr){
            let startTime =  new Date(startTimeStr.replace(/-/g,"/"));
            let endTime =  new Date(endTimeStr.replace(/-/g,"/"));

            let startHourTag = startTime.getHours()>11 ? 'pm' : 'am';
            let startHour = startTime.getHours() > 12 ? startTime.getHours()-12 : startTime.getHours();
            let startMin = startTime.getMinutes() < 10 ? "0"+startTime.getMinutes() : startTime.getMinutes();

            let endHourTag = endTime.getHours()>11 ? 'pm' : 'am';
            let endHour = endTime.getHours() > 12 ? endTime.getHours()-12 : endTime.getHours();
            let endMin = endTime.getMinutes() < 10 ? "0"+endTime.getMinutes() : endTime.getMinutes();

            return  startHour+':'+startMin + '' + startHourTag + ' - '+ endHour+':'+endMin+''+endHourTag;
        }
    },
    compareTimeWithCurrentTime(time){
        let timeStr = time.replace(/-/g,"/")

        let myDate = new Date();
        let year = myDate.getFullYear()
        let month = myDate.getMonth()  + 1
        let day = myDate.getDate()
        let mTime = year + '-' + month + '-' + day;
        let mDate = new Date(mTime)
        let aDate = new Date(timeStr)

        return aDate.getTime() < mDate.getTime();

    },
    doRepAdvance(s){
        if(s){
            let str=s.replace(/(\n)/g, " ");
            str=str.replace(/(\t)/g, " ");
            str=str.replace(/(\r)/g, " ");
            str=str.replace(/<\/?[^>]*>/g, " ");
            // str=str.replace(/\s*/g, "");
            str=str.replace(/<\/?.+?\/?>/g, "");
            return str;
        }

    },
    countryInfoFormat(value){
        // console.log(value)
        if(value){
            let valueParse = JSON.parse(value)
            console.log(valueParse)
            let str = ''
            let countryNameEn = valueParse.country_name_en ? valueParse.country_name_en : ''
            // let countryNameCn = valueParse.country_name_cn
            let provinceNameEn = valueParse.province_name_en ? valueParse.province_name_en : ''
            // let provinceNameCn  = valueParse.province_name_cn
            let cityNameEn = valueParse.city_name_en ? valueParse.city_name_en : ''
            // let cityNameCn = valueParse.city_name_cn
            let districtNameEn = valueParse.district_name_en ? valueParse.district_name_en : ''
            // let districtNameCn = valueParse.district_name_cn

            if(countryNameEn){
                str = countryNameEn
            }
            if(countryNameEn && provinceNameEn){
                str = provinceNameEn + ', ' + countryNameEn
            }

            if(countryNameEn && provinceNameEn && cityNameEn){
                str =  provinceNameEn + ', ' + cityNameEn + ', ' + countryNameEn
            }
            if(countryNameEn && provinceNameEn && cityNameEn && districtNameEn){
                str =  provinceNameEn + ', ' + cityNameEn + ', '+districtNameEn + ', ' + countryNameEn
            }
            return str;

        }
    },
    userObjectFormat(value){
        if(value){
            let arr = []
            value.forEach(item=>{
                arr.push(item.object_en)
            })
            if(arr.length>0){
                return arr.join(', ');
            }else{
                return '';
            }

        }else{
            return '';
        }
    },
    textEllipsis(value,len=180){
        if(!value){
            return ''
        }
        if(len === -1){
            return value;
        }

        if(value.length > len){
            return value.slice(0,len) + '...'
        }

        return value;
    },
    textEllipsisStatus(value,len){
        if(value){
            return value.length > len;
        }

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

app.config.globalProperties.validForbid = function (value) {
    value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
    return value;
}

const goEasy = GoEasy.getInstance({
    host:'hangzhou.goeasy.io',//应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
    appkey: 'BC-875758c621384be0b4072dff74c062fd',// common key
    modules:["im"]
})

app.provide('GoEasy', GoEasy)
app.provide('goEasy', goEasy)

app.config.globalProperties.$cookies = VueCookies

app.mount('#app')