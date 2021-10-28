<template>
  <div class="remember-password">
    <h1 class="title">Recupera tu cuenta</h1>
    <form action class="form" @submit.prevent="emailRegistered">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <p class="error" v-if="!emailIsValid">Formato de email no valido</p>
      <p class="error" v-if="!emailRegistered()">
        Email no registrado en la BD
      </p>
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
    email: "",
    error: false,
    expressionEmail: /\w+@\w+\.+[a-z]/,
  }),
  computed: {
    emailIsValid() {
      return this.expressionEmail.test(this.email);
    },
  },
  methods: {
    async emailRegistered() {
      try {
        await auth.checkEmail(this.email);
        // enviar correo con el codigo
      } catch (error) {
        // comprobar codigos de error
        this.error = true;
      }
      return false;
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
