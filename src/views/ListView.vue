<template>
  <div>
    <table>
      <h1>Listado alumnos</h1>
      <list />
    </table>
  </div>
</template>

<script>
import List from "../components/List.vue";

export default {
  name: "ListView",
  components: {
    List,
  },
};
</script>
