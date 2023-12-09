import {createStore} from "vuex";
import {checkToken} from "@/api/userApi";


const store = createStore({
    state: {
        token: '',
        isLogged: false,
        username: ''
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        isLogged(state) {
            return state.isLogged;
        },
        getUsername(state) {
            return state.username;
        }
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload.token;
        },
        setLogged(state, payload) {
            state.isLogged = payload.logged;
        },
        setUsername(state, payload) {
            state.username = payload.username;
        }
    },
    actions: {
        async getLogged(context) {
            await checkToken(context.state.token).then((response) => {
                if (response.ok) {
                    context.commit('setLogged', {logged: true});
                    context.commit('setUsername', {username: response.data})
                    console.log("logged in");
                } else {
                    context.dispatch('clear')
                    console.log("not logged in");
                }
            })
        },
        clear(context) {
            context.commit('setToken', {token: ''});
            context.commit('setLogged', {logged: false});
            context.commit('setUsername', {username: ''});
        }
    },
    modules: {
    }
})

export default store;