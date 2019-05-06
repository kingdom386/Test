import Vue from 'vue';
import Router from 'vue-router';
// 登录、注册
import login from '@/users/login';
import forget from '@/users/forget';
import register from '@/users/register';
import pwd from '@/users/pwd';
import ag from '@/users/agree';
// 页面信息展示
import index from '@/main/index';
import company from '@/main/company';
import designer from '@/main/designer';
import quanjing from '@/main/quanjing';
// 下单
import order from '@/order/index';
import result from '@/order/result';
// import check from '@/order/check';
// 客户池
import pool from '@/order/pool';
// 个人中心
import mine from '@/mine/index';
import balance from '@/mine/balance';
import modify from '@/mine/modify';
import check from '@/mine/check';
import password from '@/mine/password';
import tixian from '@/mine/tixian';
import upload from '@/mine/upload';
// 公共组件
import head from '@/components/head';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/head',
      name: '头部',
      component: head
    },
    {
      path: '/',
      name: '用户登录',
      component: login
    },
    {
      path: '/forget',
      name: '忘记密码',
      component: forget
    },
    {
      path: '/register',
      name: '注册用户',
      component: register
    },
    {
      path: '/pwd',
      name: '设置登录密码',
      component: pwd
    },
    {
      path: '/ag',
      name: '用户协议',
      component: ag
    },
    {
      path: '/index',
      name: '首页',
      component: index
    },
    {
      path: '/company',
      name: '装修公司',
      component: company
    },
    {
      path: '/designer',
      name: '设计师介绍',
      component: designer
    },
    {
      path: '/quanjing',
      name: '全景图',
      component: quanjing
    },
    {
      path: '/order',
      name: '下单',
      component: order
    },
    {
      path: '/result',
      name: '订单结果',
      component: result
    },
    {
      path: '/pool',
      name: '客户池',
      component: pool
    },
    {
      path: '/mine',
      name: '个人中心',
      component: mine
    },
    {
      path: '/balance',
      name: '余额积分明细',
      component: balance
    },
    {
      path: '/modify',
      name: '修改密码',
      component: modify
    },
    {
      path: '/check',
      name: '订单明细',
      component: check
    },
    {
      path: '/password',
      name: '设置密码',
      component: password
    },
    {
      path: '/tixian',
      name: '提现',
      component: tixian
    },
    {
      path: '/upload',
      name: '合同上传',
      component: upload
    }
  ]
});
