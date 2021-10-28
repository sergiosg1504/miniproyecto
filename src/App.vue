<template>
  <div id="app">
    <router-link :to="{ name: login }" />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
