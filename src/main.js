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
// import { message } from 'ant-design-vue';
Vue.use(Antd);
// Vue.prototype.$message = message;
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
