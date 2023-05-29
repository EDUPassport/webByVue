// 一、配置axios
import axios from 'axios'
// import {ElMessage} from "element-plus";
import {ElLoading} from "element-plus";
import store from '@/store/index'

let baseUrl = process.env.VUE_APP_URL
// axios配置
axios.defaults.baseURL = baseUrl
// 设置请求最大时长
axios.defaults.timeout = 30000
// axios.defaults.withCredentials = true
// 请求拦截器，设置token
axios.interceptors.request.use(config => {

    let reqWhiteList = [
        'user/unread/list',
        'user/unread',
        'home/user/question/show',
        'home/user/menu/list',
        'home/user/educator/company/calculate',
        'home/user/recruiting/company/calculate',
        'home/user/school/company/calculate',
        'home/user/other/company/calculate',
        'home/user/vendor/company/calculate',
    ]

    if(reqWhiteList.indexOf(config.url) === -1){

        //设置取消请求的cancel token
        config.cancelToken = new axios.CancelToken(cancel=>{
            // 存入数组
            store.commit('pushAxiosPromiseArr', cancel)
        })

    }

    const token = localStorage.getItem('token');
    const sourceUrl = window.location.href;

    if (token && token != '') {
        config.headers.token = token
        // token && (config.headers.Authorization = token)
    }
    config.headers.source = sourceUrl;
    config.headers.platform = 4;
    return config
}, error => {
    // 可以安装element ui等ui组件，将错误信息输出到界面。
    // console.log(error)
    return Promise.error(error)
})

// 添加响应拦截器
// axios.interceptors.response.use(response => {
//         return Promise.resolve(response.data)
//     }
//     )

// 响应拦截器
axios.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if(response && response.data){
        return Promise.resolve(response.data)
    }else{
        return Promise.reject();
    }
    // if(response && response.data){
    //     return Promise.resolve(response.data)
    // }else{
    //     return Promise.reject();
    // }

}, error => {
    // 我们可以在这里对异常状态作统一处理
    let errResponse = error.response
    if(errResponse){
        let status = errResponse.status

        if (status === 401) {
            localStorage.clear()
            const loadingInstance =  ElLoading.service({
                text:'The login information has expired, please login again'
            })
            setTimeout(function () {
                loadingInstance.close()
                window.location.href = '/login'
            },500)

            return Promise.reject();
        } else {
            return Promise.reject(error.response.data);
        }

    }

    // 对响应错误做点什么
    if (!errResponse) {
        return Promise.reject();
    }
})

// 2、封装请求方式
// @param url 接口地址
// @param data 携带参数
// @param file 上传文件对象
// @param auth 是否携带token
// get请求
export function get(url, data) {
    return axios.get(url, {
        params: data
    })
}

// post请求
export function post(url, data) {
    return axios.post(url, data)
}

// put请求
export function put(url, data) {
    return axios.put(url, data)
}

// delete 请求
export function del(url, data) {
    return axios.delete(url, data)
}

// upload 请求
export function uploader(url, file) {
    let params = new FormData()
    params.append('file', file)
    return axios.post(url, params)
}