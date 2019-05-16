<template>
  <div class="mine_box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button flat slot="left">&nbsp;</mu-button>个人中心
      <mu-button flat slot="right" @click="modify">
        <i class="iconfont icon-setup_fill" style="color: #2196f3;font-size: 0.4rem;"></i>
      </mu-button>
    </mu-appbar>
    <div class="d_content">
      <div class="d_box">
        <div class="d_pane">
          <div class="d_row">
            <span class="d_header">
              <img src="../assets/images/avatar.jpeg" alt>
            </span>
            <!-- d_header -->
            <h2>{{userInfo.name}}</h2>
            <div class="d_flexcol">
              <span class="col">
                <i class="iconfont icon-jifen"></i>
                积分：{{userInfo.point}}
              </span>
              <span class="col">
                <i class="iconfont icon-jifen"></i>
                等级：{{userInfo.star}}
              </span>
              <span class="col">
                <i class="iconfont icon-jifen"></i>
                砖块：{{userInfo.block}}
              </span>
              <span class="exchange_btn" @click="exchange">兑换</span>
            </div>
          </div>
          <!-- d_row -->
          <div class="d_drow">
            <span class="d_col">
              <h2>{{userInfo.block}}</h2>
              <p>订单量</p>
            </span>
            <span class="d_col">
              <h2>
                <em>￥</em>
                {{userInfo.blance}}
              </h2>
              <p>余额</p>
            </span>
          </div>
        </div>
        <!-- d_pane -->
        <div class="d_order">
          <div class="d_header" @click="checkorder">
            <span class="d_title">我的订单</span>
            <span class="d_right">
              查看全部订单
              <i class="iconfont icon-previewright"></i>
            </span>
          </div>
          <!-- d_header -->
          <div class="d_body">
            <span @click="upload(1)">
              <i class="icons">
                <img src="../assets/images/upload.gif" alt>
              </i>
              <p>待上传合同</p>
            </span>
            <span @click="upload(2)">
              <i class="icons">
                <img src="../assets/images/qianbao.gif" alt>
              </i>
              <p>待付款</p>
            </span>
            <span @click="upload(3)">
              <i class="icons">
                <img src="../assets/images/jiesuan.jpg" alt>
              </i>
              <p>待结算</p>
            </span>
            <span @click="upload(4)">
              <i class="icons">
                <img src="../assets/images/wancheng.gif" alt>
              </i>
              <p>已完成</p>
            </span>
          </div>
          <mu-divider></mu-divider>
          <!-- d_body -->
          <mu-list>
            <mu-list-item avatar button :ripple="true" @click="mx">
              <mu-list-item-action>
                <mu-avatar size="34" color="blue">
                  <i class="iconfont icon-wenben" style="font-size: 0.48rem"></i>
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>查看明细</mu-list-item-title>
              <mu-list-item-action>
                <i class="iconfont icon-enter" style="font-size: 0.48rem"></i>
              </mu-list-item-action>
            </mu-list-item>

            <mu-divider></mu-divider>
            <mu-list-item avatar button :ripple="true" @click="tx">
              <mu-list-item-action>
                <mu-avatar size="34" color="blue">
                  <i class="iconfont icon-redpacket_fill" style="font-size: 0.48rem"></i>
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>余额体现</mu-list-item-title>
              <mu-list-item-action>
                <i class="iconfont icon-enter" style="font-size: 0.48rem"></i>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
            <mu-list-item avatar button :ripple="true">
              <mu-list-item-action>
                <mu-avatar size="34" color="blue">
                  <i class="iconfont icon-share_fill" style="font-size: 0.48rem"></i>
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>分享App</mu-list-item-title>
              <mu-list-item-action>
                <i class="iconfont icon-enter" style="font-size: 0.48rem"></i>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
        <!-- d_order -->
      </div>
      <!-- d_box -->
    </div>
    <!-- d_content -->
    <div class="m_footer">
      <div class="m_footer_box">
        <span @click="tabs(1)">
          <i class="iconfont icon-yukuaijiatingshenghuo-"></i>
          <p>首页</p>
        </span>
        <span @click="tabs(2)">
          <i class="iconfont icon-87"></i>
          <p>客户池</p>
        </span>
        <span class="active" @click="tabs(3)">
          <i class="iconfont icon-gerenzhongxin"></i>
          <p>我的</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { SalesMan, Config, getOrderCountBySalesMan } from "@/utils/api";
// import heads from "@/components/head";

export default {
  // components: {
  //   heads
  // },
  data() {
    return {
      selected: "tab3",
      userInfo: {},
      totalCount: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    tx() {
      this.$router.push({
        path: "/tixian",
        query: { ye: this.userInfo.blance, id: this.userInfo.id }
      });
    },
    mx() {
      this.$router.push({
        path: "/balance",
        query: { ye: this.userInfo.blance, jf: this.userInfo.point }
      });
    },
    checkorder() {
      this.$router.push("/check");
    },
    upload(i) {
      this.$router.push({ path: "/check", query: { status: i } });
    },
    modify() {
      this.$router.push("/password");
    },
    tabs(e) {
      if (e === 1) {
        this.$router.push("/index");
      }
      if (e === 2) {
        this.$router.push("/pool");
      }
    },
    init() {
      SalesMan().then(r => {
        if (r.code === 0) {
          this.userInfo = r.content;
          localStorage.setItem("mobile", this.userInfo.mobile);
        } else {
          this.$messagebox("提示", r.message);
        }
      });
      getOrderCountBySalesMan().then(r => {
        if (r.code === 0) {
          this.totalCount = r.content;
        }
      });
    },
    exchange() {
      Config().then(r => {
        console.log(r);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mine_box {
  min-height: 100%;
  background: #f1f1f1;
  .d_content {
    padding: 40px 0 62px;
    .d_box {
      margin-top: 12px;
      .d_pane {
        background: #fff;
        padding: 0 10px;
      }
      .d_row {
        display: flex;
        padding-left: 80px;
        position: relative;
        height: 80px;
        flex-direction: column;
        & > h2 {
          padding-top: 20px;
          width: 100%;
          font-size: 20px;
          color: #333;
          line-height: 30px;
        }
        .d_header {
          position: absolute;
          top: 50%;
          left: 0;
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 60px;
          background: #e3e3e3;
          border: 1px solid #f1f1f1;
          transform: translate3d(0, -50%, 0);
          overflow: hidden;
          & > img {
            display: block;
            width: 100%;
            height: auto;
          }
        }
        .d_flexcol {
          position: relative;
          display: flex;
          width: 100%;
          height: 30px;
          flex-direction: row;
          flex-wrap: nowrap;
          .exchange_btn {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 14px;
            line-height: 30px;
            color: #ffa353;
          }
          .col {
            flex-basis: 30%;
            font-size: 14px;
            line-height: 30px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
            & > i {
              color: #23afff;
              font-size: 0.2rem;
              line-height: 0.64rem;
            }
          }
        }
      }
      .d_drow {
        display: flex;
        position: relative;
        height: 1.36rem;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .d_col {
          flex-basis: 50%;
          height: 1.36rem;
          & > h2 {
            text-align: center;
            font-size: 0.4rem;
            line-height: 1.5;
            color: #ffa353;
            & > em {
              font-size: 0.18rem;
            }
          }
          & > p {
            text-align: center;
            font-size: 0.26rem;
            color: #333;
          }
        }
      }
      .d_order {
        margin-top: 12px;
        font-size: 0.2rem;
        background: #fff;
        .d_header {
          padding: 0 20px;
          line-height: 40px;
          border-bottom: 1px solid #f1f1f1;
          .d_title {
            position: relative;
            color: #333;
            font-size: 14px;
            line-height: 40px;
            &::before {
              display: block;
              position: absolute;
              left: -10px;
              top: 0;
              content: "";
              display: block;
              width: 3px;
              height: 20px;
              background: #23afff;
            }
          }
          .d_right {
            float: right;
            font-size: 14px;
            line-height: 40px;
            color: #cdcdcd;
          }
        }
        .d_body {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 1.88rem;
          & > span {
            flex-basis: 25%;
            justify-content: center;
            align-items: center;
            .icons {
              margin: 0 auto;
              display: block;
              width: 30px;
              height: 30px;
              overflow: hidden;
              & > img {
                display: block;
                width: 100%;
                height: auto;
              }
            }
            & > p {
              width: 100%;
              font-size: 12px;
              line-height: 26px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>

<style>
.iocns {
  font-size: 20px;
  color: #23afff;
}
</style>
