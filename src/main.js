import './assets/css/reset.css'
import './assets/css/colors.css'
import './assets/css/typography.css'
import './assets/css/global.css'
import './assets/css/scrollbar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { setupAxios } from './plugins/axios'

const app = createApp(App)

app.use(createPinia())

app.use(router)

setupAxios()

app.mount('#app')
