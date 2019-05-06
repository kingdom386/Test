<template>
  <div class="head_box">
    <slot name="left"></slot>
    头部
    <slot name="right"></slot>
  </div>
</template>

<style lang="scss" scoped>
.head_box {
  position: relative;
  padding: 0 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 50px;
  font-size: 0.26rem;
  line-height: 50px;
  color: #2196f3;
  background: #fff;
}
</style>
