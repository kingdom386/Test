<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  background: #f1f1f1;
}
i,
em {
  font-style: normal;
}
input {
  outline: 0;
  border: 0;
}
</style>
