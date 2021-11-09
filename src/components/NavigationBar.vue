<template>
  <div class="div">
    <ul>
      <button name="button_reuniones" @click="click_Reuniones">
        Reuniones
      </button>
      <button @click="click_Seminarios">Semirarios web</button>
      <button @click="click_Grabaciones">Grabaciones</button>
      <button @click="click_Configuracion">Configuracion</button>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    click_Reuniones() {
      this.$router.push({ name: "reuniones" });
    },
    click_Seminarios() {
      this.$router.push({ name: "seminarios" });
    },
    click_Grabaciones() {
      this.$router.push({ name: "grabaciones" });
    },
    click_Configuracion() {
      this.$router.push({ name: "configuracion" });
    },
  },
};
</script>

<style scoped>
ul {
  margin: 0;
  background-color: #333;
  width: 140px;
  height: 500px;
  list-style-type: none;
}
.a {
  float: left;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  background: transparent;
  border: #f2f2f2;
  margin-top: 20px;
}
li {
  margin-top: 20px;
}
.topnav button:hover {
  color: lightskyblue;
}
.topnav button.active {
  background-color: lightskyblue;
  color: white;
}
</style>
