// 封装后台接口方法
import {get, post, put, del, uploader} from '../axios/index'

export const LOGIN = (params) => get('service-core/wechat/serviceAccount/qrCode/create', params, false)
export const REGISTER = (params) => put('service-core/user_register', params, false)
export const USER_LIST = (params) => post('service-core/user_list', params)
export const USER_LIST_ID = (params) => get(`service-core/user_list/${params.id}`)
export const UPLOAD_USER_CARD = (params) => uploader('service-core/user_upload_card', params)
export const DELETE_BOOK = (params) => del(`service-core/book_list/${params.id}`)

export const JOB_LIST = (params) => get('job/jobList', params)
export const JOB_FEATURED_LIST = (params) => get('featureList',params)
export const BUSINESS_LIST = (params)=>post('business/list',params)

// 使用邮箱获取验证码
export const SEND_EMAIL_CODE = (params) => post('email/sendEmailCode', params)
// 使用邮箱注册
export const EMAIL_REGISTER = (params) => post('email/register', params)
// 使用邮箱登录
export const EMAIL_LOGIN = (params) => post('email/login',params)

// 获取deals列表
export const DEALS_LIST = (params) => post('deals/dealsList',params)

// 获取广告列表
export const ADS_LIST = (params) => get('ad/list',params)
