<template>
  <div class="m_box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <div class="s_box">
        <i class="left_icon iconfont icon-search"></i>
        <input
          type="search"
          v-model="searchkey"
          @keypress="getsearch"
          placeholder="关键字"
          class="search"
        >
      </div>
    </mu-appbar>
    <div class="notice">
      <scroll :data="listData" :class-option="classOption">
        <ul class="wrap">
          <li v-for="(item, index) in listData" :key="index">
            <span class="avatar">
              <img v-lazy="item.date" alt>
            </span>
            {{item.title}}
          </li>
        </ul>
      </scroll>
    </div>
    <!-- <mu-container ref="container" :class="['app_main_top', isloading ? 'loading' : '']"> -->
    <mu-container ref="container" :class="['content_box', isloading ? 'loading' : '']">
      <mu-load-more
        :loading="loading"
        @load="load"
        :refreshing="refreshing"
        :loading-text="loadmsg"
      >
        <div class="list_box">
          <div
            class="list_item"
            v-for="(item, index) in lists"
            @click="detail(item.id, item.companyName)"
            :key="index"
          >
            <div class="list_left">
              <mu-avatar>
                <img v-lazy="item.logo" alt>
              </mu-avatar>
            </div>
            <div class="list_right">
              <div class="list_title">{{item.companyName}}</div>
              <div class="list_sub_title">
                <span>
                  <i class="color_blue iconfont icon-tushuguan"></i>
                  案例：{{item.caseCount}}
                </span>
                <span>
                  <i class="color_blue iconfont icon-pc"></i>
                  设计：{{item.desCount}}
                </span>
                <span>
                  <i class="color_blue iconfont icon-wenben"></i>
                  签约：{{item.tradeCount}}
                </span>
              </div>
              <div class="contents">{{item.summary}}</div>
            </div>
          </div>
        </div>
      </mu-load-more>
    </mu-container>
    <div class="m_footer">
      <div class="m_footer_box">
        <span class="active" @click="tabs(1)">
          <i class="iconfont icon-yukuaijiatingshenghuo-"></i>
          <p>首页</p>
        </span>
        <span @click="tabs(2)">
          <i class="iconfont icon-87"></i>
          <p>客户池</p>
        </span>
        <span @click="tabs(3)">
          <i class="iconfont icon-gerenzhongxin"></i>
          <p>我的</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import scroll from "vue-seamless-scroll";
import { listCompany } from "@/utils/api";

export default {
  components: {
    scroll
  },
  data() {
    return {
      isloading: false,
      flag: true,
      refreshing: true,
      loading: false,
      activeIndex: 0,
      timer: null,
      searchkey: "",
      loadmsg: "正在加载中...",
      companyNameLike: "",
      page: {
        cur: 1,
        pagesize: 20,
        total: 0
      },
      lists: [],
      isShow: false,
      result: [{ title: "orange", value: "23" }],
      listData: [
        {
          title: "无缝滚动第一行无缝滚动第一行",
          date: require("../assets/images/logo60.png")
        }
      ]
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.5,
        waitTime: 1000,
        limitMoveNum: 2,
        hoverStop: true,
        openTouch: true,
        singleHeight: 30
      };
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 底部tab
    tabs(e) {
      if (e === 2) {
        this.$router.push("/pool");
      }
      if (e === 3) {
        this.$router.push("/mine");
      }
    },
    // 公司详情
    detail(id, name) {
      this.$store.commit("SET_TEMP_CID", { cid: id });
      this.$store.commit("SET_COMP_NAME", { name: name });
      this.$router.push({ path: "/company", query: { id: id } });
    },
    // 初始化数据
    load() {
      const _this = this;
      _this.loading = true;
      _this.isloading = true;
      if (
        _this.page.cur * _this.page.pagesize < _this.page.total &&
        _this.flag
      ) {
        _this.flag = false;
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function() {
          _this.page.cur++;
          _this.initData();
        }, 1600);
      } else {
        _this.isloading = false;
        _this.loading = false;
        _this.refreshing = false;
        _this.loadmsg = "没有更多的记录了";
      }
    },
    initData() {
      const _this = this;
      const p = {
        companyNameLike: this.companyNameLike,
        pageNum: _this.page.cur,
        pageSize: _this.page.pagesize
      };
      listCompany(p).then(r => {
        if (r.code === 0) {
          _this.loading = false;
          _this.flag = true;
          _this.isloading = false;
          _this.lists.length > 0
            ? (_this.lists = _this.lists.concat(r.content.list))
            : (_this.lists = r.content.list);
          _this.page.total = r.content.total;
        } else {
          _this.loading = false;
          _this.flag = true;
          _this.isloading = false;
          _this.$toast.error(r.message);
        }
      });
    },
    getsearch(e) {
      console.log(e);
      const _this = this;
      if (e.keyCode === 13) {
        _this.companyNameLike = _this.searchkey;
        _this.lists = [];
        _this.initData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m_box {
  background: #f1f1f1;
  .s_box {
    position: relative;
    display: flex;
    width: 100%;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    overflow: hidden;
    .left_icon {
      display: block;
      position: absolute;
      text-align: center;
      left: 0;
      top: 0;
      width: 0.6rem;
      height: 30px;
      font-size: 20px;
      line-height: 30px;
    }
    .search {
      padding: 0 1.7rem 0 0.6rem;
      width: 100%;
      height: 30px;
      font-size: 16px;
      line-height: 30px;
    }
  }
  .notice {
    padding: 0 20px;
    position: fixed;
    z-index: 30;
    top: 60px;
    left: 0;
    right: 0;
    height: 30px;
    background: #fff;
    overflow: hidden;
    ul {
      li {
        position: relative;
        padding-left: 30px;
        line-height: 30px;
        font-size: 12px;
        .avatar {
          position: absolute;
          left: 0;
          top: 5px;
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 30px;
          overflow: hidden;
          & img {
            display: block;
            width: 20px;
            height: 20px;
            overflow: hidden;
          }
        }
      }
    }
  }
  .content_box {
    position: absolute;
    top: 96px;
    left: 0;
    right: 0;
    bottom: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .list_box {
    display: flex;
    flex-direction: column;
    .list_item {
      position: relative;
      // margin-bottom: 8px;
      padding: 10px 20px;
      display: flex;
      width: 100%;
      flex-direction: row;
      flex-wrap: nowrap;
      background: #fff;
      &::after {
        content: "";
        position: absolute;
        width: 90%;
        height: 1px;
        background: #e4e7ed;
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
      }
      &:last-child::after {
        background: transparent;
      }
      &:last-child {
        margin-bottom: 10px;
      }
      .list_left {
        min-width: 60px;
        height: auto;
      }
      .list_right {
        flex: 1;
        .list_sub_title {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          & span {
            display: block;
            padding-left: 20px;
            position: relative;
            flex-basis: 33.33%;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            & i {
              display: block;
              position: absolute;
              left: 0;
              top: 0;
              width: 20px;
              height: 20px;
            }
          }
        }
        .contents {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          word-break: break-all;
          text-overflow: ellipsis;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
