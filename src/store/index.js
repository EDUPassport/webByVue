import {createStore} from "vuex";

const store = createStore({
    state() {

        let currentUserStr = localStorage.getItem('currentUser')
        let menuDataStr = localStorage.getItem('menuData')
        let isThirdCompanyValue = localStorage.getItem('is_third_company')
        let companyId = localStorage.getItem('company_id')
        let profilePercentage = localStorage.getItem('profile_percentage')

        let userInfoObj = {
            name:'',
            avatar:'',
            companyName:''
        }
        let userInfoStorage = localStorage.getItem('userInfo')
        let educatorIdentitiesStorage = localStorage.getItem('educatorIdentitiesStorage')
        let recruiterIdentitiesStorage = localStorage.getItem('recruiterIdentitiesStorage')
        let schoolIdentitiesStorage = localStorage.getItem('schoolIdentitiesStorage')
        let otherIdentitiesStorage = localStorage.getItem('otherIdentitiesStorage')
        let vendorIdentitiesStorage = localStorage.getItem('vendorIdentitiesStorage')
        let contributorIdentitiesStorage = localStorage.getItem('contributorIdentitiesStorage')

        return {
            userInfo: userInfoStorage ? JSON.parse(userInfoStorage) : userInfoObj,
            educatorIdentities: educatorIdentitiesStorage ? JSON.parse(educatorIdentitiesStorage) : {},
            recruiterIdentities: recruiterIdentitiesStorage ? JSON.parse(recruiterIdentitiesStorage) : [],
            schoolIdentities: schoolIdentitiesStorage ? JSON.parse(schoolIdentitiesStorage) : [],
            otherIdentities: otherIdentitiesStorage ? JSON.parse(otherIdentitiesStorage) : [],
            vendorIdentities: vendorIdentitiesStorage ? JSON.parse(vendorIdentitiesStorage) : [],
            contributorIdentities: contributorIdentitiesStorage ? JSON.parse(contributorIdentitiesStorage) : [],
            switchIdentityStatus:false,
            username: localStorage.getItem('name'),
            userAvatar: localStorage.getItem('avatar'),
            companyName: '',
            jobCompanyName:'',
            identity: localStorage.getItem('identity'),
            thirdCompanyId:localStorage.getItem('third_company_id'),
            currentUser:currentUserStr ?  JSON.parse(currentUserStr) : '',
            nowChatUserInfo:{},
            showChatStatus:false,
            allIdentityChanged:false,
            menuData:menuDataStr ? JSON.parse(menuDataStr) : [],
            menuDataStatus:false,
            isThirdCompanyStatus: isThirdCompanyValue ? isThirdCompanyValue : 0,
            currentCompanyId: companyId ? companyId : 0,
            imUnreadTotal:0,
            profilePercentage:profilePercentage,
            axiosPromiseArr:[],
            userObjectData:[],
            keepAliveIncludeData:[],
            jobTemplateDetail:{}

        }
    },
    getters:{
        axiosPromiseArr(state) {
            return state.axiosPromiseArr;
        }
    },
    mutations: {
        setUserInfo(state,data){
          state.userInfo = data
        },
        setSwitchIdentityStatus(state,data){
          state.switchIdentityStatus = data
        },
        setEducatorIdentities(state,data){
          state.educatorIdentities = data
        },
        setRecruiterIdentities(state,data){
          state.recruiterIdentities = data
        },
        setSchoolIdentities(state,data){
          state.schoolIdentities = data
        },
        setOtherIdentities(state, data){
          state.otherIdentities = data
        },
        setVendorIdentities(state,data){
          state.vendorIdentities = data
        },
        setContributorIdentities(state,data){
          state.contributorIdentities = data
        },
        username(state, data) {
            state.username = data
        },
        userAvatar(state, data) {
            state.userAvatar = data
        },
        companyName(state, data) {
            state.companyName = data
        },
        jobCompanyName(state, data) {
            state.jobCompanyName = data
        },
        identity(state, data) {
            state.identity = data
        },
        currentCompanyId(state, data){
            state.currentCompanyId = data
        },
        thirdCompanyId(state, data) {
            state.thirdCompanyId = data
        },
        currentUser(state, data){
            localStorage.setItem('currentUser',JSON.stringify(data))
            state.currentUser = data
        },
        nowChatUserInfo(state, data){
            state.nowChatUserInfo = data
        },
        showChatStatus(state,data){
            state.showChatStatus = data
        },
        allIdentityChanged(state,data){
            state.allIdentityChanged = data
        },
        menuData(state,data){
            state.menuData = data
        },
        changeMenuDataStatus(state, data){
            state.menuDataStatus = data
        },
        changeThirdCompanyStatus(state, data){
            state.isThirdCompanyStatus = data
        },
        setImUnreadTotal(state, data){
            state.imUnreadTotal = data
        },
        setProfilePercentage(state, data){
            state.profilePercentage = data
        },
        pushAxiosPromiseArr(state, data){
            state.axiosPromiseArr.push(data);
        },
        setAxiosPromiseArr(state, value) {
            state.axiosPromiseArr = value;
        },
        setKeepAlivePage(state, value){
            if(!state.keepAliveIncludeData.includes(value)){
                state.keepAliveIncludeData.push(value)
            }
        },
        unsetKeepAlivePage(state, value){
             state.keepAliveIncludeData =  state.keepAliveIncludeData.filter((item) => item !== value)
        },
        setJobTemplateDetail(state, value){
            state.jobTemplateDetail = value
        }

    },
    actions:{
        addKeepAliveInclude(context,pageName){
            context.commit('setKeepAlivePage', pageName)
        },
        removeKeepAliveInclude(context,pageName) {
            context.commit('unsetKeepAlivePage', pageName)
        }

    }

})

export default store
