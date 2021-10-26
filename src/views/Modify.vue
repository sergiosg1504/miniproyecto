<template id="modify">
  <div>
    <h1>
      Modificar datos
      <button @click="cancel()">Cancelar</button>
    </h1>
    <mod />
  </div>
</template>

<script>
import Mod from "../components/Mod.vue";

export default {
  name: "Modify",
  components: {
    Mod,
  },
  data: () => ({
    user: null,
  }),
  methods: {
    cancel() {
      this.$router.go(-1);
    },
  },
  created() {},
};
</script>
