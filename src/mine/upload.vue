<template>
  <div class="upload_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>上传合同
      <mu-button flat slot="right" @click="submit">
        <span style="color:#2196f3;">完成</span>
      </mu-button>
    </mu-appbar>-->
    <heads>
      <span slot="title_name">上传合同</span>
    </heads>
    <mu-container class="app_top">
      <div class="img_box">
        <mu-grid-list style="width:100%;" :cols="4" :cell-height="80">
          <mu-grid-tile class="cols" v-for="(tile, index) in list" :key="index">
            <img :src="tile">
          </mu-grid-tile>
          <mu-grid-tile class="cols" style="position: relative;">
            <span
              style="display: block;width: 76px;height: 76px;margin: 0 auto;text-align: center;border: 1px solid #e0e0e0;"
            >
              <mu-icon style="line-height: 76px;" value="add" size="40" color="#757575"></mu-icon>
            </span>
            <input
              id="files"
              @change="fileupload"
              type="file"
              style="position: absolute;z-index: 9999;top: 0;left:0; width: 76px;height: 76px;"
            >
          </mu-grid-tile>
        </mu-grid-list>
      </div>
      <!-- img_box -->
      <div class="notice">注：请拍照上传合同照片</div>
    </mu-container>
  </div>
</template>

<script>
import axios from "axios";
import { contractUpload } from "@/utils/api";
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  computed: {
    getId() {
      return parseInt(this.$route.query.id);
    },
    gettype() {
      return this.$route.query.type || "";
    },
    getstatus() {
      return this.$route.query.status || "";
    }
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    submit() {
      const _this = this;
      // 立即上传合同
      let p = { orderNo: _this.getId, contract: JSON.stringify(_this.list) };
      console.log(_this.gettype);
      contractUpload(p).then(r => {
        if (r.code === 0) {
          _this.$toast.success(r.message);
          setTimeout(function() {
            if (_this.gettype) {
              _this.$router.push({
                path: "/check",
                query: { id: _this.getId, type: 1 }
              });
            } else {
              _this.$router.push({
                path: "/check",
                query: { id: _this.getId, status: _this.getstatus }
              });
            }
          }, 1600);
        } else {
          _this.$toast.error(r.message);
        }
      });
    },
    back() {
      window.history.back();
    },
    fileupload(e) {
      let file = e.target.files[0] || e.srcElement.files[0];
      let param = new FormData();
      param.append("file", file, file.name);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post(
          "http://47.99.122.206:3389/system/upload/imgupload",
          param,
          config
        )
        .then(r => {
          if (r.data.code === 0) {
            this.list.unshift(r.data.content);
            document.getElementById("files").value = "";
          } else {
            this.$toast.error(r.message);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload_box {
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
  .img_box {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    .cols {
      margin-bottom: 10px;
    }
  }
  .notice {
    padding: 0.2rem;
    font-size: 0.2rem;
    color: #ffa353;
    line-height: 0.5rem;
    background: #fff;
  }
}
</style>

<style>
#files {
  opacity: 0;
}
</style>
