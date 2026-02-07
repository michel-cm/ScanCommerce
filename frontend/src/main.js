import './assets/css/reset.css'
import './assets/css/colors.css'
import './assets/css/themes.css'
import './assets/css/typography.css'
import './assets/css/global.css'
import './assets/css/scrollbar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { setupAxios } from './plugins/axios'
import { initTheme } from './composables/useTheme'

// Initialize theme before mounting
initTheme()

const app = createApp(App)

app.use(createPinia())

app.use(router)

setupAxios()

app.mount('#app')
