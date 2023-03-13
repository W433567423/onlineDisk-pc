import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
// import './assets/css/bootstrap.css';

import {
  Icon,
  Login,
  UserName,
  Password,
  Submit,
  Checkbox,
  Layout,
  Header,
  Sider,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  MenuGroup,
  Content,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from 'view-ui-plus';

const app = createApp(App);
const components = [
  Icon,
  Login,
  UserName,
  Password,
  Submit,
  Checkbox,
  Layout,
  Header,
  Sider,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  MenuGroup,
  Content,
  Dropdown,
  DropdownItem,
  Avatar,
  DropdownMenu,
];
for (const cpn of components) {
  app.component(cpn.name, cpn);
}
app.use(router);
app.mount('#app');
