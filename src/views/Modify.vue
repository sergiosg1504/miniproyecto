<template id="modify">
  <div>
    <h1>
      Modificar datos
      <button class="cancel" @click="cancel()">Cancelar</button>
    </h1>
    <form @submit.prevent="guardar">
      <p>Nombre: <input class="in" type="text" v-model="usu.nombre" /></p>
      <p>Apellidos: <input class="in" type="text" v-model="usu.apellidos" /></p>
      <p>Email: <input class="in" type="email" v-model="usu.email" /></p>
      <p>
        Seleccione un rol:
        <select class="in" v-model="selected" required>
          <option>{{ rol }}</option>
          <option>{{ otherRol }}</option>
        </select>
      </p>
      <input class="mod" type="submit" value="Modificar" />
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
    async guardar() {
      if (this.selected === "Estudiante") {
        this.usu.rol = 1;
      } else {
        this.usu.rol = 2;
      }
      let response = await auth.put(this.usu);
      console.log(response.data);
      this.$router.go(-1);
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

<style lang="scss" scoped>
.in {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid lightgrey;
  border-radius: 15px;
  color: black;
  &:focus {
    outline: 0;
    border-color: #ecce4d;
  }
}
div {
  text-align: center;
  margin: 150px auto;
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  padding-top: 15px;
  height: 450px;
  width: 400px;
}

.cancel {
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: #f46a65;
  color: whitesmoke;
  font-family: monospace;
}

.mod {
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: #4c54cc;
  color: whitesmoke;
  font-family: monospace;
}
</style>
