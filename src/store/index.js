import {createStore} from "vuex";

const store = createStore({
    state() {

        let currentUserStr = localStorage.getItem('currentUser')
        let menuDataStr = localStorage.getItem('menuData')
        let isThirdCompanyValue = localStorage.getItem('is_third_company')
        let companyId = localStorage.getItem('company_id')

        return {
            username: localStorage.getItem('name'),
            userAvatar: localStorage.getItem('avatar'),
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
            imUnreadTotal:0

        }
    },
    mutations: {
        username(state, data) {
            state.username = data
        },
        userAvatar(state, data) {
            state.userAvatar = data
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
        }

    },
    actions:{

    }

})

export default store