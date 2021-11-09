<template>
  <div>
    <div>
      <h1 class="header">Reuniones</h1>
    </div>
    <div class="general">
      <div id="#caja1"><navigation-bar /></div>
      <div id="#caja2">
        <button @click="click_proximos">Próximos</button>
        <button @click="click_anterior">Anterior</button>
        <button @click="click_salaPersonal">Sala personal</button>
        <div v-if="menu === 0">
          <h1>dafvasdvdasf</h1>
        </div>
        <div v-if="menu === 1">
          <h1>dasdvdasf</h1>
        </div>
        <div v-if="menu === 2">
          <h1>dafvasf</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
//import auth from "../logic/auth";
export default {
  components: { NavigationBar },
  data: () => ({
    menu: 0,
  }),
  methods: {
    click_proximos() {
      this.menu = 0;
    },
    click_anterior() {
      this.menu = 1;
    },
    click_salaPersonal() {
      this.menu = 2;
    },
  },
};
</script>

<style scoped>
.general {
  float: left;
}
#caja1,
#caja2 {
  border: 1px solid black;
  width: 200px;
  height: 160px;
  margin: 20px;
  float: left;
  vertical-align: middle;
}
.navigation {
  position: absolute;
  vertical-align: top;
}
.header {
  text-align: center;
}
button {
  height: 60px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: white;
  margin: 15px 0;
  color: gray;
  font-family: monospace;
  font-size: 15px;
}
</style>
