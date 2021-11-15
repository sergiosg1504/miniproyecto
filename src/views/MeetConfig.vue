<template>
  <div>
    <div class="topnav">
      <v-app id="inspire">
        <v-card>
          <v-tabs v-model="tab" background-color="#4cc4ec" dark>
            <v-tab @click="setMeet">Reunión </v-tab>
            <v-tab @click="setRec">Grabación </v-tab>
            <v-tab @click="setAudio">Audioconferencia </v-tab>
            <v-tab @click="setDisp">Dispositivos de colaboracón</v-tab>
          </v-tabs>
          <div class="reunion" v-if="content === 1">
            <head>
              Reuniones
            </head>
            <v-sheet>
              <p class="titulo_op">
                Requerir que todas las reuniones estén protegidas con una opción
                de seguridad
              </p>
              <p>
                Requerir que todas las reuniones estén protegidas con una de las
                siguientes opciones de seguridad: un código de acceso, sala de
                espera o "Solo los usuarios autentificados pueden unirse a
                reuniones". Si no hay ninguna opción de seguridad habilitada, se
                protegerá todas las reuniones con una sala de espera.
              </p>
              <v-switch v-model="op1" inset color="#4cc4ec" />
            </v-sheet>
          </div>
          <div class="rec" v-if="content === 2">
            <p>Grabación</p>
          </div>
          <div class="audio" v-if="content === 3">
            <p>Audioconferencia</p>
          </div>
          <div class="disp" v-if="content === 4">
            <p>Dispositivos</p>
          </div>
        </v-card>
      </v-app>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);
//import navBar from "@/components/NavigationBar";

export default {
  data: () => ({
    content: 1,
    op1: false,
    NavigationBarvalor: 1,
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

<style scoped>
head {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
}

.titulo_op {
  font-weight: bold;
  margin: 20px 0 0 0;
}

.reunion {
  margin: 0 40px;
}

.rec {
  margin: 0 40px;
}

.audio {
  margin: 0 40px;
}
</style>
