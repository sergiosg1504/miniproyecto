<template id="lista">
  <div class="list">
    <table>
      <h1>Listado de alumnos</h1>
      <input type="text" v-model="filtro" />
      <tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Email</th>
        <th>Rol</th>
      </tr>
      <tr v-for="(item, i) in arrayFiltrado" :key="i">
        <td>{{ item.nombre }}</td>
        <td>{{ item.apellidos }}</td>
        <td>{{ item.email }}</td>
        <td>{{ rol(item.rol) }}</td>
        <button @click="modify(item)" class="mod">Modificar</button>
        <button class="del">Eliminar</button>
        <user :user="item" />
      </tr>
    </table>
  </div>
</template>

<script>
import auth from "../logic/auth";
import User from "../components/User.vue";

export default {
  name: "ListView",
  components: {
    User,
  },
  data: () => ({
    result: [
      {
        nombre: "Roberto",
        apellidos: "Merchan Gonzalez",
        email: "robertomergon@usal.es",
        rol: 1,
      },
      {
        nombre: "Sergio",
        apellidos: "Sanchez Garcia",
        email: "sergiosg@usal.es",
        rol: 1,
      },
      {
        nombre: "Juan Jose",
        apellidos: "Lopez Carnero",
        email: "jjlopez@usal.es",
        rol: 2,
      },
    ],
    texto: "",
    arrayFiltrado: [],
  }),
  methods: {
    modify(data) {
      this.$router.push({ name: "Modify", params: { usu: data } });
    },
    rol(data) {
      if (data === 1) return "Estudiante";
      else return "Profesor";
    },
    getAlumnos() {
      //this.result = auth.get();
      auth.get();
      this.result.sort((a, b) => (a.apellidos > b.apellidos ? 1 : -1));
    },
  },
  computed: {
    filtro: {
      get() {
        return this.texto;
      },
      set(value) {
        value = value.toLowerCase();
        this.arrayFiltrado = this.result.filter(
          (item) => item.nombre.toLowerCase().indexOf(value) !== -1
        );
        this.texto = value;
      },
    },
  },
  created() {
    this.getAlumnos();
    this.arrayFiltrado = this.result;
  },
};
</script>

<style scoped>
th {
  padding-inline: 70px;
}

.mod {
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: #82c0e7;
}

.del {
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: #f44336;
}
</style>
