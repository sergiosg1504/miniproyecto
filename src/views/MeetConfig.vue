<template>
  <div class="topnav">
    <button :class="estado[0]" @click="changeStatus(0)">Reunión</button>
    <button :class="estado[1]" @click="changeStatus(1)">Grabación</button>
    <button :class="estado[2]" @click="changeStatus(2)">
      Audioconferencia
    </button>
    <button :class="estado[3]" @click="changeStatus(3)">
      Dispositivos de colaboración
    </button>
  </div>
</template>

<script>
/*import Vue from 'vue';
    import vuescroll from 'vuescroll';
    */
export default {
  data: () => ({
    estado: ["active", "non", "non", "non"],
  }),
  methods: {
    changeStatus(clicked) {
      this.estado.forEach((elemento) => {
        elemento = "non";
        console.log(elemento);
      });
      this.estado[clicked] = "active";
      console.log(this.estado[clicked]);
    },
  },
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
.topnav button:hover {
  color: lightskyblue;
}

/* Add a color to the active/current link */
.topnav button.active {
  background-color: lightskyblue;
  color: white;
}
</style>
