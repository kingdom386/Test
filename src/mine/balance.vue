<template>
  <div class="balance_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left" color="blue"></mu-icon>
      </mu-button>余额与积分明细
      <mu-button flat slot="right">&nbsp;</mu-button>
    </mu-appbar>-->
    <heads>
      <span slot="title_name">余额与积分明细</span>
    </heads>
    <div class="d_content">
      <div class="bl_pane">
        <span>
          <p class="title">账户余额</p>
          <p class="info">{{ye}}</p>
        </span>
        <span>
          <p class="title">账户积分</p>
          <p class="info">{{jf}}</p>
        </span>
      </div>
      <div class="nav_tab">
        <mu-tabs
          @change="tabchange"
          full-width
          :value.sync="active"
          inverse
          color="blue"
          text-color="#2196f3"
          center
        >
          <mu-tab>余额明细</mu-tab>
          <mu-tab>积分明细</mu-tab>
        </mu-tabs>
        <!-- navs -->
        <div class="cell_box">
          <div class="tab_one">
            <div class="tab_content">
              <p>
                <span class="tab_name">兑换兑换</span>
                <span class="tab_time">1081-10-10</span>
              </p>
              <p>
                <span class="tab_rest">余额：200.00</span>
                <span class="tab_dz">+ 20.0</span>
              </p>
            </div>
            <!-- tab_content -->
          </div>
          <!-- tab_one -->
        </div>
        <!-- cell_box -->
      </div>
      <!-- nav_tab -->
    </div>
  </div>
</template>

<script>
import { listCapitalDetail } from "@/utils/api";
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  computed: {
    jf() {
      return this.$route.query.jf;
    },
    ye() {
      return this.$route.query.ye;
    }
  },
  data() {
    return {
      active: 0,
      blancePoint: 0,
      listData: [],
      page: {
        pageNum: 1,
        pageSize: 200
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    tabchange(e) {
      this.listData = [];
      if (e === 0) {
        // 余额
        this.blancePoint = 0;
      } else {
        // 积分
        this.blancePoint = 1;
      }
      this.init();
    },
    init() {
      let p = {
        blancePoint: this.blancePoint,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      };
      listCapitalDetail(p).then(r => {
        console.log(r);
        if (r.code === 0) {
          this.listData = r.content.list;
        } else {
          this.$toast.error(r.message);
        }
      });
    },
    back() {
      window.history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.balance_box {
  min-height: 100%;
  background: #f1f1f1;
  .d_top {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
  }
  .d_content {
    padding: 54px 0 60px;
    .bl_pane {
      padding: 10px;
      display: flex;
      width: 100%;
      height: 100px;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      background: #23afff;
      & > span {
        flex-basis: 50%;
        .title {
          margin-bottom: 8px;
          font-size: 12px;
          line-height: 30px;
          color: #fff;
        }
        .info {
          font-size: 20px;
          line-height: 40px;
          color: #fff;
        }
      }
    }
    .nav_tab {
      margin-top: 10px;
      background: #fff;
      .navs {
        display: flex;
        width: 100%;
        height: 30px;
        & span {
          position: relative;
          flex-basis: 50%;
          height: 30px;
          text-align: center;
          font-size: 14px;
          line-height: 30px;
        }
        .active {
          color: #23afff;
          & .underline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #23afff;
          }
        }
      }
      .cell_box {
        .tab_content {
          padding: 10px;
          display: flex;
          height: 70px;
          flex-direction: column;
          border-bottom: 1px solid #cfcfcf;
          & p {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            overflow: hidden;
            width: 100%;
            height: 25px;
            .tab_name {
              flex-basis: 50%;
              font-size: 14px;
              font-weight: bold;
              color: #333;
              line-height: 25px;
            }
            .tab_time {
              flex-basis: 50%;
              text-align: right;
              font-size: 12px;
              line-height: 25px;
              color: #cdcdcd;
            }
            .tab_rest {
              flex-basis: 50%;
              font-size: 12px;
              line-height: 25px;
            }
            .tab_dz {
              flex-basis: 50%;
              text-align: right;
              font-size: 12px;
              line-height: 25px;
              font-weight: bold;
              color: #23afff;
            }
            .txt_red {
              color: #ffa353;
            }
          }
        }
      }
    }
  }
}
</style>
