<template>
  <div>
    <p>Usuario</p>
  </div>
</template>

<script>
//import List from "../components/List.vue";

export default {
  name: "Mod",
  components: {},
  data: () => ({
    usuario: {},
    /* name: user.nombre,
      surname: user.apellidos,
      email: user.email,
      rol: user.rol,*/
  }),
  methods: {
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>
