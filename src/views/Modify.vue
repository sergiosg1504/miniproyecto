<template id="modify">
    <div>
        <h1>Modificar datos
            <button @click="cancel()">Cancelar</button>
        </h1>
        <p>Hola</p>
        <mod/>
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

  }),
  methods: {
      cancel(){
          this.$router.go(-1);
      }
  },
  created(){
      
  }
};
</script>