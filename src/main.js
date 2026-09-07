import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { i18n } from "./locales/i18n.js"

import './assets/styles/style.css'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.mount('#app')