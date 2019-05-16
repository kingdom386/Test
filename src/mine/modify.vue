<template>
  <div class="modify_pwd">
    <heads>
      <span slot="title_name">修改密码</span>
    </heads>
    <mu-container class="app_top">
      <!-- <mu-form :model="form" class="mu_demo_form" ref="modifypwd">
        <mu-form-item prop="oldpassword" :rules="oldpasswordRules">
          <mu-text-field
            placeholder="请输入旧密码"
            v-model="form.oldpassword"
            :action-icon="visibility1 ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility1 = !visibility1)"
            :type="visibility1 ? 'password' : 'text'"
            :error-text="oldmsg"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="newpassword" :rules="newpasswordRules">
          <mu-text-field
            placeholder="请输入新密码"
            v-model="form.newpassword"
            :action-icon="visibility2 ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility2 = !visibility2)"
            :type="visibility2 ? 'password' : 'text'"
            :error-text="newmsg"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="newpassword1" :rules="newpassword1Rules">
          <mu-text-field
            v-model="form.newpassword1"
            :action-icon="visibility ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility = !visibility)"
            :type="visibility ? 'password' : 'text'"
            placeholder="请确认新密码"
            :error-text="newmsg2"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button full-width color="primary" @click="subform" class="btn_txt">确认修改</mu-button>
        </mu-form-item>
      </mu-form>-->
      <div class="modify_box">
        <div class="modify_item">
          <span @click="showpwd(1)" :class="['showpwd', visibility ? 'v' : 'nv']"></span>
          <input
            v-if="visibility"
            type="text"
            @blur="checkoldpwd(1)"
            placeholder="请输入旧密码"
            v-model="form.oldpassword"
          >
          <input
            v-else
            type="password"
            @blur="checkoldpwd(1)"
            placeholder="请输入旧密码"
            v-model="form.oldpassword"
          >
          <p>{{oldmsg}}&nbsp;</p>
        </div>
        <div class="modify_item">
          <span @click="showpwd(2)" :class="['showpwd', visibility1 ? 'v' : 'nv']"></span>
          <input
            v-if="visibility1"
            type="text"
            @blur="checkoldpwd(2)"
            placeholder="请输入新密码"
            v-model="form.newpassword"
          >
          <input
            v-else
            type="password"
            @blur="checkoldpwd(2)"
            placeholder="请输入新密码"
            v-model="form.newpassword"
          >
          <p>{{newmsg}}&nbsp;</p>
        </div>
        <div class="modify_item">
          <span @click="showpwd(3)" :class="['showpwd', visibility2 ? 'v' : 'nv']"></span>
          <input
            v-if="visibility2"
            type="text"
            @blur="checkoldpwd(3)"
            placeholder="请确认新密码"
            v-model="form.newpassword1"
          >
          <input
            v-else
            type="password"
            @blur="checkoldpwd(3)"
            placeholder="请确认新密码"
            v-model="form.newpassword1"
          >
          <p>{{newmsg2}}&nbsp;</p>
        </div>
      </div>
      <div class="subform">
        <mu-button full-width color="primary" @click="subform" class="btn_txt">确认修改</mu-button>
      </div>
    </mu-container>
  </div>
</template>

<script>
import { updatePwd } from "@/utils/api";
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  data() {
    return {
      oldmsg: "",
      newmsg: "",
      newmsg2: "",
      visibility: false,
      visibility1: false,
      visibility2: false,
      form: {
        oldpassword: "",
        newpassword: "",
        newpassword1: ""
      }
    };
  },
  mounted() {},
  methods: {
    showpwd(val) {
      const _this = this;
      if (val === 1) {
        _this.visibility = !_this.visibility;
      }
      if (val === 2) {
        _this.visibility1 = !_this.visibility1;
      }
      if (val === 3) {
        _this.visibility2 = !_this.visibility2;
      }
    },
    checkoldpwd(val) {
      const _this = this;
      const reg = /^[\s\S]{6,20}$/;
      if (val === 1) {
        if (reg.test(_this.form.oldpassword)) {
          _this.oldmsg = "";
          return true;
        } else {
          _this.oldmsg = "输入的密码格式有误！";
          return false;
        }
      }
      if (val === 2) {
        if (reg.test(_this.form.newpassword)) {
          _this.newmsg = "";
          return true;
        } else {
          _this.newmsg = "输入的密码格式有误！";
          return false;
        }
      }
      if (val === 3) {
        if (reg.test(_this.form.newpassword1)) {
          _this.newmsg2 = "";
          return true;
        } else {
          _this.newmsg2 = "输入的密码格式有误！";
          return false;
        }
      }
    },
    back() {
      window.history.back();
    },
    subform() {
      var _this = this;
      if (
        _this.checkoldpwd(1) &&
        _this.checkoldpwd(2) &&
        _this.checkoldpwd(3)
      ) {
        if (_this.form.newpassword === _this.form.newpassword1) {
          updatePwd({
            oldpwd: _this.form.oldpassword,
            newpwd: _this.form.newpassword,
            phone: localStorage.getItem("mobile")
          }).then(rp => {
            if (rp.code === 0) {
              _this.$toast.success(rp.message);
              setTimeout(function () {
                _this.$router.push("/");
              }, 1800);
            } else {
              _this.$toast.error(rp.message);
            }
          });
        } else {
          _this.$toast.error("两次输入的密码不一致！");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./modify.scss";
</style>

<style scoped>
.subform /deep/ .mu-button-wrapper {
  background: #2196f3;
}
</style>
