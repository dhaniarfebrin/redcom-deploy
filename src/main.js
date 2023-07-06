import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './assets/main.css'

import 'bootstrap/dist/js/bootstrap.bundle.js'
import ToastPlugin from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-bootstrap.css';

// import axios from 'axios'
// axios.defaults.withCredentials = true

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ToastPlugin)
app.use(router)

app.mount('#app')
