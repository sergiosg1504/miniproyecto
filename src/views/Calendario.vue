<template>
  <div class="col-sm-12 main-container">
    <vue-cal style="height: 250px"></vue-cal>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "Calendar",
  components: {
    "vue-cal": VueCal,
  },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped lang="scss"></style>
