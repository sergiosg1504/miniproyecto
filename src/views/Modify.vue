<template id="modify">
    <div>
        <h1>Modificar datos
            <button @click="cancel()">Cancelar</button>
        </h1>
        <p>Hola {{usu.nombre}}</p>
    </div>
</template>

<script>


export default {
  name: "Modify",
  components: {
  },
  props: {
      usu: Object
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