<template>
  <div class="tixian_box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>余额提现
      <mu-button flat slot="right">&nbsp;</mu-button>
    </mu-appbar>
    <mu-container class="app_top">
      <div class="white_bg app_padding">
        <mu-form :model="form" ref="withdraw" class="mu_demo_form" label-width="100">
          <mu-form-item prop="zhifb" class="margin_init" :rules="zhifbRules">
            <mu-text-field v-model="form.zhifb" placeholder="请输入支付宝账户"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="ye" class="margin_init" :rules="yeRules">
            <mu-text-field v-model="form.ye" placeholder="请输入提现余额" :error-text="errormsg"></mu-text-field>
          </mu-form-item>
          <mu-form-item style="margin-bottom: 0;">
            <mu-flex>可用余额: {{ye}}</mu-flex>
          </mu-form-item>
        </mu-form>
      </div>
      <mu-flex
        style="margin-top: 20px; padding: 0 10px;"
        justify-content="center"
        align-items="center"
      >
        <mu-button full-width color="blue" @click="tixian">确认提现</mu-button>
      </mu-flex>
    </mu-container>
    <!-- d_content -->
  </div>
</template>

<script>
import { saveWithdraw } from "@/utils/api";
export default {
  computed: {
    gid() {
      return this.$route.query.id;
    },
    ye() {
      return this.$route.query.ye;
    }
  },
  data() {
    return {
      form: {
        zhifb: "",
        ye: ""
      },
      errormsg: "",
      zhifbRules: [{ validate: val => !!val, message: "必须填写支付宝账号" }],
      yeRules: [
        { validate: val => !!val, message: "请填写提现金额" },
        {
          validate: val => val > 0,
          message: "输入金额必须大于0"
        }
      ]
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    tixian() {
      let _this = this;
      this.$refs.withdraw.validate().then(r => {
        console.log(r);
        if (r) {
          if (_this.form.ye > _this.ye) {
            _this.errormsg = "输入的提现金额大于可用余额！故无法提现";
          } else {
            _this.errormsg = "";
            let p = {
              id: _this.gid,
              amount: _this.form.ye,
              account: _this.form.zhifb,
              status: 0
            };
            saveWithdraw(p).then(r => {
              if (r.code === 0) {
                _this.$toast.success("支付成功");
                setTimeout(function() {
                  _this.$router.push("/mine");
                }, 1500);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tixian_box {
  min-height: 100%;
  background: #f1f1f1;
  .app_padding {
    padding: 10px;
  }
  .white_bg {
    background: #fff;
  }
  .margin_init {
    margin-bottom: 0;
  }
}
</style>
