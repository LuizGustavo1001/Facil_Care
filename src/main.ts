import { createApp } from 'vue'
import App from './App.vue'

import router from './router/vueRoute'
import { i18n } from "./locales/i18n"

import './assets/styles/tokens.css'
import './assets/styles/typography.css'
import './assets/styles/global.css'
import './assets/styles/themes.css'
import './assets/styles/utilities.css'

import { registerSW } from "virtual:pwa-register"

registerSW({ immediate: true })

const app = createApp(App)

app.use(i18n)
app.use(router)
app.mount('#app')