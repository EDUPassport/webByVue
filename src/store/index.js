import {createStore} from "vuex";

const store = createStore({
    state() {
        let currentUserStr = localStorage.getItem('currentUser')

        return {
            username: localStorage.getItem('name'),
            userAvatar: localStorage.getItem('avatar'),
            identity: localStorage.getItem('identity'),
            currentUser:currentUserStr ?  JSON.parse(currentUserStr) : ''
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
        currentUser(state, data){
            localStorage.setItem('currentUser',JSON.stringify(data))
            state.currentUser = data
        }
    },

})

export default store