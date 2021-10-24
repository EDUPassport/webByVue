// 封装后台接口方法
import {get, post, put, del, uploader} from '../axios/index'

export const LOGIN = (params) => get('service-core/wechat/serviceAccount/qrCode/create', params, false)
export const REGISTER = (params) => put('service-core/user_register', params, false)
export const USER_LIST = (params) => post('service-core/user_list', params)
export const USER_LIST_ID = (params) => get(`service-core/user_list/${params.id}`)
export const UPLOAD_USER_CARD = (params) => uploader('service-core/user_upload_card', params)
export const DELETE_BOOK = (params) => del(`service-core/book_list/${params.id}`)

export const JOB_LIST = (params) => get('job/jobList', params)
export const JOB_FEATURED_LIST = (params) => get('featureList', params)
export const BUSINESS_LIST = (params) => post('business/list', params)

// 使用邮箱获取验证码
export const SEND_EMAIL_CODE = (params) => post('email/sendEmailCode', params)
// 使用邮箱注册
export const EMAIL_REGISTER = (params) => post('email/register', params)
// 使用邮箱登录
export const EMAIL_LOGIN = (params) => post('email/login', params)

// 获取deals列表
export const DEALS_LIST = (params) => post('deals/dealsList', params)

// 获取广告列表
export const ADS_LIST = (params) => get('ad/list', params)

// 获取 user objectlist
export const USER_OBJECT_LIST = (params) => get('user/userObjectList', params)

// 获取职位详情
export const JOB_DETAIL = (params) => get('job/detail', params)

// 获取公司职位列表
export const COMPANY_JOB_LIST = (params) => get('job/companyJobs',params)

// sub cate list
export const SUB_CATE_LIST = (params) =>get('weixin/subCateList',params)

// sub cate lists
export const SUB_CATE_LISTS = (params) => get('weixin/subCateLists',params)
// deals events tags list
export const TAGS_LIST = (params) => get('home/tagList',params)

//deals area list
export const DEALS_AREA_LIST = (params) => get('deals/dealsAreaList',params)

//申请职位
export const APPLY_JOBS = (params) => post('job/applyJobs',params)

// 获取省市区
export const ALL_AREAS = (params) => get('getAreas',params)

//user/addEduBasic
export const ADD_EDU_BASIC = (params) => post('user/addEduBasic',params)

// getBasicInfo
export const GET_BASIC_INFO = (params) => get('user/info',params)

//visitor/userInfo
export const VISITOR_USER_INFO = (params) =>get('visitor/userInfo',params)

//user/addLanguageScore
export const ADD_LANGUAGE_SCORE = (params) => post('user/addLanguageScore',params)

// add profile
export const ADD_PROFILE = (params) => post('user/addProfile',params)

//user/addUserEducation
export const ADD_USER_EDUCATION = (params) =>post('user/addUserEducation',params)

//user/addUserWork
export const ADD_USER_WORK = (params) =>post('user/addUserWork',params)

//user addUserInfo
export const ADD_USER_INFO = (params)=>post('user/addUserInfo',params)

//user addUserImg
export const ADD_USER_IMG = (params) => post('user/addUserImg',params)

// 切换身份 huo language
export const CHANGE_IDENTITY_LANGUAGE = (params)=>post('weixin/change',params)

//addBusinessBasic
export const ADD_BUSINESS_BASIC = (params)=>post('user/addBusinessBasic',params)

//addVendorBasic
export const ADD_VENDOR_BASIC = (params)=>post('user/addVendorBasic',params)