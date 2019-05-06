<template>
  <div class="pool_box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      客户池
      <mu-button flat slot="right"></mu-button>
    </mu-appbar>
    <!-- d_top -->
    <mu-container ref="container" :class="['app_top',  flag ? '' : 'load']">
      <mu-load-more :loading="loading" @load="load">
        <div class="d_box">
          <template v-for="(i, t) in listContent">
            <div class="lists" :key="t">
              <div class="items">
                <span class="d_col col">
                  客户姓名：
                  <em class="txt_blue">{{ i.customerName }}</em>
                </span>
                <span class="d_col col">
                  联系方式：
                  <em class="txt_blue">{{ i.customerContact }}</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  其他信息：
                  <em>{{ i.otherInfo }}</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  客户地址：
                  <em>{{ i.address }}</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  客户预算：
                  <em>{{ i.budget }}元</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  客户喜好：
                  <em>{{ i.fancy }}</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  未签理由：
                  <em>{{ i.reason }}</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="d_col col">
                  装修风格：
                  <em>{{ i.style }}</em>
                </span>
                <span class="d_col col">
                  户型：
                  <em>{{ i.houseType }}</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  装修面积：
                  <em>{{ i.area }}平方米</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  更新时间：
                  <em>{{i.updateTime}}</em>
                </span>
              </div>
              <!-- items -->
              <div class="items">
                <span class="s_col col">
                  业务员ID：
                  <em>{{ i.salesManOne }}</em>
                </span>
              </div>
              <!-- items -->
              <span class="jiedan" @click="jd(i)">接单</span>
            </div>
            <!-- lists -->
          </template>
        </div>
      </mu-load-more>
      <!-- d_box -->
    </mu-container>
    <!-- d_content -->
    <div class="m_footer">
      <div class="m_footer_box">
        <span @click="tabs(1)">
          <i class="iconfont icon-yukuaijiatingshenghuo-"></i>
          <p>首页</p>
        </span>
        <span class="active" @click="tabs(2)">
          <i class="iconfont icon-87"></i>
          <p>客户池</p>
        </span>
        <span @click="tabs(3)">
          <i class="iconfont icon-gerenzhongxin"></i>
          <p>我的</p>
        </span>
      </div>
    </div>
    <mu-dialog width="400" :open.sync="openSimple1">
      <mu-flex justify-content="center">
        <p class="layout_txt">客户池分成比例</p>
      </mu-flex>
      <mu-flex>
        <mu-form :model="form1" ref="fc" label-position="left">
          <mu-form-item prop="bl" class="layout_txt" label="接单价格：" style="margin-bottom: 0;">
            <mu-text-field v-model="form1.bl"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <p class="layout_txt">提示：接单后15日内未签单则客户自动回滚至客户池。</p>
          </mu-form-item>
          <mu-form-item style="margin-bottom: 0;">
            <mu-button
              @click="cancle"
              color="primary"
              style="width: 60px;margin-right: 2px;font-size: 12px;background:#303133;color:#fff;"
            >取消</mu-button>
            <mu-button
              @click="comfirms"
              style="width: 60px;margin-right: 8px;font-size: 12px;background:#2196f3;color:#fff;"
            >确定接单</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-flex>
    </mu-dialog>
  </div>
</template>

<script>
import { listCutomerPool, orderTaking } from "@/utils/api";

export default {
  data() {
    return {
      openSimple1: false,
      loading: false,
      flag: true,
      selected: "tab2",
      form1: {
        bl: "",
        id: "",
        salesManOne: "",
        orderAmount: ""
      },
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      listContent: [],
      timer: null,
      bottomCount: 20,
      onFetching: false
    };
  },
  mounted() {
    this.lists();
  },
  methods: {
    jd(i) {
      // console.log(i);
      this.openSimple1 = true;
      this.form1.id = i.id;
    },
    cancle() {
      this.openSimple1 = false;
    },
    comfirms() {
      let p = {
        bussId: this.form1.id,
        orderAmount: parseFloat(this.form1.bl)
      };
      orderTaking(p).then(r => {
        console.log(r);

        if (r.code === 0) {
          this.$toast.info("订单签订成功！");
          setTimeout(() => {
            this.$router.push({ path: "/result", query: { NO: r.content } });
          }, 2000);
        }
      });
    },
    tabs(e) {
      if (e === 1) {
        this.$router.push("/index");
      }
      if (e === 3) {
        this.$router.push("/mine");
      }
    },
    lists() {
      this.listData();
    },
    listData() {
      const _this = this;
      _this.loading = true;
      let p = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      };
      listCutomerPool(p).then(r => {
        if (r.code === 0) {
          _this.loading = false;
          _this.flag = true;
          _this.listContent = r.content.list;
          _this.page.total = r.content.total;
        } else {
          _this.loading = false;
          _this.flag = true;
          _this.$toast.error(r.message);
        }
      });
    },
    toPage() {
      if (this.selected === "tab1") {
        this.$router.push("/index");
      } else if (this.selected === "tab2") {
        this.$router.push("/pool");
      } else {
        this.$router.push("/setting");
      }
    },
    load() {
      const _this = this;
      _this.loading = true;
      if (
        _this.page.pageNum * _this.page.pageSize < _this.page.total &&
        _this.flag
      ) {
        _this.flag = false;
        _this.page.pageNum += 1;
        _this.listData();
      } else {
        _this.flag = false;
        _this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pool_box {
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

  .d_box {
    .lists {
      position: relative;
      margin-bottom: 0.12rem;
      padding: 0.15rem 0.4rem;
      background: #fff;
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
      .jiedan {
        display: block;
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        width: 1rem;
        height: 0.5rem;
        background: #23afff;
        color: #fff;
        font-size: 0.2rem;
        line-height: 0.5rem;
        text-align: center;
        border-radius: 0.16rem;
        overflow: hidden;
      }
    }
  }
}
</style>

<style>
.load {
  padding-bottom: 10px;
}
</style>
