<template>
  <div class="pool_box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left" color="blue"></mu-icon>
      </mu-button>查看订单
      <mu-button flat slot="right">&nbsp;</mu-button>
    </mu-appbar>
    <mu-container class="app_top" style="padding-bottom: 0;">
      <mu-load-more :loading="waiting" @load="loadmore">
        <div class="d_box">
          <div class="lists" v-for="(item, index) in listData" :key="index">
            <div class="items">
              <span class="s_col col">
                订单编号：
                <em>{{item.orderNo}}</em>
              </span>
            </div>
            <!-- items -->
            <div class="items">
              <span class="s_col col">
                下单时间：
                <em>{{item.createTime}}</em>
              </span>
            </div>
            <!-- items -->
            <div class="items">
              <span class="s_col col">
                装修风格：
                <em>{{item.style}}</em>
              </span>
            </div>
            <!-- items -->
            <div class="items">
              <span class="s_col col">
                装修面积：
                <em>{{item.area}}平方</em>
              </span>
            </div>
            <!-- items -->
            <div class="items">
              <span class="s_col col">
                房屋户型：
                <em>{{item.houseType}}</em>
              </span>
            </div>
            <!-- items -->
            <div class="items">
              <span class="s_col col">
                订单金额：
                <em>{{item.orderAmount}}元</em>
              </span>
            </div>
            <div class="right_pane">
              <!-- <p>待上传合同</p> -->
              <p v-if="item.status === 0">
                <span class="txt_blue">待签约</span>
              </p>
              <p v-else-if="item.status === 1">
                <span class="txt_blue">待上传合同</span>
              </p>
              <p v-else-if="item.status === 2">
                <span class="txt_blue">待付款</span>
              </p>
              <p v-else-if="item.status === 3">
                <span class="txt_blue">待结算</span>
              </p>
              <p v-else-if="item.status === 4">
                <span class="txt_blue">已完成</span>
              </p>
              <p class="btm_btn">
                <span class="txt_blue" @click="detail(item)">查看详情</span>
                <span class="txt_blue" v-if="item.status === 2" @click="isPay(item)">线下已付款</span>
                <span class="txt_blue" v-if="item.status === 1" @click="uploadht(item)">拍照上传</span>
              </p>
            </div>
            <!-- items -->
          </div>
          <!-- lists -->
        </div>
      </mu-load-more>
    </mu-container>
  </div>
</template>

<script>
import { listOrder, getOrder, updateOrder } from "@/utils/api";

export default {
  data() {
    return {
      listData: [],
      waiting: false,
      oid: "",
      flag: true,
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  computed: {
    getID() {
      return this.$route.query.id;
    },
    gettype() {
      return parseInt(this.$route.query.type || "");
    },
    getstatus() {
      return this.$route.query.status || "";
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    detail(f) {
      console.log(f);
      console.log("详情！");
      this.$router.push({ path: "/order", query: { id: f.orderNo, type: 1 } });
    },
    isPay(e) {
      const _this = this;
      updateOrder({ orderNo: e.orderNo, status: 3 }).then(r => {
        if (r.code === 0) {
          _this.$toast.success(r.message);
          setTimeout(function() {
            _this.listData = [];
            _this.load();
          }, 1600);
        } else {
          _this.$toast.error(r.message);
        }
      });
    },
    uploadht(t) {
      const _this = this;
      if (this.gettype) {
        _this.$router.push({
          path: "/upload",
          query: { id: t.orderNo, type: _this.gettype }
        });
      } else {
        _this.$router.push({
          path: "/upload",
          query: { id: t.orderNo, status: _this.getstatus }
        });
      }
    },
    loadmore() {
      const _this = this;
      if (
        _this.page.pageNum * _this.page.pageSize < _this.page.total &&
        _this.flag
      ) {
        _this.page.pageNum += 1;
        _this.load();
      } else {
        _this.flag = false;
      }
    },
    load() {
      const _this = this;
      _this.waiting = true;
      // 获取详情
      if (_this.gettype === 1) {
        let p = {
          orderNo: _this.getID || ""
        };
        getOrder(p).then(r => {
          if (r.code === 0) {
            _this.waiting = false;
            _this.page.total = r.content.total;
            _this.listData.push(r.content);
          } else {
            _this.$toast.error(r.message);
            _this.waiting = false;
          }
        });
      } else {
        // 列表
        listOrder({
          status: _this.$route.query.status || "",
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        }).then(r => {
          if (r.code === 0) {
            _this.waiting = false;
            _this.page.total = r.content.total;
            _this.listData.length > 0
              ? (_this.listData = _this.listData.concat(r.content.list))
              : (_this.listData = r.content.list);
          } else {
            _this.$toast.error(r.data.message);
          }
        });
      }
    },
    back() {
      window.history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.pool_box {
  min-height: 100%;
  background: #f1f1f1;
  .d_box {
    .lists {
      position: relative;
      margin-bottom: 0.12rem;
      padding: 0.15rem 0.4rem;
      background: #fff;
      .right_pane {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 2.4rem;
        & > p {
          font-size: 0.18rem;
          line-height: 0.8rem;
          color: #ffa353;
          text-align: center;
        }
        & .txt_blue {
          color: #23afff;
        }
        & .btm_btn {
          padding-right: 0.1rem;
          position: absolute;
          bottom: 0.1rem;
          right: 0;
          width: 100%;
        }
      }
      .items {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        .col {
          font-size: 0.2rem;
          line-height: 0.4rem;
          color: #333;
          font-weight: bold;
          & > em {
            font-weight: normal;
            color: #474747;
          }
          .txt_blue {
            color: #23afff;
          }
        }
        .s_col {
          flex-basis: 100%;
        }
        .d_col {
          flex-basis: 50%;
        }
      }
    }
  }
}
</style>
