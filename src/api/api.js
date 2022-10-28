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
export const DEALS_LIST = (params) => get('deals/dealsList', params)

// 获取广告列表
// export const ADS_LIST = (params) => get('ad/list', params)
export const ADS_LIST = (params) => get('chrome/list', params)

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

export const FOND_PASSWORD_BY_PHONE = (params) => post('user/findPassword', params)

export const FOND_PASSWORD_BY_EMAIL = (params) => post('email/findPassword', params)

export const SYNC_GET_BUSINESS_INFO = (params) => get('sync/userInfo', params)

export const SYNC_BUSINESS_INFO = (params) => post('home/syncUserInfo', params)

export const ZOHO_SYNC = (params) => post('zoho/sync', params)

export const EVENTS_LIST = (params) => get('event/eventList', params)

export const EVENTS_DETAIL = (params) => get('event/detail', params)

export const EVENTS_ADD_APPLICANTS = (params) => post('home/addApplicants', params)

export const EVENTS_ADD_EVENT = (params) => post('event/addEvent', params)

export const EVENTS_MY_EVENT = (params) => get('myEvent', params)

export const EVENTS_CATEGORY = (params) => get('home/eventCategory', params)

export const EVENTS_TAGS = (params) => get('home/tagList', params)

export const GET_COUNTRY_LIST = (params) => get('getCountry', params)

export const GET_ADS_CATEGORY_LIST = (params) => get('home/adCategoryList', params)

// export const GET_ADS_CATEGORY_INFO = (params) => get('ad/categoryInfo', params)
export const GET_ADS_CATEGORY_INFO = (params) => get('chrome/categoryInfo', params)

// export const GET_MY_ADS = (params) => get('ad/myAds', params)
export const GET_MY_ADS = (params) => get('chrome/myAds', params)

// export const SET_USER_ADS = (params) => post('ad/setUserAds', params)
export const SET_USER_ADS = (params) => post('chrome/setUserAds', params)

// version 2
//邮箱 + 验证码  + 密码 注册
export const EMAIL_REGISTER_V2 = (params) => post('home/email/register',params)
//手机号 + 验证码 + 密码 注册
export const PHONE_REGISTER_V2 = (params) => post('home/phone/register',params)
// 手机号 + 验证码 登录
export const LOGIN_PHONE_SMS_V2 = (params) => post('home/login/phone/sms',params)
// 邮箱 —— 密码 登录
export const LOGIN_EMAIL_PWD_V2 = (params) => post('home/login/email/pwd',params)
// 手机号 + 密码登录
export const LOGIN_PHONE_PWD_V2 = (params)=>post('home/login/phone/pwd',params)

// 更新 user contact 信息
export const USER_CONTACT_EDIT_V2 = (params) => post('home/user/contact/edit',params)
// 更新 educator contact 信息
export const EDUCATOR_CONTACT_EDIT_V2 = (params) => post('home/educator/profile/edit',params)
// 用户添加 company contact
export const COMPANY_CONTACT_EDIT_V2 = (params) => post('home/user/company/contact/edit',params)
// 新增 编辑 certification
export const USER_CERTIFICATION_EDIT_V2 = (params) => post('home/user/certification/edit',params)

// 通过登录token获取用户信息
export const USER_INFO_BY_TOKEN_V2 = (params) => get('home/user/info',params)

//用户上传图片【6张图相册】
export const ADD_USER_IMG_V2 = (params) => post('home/user/addUserImg',params)

//添加语言技能并打分
export const ADD_LANGUAGE_SCORE_V2 = (params) => post('home/user/addLanguageScore',params)

//Educator 新增&修改工作经历
export const ADD_USER_WORK_V2 = (params) => post('home/user/addUserWork',params)

//Educator添加教育经历【新增&编辑】
export const ADD_USER_EDUCATION_V2 = (params) => post('home/user/addUserEducation',params)

//添加【User】多选项
export const ADD_PROFILE_V2 = (params) => post('home/user/addObject',params)

//切换身份
export const SWITCH_IDENTITY_V2 = (params) => post('home/user/switch/identity',params)

//新增/编辑 Recruiting Company
export const RECRUITER_COMPANY_EDIT_V2 = (params) => post('home/user/recruiting/company/edit',params)

//#4D698E 新增/编辑 School Company
export const SCHOOL_COMPANY_EDIT_V2 = (params) => post('home/user/school/company/edit',params)

//新增/编辑 Other Company
export const OTHER_COMPANY_EDIT_V2 = (params) => post('home/user/other/company/edit',params)

//新增/编辑 Vendor Company
export const VENDOR_COMPANY_EDIT_V2 = (params) => post('home/user/vendor/company/edit',params)

//游客用户获取用户信息
export const USER_INFO_VISITOR_V2 = (params) => get('home/visitor/info',params)

// 返回用户所有身份
export const USER_ALL_IDENTITY_V2 = (params) => get('home/user/all/identity',params)

// Educator contact完整度
export const EDUCATOR_PERCENTAGE_V2 = (params) => get('home/user/educator/calculate',params)

//School Company完整度
export const SCHOOL_PERCENTAGE_V2 = (params) => get('home/user/school/company/calculate',params)

//Recruiting Company完整度
export const RECRUITER_PERCENTAGE_V2 = (params) => get('home/user/recruiting/company/calculate',params)

//Other Company完整度
export const OTHER_PERCENTAGE_V2 = (params) => get('home/user/other/company/calculate',params)

//Vendor Company完整度
export const VENDOR_PERCENTAGE_V2 = (params) => get('home/user/vendor/company/calculate',params)

// 用户登出
export const LOGOUT_V2 = (params) =>post('home/user/logout',params)

// 找回密码 【Email code】
export const FIND_PASSWORD_BY_EMAIL_V2 = (params) =>post('home/email/findPassword',params)

// 找回密码【phone code】
export const FIND_PASSWORD_BY_PHONE_V2 = (params) =>post('home/user/findPassword',params)

// 上传图片-视频(阿里云OSS)
export const UPLOAD_IMG = (params) =>post('user/uploadImg',params)

// 前台用户分配菜单权限
export const USER_ADD_MENU = (params) =>post('home/user/menu/add',params)

// 前台用户分配菜单权限列表
export const USER_MENU_LIST = (params) => get('home/user/menu/list',params)

// 所有菜单的权限列表
export const ALL_MENU_LIST = (params) => get('home/all/function/menu/list',params)

// 获取用户所有分配出去的权限 去重后的角色
export const ALL_ASSIGN_USERS = (params) => get('home/all/assign/users',params)

// 通过阿里云oss存储
export const UPLOAD_BY_ALI_OSS = (params) => post('user/uploadImg', params)

// 直接存储到服务器上
export const UPLOAD_BY_SERVICE = (params) => post('home/upload/storage', params)

// 管理第三方公司状态下【返回自己公司】
export const COMEBACK_MYSELF = (params) => post('home/user/comeback/myself', params)

// 返回当前用户【分配给】【管理员下的所有company】
export const USER_MENU_COMPANY = (params) => get('home/user/menu/company',params)

// 删除当前用户【分配给】【管理员下的所有company】权限
export const USER_MENU_DELETE = (params) => post('home/user/menu/delete', params)

//获取【创建人】【分配人】【身份】【公司】下的菜单权限
export const USER_ADMIN_MENU_INFO = (params) => get('home/user/company/menu/list',params)

// 删除【创建人】【分配人】【身份】【公司】下的菜单权限
export const USER_ADMIN_DELETE = (params) => post('home/user/company/menu/del', params)

// 用户子身份接口 【Edu新】
export const USER_SUB_IDENTITY_V2 = (params) => get('home/user/sub/identity',params)

//返回已发布职位的国家信息
export const JOBS_COUNTRY_LIST = (params) => get('jobsCountryList', params)

// job applications
export const JOBS_APPLICATIONS = (params) => get('job/getJobResume',params)

// user unread
export const USER_UNREAD = (params) => get('user/unread',params)

// set read
export const SET_READ = (params) => post('user/setRead', params)

// 获取报名【event】人员
export const EVENT_APPLICATIONS = (params) => get('/home/getEventApplicants',params)

// 获取报名【event】人员
export const USER_ALL_INFO = (params) => get('/home/user/all/info',params)

//获取用户发布的【所有的】【职位下】的用户
export const ALL_JOB_RESUME = (params) => get('/job/getAllJobResume',params)

//获取用户发布的【所有的】【职位下】的用户
export const ALL_LANGUAGE_PROFICIENCY = (params) => get('/home/language/proficiency',params)

//向用户发送密码邮件
export const SEND_USER_PRIVATE_PASSWORD = (params) => post('/user/private/password',params)

// 用户申请职位后 更新教育者对职位的状态
export const SET_APPLY_JOB_STATUS = (params) => post('/home/setApplyJobStatus', params)

// 教育者 智能匹配 职位 结果列表
export const EDUCATOR_JOB_MATCH_LIST = (params) => get('/home/educator/matching',params)
