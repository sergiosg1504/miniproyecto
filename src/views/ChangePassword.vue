<template>
  <div class="remember-password">
    <h1 class="title">Recupera tu cuenta</h1>
    <form action class="form" @submit.prevent="changePassword">
      <label class="form-label" for="#code">Código:</label>
      <input
        v-model="code"
        class="form-input"
        type="code"
        id="code"
        required
        placeholder="Codigo"
      />
      <label class="form-label" for="#password">Contraseña:</label>
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
      <p class="error" v-if="!codeIsValid">Código no valido</p>
      <p class="error" v-if="!passwordIsValid">Contraseña no valida</p>
      <input
        class="form-submit"
        type="submit"
        value="Recuperar mi contraseña"
      />
    </form>
    <p class="msg2">
      ¿Ya tienes cuenta?
      <router-link :to="{ name: 'login' }">Identificarse</router-link>
    </p>
    <p class="msg2">
      ¿No tienes cuenta?
      <router-link :to="{ name: 'register' }">Registrarse</router-link>
    </p>
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  data: () => ({
    datos: Object,
    user: {
      email: "",
      password: "",
    },
    passwordRepeat: "",
    error: false,
    aux: {},
    code: 0,
  }),
  computed: {
    codeIsValid() {
      return this.datos.code === this.code;
    },
    passwordIsValid() {
      return this.user.password === this.passwordRepeat;
    },
  },
  methods: {
    async changePassword() {
      this.user.email = this.datos.email;
      this.aux = await auth.updatePassword(this.user);
      this.aux = this.aux.data;
      // mirar lo que devuelve
    },
  },
};
</script>

<style scoped lang="scss">
.rememberPassword {
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
.error {
  margin: 1rem;
  color: #ff4a96;
}
.msg2 {
  margin-top: 2rem;
  text-align: center;
}
</style>
