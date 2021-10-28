<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push("/login");
  },
};
</script>

<style scoped lang="scss"></style>
