<template>
    <div class="signup-bg">
        <el-row justify="center" align="top" class="signup-container">
            <el-col class="signup-l-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="signup-t" @click="turnHome()">
                    <el-image class="signup-t-logo" :src="imgLogo"></el-image>
                </div>
                <div class="signup-m">

                    <div class="signup-back-btn-container">
                        <el-button size="small" plain @click="turnBack()">
                            <el-icon style="margin-right: 10px;">
                                <Back/>
                            </el-icon>
                            Back
                        </el-button>
                    </div>

                    <template v-if="userType ==='educator' ">
                        <div class="signup-m-label">Let’s get started</div>
                        <div class="signup-m-tips">
                            Tell us more, we're curious!
                        </div>
                        <div class="signup-m-form">

                            <el-form
                                    :model="educatorForm"
                                    :rules="educatorRules"
                                    ref="educatorForms"
                                    @submit.prevent
                                    label-width="100px"
                                    label-position="top"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="First Name" prop="first_name">
                                    <el-input placeholder="Enter your First Name"
                                              :formatter="(value)=> validForbid(value) "
                                              :parser="(value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')"
                                              @keyup.enter="continueNextStep()"
                                              v-model="educatorForm.first_name">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Last Name" prop="last_name">
                                    <el-input placeholder="Enter your Last Name"
                                              :formatter="(value)=> validForbid(value) "
                                              :parser="(value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')"
                                              @keyup.enter="continueNextStep()"
                                              v-model="educatorForm.last_name">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Current Residence" prop="current_residence">
                                    <el-input placeholder="Enter your Residence"
                                              @keyup.enter="continueNextStep()"
                                              v-model="educatorForm.current_residence">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Nationality" prop="nationality">
                                    <el-select v-model="educatorForm.nationality"
                                               style="width: 100%;"
                                               filterable
                                               fit-input-width
                                               :teleported="false"
                                               placeholder="Select your Nationality">
                                        <el-option v-for="(item,i) in nationalityOptions" :key="i" :label="item.name"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>

                                <div class="continue-btn-container">
                                    <el-button class="continue-btn" size="large" type="primary"
                                               :loading="continueLoadingStatus"
                                               @click="continueNextStep()">
                                        Continue
                                    </el-button>
                                </div>

                            </el-form>

                        </div>

                    </template>

                    <template v-if="userType === 'school' ">
                        <div class="signup-m-label">Let’s get started</div>
                        <div class="signup-m-tips">
                            Tell us about yourself a bit.
                        </div>
                        <div class="signup-m-form">

                            <el-form
                                    :model="schoolForm"
                                    :rules="schoolRules"
                                    ref="schoolForms"
                                    @submit.prevent
                                    label-width="100px"
                                    label-position="top"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Country" prop="country_id">
                                    <el-select v-model="schoolForm.country_id"
                                               style="width: 100%;"
                                               :teleported="false"
                                               @change="countryChange(schoolForm.country_id)"
                                               value-key="id"
                                               filterable
                                               placeholder="Select your Country">
                                        <el-option v-for="(item,i) in countryOptions"
                                                   :key="i"
                                                   :label="item.name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>

                                </el-form-item>

                                <template v-if="stateOptions.length>0">
                                    <el-form-item label="Province" prop="state_id">
                                        <el-select v-model="schoolForm.state_id"
                                                   style="width: 100%;"
                                                   :teleported="false"
                                                   value-key="id"
                                                   filterable
                                                   @change="stateChange(schoolForm.country_id,schoolForm.state_id)"
                                                   placeholder="Select your province">
                                            <el-option v-for="(item,i) in stateOptions"
                                                       :key="i"
                                                       :label="item.name"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </template>

                                <template v-if="townOptions.length > 0">
                                    <el-form-item label="City" prop="town_id">
                                        <el-select v-model="schoolForm.town_id"
                                                   style="width: 100%;"
                                                   :teleported="false"
                                                   value-key="id"
                                                   filterable
                                                   @change="townChange"
                                                   placeholder="Select your city">
                                            <el-option v-for="(item,i) in townOptions"
                                                       :key="i"
                                                       :label="item.name"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </template>

                                <el-form-item label="School Name" prop="company_name">
                                    <el-input placeholder="Enter your School Name"
                                              @keyup.enter="continueNextStep()"
                                              v-model="schoolForm.company_name">
                                    </el-input>
                                </el-form-item>

                                <div class="continue-btn-container">
                                    <el-button class="continue-btn" size="large" type="primary"
                                               :loading="continueLoadingStatus"
                                               @click="continueNextStep()">
                                        Continue
                                    </el-button>
                                </div>

                            </el-form>

                        </div>


                    </template>

                    <template v-if="userType === 'recruiter' ">
                        <div class="signup-m-label">Let’s get started</div>
                        <div class="signup-m-tips">
                            Tell us about yourself a bit.
                        </div>
                        <div class="signup-m-form">

                            <el-form
                                    :model="recruiterForm"
                                    :rules="recruiterRules"
                                    ref="recruiterForms"
                                    @submit.prevent
                                    label-width="100px"
                                    label-position="top"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Company Name" prop="company_name">
                                    <el-input placeholder="Enter your Company Name"
                                              @keyup.enter="continueNextStep()"
                                              v-model="recruiterForm.company_name">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Country" prop="country_id">
                                    <el-select v-model="recruiterForm.country_id"
                                               style="width: 100%;"
                                               :teleported="false"
                                               value-key="id"
                                               filterable
                                               placeholder="Select your Country">
                                        <el-option v-for="(item,i) in countryOptions"
                                                   :key="i"
                                                   :label="item.name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>

                                </el-form-item>

                                <div class="continue-btn-container">
                                    <el-button class="continue-btn" size="large" type="primary"
                                               :loading="continueLoadingStatus"
                                               @click="continueNextStep()">
                                        Continue
                                    </el-button>
                                </div>

                            </el-form>

                        </div>
                    </template>

                    <template v-if="userType === 'other' ">
                        <div class="signup-m-label">Let’s get started</div>
                        <div class="signup-m-tips">
                            Tell us about yourself a bit.
                        </div>
                        <div class="signup-m-form">

                            <el-form
                                    :model="otherForm"
                                    :rules="otherRules"
                                    ref="otherForms"
                                    @submit.prevent
                                    label-width="100px"
                                    label-position="top"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Company Name" prop="company_name">
                                    <el-input placeholder="Enter your Company Name"
                                              @keyup.enter="continueNextStep()"
                                              v-model="otherForm.company_name">
                                    </el-input>
                                </el-form-item>

                                <div class="continue-btn-container">
                                    <el-button class="continue-btn" size="large" type="primary"
                                               :loading="continueLoadingStatus"
                                               @click="continueNextStep()">
                                        Continue
                                    </el-button>
                                </div>

                            </el-form>

                        </div>

                    </template>

                    <template v-if="userType === 'vendor' ">
                        <div class="signup-m-label">Boost your Business</div>
                        <div class="signup-m-tips">
                            Tell us about yourself a bit.
                        </div>
                        <div class="signup-m-form">

                            <el-form
                                    :model="vendorForm"
                                    :rules="vendorRules"
                                    ref="vendorForms"
                                    @submit.prevent
                                    label-width="100px"
                                    label-position="top"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Business Name" prop="company_name">
                                    <el-input placeholder="Enter your Business Name"
                                              @keyup.enter="continueNextStep()"
                                              v-model="vendorForm.company_name">
                                    </el-input>
                                </el-form-item>

                                <div class="continue-btn-container">
                                    <el-button class="continue-btn"
                                               size="large"
                                               type="primary"
                                               :loading="continueLoadingStatus"
                                               @click="continueNextStep()">
                                        Continue
                                    </el-button>
                                </div>

                            </el-form>

                        </div>
                    </template>

                </div>
                <div class="signup-b">
                    <div class="signup-copyright">
                        © EDU Passport 2023
                    </div>
                </div>
            </el-col>
            <el-col class="signup-r-col" :xs="0" :sm="0" :md="12" :lg="12" :xl="12">
                <div class="signup-r-container">
                    <div class="signup-r-label">
                        Signup Progress
                    </div>

                    <stepComponent :fromGoogle="registerRefGoogle" :userType="userType"
                                   :step-index="userStepIndex"></stepComponent>

                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import imgLogo from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import {useRouter, useRoute} from 'vue-router'
import {ref, reactive, onMounted} from 'vue'
import {useStore} from 'vuex'
import {countriesData} from "@/utils/data";
import stepComponent from "@/components/register/stepComponent.vue";
import {ElMessage} from 'element-plus'
import {encodeByJsBase64, decodeByJsBase64} from "@/utils/utils";
import {
    EDUCATOR_PERCENTAGE_V2,
    GET_COUNTRY_LIST,
    GOOGLE_CALLBACK_API, OTHER_PERCENTAGE_V2,
    RECRUITER_PERCENTAGE_V2, SCHOOL_PERCENTAGE_V2,
    USER_MENU_LIST, VENDOR_PERCENTAGE_V2
} from "@/api/api";
// import {ElMessageBox} from 'element-plus'

export default {
    name: "accountCreation",
    components: {
        stepComponent
    },
    data() {
        return {
            imgLogo,
            nationalityOptions: countriesData
        }
    },
    setup() {

        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const userType = route.query.type;
        const userStepIndex = ref(2)
        const methodValue = route.query.method;
        const methodJson = methodValue ? JSON.parse(decodeByJsBase64(methodValue)) : {}
        // console.log(methodJson)
        const continueLoadingStatus = ref(false)

        const registerRefGoogle = ref(methodJson.method === 'Google_login')

        // console.log(registerRefGoogle)

        function turnHome() {
            return router.push('/')
        }

        function backToLogin() {
            return router.push('/login')
        }

        const educatorForms = ref(null)
        const educatorForm = reactive({
            first_name: '',
            last_name: '',
            current_residence: '',
            nationality: ''
        })

        const educatorRules = reactive({
            first_name: [
                {
                    required: true,
                    message: 'Enter your first name',
                    trigger: 'blur',
                }
            ],
            last_name: [
                {
                    required: true,
                    message: "Enter your last name",
                    trigger: 'blur',
                },
            ],
            current_residence: [
                {
                    required: true,
                    message: "Enter your Residence",
                    trigger: 'blur',
                },
            ],
            nationality: [
                {
                    required: true,
                    message: "Select your Nationality",
                    trigger: 'change',
                },
            ],

        })

        const schoolForms = ref(null)
        const schoolForm = reactive({
            country_id: '',
            state_id: '',
            town_id: '',
            company_name: ''
        })

        const schoolRules = reactive({
            company_name: [
                {
                    required: true,
                    message: 'Enter your School name',
                    trigger: 'blur',
                }
            ]

        })

        const recruiterForms = ref(null)
        const recruiterForm = reactive({
            country_id: '',
            company_name: ''
        })

        const recruiterRules = reactive({
            company_name: [
                {
                    required: true,
                    message: 'Enter your Company name',
                    trigger: 'blur',
                }
            ]
        })

        const otherForms = ref(null)
        const otherForm = reactive({
            company_name: ''
        })

        const otherRules = reactive({
            company_name: [
                {
                    required: true,
                    message: 'Enter your Company name',
                    trigger: 'blur',
                }
            ]
        })

        const vendorForms = ref(null)
        const vendorForm = reactive({
            company_name: ''
        })

        const vendorRules = reactive({
            company_name: [
                {required: true, message: 'Enter your Business Name', trigger: 'blur'}
            ],
        })

        function continueNextStep() {

            let forms = {}

            if (userType === 'educator') {
                forms = educatorForms.value
            }
            if (userType === 'school') {
                forms = schoolForms.value
            }
            if (userType === 'recruiter') {
                forms = recruiterForms.value
            }
            if (userType === 'other') {
                forms = otherForms.value
            }

            if (userType === 'vendor') {
                forms = vendorForms.value
            }

            forms.validate((valid) => {
                if (valid) {
                    let params = {}

                    if (userType === 'educator') {
                        params = Object.assign({
                            identity: 1
                        }, educatorForm)
                    }

                    if (userType === 'school') {
                        params = Object.assign({
                            identity: 3
                        }, schoolForm)
                    }

                    if (userType === 'recruiter') {
                        params = Object.assign({
                            identity: 2
                        }, recruiterForm)
                    }

                    if (userType === 'other') {
                        params = Object.assign({
                            identity: 4
                        }, otherForm)
                    }

                    if (userType === 'vendor') {
                        params = Object.assign({
                            identity: 5
                        }, vendorForm)
                    }

                    if (methodValue) {
                        // let methodJson = JSON.parse(decodeByJsBase64(methodValue))
                        if (methodJson.method === 'Google_login') {
                            continueLoadingStatus.value = true;

                            // methodJson.email = 'test' + Math.random() + '@gmail.com'

                            let registerParams = Object.assign({code: methodJson.code,redirect_uri:methodJson.redirect_uri}, params)
                            console.log(registerParams)

                            GOOGLE_CALLBACK_API(registerParams).then(res => {
                                console.log(res)
                                if (res.code == 200) {
                                    storageLoginUserInfo(res.message)
                                    setTimeout(function (){
                                        router.push({path:'/overview'})
                                        continueLoadingStatus.value = false
                                    }, 1500)

                                    // ElMessageBox({
                                    //     title: "All Set",
                                    //     message: "Let's get you logged in!",
                                    //     dangerouslyUseHTMLString: false,
                                    //     type: "success",
                                    //     center: true,
                                    //     confirmButtonText: "OK",
                                    //     "round-button": true,
                                    //     callback(action) {
                                    //         if (action === 'confirm') {
                                    //             router.push({path: '/login', query: {email: methodJson.email}})
                                    //         }
                                    //     }
                                    //
                                    // })
                                    // continueLoadingStatus.value = false;

                                }

                            }).catch(err => {
                                console.log(err)
                                continueLoadingStatus.value = false;

                                if (err.msg) {
                                    ElMessage({
                                        type: 'warning',
                                        message: err.msg,
                                        grouping: true
                                    })
                                    return;
                                }

                                if (err.message) {
                                    ElMessage({
                                        type: 'warning',
                                        message: err.message,
                                        grouping: true
                                    })
                                }


                            })

                        }
                        return false;
                    }

                    let formInfo = encodeByJsBase64(JSON.stringify(params))
                    router.push({path: '/signup/accountCreation', query: {type: userType, formInfo: formInfo}})

                } else {
                    console.log('error submit!!')
                    ElMessage({
                        type: 'warning',
                        message: 'Please complete all required fields',
                        grouping: true
                    })
                    return false
                }

            })

        }

        function storageLoginUserInfo(resMessage) {

            let identity = resMessage.identity;
            let firstName = resMessage.first_name;
            let lastName = resMessage.last_name;
            let avatar = 'https://oss.esl-passport.cn/educator.png'
            let companyId = resMessage.company_id;

            let name = firstName + ' ' + lastName
            let companyName = ''
            let percentageValue = 0

            localStorage.setItem('token', resMessage.token)
            localStorage.setItem('uid', resMessage.id)
            localStorage.setItem('identity', resMessage.identity)
            localStorage.setItem('language', resMessage.language)
            localStorage.setItem('email', resMessage.email)
            localStorage.setItem('company_id', resMessage.company_id)
            localStorage.setItem('name', name)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)

            if (identity == 1) {
                avatar = resMessage.headimgurl;
                companyName = firstName + ' ' + lastName;
                percentageValue = resMessage.is_educator
                updateEducatorPercentage()
            }

            if (identity == 2) {
                avatar = resMessage.recruiting_info.logo;
                companyName = resMessage.recruiting_info.company_name;
                percentageValue = resMessage.is_recruiting;
                updateRecruiterPercentage()
            }
            if (identity == 3) {
                avatar = resMessage.school_info.logo;
                companyName = resMessage.school_info.company_name;
                percentageValue = resMessage.is_school;
                updateSchoolPercentage()
            }
            if (identity == 4) {
                avatar = resMessage.other_info.logo;
                companyName = resMessage.other_info.company_name;
                percentageValue = resMessage.is_other;
                updateOtherPercentage()
            }
            if (identity == 5) {
                avatar = resMessage.vendor_info.logo;
                percentageValue = resMessage.is_vendor;
                companyName = resMessage.vendor_info.company_name;
                updateVendorPercentage()
            }

            localStorage.setItem('profile_percentage', percentageValue)

            store.commit('currentCompanyId', resMessage.company_id)
            store.commit('setProfilePercentage', percentageValue)

            if (resMessage.third_company_id) {
                localStorage.setItem('thirdCompanyId', resMessage.third_company_id)
                store.commit('thirdCompanyId', resMessage.third_company_id)
            }

            store.commit('username', name)
            store.commit('userAvatar', avatar)
            store.commit('identity', resMessage.identity)
            store.commit('companyName', companyName)
            store.commit('changeThirdCompanyStatus', resMessage.is_third_company)

            handleSetCurrentUser(resMessage.id, identity, companyId, firstName, lastName, avatar)
            getUserMenuList(resMessage.id, identity, resMessage.company_id, resMessage.id)

        }

        const setCurrentUser = (data) => store.commit('currentUser', data)

        function handleSetCurrentUser(uid, identity, companyId, firstName, lastName, avatar) {

            let uuid = uid + '#' + identity + '#' + companyId
            let name = firstName + ' ' + lastName

            let currentUser = {
                uuid: uuid,
                name: name,
                avatar: avatar
            }

            setCurrentUser(currentUser)

        }

        function getUserMenuList(uid, identity, companyId, cId) {

            let params = {
                user_id: uid,
                identity: identity,
                company_id: companyId,
                create_user_id: cId,
                page: 1,
                limit: 1000
            }

            USER_MENU_LIST(params).then(res => {
                // console.log(res)
                if (res.code === 200) {
                    let str = JSON.stringify(res.message)
                    localStorage.setItem('menuData', str)
                    store.commit('menuData', res.message)
                }
            }).catch(err => {
                console.log(err)
            })

        }

        function updateEducatorPercentage() {
            let params = {
                token: localStorage.getItem('token')
            }
            EDUCATOR_PERCENTAGE_V2(params).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }

            })
        }

        function updateRecruiterPercentage() {
            let params = {
                token: localStorage.getItem('token')
            }
            RECRUITER_PERCENTAGE_V2(params).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }
            })
        }

        function updateSchoolPercentage() {
            let params = {
                token: localStorage.getItem('token')
            }
            SCHOOL_PERCENTAGE_V2(params).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }
            })
        }

        function updateOtherPercentage() {
            let params = {
                token: localStorage.getItem('token')
            }
            OTHER_PERCENTAGE_V2(params).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }
            })
        }

        function updateVendorPercentage() {
            let params = {
                token: localStorage.getItem('token')
            }

            VENDOR_PERCENTAGE_V2(params).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }
            })
        }

        const countryOptions = ref([])
        const countryObj = ref({})
        const stateOptions = ref([])
        const stateObj = ref({})
        const townOptions = ref([])
        const townObj = ref({})

        function getAllCountry() {
            let params = {}

            GET_COUNTRY_LIST(params).then(res => {
                console.log(res)
                if (res.code == 200) {
                    countryOptions.value = res.message;
                }
            }).catch(err => {
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }


            })
        }

        function getAllState(countryId) {
            let params = {
                country_id: countryId
            }
            GET_COUNTRY_LIST(params).then(res => {
                console.log(res)
                if (res.code == 200) {
                    stateOptions.value = res.message;
                }
            }).catch(err => {
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }

            })
        }

        function getAllTown(countryId, stateId) {

            let params = {
                country_id: countryId,
                state_id: stateId
            }

            GET_COUNTRY_LIST(params).then(res => {
                console.log(res)
                if (res.code == 200) {
                    townOptions.value = res.message;
                }
            }).catch(err => {
                if(err.msg){
                    ElMessage({
                        type: 'warning',
                        message: err.msg,
                        grouping: true
                    })
                    return ;
                }
                if(err.message){
                    ElMessage({
                        type: 'warning',
                        message: err.message,
                        grouping: true
                    })
                }

            })
        }


        function countryChange(countryId) {
            stateOptions.value = []
            townOptions.value = []
            schoolForm.state_id = ''
            schoolForm.town_id = ''

            getAllState(countryId)

        }

        function stateChange(countryId, stateId) {
            townOptions.value = []
            schoolForm.town_id = ''
            getAllTown(countryId, stateId)
        }

        function townChange(e) {
            console.log(e)
        }

        function turnBack() {
            router.go(-1)
        }

        onMounted(() => {
            if (userType === 'school' || userType === 'recruiter' || userType === 'other') {
                userStepIndex.value = 3
            }

            getAllCountry()

        })

        return {
            userStepIndex,
            educatorForms,
            educatorForm,
            educatorRules,
            schoolForms,
            schoolForm,
            schoolRules,
            recruiterForms,
            recruiterForm,
            recruiterRules,
            otherForms,
            otherForm,
            otherRules,
            vendorForms,
            vendorForm,
            vendorRules,

            userType,
            turnBack,
            continueNextStep,
            turnHome,
            backToLogin,
            countryOptions,
            countryObj,
            countryChange,
            stateOptions,
            stateObj,
            stateChange,
            townOptions,
            townObj,
            townChange,
            registerRefGoogle,
            continueLoadingStatus

        }

    }
}

</script>

<style scoped>

.signup-bg {
    background-color: #FFFFFF;
}

.signup-container {
    margin: 0 auto;
    height: 100vh;
}

.signup-l-col {
    display: flex;
    flex-direction: column;
}


.signup-t {
    margin: 30px 0 0 40px;
    cursor: pointer;
}

.signup-t-logo {
    width: 180px;
}

.signup-m {
    min-width: 380px;
//margin: 100px auto 20px; margin: 40px auto 20px; padding-top: 60px;
    position: relative;
}

.signup-back-btn-container {
    position: absolute;
    top: 0;
    left: 0;
}


.signup-m-icon {
    text-align: center;
}

.signup-m-label {
    text-align: center;

    font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    color: #101828;
    margin-top: 60px;

}

.signup-m-tips {
    font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #667085;
    margin-top: 20px;
}

.signup-m-form {
    margin-top: 40px;
}


.continue-btn-container {
    margin-top: 50px;
}

.continue-btn {
    width: 100%;
}

.signup-r-col {
    background: #F2F4F7;
    overflow: hidden;
}

.signup-r-container {
    display: flex;
    flex-direction: column;
    height: 100%;

}

.signup-r-label {

    font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #1D2939;

    margin: 60px 0 0 60px;

}

.signup-b {
    margin-top: auto;
    margin-left: 40px;
    margin-bottom: 25px;
}

.signup-copyright {
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;

    color: #667085;


}

@media screen and (max-width: 1399px) {
    .signup-container {
        width: 100%;
    }
}

@media screen and (min-width: 1400px) {
    .signup-container {
        max-width: 1400px;
    }
}

</style>
