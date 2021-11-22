<template>
  <div class="navbar">
    <div class="subnav">
      <button class="subnavbtn1" @click="reuniones()">
        <p>REUNIONES</p>
      </button>
    </div>
    <div class="subnav">
      <button class="subnavbtn2" @click="seminarios()">
        <p>SEMINARIOS WEB</p>
      </button>
    </div>
    <div class="subnav">
      <button class="subnavbtn3" @click="config()">
        <p>CONFIGURACIÓN</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reuniones() {
      this.$router.push("/reuniones");
    },
    seminarios() {
      this.$router.push("/seminariosWeb");
    },
    config() {
      this.$router.push("/configuracion");
    },
  },
};
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #4cc4ec;
}
.navbar p {
  float: left;
  font-size: 14px;
  color: white;
  text-align: center;
  text-decoration: none;
}
.subnav {
  float: left;
}
.subnavbtn1 {
  padding: 14px 16px;
}

.subnavbtn2 {
  padding: 14px 16px;
}

.subnavbtn3 {
  padding: 14px 16px;
}

.subnav:hover {
  background-color: lightgray;
}
</style>
