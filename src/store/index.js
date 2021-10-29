import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            username: localStorage.getItem('name'),
            userAvatar: localStorage.getItem('avatar'),
            identity: localStorage.getItem('identity')
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
        }
    },

})

export default store