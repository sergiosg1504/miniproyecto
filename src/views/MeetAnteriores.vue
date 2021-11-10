<template>
  <div>
    <div><navigation-bar /></div>
    <div></div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
//import auth from "../logic/auth";
export default {
  components: { NavigationBar },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped>
.general {
  float: left;
}
#caja1,
#caja2 {
  border: 1px solid black;
  width: 200px;
  height: 160px;
  margin: 20px;
  float: left;
  vertical-align: middle;
}
.navigation {
  position: absolute;
  vertical-align: top;
}
.header {
  text-align: center;
}
button {
  height: 60px;
  border-radius: 20px;
  border: none;
  margin: 3px 10px;
  background: white;
  margin: 15px 0;
  color: gray;
  font-family: monospace;
  font-size: 15px;
}
</style>
