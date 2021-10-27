<template id="lista">
  <div class="list">
        <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Rol</th>
        </tr>
        <tr v-for="(item, i) in result" :key="i">
            <td>{{item.nombre}}</td>
            <td>{{item.apellidos}}</td>
            <td>{{item.email}}</td>
            <td>{{item.rol}}</td>
            <button @click="modify(item)">Modificar</button>
            <user :user="item"/>
            <button>Eliminar</button>
        </tr>
  </div>
</template>

<script>

import axios from "axios";
import User from "./User.vue";

export default {
  name: "List",
  components: {
    User
  },
  data: () => ({
    result: [
      {nombre: "Roberto", apellidos: "Merchan Gonzalez", email: "robertomergon@usal.es", rol: "Estudiante"},
      {nombre: "Sergio", apellidos: "Sanchez Garcia", email: "sergiosg@usal.es", rol: "Estudiante"},
      {nombre: "Juan Jose", apellidos: "Lopez Carnero", email: "jjlopez@usal.es", rol: "Estudiante"},
    ],
  }),
  methods: {
    modify(){
        this.$router.push({path:'mod', params:{usu: this.user}});
    },
    async getAlumnos(){
      let response = await axios.get("api");
      this.result = response.data;
    }
  },
  created(){
    this.getAlumnos();
  }
};
</script>

<style scoped>
th{
    padding-inline: 70px;
};


</style>