<template>
  <div class="home">
    <p class="bien">¡Bienvenido a la pagina de inicio!</p>
    <p>Aqui puedes ver el listado de alumnos:</p>
    <button @click="listado()">Ver listado usuarios</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    listado() {
      this.$router.push("list");
    },
  },
};
</script>

<style scoped>
.home {
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin: 200px auto;
  width: 500px;
  height: 200px;
  padding: 10px;
}
.bien {
  font-weight: bold;
  font-size: 28px;
}
button {
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: #ecce4d;
  margin: 15px 0;
  color: rgb(37, 34, 34);
  font-family: monospace;
}
</style>
