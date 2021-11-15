<template>
  <div>
    <v-app>
      <v-card>
        <v-tabs v-model="tab" background-color="#4cc4ec" dark>
          <v-tab @click="click_Reuniones">Reuniones</v-tab>
          <v-tab @click="click_SeminariosWeb">Seminarios web</v-tab>
          <v-tab @click="click_Grabaciones">Grabaciones</v-tab>
          <v-tab @click="click_Configuracion">Configuración</v-tab>
        </v-tabs>
      </v-card>
    </v-app>
  </div>
  <!--<div class="navbar">
      <button class="subnavbtn">
        Reuniones<i class="fa fa-caret-down"></i>
      </button>
      <div class="subnav-content">
        <a href="/proximos">Próximos</a>
        <a href="/anteriores">Anteriores</a>
        <a href="/salaPersonal">Sala personal</a>
      </div>
    </div>
    <div class="subnav">
      <button class="subnavbtn">
        Próximos<i class="fa fa-carret-down"></i>
      </button>
      <div class="subnav-content">
        <a href="/reunion">Reunión</a>
        <a href="/grabacion">Grabación</a>
        <a href="/audioconferencia">Audioconferencia</a>
      </div>
    </div>
  </div>-->
</template>

<script>
export default {
  data: () => ({
    button: 0,
  }),
  methods: {
    click_Reuniones() {
      this.$router.push({ name: "Reuniones" });
    },
    click_SeminariosWeb() {
      this.$router.push({ name: "SeminariosWeb" });
    },
    click_Grabaciones() {
      this.$router.push({ name: "Grabaciones" });
    },
    click_Configuracion() {
      this.$router.push({ name: "Configuracion" });
    },
  },
};
</script>

<style scoped></style>
