import Cookies from 'js-cookie';

const app = {
  state: {
    userInfo: {
      userName: '',
      mobile: '',
    },
    cid: '',
    did: '',
    token: '',
    cname: ''
  },
  mutations: {
    SET_REGIS_INFO: (state, data) => {
      state.userInfo.userName = data.userName;
      state.userInfo.mobile = data.mobile;
      Cookies.set('userInfo', data);
    },
    SET_USER_TOKEN: (state, data) => {
      state.token = data.tokens;
      Cookies.set('token', data.tokens);
    },
    SET_TEMP_CID: (state, data) => {
      state.cid = data.cid;
      Cookies.set('cid', data.cid);
    },
    SET_TEMP_DID: (state, data) => {
      state.did = data.did;
      Cookies.set('did', data.did);
    },
    SET_COMP_NAME: (state, data) => {
      console.log(data.name);
      state.cname = data.name;
      Cookies.set('cname', data.name);
    },
  },
  actions: {
  }
};

export default app;
