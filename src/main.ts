import { createApp } from 'vue'
import App from './App.vue'

import router from './router/vueRoute'
import { i18n } from "./locales/i18n"

import './assets/styles/style.css'
import { registerSW } from "virtual:pwa-register"

registerSW({ immediate: true })

const app = createApp(App)

app.use(i18n)
app.use(router)
app.mount('#app')