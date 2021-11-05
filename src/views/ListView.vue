<template id="lista">
  <div class="list">
    <h1>Listado de alumnos</h1>
    <button class="back" @click="back()">Volver al Home</button>
    <div class="filt">
      <form>
        <p>Filtro por nombre</p>
        <input class="filter" type="text" v-model="filtroN" />
        <p>Filtro por apellido</p>
        <input class="filter" type="text" v-model="filtroA" />
        <p>Filtro por email</p>
        <input class="filter" type="text" v-model="filtroE" />
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
        <td>{{ item.name }}</td>
        <td>{{ item.surnames }}</td>
        <td>{{ item.email }}</td>
        <td>{{ rol(item.role) }}</td>
        <button @click="modify(item)" class="mod">Modificar</button>
        <button class="del" @click="del(item)">Eliminar</button>
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
  props: {
    userLog: Object,
  },
  data: () => ({
    result: [],
    texto: "",
    arrayFiltrado: [],
  }),
  methods: {
    modify(data) {
      this.$router.push({
        name: "Modify",
        params: { usu: data, log: this.userLog },
      });
    },
    rol(data) {
      if (data === 1) return "Estudiante";
      else return "Profesor";
    },
    back() {
      this.$router.push({ name: "Home", params: { usuario: this.userLog } });
    },
    async getAlumnos() {
      let aux1 = await auth.get();
      let aux2 = aux1.data.lista;
      let i = 0;
      aux2.forEach((element) => {
        if (this.userLog.role === 1) {
          if (element.role === 1) {
            this.result[i++] = element;
          }
        } else if (this.userLog.role === 2) {
          this.result[i++] = element;
        }
      });
      this.result.sort((a, b) => (a.surnames > b.surnames ? 1 : -1));
    },
    async del(data) {
      let confirmacion = confirm(
        "Estas seguro de que quieres eliminar a " +
          data.name +
          " " +
          data.surnames
      );
      if (confirmacion === true) {
        let response = await auth.del(data);
        console.log(response.data);
        let index = this.result.findIndex((element) => element.id === data.id);
        this.result.splice(index, 1);
      } else {
        console.log("Bye");
      }
    },
  },
  computed: {
    filtroN: {
      get() {
        return this.texto;
      },
      set(value) {
        value = value.toLowerCase();
        this.arrayFiltrado = this.result.filter(
          (item) => item.name.toLowerCase().indexOf(value) !== -1
        );
        this.texto = value;
      },
    },
    filtroA: {
      get() {
        return this.texto;
      },
      set(value) {
        value = value.toLowerCase();
        this.arrayFiltrado = this.result.filter(
          (item) => item.surnames.toLowerCase().indexOf(value) !== -1
        );
        this.texto = value;
      },
    },
    filtroE: {
      get() {
        return this.texto;
      },
      set(value) {
        value = value.toLowerCase();
        this.arrayFiltrado = this.result.filter(
          (item) => item.email.toLowerCase().indexOf(value) !== -1
        );
        this.texto = value;
      },
    },
  },
  created() {
    console.log(this.userLog);
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
  position: absolute;
  text-align: center;
  margin: 0 40px;
  background: white;
  height: 270px;
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

.back {
  position: absolute;
  top: 20px;
  right: 60px;
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: #f46a65;
  color: whitesmoke;
  font-family: monospace;
}

table {
  margin: 0 auto;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  border-collapse: collapse;
}
tr {
  text-align: center;
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
