<template>
  <div class="q_box">
    <!-- <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button @click="back" class="icon_txt" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>全景图
      <mu-button flat slot="right"></mu-button>
    </mu-appbar> -->
    <heads><span slot="title_name">全景图</span></heads>
  </div>
</template>

<script>
import heads from "@/components/head";

export default {
  components: {
    heads
  },
  data () {
    return {};
  },
  methods: {
    back () {
      window.history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
  .q_box {
  }
</style>
