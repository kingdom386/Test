<template>
  <div class="p_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>忘记密码
      <mu-button flat slot="right"></mu-button>
    </mu-appbar> -->
    <heads>
      <span slot="title_name">忘记密码</span>
    </heads>
    <div class="app_top">
      <mu-container>
        <mu-form :model="form" ref="pform" class="mu_form">
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
        </mu-form>
      </mu-container>
    </div>
    <mu-dialog width="360" :open.sync="openSimple" dialog-class="text_center">
      {{msg}}
      <!-- <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">确定</mu-button> -->
    </mu-dialog>
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
      send: true,
      openSimple: false,
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
      },
      mobileRule: [
        { validate: val => !!val, message: "请输入手机号码" },
        {
          validate: val => {
            return /^1[3|5|7|8|9]\d{9}$/.test(val);
          },
          message: "请输入手机号码有误！"
        }
      ],
      codeRule: [
        { validate: val => !!val, message: "请输入手机验证码" },
        {
          validate: val => {
            return /^\d{6}$/.test(val);
          },
          message: "手机验证码有误！"
        }
      ],
      pwd1Rule: [
        { validate: val => !!val, message: "请输入登录密码" },
        {
          validate: val => {
            return /^[\s\S]{6,20}$/.test(val);
          },
          message: "验证码有误"
        }
      ],
      pwd2Rule: [
        { validate: val => !!val, message: "请输入登录密码" },
        {
          validate: val => {
            return /^[\s\S]{6,20}$/.test(val);
          },
          message: "验证码有误"
        }
      ]
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
    send_code() {
      const _this = this;
      const p = { phoneNumber: _this.form.mobile };
      let t = 60;
      if (/^1[3|5|7|8|9]\d{9}$/.test(_this.form.mobile)) {
        if (_this.send) {
          _this.send = false;
          clearInterval(_this.timers);
          _this.timers = setInterval(function() {
            if (t >= 1) {
              t = t - 1;
              _this.btn_txt = `${t}s`;
            } else {
              _this.send = true;
              _this.btn_txt = `获取验证码`;
            }
          }, 1000);
        } else {
          _this.openSimple = true;
          _this.msg = "请稍候再试！";
          clearTimeout(_this.timer);
          _this.timer = setTimeout(() => {
            _this.openSimple = false;
          }, 1800);
        }
      } else {
        _this.openSimple = true;
        _this.msg = "输入的手机号码有误！";
        clearTimeout(_this.timer);
        _this.timer = setTimeout(() => {
          _this.openSimple = false;
        }, 1800);
      }
      getCode(p).then(r => {
        console.log(r);
      });
    },
    modify() {
      var _this = this;
      _this.$refs.pform.validate().then(result => {
        console.log(result);
        if (result) {
          if (_this.form.pwd1 !== _this.form.pwd2) {
            _this.openSimple = true;
            _this.msg = "两次输入的密码不一致";
            clearTimeout(_this.timer);
            _this.timer = setTimeout(() => {
              _this.openSimple = false;
            }, 1800);
          } else {
            const p = {
              mobile: _this.form.mobile,
              password: _this.form.pwd1,
              code: _this.form.code
            };
            forget(p).then(res => {
              if (res.code === 0) {
                _this.openSimple = true;
                _this.msg = "修改成功";
                clearTimeout(_this.timer);
                _this.timer = setTimeout(() => {
                  _this.openSimple = false;
                  _this.$router.push("/");
                }, 1800);
              } else {
                _this.openSimple = true;
                _this.msg = res.message;
                clearTimeout(_this.timer);
                _this.timer = setTimeout(() => {
                  _this.openSimple = false;
                }, 1800);
              }
            });
          }
        }
      });
    },
    back() {
      window.history.back();
    },
    openSimpleDialog() {
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.openSimple = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.p_box {
  .icon_txt {
    & i {
      font-size: 0.6rem;
      color: #2196f3;
    }
  }
  .mu_form {
    padding: 20px;
    background: #fff;
  }
  .send_code {
    display: block;
    padding-left: 15px;
    position: absolute;
    right: 0;
    top: -1px;
    width: 1.7rem;
    height: 32px;
    line-height: 32px;
    background: #fff;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 5px;
      height: 22px;
      width: 1px;
      background: #ebeef5;
    }
  }
}
</style>
