<template>
  <div class="ag_box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>用户注册协议
      <mu-button flat slot="right"></mu-button>
    </mu-appbar>
    <div class="app_top">
      <mu-container class="contents">
        <mu-flex justify-content="start">
          <span v-html="content"></span>
        </mu-flex>
      </mu-container>
    </div>
  </div>
</template>

<script>
import { Protocol } from "@/utils/api";
export default {
  data() {
    return {
      content: ""
    };
  },
  created () {
    this.init();
  },
  methods: {
    back() {
      window.history.back();
    },
    init() {
      Protocol().then(r => {
        console.log(r);
        this.content = r.content.protocolContent;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ag_box {
  .contents {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
