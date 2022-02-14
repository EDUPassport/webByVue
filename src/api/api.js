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
export const COMPANY_JOB_LIST = (params) => get('job/companyJobs', params)

// sub cate list
export const SUB_CATE_LIST = (params) => get('weixin/subCateList', params)

// sub cate lists
export const SUB_CATE_LISTS = (params) => get('weixin/subCateLists', params)
// deals events tags list
export const TAGS_LIST = (params) => get('home/tagList', params)

//deals area list
export const DEALS_AREA_LIST = (params) => get('deals/dealsAreaList', params)

//申请职位
export const APPLY_JOBS = (params) => post('job/applyJobs', params)

// 获取省市区
export const ALL_AREAS = (params) => get('getAreas', params)

//user/addEduBasic
export const ADD_EDU_BASIC = (params) => post('user/addEduBasic', params)

// getBasicInfo
export const GET_BASIC_INFO = (params) => get('user/info', params)

//visitor/userInfo
export const VISITOR_USER_INFO = (params) => get('visitor/userInfo', params)

//user/addLanguageScore
export const ADD_LANGUAGE_SCORE = (params) => post('user/addLanguageScore', params)

// add profile
export const ADD_PROFILE = (params) => post('user/addProfile', params)

//user/addUserEducation
export const ADD_USER_EDUCATION = (params) => post('user/addUserEducation', params)

//user/addUserWork
export const ADD_USER_WORK = (params) => post('user/addUserWork', params)

//user addUserInfo
export const ADD_USER_INFO = (params) => post('user/addUserInfo', params)

//user addUserImg
export const ADD_USER_IMG = (params) => post('user/addUserImg', params)

// 切换身份 huo language
export const CHANGE_IDENTITY_LANGUAGE = (params) => post('weixin/change', params)

//addBusinessBasic
export const ADD_BUSINESS_BASIC = (params) => post('user/addBusinessBasic', params)

//addVendorBasic
export const ADD_VENDOR_BASIC = (params) => post('user/addVendorBasic', params)

//job addprofile
export const JOB_ADD_PROFILE = (params) => post('job/addProfile', params)

//add job
export const ADD_JOB = (params) => post('job/add', params)

// my jobs
export const MY_JOBS = (params) => get('job/myJobs', params)

// tags list
export const TAG_LIST = (params) => get('home/tagList', params)
//tag is exists
export const TAG_IS_EXISTS = (params) => get('home/tagIsExists', params)
//add deals
export const ADD_DEALS = (params) => post('deals/addDeals', params)

//mydeals
export const MY_DEALS = (params) => get('myDeals', params)

//deals detail
export const DEALS_DETAIL = (params) => get('deals/detail', params)

// featured deals list
export const FEATURED_DEALS_LIST = (params) => get('home/featuredDealsList', params)

//get system info
export const GET_SYSTEM_INFO = (params) => get('home/getSystemInfo', params)

//add favorite
export const ADD_FAVORITE = (params) => post('favorite/addFavorite', params)

//six logos
export const SIX_LOGO_LIST = (params) => get('home/getSixLogo', params)

//jobsarealist
export const JOBS_AREA_LIST = (params) => get('deals/jobsAreaList', params)

//add subscribe email
export const ADD_SUBSCRIBE_EMAIL = (params) => post('home/addSubscribeEmail', params)

//getFavoriteList
export const GET_FAVORITE_LIST = (params) => get('favorite/getFavoriteList', params)

//cancel favorite
export const CANCEL_FAVORITE = (params) => post('favorite/cancelFavorite', params)

//es search
export const ES_SEARCH = (params) => get('home/es', params)

//
export const UPDATE_EDUCATOR_PROFILE = (params) => post('user/updateEduProfile', params)

//
export const UPDATE_BUSINESS_PROFILE = (params) => post('user/updateBusProfile', params)

//
export const UPDATE_VENDOR_PROFILE = (params) => post('user/updateVendorProfile', params)

// is favorite
export const IS_FAVORITE = (params) => post('favorite/isFavorite', params)

export const MY_APPLY_JOBS = (params) => get('job/myApplyJobs', params)

export const BLOG_LIST = (params) => get('home/blogList', params)

export const BLOG_DETAIL = (params) => get('home/blog', params)

export const ADD_BLOG_COMMENT = (params) => post('home/addBlogComment', params)

export const BLOG_CATEGORY_LIST = (params) => get('home/blogCategoryList', params)

export const CONTACT_US = (params) => post('contact/contactUs', params)

export const INTERNATIONAL_REGISTER = (params) => get('international/register', params)

export const LINKEDIN_CODE = (params) => get('home/linkedin', params)

export const ADD_TO_CHAT = (params) => post('chat/addChat', params)

export const H5_LOGIN = (params) => post('h5/login', params)

export const WEIXIN_SEND_SMS = (params) => get('weixin/sendSms', params)

export const PAY_PAYPAL = (params) => get('pay/paypal', params)

export const PAY_PAYPAL_CALLBACK = (params) => get('paypal/callback', params)

export const MEMBER_VIP_LIST = (params) => get('home/vipList', params)