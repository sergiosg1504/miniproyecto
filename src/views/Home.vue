<template>
  <div class="home">
    <p class="bien">¡Bienvenido a la pagina de inicio!</p>
    <div>
      <p>Aqui puedes ver el listado de alumnos:</p>
      <button @click="listado()">Ver listado usuarios</button>
      <p>Ir a la sala de reuiniones</p>
      <button @click="meeting()">Reunirse</button>
    </div>
    <div class="arriba">
      <button class="out" @click="logout()">Log out</button>
      <button class="perfil" @click="perfil()">Mi Perfil</button>
    </div>
  </div>
</template>

<script>
import auth from "../logic/auth";
import { Encrypt } from "@/logic/aes.js";
export default {
  name: "Home",
  components: {},
  data: () => ({
    userOut: {
      email: "",
      password: "",
    },
  }),
  props: {
    usuario: Object,
  },
  created() {
    this.userOut.email = this.usuario.email;
    this.userOut.password = this.usuario.password;
  },
  methods: {
    listado() {
      this.$router.push({
        name: "ListView",
        params: { userLog: this.usuario },
      });
    },
    perfil() {
      this.$router.push({ name: "profile", params: { users: this.usuario } });
    },
    meeting() {
      this.$router.push({
        name: "Reuniones",
        params: { users: this.usuario },
      });
    },
    async logout() {
      this.$router.push("/");
      this.userOut.password = Encrypt(this.userOut.password);
      let res = await auth.out(this.userOut.email, this.userOut.password);
      console.log(res.data);
    },
  },
};
</script>

<style scoped>
.home {
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin: 200px auto;
  width: 500px;
  height: 300px;
  padding: 10px;
}
.bien {
  font-weight: bold;
  font-size: 28px;
}
button {
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: #ecce4d;
  margin: 15px 0;
  color: rgb(37, 34, 34);
  font-family: monospace;
}

.arriba {
  position: absolute;
  top: 40px;
  right: 60px;
}

.perfil {
  margin: 10px;
}

.out {
  background: #f46a65;
}
</style>
