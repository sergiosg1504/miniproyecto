<template id="lista">
  <div class="list">
    <h1>Listado de alumnos</h1>
    <div class="filt">
      <form>
        <p>Filtro por nombre</p>
        <input class="filter" type="text" v-model="filtro" />
      </form>
    </div>
    <table>
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
  background: #4c54cc;
  color: whitesmoke;
  font-family: monospace;
}

.del {
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: #f46a65;
  color: whitesmoke;
  font-family: monospace;
}

h1 {
  text-align: center;
}

.filt {
  text-align: center;
  margin: 0 40px;
  background: white;
  height: 70px;
  width: 250px;
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}
.filter {
  border: none;
  border-radius: 10px;
  height: 28px;
  background: lightgrey;
  font-family: monospace;
  font-size: 18px;
}

table {
  margin: 0 auto;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  border-collapse: collapse;
}
tr {
  border: solid;
  border-width: 1px 0;
  height: 50px;
  border-color: rgb(238, 238, 238);
}

tr:first-child {
  border-top: none;
}
tr:last-child {
  border-bottom: none;
}
</style>
