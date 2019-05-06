<template>
  <div class="c_box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>装修公司
      <mu-button flat slot="right"></mu-button>
    </mu-appbar>
    <mu-container class="app_top">
      <mu-flex class="c_avatar bg_white" justify-content="center">
        <mu-avatar size="80">
          <img :src="cInfo.logo" alt>
        </mu-avatar>
      </mu-flex>
      <mu-flex class="bg_white" justify-content="center">
        <p>{{cInfo.companyName}}</p>
      </mu-flex>
      <mu-flex class="infos bg_white" justify-content="center">
        <span class="label_content">
          <i class="color_blue iconfont icon-tushuguan"></i>
          案例：{{cInfo.caseCount}}
        </span>
        <span class="label_content">
          <i class="color_blue iconfont icon-pc"></i>
          设计：{{cInfo.desCount}}
        </span>
        <span class="label_content">
          <i class="color_blue iconfont icon-wenben"></i>
          签约：{{cInfo.tradeCount}}
        </span>
      </mu-flex>
      <mu-flex class="info_detail bg_white" justify-content="center">{{cInfo.summary}}</mu-flex>
      <div class="bg_white info_title">设计团队</div>
      <mu-grid-list class="bg_white gridlist_inline_demo" :cols="4" :cell-height="100">
        <mu-grid-tile v-for="(item, index) in designer" :key="index" @click="designers(item.id)">
          <mu-flex justify-content="center">
            <mu-avatar class="c_img" size="60">
              <img :src="item.headPic">
            </mu-avatar>
          </mu-flex>
          <mu-flex class="c_d_box" justify-content="center">{{item.name}}</mu-flex>
        </mu-grid-tile>
      </mu-grid-list>
      <div class="bg_white info_title">案例展示</div>
      <mu-grid-list class="bg_white gridlist_inline_demo" :cols="2" :cell-height="160">
        <mu-grid-tile v-for="(item, index) in cases" :key="index">
          <mu-flex justify-content="center">
            <div class="case_item">
              <img :src="item.picUrl">
            </div>
          </mu-flex>
          <mu-flex class="c_d_box" justify-content="center">{{item.style}}</mu-flex>
        </mu-grid-tile>
      </mu-grid-list>
    </mu-container>
    <div class="m_btm">
      <mu-button class="btn_bg" full-width color="primary" @click="toorder">立即下单</mu-button>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { detailById, Designers, listcases } from "@/utils/api";
export default {
  computed: {
    cid() {
      return this.$route.query.id;
    }
  },
  data() {
    return {
      cInfo: "",
      designer: [],
      cases: []
    };
  },
  mounted() {
    console.log(this.cid);
    this.init();
  },
  methods: {
    init() {
      // const _this = this;
      console.log(Cookies.get("cid"));
      let cid = Cookies.get("cid");
      detailById({ id: cid }).then(r => {
        if (r.code === 0) {
          this.cInfo = r.content;
        }
      });
      Designers({ owerCompany: cid, pageNum: 1, pageSize: 10 }).then(r => {
        console.log(r);
        if (r.code === 0) {
          this.designer = r.content.list;
        }
      });
      listcases({ owerCompany: cid, pageNum: 1, pageSize: 10 }).then(r => {
        if (r.code === 0) {
          this.cases = r.content.list;
        }
      });
    },
    back() {
      window.history.back();
    },
    toorder() {
      this.$router.push("order");
    },
    designers(e) {
      this.$store.commit("SET_TEMP_DID", { did: e });
      this.$router.push({ path: "/designer", query: { did: e } });
    }
  }
};
</script>

<style lang="scss" scoped>
.c_box {
  .bg_white {
    background: #fff;
  }
  .c_avatar {
    padding: 20px 0 10px 0;
  }
  .infos {
    padding: 0 0 10px 0;
    .label_content {
      margin-right: 8px;
      padding-left: 20px;
      position: relative;
      display: block;
      min-width: 80px;
      font-size: 12px;
      line-height: 20px;
      height: 20px;
      &:last-child {
        margin-right: 0;
      }
      & i {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
      }
    }
  }
  .info_detail {
    margin-bottom: 10px;
    padding: 0 50px 10px;
    font-size: 12px;
    line-height: 18px;
    text-indent: 24px;
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
  .gridlist_inline_demo {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    .c_img {
      margin-top: 10px;
    }
    .c_d_box {
      font-size: 12px;
      line-height: 30px;
    }
    .case_item {
      margin-top: 10px;
      width: 200px;
      height: 120px;
      border-radius: 5px;
      overflow: hidden;
      & img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
