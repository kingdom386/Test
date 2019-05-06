<template>
  <mu-container class="login_box">
    <div v-show="isS" class="layer">
      <div class="layer_content">
        {{msg}}
        <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">确定</mu-button>
      </div>
    </div>
    <div class="center_box">
      <div class="logo">
        <img src="../assets/images/logo60.png">
      </div>
      <div class="input_pane">
        <div class="inputs">
          <input
            type="text"
            @blur="checkuser"
            :class="[!isA ? 'active' : '']"
            placeholder="用户名/手机号/邮箱"
            v-model="form.username"
          >
          <p>&nbsp;{{isM}}</p>
        </div>
        <div class="inputs">
          <span @click="toggles" :class="[isR ? 'visibles' : 'nvisibles']"></span>
          <input
            v-if="isV"
            type="text"
            :class="[!isB ? 'active' : '']"
            @blur="checkPwd"
            placeholder="密码"
            v-model="form.password"
          >
          <input
            v-else
            type="password"
            :class="[!isB ? 'active' : '']"
            @blur="checkPwd"
            placeholder="密码"
            v-model="form.password"
          >
          <p>&nbsp;{{isP}}</p>
        </div>
      </div>
      <div class="pwd">
        <span class="color_blue" @click="goforget">忘记密码？</span>
        <span class="color_blue" @click="goregister">用户注册</span>
      </div>
      <div class="btns">
        <mu-button full-width class="btn_bg" color="primary" @click="login">登录</mu-button>
      </div>
    </div>
  </mu-container>
</template>

<script>
import { userLogin } from "@/utils/api";
export default {
  data() {
    return {
      isA: true,
      isB: true,
      isS: false,
      isV: false,
      isR: true,
      isM: "",
      isP: "",
      visibility: false,
      openSimple: false,
      timer: null,
      msg: "",
      form: {
        username: "",
        password: ""
      },
      usernameRules: [
        { validate: val => !!val, message: "请输入用户名用户名" }
      ],
      passwordRules: [{ validate: val => !!val, message: "必须填写密码" }]
    };
  },
  mounted() {},
  methods: {
    toggles() {
      this.isR = !this.isR;
      this.isV = !this.isV;
    },
    checkuser() {
      if (this.form.username) {
        this.isA = true;
        this.isM = "";
      } else {
        this.isA = false;
        this.isM = "输入的用户名/手机号/邮箱有误！";
      }
    },
    checkPwd() {
      if (this.form.password) {
        this.isB = true;
        this.isP = "";
      } else {
        this.isB = false;
        this.isP = "必须填写密码";
      }
    },
    goforget() {
      this.$router.push("/forget");
    },
    goregister() {
      this.$router.push("/register");
    },
    login() {
      const _this = this;
      if (_this.form.username && _this.form.password) {
        const p = {
          username: _this.form.username,
          password: _this.form.password
        };
        userLogin(p).then(r => {
          _this.openSimpleDialog();
          if (r.code === 0) {
            _this.msg = "登录成功！";
            localStorage.setItem("token", r.content);
            clearTimeout(_this.timer);
            _this.timer = setTimeout(() => {
              _this.$router.push("/index");
            }, 1000);
          } else {
            _this.msg = r.message;
            _this.isS = true;
          }
        });
      } else {
        if (_this.isA) {
          _this.checkuser();
        }
        if (_this.isB) {
          _this.checkPwd();
        }
      }
    },
    openSimpleDialog() {
      this.isS = true;
    },
    closeSimpleDialog() {
      this.isS = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>

<style>
.mu-form-item-content {
  display: flex !important;
  flex-wrap: nowrap !important;
  justify-content: space-between !important;
  align-items: center !important;
}
.mu-dialog-actions {
  justify-content: center;
}
</style>
