<template>
  <div class="p_box">
    <heads>
      <span slot="title_name">忘记密码</span>
    </heads>
    <div class="app_top">
      <mu-container>
        <!-- <mu-form :model="form" ref="pform" class="mu_form">
          <mu-form-item prop="mobile" :rules="mobileRule">
            <mu-text-field placeholder="请输入手机号码" v-model="form.mobile" prop="mobile"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="code" :rules="codeRule">
            <mu-text-field placeholder="请输入手机验证码" v-model="form.code" prop="code"></mu-text-field>
            <span class="send_code text_center color_blue" @click="send_code">{{btn_txt}}</span>
          </mu-form-item>
          <mu-form-item prop="pwd1" :rules="pwd1Rule">
            <mu-text-field
              :action-icon="!visibility1 ? 'visibility_off' : 'visibility'"
              :action-click="() => (visibility1 = !visibility1)"
              :type="visibility1 ? 'text' : 'password'"
              placeholder="请输入登录密码"
              v-model="form.pwd1"
              prop="pwd1"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="pwd2" :rules="pwd2Rule">
            <mu-text-field
              :action-icon="!visibility2 ? 'visibility_off' : 'visibility'"
              :action-click="() => (visibility2 = !visibility2)"
              :type="visibility2 ? 'text' : 'password'"
              placeholder="请再次输入登录密码"
              v-model="form.pwd2"
              prop="pwd2"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item class="margin_btm_init">
            <mu-button class="btn_bg" full-width @click="modify">确认修改</mu-button>
          </mu-form-item>
        </mu-form>-->
        <div class="forget_box">
          <div class="forget_item">
            <input
              type="text"
              maxlength="11"
              v-model="form.mobile"
              placeholder="请输入手机号码"
              @blur="checkmobile"
            >
            <p>{{mobilemsg}}&nbsp;</p>
          </div>
          <div class="forget_item">
            <span @click="send_code">{{btn_txt}}</span>
            <input type="text" v-model="form.code" maxlength="6" placeholder="请输入手机验证码">
          </div>
          <div class="forget_item">
            <span :class="['visibility_box', visibility1? 'v' : 'nv']" @click="showpwd(1)"></span>
            <input
              v-if="visibility1"
              type="text"
              v-model="form.pwd1"
              @blur="checkpwd"
              placeholder="请输入登录密码"
            >
            <input
              v-else
              type="password"
              v-model="form.pwd1"
              @blur="checkpwd"
              placeholder="请输入登录密码"
            >
            <p>{{pwdmsg}}&nbsp;</p>
          </div>
          <div class="forget_item">
            <span :class="['visibility_box', visibility2? 'v' : 'nv']" @click="showpwd(2)"></span>
            <input
              v-if="visibility2"
              type="text"
              v-model="form.pwd2"
              @blur="checkpwd1"
              placeholder="请输入登录密码"
            >
            <input
              v-else
              type="password"
              v-model="form.pwd2"
              @blur="checkpwd1"
              placeholder="请再次输入登录密码"
            >
            <p>{{pwd2msg}}&nbsp;</p>
          </div>
          <div class="submit_form">
            <mu-button class="btn_bg" full-width @click="modify">确认修改</mu-button>
          </div>
        </div>
      </mu-container>
    </div>
  </div>
</template>

<script>
import { forget, getCode } from "@/utils/api";
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  data() {
    return {
      mobilemsg: "",
      pwdmsg: "",
      pwd2msg: "",
      send: true,
      visibility1: false,
      visibility2: false,
      msg: "",
      btn_txt: "获取验证码",
      timer: null,
      timers: null,
      form: {
        code: "",
        pwd1: "",
        pwd2: "",
        mobile: ""
      }
    };
  },
  computed: {
    name() {
      return this.$route.query.username;
    },
    mobile() {
      return this.$route.query.mobile;
    }
  },
  methods: {
    showpwd(val) {
      console.log(val);
      const _this = this;
      if (val === 1) {
        _this.visibility1 = !_this.visibility1;
      }
      if (val === 2) {
        _this.visibility2 = !_this.visibility2;
      }
    },
    checkmobile() {
      const _this = this;
      const reg = /^1(3|5|6|7|8|9)\d{9}$/;
      if (reg.test(_this.form.mobile)) {
        _this.mobilemsg = "";
        return true;
      } else {
        _this.mobilemsg = "手机号码输入有误！";
        return false;
      }
    },
    checkpwd() {
      const _this = this;
      const reg = /^[\s\S]{6,20}$/;
      console.log(_this.form.pwd1);
      if (reg.test(_this.form.pwd1)) {
        _this.pwdmsg = "";
        return true;
      } else {
        _this.pwdmsg = "输入的密码格式有误！";
        return false;
      }
    },
    checkpwd1() {
      const _this = this;
      const reg = /^[\s\S]{6,20}$/;
      if (reg.test(_this.form.pwd2)) {
        _this.pwd2msg = "";
        return true;
      } else {
        _this.pwd2msg = "输入的密码格式有误！";
        return false;
      }
    },
    send_code() {
      const _this = this;
      const p = { phoneNumber: _this.form.mobile };
      let t = 60;
      if (/^1[3|5|6|7|8|9]\d{9}$/.test(_this.form.mobile)) {
        if (_this.send) {
          _this.send = false;
          clearInterval(_this.timers);
          _this.timers = setInterval(function() {
            if (t >= 1) {
              t = t - 1;
              _this.btn_txt = `在${t}s重试`;
            } else {
              _this.send = true;
              _this.btn_txt = `获取验证码`;
            }
          }, 1000);
        } else {
          _this.msg = "请稍候再试！";
        }
      } else {
        _this.msg = "输入的手机号码有误！";
      }
      getCode(p).then(r => {
        console.log(r);
      });
    },
    modify() {
      var _this = this;
      if (_this.checkmobile() && _this.checkpwd() && _this.checkpwd1()) {
        if (_this.form.pwd1 !== _this.form.pwd2) {
          _this.$toast.error("两次输入的密码不一致！");
        } else {
          const p = {
            mobile: _this.form.mobile,
            password: _this.form.pwd1,
            code: _this.form.code
          };
          forget(p).then(res => {
            if (res.code === 0) {
              _this.$toast.success("修改成功！");
            } else {
              _this.msg = res.message;
            }
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./forget.scss";
</style>
