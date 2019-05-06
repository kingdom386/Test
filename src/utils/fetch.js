import axios from 'axios';

const baseURL = isTest ? 'http://47.99.122.206:3389' : 'http//47.99.122.206:3389';
const timeout = 800000;

function isTest() {
  return (/localhost/.test(window.location.href) ? true : false);
}

// 创建axios请求实例
const instance = axios.create({
  baseURL,
  timeout
});

// 请求拦截器
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token');
  }
  return config;
}, error => {
  Promise.reject(error);
});

instance.interceptors.response.use(config => {
  return config.data;
}, error => {
  return Promise.reject(error);
});
export default instance;
