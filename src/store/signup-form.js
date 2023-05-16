import {createStore} from "vuex";
const SignUpForm = createStore({
    namespaced: true,
    state() {
        return {
            educatorForm: {},
            recuiterForm: {},
            otherForm:{},
            vendorForm:{},
            schoolForm:{
                state_id: '',
                town_id: '',
            },
            form: {
                email: '',
                code: '',
            } 
        }
    },
    getters:{
    },
    mutations: {
        setValues(state, data) {
            state.educatorForm = data
        },
        setSchoolValues(state, data) {
            state.schoolForm = data
        },
        setRecuiterValues(state, data) {
            state.recuiterForm = data
        },
        setOtherValues(state, data) {
            state.otherForm = data
        },
        setVendorValues(state, data) {
            state.vendorForm = data
        },
        setForm(state, form) {
            state.form = form;
        },
        setType(state, type) {
            state.form.type = type
        },
        
    },
    actions:{

    }

})

export default SignUpForm