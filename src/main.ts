import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
//全局注册
import { registerApp } from './global'

const app = createApp(App)
registerApp(app)
app.use(router)
app.mount('#app')
