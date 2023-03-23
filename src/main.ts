import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';

axios.defaults.baseURL = 'https://aod.wtututu.top';
//全局注册
import { registerApp } from './global';

const app = createApp(App);
app.config.globalProperties.$T = axios;
registerApp(app);
app.use(router);
app.use(store);
app.mount('#app');
