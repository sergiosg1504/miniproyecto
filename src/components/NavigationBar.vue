<template>
  <div class="navbar">
    <div class="subnav">
      <button class="subnavbtn">
        <a href="/reuniones">REUNIONES</a>
      </button>
    </div>
    <div class="subnav">
      <button class="subnavbtn">
        <a href="/seminariosWeb">SEMINARIOS WEB</a>
      </button>
    </div>
    <div class="subnav">
      <button class="subnavbtn">
        <a href="/configuracion">CONFIGURACIÓN</a>
      </button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #4cc4ec;
}
.navbar a {
  float: left;
  font-size: 14px;
  color: white;
  text-align: center;
  text-decoration: none;
}
.subnav {
  float: left;
}
.subnavbtn {
  padding: 14px 16px;
}
.subnav:hover {
  background-color: lightgray;
}
</style>
