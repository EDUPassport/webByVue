import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import '../theme/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createI18n } from 'vue-i18n'
import xllZhCN from './language/zh-cn'
import xllEnUS from './language/en-us'
import router from "./routes"
import './assets/css/aliIcon/iconfont.css'

const messages = {
    en: {
      message: xllEnUS
    },
    ch: {
      message:xllZhCN
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

app.use(router)
app.use(ElementPlus, {  locale: zhCn, size: 'small', zIndex: 2000 })
app.use(i18n)

app.mount('#app')
