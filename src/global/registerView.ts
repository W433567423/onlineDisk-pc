import { App } from 'vue';
import {
  Icon,
  Form,
  FormItem,
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
  Progress,
  Button,
  Input,
  Page,
  Row,
  Col,
  Tooltip,
  Radio,
  Modal,
  Checkbox,
  Upload,
} from 'view-ui-plus';
//导入boootstrap
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
const components = [
  Icon,
  Form,
  FormItem,
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
  Progress,
  Button,
  Input,
  Page,
  Row,
  Col,
  Tooltip,
  Radio,
  Modal,
  Checkbox,
  Upload,
];

//全局注册常用组件
export default function registerApp(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
}
