<template>
  <div class="r_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="login" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>用户注册
      <mu-button flat slot="right"></mu-button>
    </mu-appbar> -->
    <heads>
      <span slot="title_name">用户注册</span>
    </heads>
    <div class="app_top">
      <mu-container>
        <mu-form :model="form" ref="myform" class="mu_form">
          <mu-form-item help-text="请输入用户名，12个字符以内" prop="username" :rules="usernameRules">
            <mu-text-field placeholder="用户名：" v-model="form.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item style="margin-bottom: 0;" prop="mobile" :rules="passwordRules">
            <mu-text-field placeholder="手机号：" type="mobile" v-model="form.mobile" prop="mobile"></mu-text-field>
          </mu-form-item>
          <mu-form-item class="margin_btm_init">
            <span class="mini_txt">我们将发送短信验证码到您的手机</span>
          </mu-form-item>
          <mu-form-item class="margin_btm_init">
            <mu-button class="btn_bg" full-width @click="submit">下一步</mu-button>
          </mu-form-item>
          <mu-form-item class="margin_btm_init">
            <span>
              已有账号？
              <span @click="login" class="color_blue">登录</span>
            </span>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.r_box {
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
}
</style>

<style scoped>
.mu-form-item-content {
  justify-content: flex-end;
}
</style>

<script>
import { getCode } from "@/utils/api";
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  data() {
    return {
      form: {
        username: "",
        mobile: ""
      },
      usernameRules: [
        { validate: val => !!val, message: "请输入用户名" },
        {
          validate: val => {
            return /^[\s\S]{1,12}$/.test(val);
          },
          message: "请输入用户名"
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: "请输入手机号" },
        {
          validate: val => {
            return /^1[3|5|7|8|9]\d{9}$/.test(val);
          },
          message: "请输入手机号"
        }
      ]
    };
  },
  methods: {
    login() {
      this.$router.push("/");
    },
    submit() {
      var _this = this;
      _this.$refs.myform.validate().then(result => {
        if (result) {
          // 发送短信
          getCode({phoneNumber: _this.form.mobile}).then(r => {
            console.log(r);
          });
          _this.$router.push({
            path: "/pwd",
            query: { username: _this.form.username, mobile: _this.form.mobile }
          });
        }
      });
    }
  }
};
</script>
