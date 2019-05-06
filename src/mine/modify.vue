<template>
  <div class="modify_pwd">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" flat slot="left">
        <mu-icon value="keyboard_arrow_left" color="blue"></mu-icon>
      </mu-button>修改密码
      <mu-button flat slot="right">&nbsp;</mu-button>
    </mu-appbar>
    <mu-container class="app_top">
      <mu-form :model="form" class="mu_demo_form" ref="modifypwd">
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
          <!-- <mu-text-field placeholder="请确认新密码" v-model="form.newpassword1" :error-text="newmsg2"></mu-text-field> -->
        </mu-form-item>
        <mu-form-item>
          <mu-button full-width color="primary" @click="subform" class="btn_txt">确认修改</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
import { updatePwd } from "@/utils/api";
export default {
  data() {
    return {
      oldmsg: "",
      newmsg: "",
      newmsg2: "",
      visibility: true,
      visibility1: true,
      visibility2: true,
      form: {
        oldpassword: "",
        newpassword: "",
        newpassword1: ""
      },
      oldpasswordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6 && val.length <= 20,
          message: "密码长度大于6小于20"
        }
      ],
      newpasswordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6 && val.length <= 20,
          message: "密码长度大于6小于20"
        }
      ],
      newpassword1Rules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6 && val.length <= 20,
          message: "密码长度大于6小于20"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    back() {
      window.history.back();
    },
    subform() {
      var _this = this;
      this.$refs.modifypwd.validate().then(r => {
        if (r) {
          if (_this.form.newpassword === _this.form.newpassword1) {
            updatePwd({
              oldpwd: _this.form.oldpassword,
              newpwd: _this.form.newpassword,
              phone: localStorage.getItem("mobile")
            }).then(rp => {
              if (rp.code === 0) {
                _this.$router.push("/");
              } else {
                _this.$toast.error(rp.message);
              }
            });
          } else {
            _this.$toast.error("两次输入的密码不一致！");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.modify_pwd {
  background: #f1f1f1;
  min-height: 100%;
  .mu_demo_form {
    padding: 10px;
    background: #fff;
    .btn_txt {
      background: #2196f3;
    }
  }
}
</style>
