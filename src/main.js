// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/';
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import VueLazyload from 'vue-lazyload';
import "./assets/font/iconfont.css";
import 'muse-ui/dist/muse-ui.css';
import 'normalize.css';
import './size';
import './style.scss';

// Vue.use(VueLazyload);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/lazy.png',
  loading: './assets/lazy.png',
  attempt: 1
});
Vue.use(Loading);
Vue.use(MuseUI);
Vue.use(Toast, {
  position: 'top',
  time: 1500,
  closeIcon: 'close',
  close: false,
  successIcon: 'check_circle',
  infoIcon: 'info',
  warningIcon: 'priority_high',
  errorIcon: 'warning'
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
