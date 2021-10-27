<template>
  <div class="home">
    <button @click="listado()">Ver listado usuarios</button>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {

  },
  methods: {
    listado(){
      this.$router.push('list');
    }
  },
};
</script>
