<template>
  <div id="app">
    <router-view :to="'{ name: login }'" />
  </div>
</template>

<style scoped lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
