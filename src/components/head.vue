<template>
  <div class="head_box">
    <slot name="left_slot">
      <span class="left" @click="back">
        <i class="iconfont icon-return"></i>
      </span>
    </slot>
    <slot name="title_name">头部</slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      window.history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.head_box {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 0.3rem;
  line-height: 50px;
  color: #2196f3;
  background: #fff;
  .left {
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    color: #2196f3;
    & i {
      font-size: 0.48rem;
    }
  }
}
</style>
