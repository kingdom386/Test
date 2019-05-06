import fetch from './fetch';

export function userLogin(params) {
  return fetch({
    url: '/user/userLogin',
    method: 'post',
    params
  });
};

export function regis(params) {
  return fetch({
    url: '/user/register',
    method: 'post',
    params
  });
};

export function forget(params) {
  return fetch({
    url: '/user/forget',
    method: 'post',
    params
  });
};

export function getCode(params) {
  return fetch({
    url: '/user/getCode',
    method: 'post',
    params
  });
};

export function listCase(params) {
  return fetch({
    url: '/case/listCase',
    method: 'get',
    params
  });
};

export function listCompany(params) {
  return fetch({
    url: '/company/listCompany',
    method: 'post',
    params
  });
};

export function listCutomerPool(params) {
  return fetch({
    url: '/cutomerPool/listCutomerPool',
    method: 'post',
    params
  });
};

export function detailById(params) {
  return fetch({
    url: '/company/getCompany',
    method: 'get',
    params
  });
};

export function getOrderCountBySalesMan() {
  return fetch({
    url: '/order/getOrderCountBySalesMan',
    method: 'get',
  });
};

export function Designers(params) {
  return fetch({
    url: '/designer/listDesigner',
    method: 'post',
    params
  });
};

export function updatePwd(params) {
  return fetch({
    url: '/user/updatePwd',
    method: 'post',
    params
  });
};

export function listOrder(params) {
  return fetch({
    url: '/order/listOrder',
    method: 'post',
    params
  });
};

export function listcases(params) {
  return fetch({
    url: '/case/listCase',
    method: 'get',
    params
  });
};

export function getDesigner(params) {
  return fetch({
    url: '/designer/getDesigner',
    method: 'get',
    params
  });
};

export function getCase(params) {
  return fetch({
    url: '/case/getCase',
    method: 'get',
    params
  });
};

export function orderTaking(params) {
  return fetch({
    url: '/cutomerPool/orderTaking',
    method: 'get',
    params
  });
};

export function saveWithdraw(params) {
  return fetch({
    url: '/withdraw/saveWithdraw',
    method: 'post',
    params
  });
};

export function saveOrder(params) {
  return fetch({
    url: '/order/saveOrder',
    method: 'post',
    params
  });
};

export function listCapitalDetail(params) {
  return fetch({
    url: '/capitalDetail/listCapitalDetail',
    method: 'post',
    params
  });
};

export function getOrder(params) {
  return fetch({
    url: '/order/getOrder.do',
    method: 'get',
    params
  });
};

export function orderDetail(params) {
  return fetch({
    url: '/order/getOrder',
    method: 'get',
    params
  });
};

export function saveCutomerPool(params) {
  return fetch({
    url: '/cutomerPool/saveCutomerPool',
    method: 'post',
    params
  });
};

export function Protocol() {
  return fetch({
    url: '/protocol/getProtocol',
    method: 'get'
  });
};

export function SalesMan() {
  return fetch({
    url: '/salesMan/getSalesMan',
    method: 'get'
  });
};

export function Config() {
  return fetch({
    url: '/salesMan/getConfig',
    method: 'get'
  });
};

export function contractUpload(params) {
  return fetch({
    url: '/order/contractUpload',
    method: 'get',
    params
  });
};

export function updateOrder(params) {
  return fetch({
    url: '/order/updateOrder',
    method: 'get',
    params
  });
};
