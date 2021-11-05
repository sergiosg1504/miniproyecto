<template>
  <div class="login">
    <h1 class="title">Miniproyecto</h1>
    <form action class="form" @submit.prevent="login">
      <p class="form-label2">Inicie sesión</p>
      <label class="form-label" for="#email">Email: </label>
      <input
        v-model="userLogin.email"
        class="form-input"
        type="email"
        id="email"
        placeholder="Email"
      />
      <p class="error" v-if="!emailIsValid">Email no valido</p>
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="userLogin.password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <p v-if="error" class="error">
        Combinación email-contraseña introducida no válida, vuelve a intentarlo
      </p>
      <input class="form-submit" type="submit" value="Login" />
      <hr class="form-hr" />
      <p class="msg">
        <router-link class="msg" :to="{ name: 'rememberPassword' }"
          >He olvidado mi contraseña</router-link
        >
      </p>
    </form>
    <p class="msg2">
      ¿No tienes cuenta?
      <router-link :to="{ name: 'register' }">Registrarse</router-link>
    </p>
  </div>
</template>

<script>
import auth from "@/logic/auth.js";
import { Encrypt } from "@/logic/aes.js";
export default {
  data: () => ({
    userLogin: {
      email: "",
      password: "",
    },
    error: 0,
    expressionEmail: /\w+@\w+\.+[a-z]/,
    aux: {
      id: "",
      nombre: "",
      apellidos: "",
      email: "",
      role: "",
      password: "",
    },
  }),
  computed: {
    emailIsValid() {
      return this.expressionEmail.test(this.userLogin.email);
    },
  },
  methods: {
    async login() {
      if (this.emailIsValid) {
        console.log(this.userLogin.password);
        this.userLogin.password = Encrypt(this.userLogin.password);
        console.log(this.userLogin.password);
        let aux = await auth.login(this.userLogin);
        aux = aux.data;
        if (aux.code === 400) {
          this.error = true;
          console.log("Credenciales incorrectas");
        } else if (aux.code === 200) {
          this.aux.email = aux.datos[4];
          this.aux.nombre = aux.datos[1];
          this.aux.id = aux.datos[0];
          this.aux.apellidos = aux.datos[2];
          this.aux.role = aux.datos[3];
          this.aux.password = this.userLogin.password;
          this.$router.push({ name: "Home", params: { usuario: this.aux } });
          console.log("OK");
        } else {
          this.error = true;
        }
      } else {
        console.log("Email no valido");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
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
.form-label2 {
  margin-top: 2rem;
  color: white;
  margin-bottom: 1rem;
  align-self: center;
  font-size: 25px;
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
  margin-top: 2rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
.msg {
  margin-top: 0rem;
  text-align: center;
  color: white;
}
.msg2 {
  margin-top: 3rem;
  text-align: center;
}
.form-hr {
  color: white;
  align-self: center;
  margin: 2rem;
  width: 75%;
}
</style>
