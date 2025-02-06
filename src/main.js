import './assets/styles.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import { OhVueIcon } from 'oh-vue-icons'

const app = createApp(App)

app.use(createPinia())

app.component('v-icon', OhVueIcon)

app.mount('#app')
