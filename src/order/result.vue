<template>
  <div class="contract_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>签约成功
      <mu-button flat slot="right"></mu-button>
    </mu-appbar> -->
    <!-- d_top -->
    <heads>
      <span slot="title_name">签约成功</span>
    </heads>
    <div class="d_content">
      <div v-show="true" class="d_success">
        <img src="../assets/images/order_success.jpg" alt>
        <h2>恭喜您签约成功</h2>
        <p class="order_num">订单号：{{ getNO }}</p>
        <!-- <p class="btns">
          <mt-button @click="checkorder" type="primary">查看此订单</mt-button>
        </p>-->
        <mu-flex class="btns" justify-content="center" align-items="center">
          <mu-button
            style="background-color:#2196f3;"
            full-width
            color="primary"
            @click="checkorder"
          >查看此订单</mu-button>
        </mu-flex>
      </div>
      <!-- d_success -->
      <div v-show="false" class="no_order">
        <img src="../assets/images/search_none.jpg" alt>
        <p>暂无业务员推送的客户信息哦</p>
      </div>
    </div>
    <!-- d_content -->
  </div>
  <!-- contract_box -->
</template>

<script>
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  data() {
    return {
      NO: ""
    };
  },
  computed: {
    getNO() {
      const No = this.$route.query.NO;
      return No;
    }
  },
  methods: {
    back() {
      window.history.back();
    },
    checkorder() {
      const oid = this.getNO;
      this.$router.push({ path: "/check", query: { id: oid, type: 1 } });
    }
  }
};
</script>

<style lang="scss" scoped>
.contract_box {
  width: auto;
  height: 100%;
  background: #fff;
  .d_top {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
  }
  .d_content {
    padding: 52px 0 0;
    .d_success {
      padding: 0.32rem 0 0.1rem;
      background: #fff;
      & > img {
        margin: 0 auto;
        display: block;
        width: 2.3rem;
        height: 2.3rem;
      }
      h2 {
        font-size: 0.3rem;
        color: #333;
        line-height: 1.5;
        text-align: center;
      }
      .order_num {
        text-align: center;
        font-size: 0.18rem;
        line-height: 1.5;
        color: #ffa353;
      }
      .btns {
        margin-top: 0.2rem;
        padding: 0 0.18rem;
      }
    }
    .no_order {
      padding-top: 0.45rem;
      & > img {
        margin: 0 auto;
        display: block;
        width: 2.1rem;
        height: 2.1rem;
      }
      & > p {
        text-align: center;
        font-size: 0.2rem;
        line-height: 1.5;
        color: #a2a2a2;
      }
    }
  }
}
</style>
