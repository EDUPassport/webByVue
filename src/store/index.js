import {createStore} from "vuex";
import SignUpForm from "./signup-form";
import createPersistedState from 'vuex-persistedstate';


const store = createStore({
    namespaced: true,
    state() {

        let currentUserStr = localStorage.getItem('currentUser')
        let menuDataStr = localStorage.getItem('menuData')
        let isThirdCompanyValue = localStorage.getItem('is_third_company')
        let companyId = localStorage.getItem('company_id')
        let profilePercentage = localStorage.getItem('profile_percentage')

        return {
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
        }
    },
    getters:{
        axiosPromiseArr(state) {
            return state.axiosPromiseArr;
        }
    },
    mutations: {
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
        setCode(state, code) {
            state.SignUpForm.form.code = code
        },
        
        clearSingUpData(state) {
            state.SignUpForm.educatorForm = {},
            state.SignUpForm.form = {},
            state.SignUpForm.schoolForm = {}      
            state.SignUpForm.recuiterForm = {}      
            state.SignUpForm.otherForm = {}      
            state.SignUpForm.vendorForm = {}         
        },
        setState(state){
            state.SignUpForm.schoolForm.state_id=''
        },
        setTown(state){
            state.SignUpForm.schoolForm.town_id=''

        },

        
    },
    actions:{

    },
    
    modules: {
       'SignUpForm':SignUpForm,
    },
    plugins: [
        createPersistedState({
          paths: ['SignUpForm']
        })
      ],

})

export default store
