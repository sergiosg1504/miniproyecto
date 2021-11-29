<template>
  <div class="navbar">
    <div class="subnav">
      <button class="subnavbtn1" @click="reuniones()">
        <p class="p">REUNIONES</p>
      </button>
    </div>
    <div class="subnav">
      <button class="subnavbtn1" @click="seminarios()">
        <p class="p">SEMINARIOS WEB</p>
      </button>
    </div>
    <div class="subnav">
      <button class="subnavbtn1" @click="config()">
        <p class="p">CONFIGURACIÓN</p>
      </button>
    </div>
    <div class="subnav2">
      <button class="subnavbtn2" @click="salirReuniones()">
        <p class="volver">Volver</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reuniones() {
      this.$router.push({ name: "Reuniones" });
    },
    seminarios() {
      this.$router.push({ name: "SeminariosWeb" });
    },
    config() {
      this.$router.push({ name: "Configuracion" });
    },
    salirReuniones() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #4cc4ec;
}
.p {
  float: left;
  font-size: 14px;
  color: white;
  text-align: center;
  text-decoration: none;
}
.subnav {
  float: left;
}
.subnav:hover {
  background-color: lightgray;
}
.subnav2 {
  float: right;
}
.subnavbtn1 {
  padding: 14px 16px;
}
.subnavbtn2 {
  border: 1px solid white;
  border-radius: 4px;
  background-color: white;
  padding: 12px 14px;
}
.volver {
  color: #4cc4ec;
}
</style>
