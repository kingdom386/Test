<template>
  <div class="o_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>下单
      <mu-button flat slot="right"></mu-button>
    </mu-appbar>-->
    <heads>
      <span slot="title_name">下单</span>
    </heads>
    <mu-container class="app_top">
      <form>
        <div class="order_title">
          <div class="order_left">客户信息</div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-gerenzhongxin"></i>&nbsp;姓名
          </div>
          <div class="order_right">
            <input type="text" v-model="customerName" placeholder="输入用户姓名">
          </div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-mobilephone"></i>&nbsp;电话
          </div>
          <div class="order_right">
            <input type="text" v-model="customerContact" maxlength="11" placeholder="输入电话号码">
          </div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-dingwei"></i>&nbsp;地址
          </div>
          <div class="order_right">
            <input type="text" v-model="address" placeholder="输入用户地址">
          </div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-36"></i>&nbsp;预算
          </div>
          <div class="order_right">
            <input type="text" v-model="budget" placeholder="输入用户预算">
          </div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-dengpao"></i>&nbsp;爱好
          </div>
          <div class="order_right">
            <input type="text" v-model="fancy" placeholder="输入用户爱好">
          </div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-combinatorial-analysis"></i>&nbsp;其他信息
          </div>
          <div class="order_right">
            <input type="text" v-model="otherInfo" placeholder="输入其他信息">
          </div>
        </div>
        <div class="order_row" style="margin-bottom: 10px;">
          <div class="order_left">
            <i class="color_blue iconfont icon-shenqing"></i>&nbsp;未签缘由
          </div>
          <div class="order_right">
            <input type="text" v-model="reason" placeholder="输入未签缘由">
          </div>
        </div>

        <div class="order_title">
          <div class="order_left">装修信息</div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-diaosebanpalette3"></i>&nbsp;风格
          </div>
          <div class="order_right">
            <input type="text" v-model="style" placeholder="输入装修风格">
          </div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-huxing"></i>&nbsp;户型
          </div>
          <div class="order_right">
            <input type="text" v-model="houseType" placeholder="输入装修户型">
          </div>
        </div>
        <div class="order_row">
          <div class="order_left">
            <i class="color_blue iconfont icon-mianji"></i>&nbsp;面积
          </div>
          <div class="order_right">
            <input type="text" v-model="area" placeholder="输入装修面积">
          </div>
        </div>
        <div class="m_btm">
          <mu-button
            color="warning"
            class="margin_right_10 color_white color_white"
            @click="khc"
          >推到客户池</mu-button>
          <mu-button color="primary" class="btn_bg" @click="qy">确认签约</mu-button>
        </div>
      </form>
    </mu-container>
    <!-- 推到客户池 -->
    <mu-dialog width="400" :open.sync="openSimple">
      <mu-flex justify-content="center">
        <p class="layout_txt">客户池分成比例</p>
      </mu-flex>
      <mu-flex>
        <mu-form :model="form" ref="fc" label-position="left">
          <mu-form-item prop="radios" class="layout_txt" label="分成比例" style="margin-bottom: 0;">
            <p>
              <mu-radio :ripple="false" v-model="form.radios" checked value="1" label="1%"></mu-radio>
              <mu-radio :ripple="false" v-model="form.radios" value="2" label="2%"></mu-radio>
            </p>
            <p>
              <mu-radio :ripple="false" v-model="form.radios" value="3" label="3%"></mu-radio>
              <mu-radio :ripple="false" v-model="form.radios" value="5" label="5%"></mu-radio>
            </p>
          </mu-form-item>
          <mu-form-item style="margin-bottom: 0;">
            <mu-button
              @click="cancle"
              color="primary"
              style="width: 60px;margin-right: 2px;font-size: 12px;background:#303133;color:#fff;"
            >取消</mu-button>
            <mu-button
              @click="pushkhc"
              style="width: 60px;margin-right: 8px;font-size: 12px;background:#2196f3;color:#fff;"
            >确定签约</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-flex>
    </mu-dialog>
    <!-- 立即下单 -->
    <mu-dialog width="400" :open.sync="openSimple1">
      <mu-flex justify-content="center">
        <p class="layout_txt">客户池分成比例</p>
      </mu-flex>
      <mu-flex>
        <mu-form :model="form1" ref="fc" label-position="left">
          <mu-form-item prop="bl" class="layout_txt" label="签约价格" style="margin-bottom: 0;">
            <mu-text-field v-model="form1.bl"></mu-text-field>
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
            >确定签约</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-flex>
    </mu-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { saveOrder, saveCutomerPool, orderDetail } from "@/utils/api";
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  data() {
    return {
      orderNo: "",
      openSimple: false,
      openSimple1: false,
      customerName: "",
      customerContact: "",
      address: "",
      budget: "",
      fancy: "",
      otherInfo: "",
      reason: "",
      style: "",
      houseType: "",
      area: "",
      orderAmount: "",
      form: {
        radios: "1"
      },
      form1: {
        bl: ""
      }
    };
  },
  computed: {
    getType() {
      return parseInt(this.$route.query.type);
    }
  },
  mounted() {
    this.getType ? this.init() : "2";
  },
  methods: {
    init() {
      const _this = this;
      _this.orderNo = _this.$route.query.id;
      orderDetail({ orderNo: _this.orderNo }).then(r => {
        if (r.code === 0) {
          const data = r.content;
          _this.customerName = data.customerName;
          _this.customerContact = data.customerContact;
          _this.address = data.address;
          _this.budget = data.budget;
          _this.fancy = data.fancy;
          _this.otherInfo = data.otherInfo;
          _this.reason = data.reason;
          _this.style = data.style;
          _this.houseType = data.houseType;
          _this.area = data.area;
          _this.form1.bl = data.orderAmount;
        } else {
          this.$toast.error(r.message);
        }
      });
    },
    cancle() {
      this.openSimple = false;
      this.openSimple1 = false;
    },
    khc() {
      if (!this.checkForm()) {
        this.$toast.error("表单信息填写有误！");
      } else {
        this.openSimple = true;
      }
    },
    qy() {
      if (!this.checkForm()) {
        this.$toast.error("表单信息填写有误！");
      } else {
        this.openSimple1 = true;
      }
    },
    checkForm() {
      const customerName = this.customerName.replace(/^\s+|\s+$/g, "");
      const customerContact = this.customerContact.replace(/^\s+|\s+$/g, "");
      const address = this.address.replace(/^\s+|\s+$/g, "");
      const budget = this.budget.replace(/^\s+|\s+$/g, "");
      const fancy = this.fancy.replace(/^\s+|\s+$/g, "");
      const otherInfo = this.otherInfo.replace(/^\s+|\s+$/g, "");
      const reason = this.reason.replace(/^\s+|\s+$/g, "");
      const style = this.style.replace(/^\s+|\s+$/g, "");
      const houseType = this.houseType.replace(/^\s+|\s+$/g, "");
      const area = this.area.replace(/^\s+|\s+$/g, "");
      if (
        customerName &&
        customerContact &&
        address &&
        budget &&
        fancy &&
        otherInfo &&
        reason &&
        style &&
        houseType &&
        area
      ) {
        return true;
      } else {
        return false;
      }
    },
    pushkhc() {
      let p = {
        customerName: this.customerName,
        customerContact: this.customerContact,
        address: this.address,
        budget: this.budget,
        fancy: this.fancy,
        otherInfo: this.otherInfo,
        reason: this.reason,
        style: this.style,
        houseType: this.houseType,
        area: this.area,
        divideSalesManOne: this.form.radios,
        companyId: Cookies.get("cid"),
        companyName: Cookies.get("cname")
      };
      saveCutomerPool(p).then(r => {
        if (r.code === 0) {
          this.$router.push({ path: "/pool" });
        }
      });
    },
    comfirms() {
      let p = {
        customerName: this.customerName,
        customerContact: this.customerName,
        address: this.address,
        budget: this.budget,
        fancy: this.fancy,
        otherInfo: this.otherInfo,
        reason: this.reason,
        style: this.style,
        houseType: this.houseType,
        area: this.area,
        orderAmount: this.form1.bl,
        companyId: Cookies.get("cid"),
        companyName: Cookies.get("cname")
      };
      saveOrder(p).then(r => {
        if (r.code === 0) {
          this.$toast.info("订单签订成功！");
          setTimeout(() => {
            this.$router.push({ path: "/result", query: { NO: r.content } });
          }, 2000);
        } else {
          this.$toast.error(r.message);
        }
      });
    },
    openSimpleDialog() {
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.openSimple = false;
    },
    back() {
      window.history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.o_box {
  .order_title {
    position: relative;
    font-size: 14px;
    line-height: 30px;
    height: 30px;
    border-bottom: 1px solid #e4e7ed;
    background: #fff;
    .order_left {
      padding-left: 20px;
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 8px;
        left: 10px;
        width: 2px;
        height: 14px;
        background: #2196f3;
      }
    }
  }
  .order_row {
    padding: 0 10px;
    display: flex;
    width: 100%;
    height: 50px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e7ed;
    background: #fff;
    &:last-child {
      border-bottom: none;
    }
    .order_left {
      width: 100px;
      & i {
        font-size: 20px;
      }
    }
    .order_right {
      flex: 1;
      & input {
        font-size: 14px;
        line-height: 30px;
        color: #606266;
      }
    }
  }
  .margin_right_10 {
    margin-right: 10px;
  }
}
</style>

<style>
.layout_txt {
  font-size: 12px !important;
}
/* .m_btm {
  margin-bottom: 10px;
} */
</style>
