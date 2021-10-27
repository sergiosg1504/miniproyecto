<template>
  <div>
    <mod :usu="user"/>
  </div>
</template>

<script>
//AQUI EL USUARIO ESTA ALMACENADO
import Mod from "./Mod.vue";

export default {
  name: "User",
  components: {
    Mod
  },
  props:{
      user: Object
  },
  data: () => ({
    usuario: {},
    /* name: user.nombre,
      surname: user.apellidos,
      email: user.email,
      rol: user.rol,*/
  }),
  methods:{
    hola () {
      console.log("Hola soy: " + this.user.email);
    }
  }
};
</script>