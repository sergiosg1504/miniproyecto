<template>
  <div class="topnav">
    <v-btn>Reunión</v-btn>
    <v-btn>Grabación</v-btn>
    <v-btn>Audioconferencia</v-btn>
    <v-btn>Dispositivos de colaboración</v-btn>
  </div>
</template>

<script>
/*import Vue from 'vue';
    import vuescroll from 'vuescroll';
    */
export default {
  data: () => ({
    clicked: false,
  }),
  methods: {},
};
</script>

<style>
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav button {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  background: transparent;
  border: none;
}

/* Change the color of links on hover */
.topnav v-btn:hover {
  color: lightskyblue;
}

/* Add a color to the active/current link */
.active {
  background-color: lightskyblue;
  color: white;
}
</style>
