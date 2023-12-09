import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import store from "@/store";



const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
