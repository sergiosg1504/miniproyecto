<template>
  <div class="register">
    <h1 class="title">Registrarte</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#nombre">Nombre:</label>
      <input
        v-model="user.nombre"
        class="form-input"
        type="nombre"
        id="nombre"
        required
        placeholder="Nombre"
      />
      <label class="form-label" for="#apellidos">Apellidos:</label>
      <input
        v-model="user.apellidos"
        class="form-input"
        type="apellidos"
        id="apellidos"
        required
        placeholder="Apellidos"
      />
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="user.email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <p class="error" v-if="!emailIsValid">Email no valido</p>
      <label class="form-label" for="#rol" required>Rol:</label>
      <select class="form-input" v-model="user.role" id="role" required>
        <option value="1">Estudiante</option>
        <option value="2">Profesor</option>
      </select>
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="user.password"
        class="form-input"
        type="password"
        id="password"
        required
        placeholder="Password"
      />
      <label class="form-label" for="#password-repeat"
        >Repite la contraeña:</label
      >
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        required
        placeholder="Password"
      />
      <p class="error" v-if="!passwordIsValid">Contraseña no valida</p>
      <input class="form-submit" type="submit" value="Registrarte" />
      <p class="error" v-if="error === 1">Email ya registrado</p>
      <p class="error" v-if="error === 2">
        Error al actualizar. Intentelo mas tarde
      </p>
    </form>
    <p class="msg2">
      ¿Ya tienes cuenta?
      <router-link :to="{ name: 'login' }">Identificarse</router-link>
    </p>
  </div>
</template>

<script>
import auth from "@/logic/auth";
//import { Encrypt } from "@/logic/aes.js";
export default {
  data: () => ({
    user: {
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
      role: 0,
    },
    passwordRepeat: "",
    expressionEmail: /\w+@\w+\.+[a-z]/,
    error: 0,
    aux: {},
  }),
  computed: {
    emailIsValid() {
      return this.expressionEmail.test(this.user.email);
    },
    passwordIsValid() {
      return this.user.password === this.passwordRepeat;
    },
  },
  methods: {
    async register() {
      if (this.user.password === this.passwordRepeat && this.emailIsValid) {
        // encriptacion contraseña
        console.log(this.user.password);
        //this.user.password = Encrypt(this.user.password);
        console.log(this.user.password);
        this.aux = await auth.register(this.user);
        this.aux = this.aux.data;
        if (this.aux.code === 409) {
          this.error = 1;
          console.log("error");
        } else if (this.aux.code === 500) this.error = 2;
        else if (this.aux.code === 200) this.$router.push("/");
        else this.error = 1;
      } else {
        console.log("Contraseñas distintas");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.register {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
.msg2 {
  margin-top: 2rem;
  text-align: center;
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}

option {
  background: white;
  color: black;
}
</style>
