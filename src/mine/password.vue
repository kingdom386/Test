<template>
  <div class="password">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>设置
      <mu-button flat slot="right">&nbsp;</mu-button>
    </mu-appbar>
    <mu-container class="app_top">
      <mu-list toggle-nested>
        <mu-list-item class="white" button :ripple="true" @click="modifyPwd">
          <mu-list-item-title class="item_txt">修改密码</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-container>
    <!-- d_content -->
    <div class="exit">
      <mu-button style="background: #2196f3" full-width color="primary" @click="exit">退出</mu-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    exit () {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    back() {
      window.history.back();
    },
    modifyPwd () {
      this.$router.push("/modify");
    }
  }
};
</script>

<style lang="scss" scoped>
.password {
  min-height: 100%;
  .white {
    background: #fff;
  }
  .item_txt {
    font-size: 14px;
  }
  .exit {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: auto;
  }
}
</style>
