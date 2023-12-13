import {createStore} from "vuex";
import {checkToken} from "@/api/userApi";
import VuexPersistence from "vuex-persist";
// export interface RootState {
//     token: string;
//     isLogged: boolean;
//     username: string;
// }
//
// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage,
//     asyncStorage: true
// })

const store = createStore({
    plugins: [new VuexPersistence().plugin],
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
            localStorage.clear();
        }
    },
    modules: {
    }
})

export default store;