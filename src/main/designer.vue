<template>
  <div class="d_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>设计师介绍
      <mu-button flat slot="right"></mu-button>
    </mu-appbar> -->
    <heads><span slot="title_name">设计师介绍</span></heads>
    <mu-container class="app_top">
      <mu-flex class="bg_white u_avatar" justify-content="center">
        <mu-avatar size="60">
          <img :src="designerData.headPic" alt>
        </mu-avatar>
      </mu-flex>
      <mu-flex class="bg_white" justify-content="center">{{designerData.name}}</mu-flex>
      <div class="bg_white info_title">案例展示</div>
      <div class="list_box">
        <div v-for="(item, index) in listcases" :key="index" class="list_item bg_white">
          <div class="list_img">
            <img :src="item.picUrl" alt>
          </div>
          <div class="list_info">{{item.style}}</div>
          <div class="list_intro">
            <span>
              <i class="iconfont icon-shizhong"></i>
              完工预算：{{item.schedule}}天
            </span>
            <span>
              <i class="iconfont icon-bangdingyinxingqia"></i>
              费用：{{item.budget}}元
            </span>
          </div>
        </div>
      </div>
    </mu-container>
    <div class="m_btm">
      <mu-button class="btn_bg" full-width color="primary" @click="toorder">立即下单</mu-button>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getDesigner, listCase } from "@/utils/api";
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  data() {
    return {
      msg: "",
      designerData: {},
      listcases: []
    };
  },
  mounted() {
    this.did = Cookies.get("did");
    this.init();
  },
  methods: {
    back() {
      window.history.back();
    },
    init() {
      const p = { id: this.did };
      const q = { ownerDesigner: this.did, pageNum: 1, pageSize: 100 };
      getDesigner(p).then(r => {
        if (r.code === 0) {
          this.designerData = r.content;
        }
      });
      listCase(q).then(r => {
        if (r.code === 0) {
          this.listcases = r.content.list;
        }
      });
    },
    toorder() {
      this.$router.push("order");
    }
  }
};
</script>

<style lang="scss" scoped>
.d_box {
  .u_avatar {
    padding: 20px 0 10px 0;
  }
  .info_title {
    margin-top: 10px;
    padding-left: 20px;
    position: relative;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #e4e7ed;
    &::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 13px;
      width: 2px;
      height: 14px;
      background: #2196f3;
    }
  }
  .list_box {
    .list_item {
      padding: 10px;
      margin-bottom: 10px;
      .list_img {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 180px;
        border-radius: 10px;
        overflow: hidden;
        & img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
      .list_info {
        width: 100%;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
      }
      .list_intro {
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        span {
          position: relative;
          padding-left: 24px;
          & i {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: #2196f3;
          }
        }
      }
    }
  }
}
</style>
