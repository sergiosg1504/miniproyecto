<template>
  <div>
    <div class="topnav">
      <v-bottom-navigation :value="valor" height="40" grow>
        <v-btn @click="setMeet">Reunión </v-btn>
        <v-btn @click="setRec">Grabación </v-btn>
        <v-btn @click="setAudio">Audioconferencia </v-btn>
        <v-btn @click="setDisp">Dispositivos de colaboracón</v-btn>
      </v-bottom-navigation>
    </div>
    <div class="reunion" v-if="content === 1">
      <p>Reuniones</p>
    </div>
    <div class="rec" v-if="content === 2">
      <p>Grabación</p>
    </div>
    <div class="audio" v-if="content === 3">
      <p>Audioconferencia</p>
    </div>
    <div class="disp" v-if="content === 4">
      <p>Grabación</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//import vuescroll from 'vuescroll';
import Vuetify from "vuetify/lib/";
Vue.use(Vuetify);
export default {
  data: () => ({
    content: 1,
    valor: 1,
  }),
  methods: {
    setMeet() {
      this.content = 1;
      console.log(this.content);
    },
    setRec() {
      this.content = 2;
      console.log(this.content);
    },
    setAudio() {
      this.content = 3;
      console.log(this.content);
    },
    setDisp() {
      this.content = 4;
      console.log(this.content);
    },
  },
};
</script>

<style>
p {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
}
</style>
