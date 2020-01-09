// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index.js';

import '@/style/index.scss';

import '@/permission.js';
import 'ant-design-vue/dist/antd.css';
import VueLazyLoad from 'vue-lazyload';
import Antd from 'ant-design-vue';
import { message } from 'ant-design-vue';
Vue.use(Antd);

/* import {
  Button, Icon, Row, Col, Skeleton, Pagination, Table,
  Input, Avatar, Carousel, Comment, List, Popover, Tag,
  Tooltip, Drawer, Message, Modal, Spin, BackTop, Divider,
  Form, Progress, Menu, Dropdown, Tabs
} from 'ant-design-vue';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Skeleton);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(Comment);
Vue.use(Avatar);
Vue.use(List);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Tooltip);
Vue.use(Drawer);
Vue.use(Modal);
Vue.use(Spin);
Vue.use(BackTop);
Vue.use(Divider);
Vue.use(Form);
Vue.use(Progress);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(Tabs); */
Vue.prototype.$message = message;
Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  error: require('./assets/img/loading.gif'),
  loading: require('./assets/img/loading.gif')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
