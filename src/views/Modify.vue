<template id="modify">
  <div>
    <h1>
      Modificar datos
      <button @click="cancel()">Cancelar</button>
    </h1>
    <form @submit.prevent="guardar">
      <p>Nombre: <input id="name" type="text" v-model="usu.nombre" /></p>
      <p>Apellidos: <input id="ape" type="text" v-model="usu.apellidos" /></p>
      <p>Email: <input id="email" type="email" v-model="usu.email" /></p>
      <p>
        Seleccione un rol:
        <select name="Rol" v-model="selected">
          <option>{{ rol }}</option>
          <option>{{ otherRol }}</option>
        </select>
      </p>
      <input type="submit" value="Modificar" />
    </form>
  </div>
</template>

<script>
import auth from "../logic/auth";

export default {
  name: "Modify",
  components: {},
  props: {
    usu: Object,
  },
  data: () => ({
    selected: "",
  }),
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    guardar() {
      if (this.selected === "Estudiante") {
        this.usu.rol = 1;
      } else {
        this.usu.rol = 2;
      }
      auth.put(this.usu);
    },
  },

  //Almacena los parametros del usuario para mostrarlos en pantalla
  computed: {
    nombre() {
      return this.usu.nombre;
    },
    apellidos() {
      return this.usu.apellidos;
    },
    email() {
      return this.usu.email;
    },
    rol() {
      if (this.usu.rol === 1) {
        return "Estudiante";
      } else {
        return "Profesor";
      }
    },
    otherRol() {
      if (this.usu.rol === 2) {
        return "Estudiante";
      } else {
        return "Profesor";
      }
    },
  },
};
</script>
