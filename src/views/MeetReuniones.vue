<template>
  <div>
    <div><navigation-bar /></div>
    <h1 class="header">REUNIONES</h1>
    <div>
      <v-app id="inspire">
        <v-card>
          <v-tabs v-model="tab" background-color="#4cc4ec" dark>
            <v-tab @click="click_Proximos">Próximos</v-tab>
            <v-tab @click="click_Anterior">Anterior</v-tab>
            <v-tab @click="click_SalaPersonal">Sala personal</v-tab>
          </v-tabs>
          <div v-if="menu === 0">
            <h1>Próximos</h1>
          </div>
          <div v-if="menu === 1">
            <h1>Anterior</h1>
          </div>
          <div v-if="menu === 2">
            <h1>Sala personal</h1>
          </div>
        </v-card>
      </v-app>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  components: {
    NavigationBar,
  },
  data: () => ({
    menu: 0,
  }),
  methods: {
    click_Proximos() {
      this.menu = 0;
    },
    click_Anterior() {
      this.menu = 1;
    },
    click_SalaPersonal() {
      this.menu = 2;
    },
  },
};
</script>

<style scoped>
.header {
  padding: 20px;
  text-align: center;
  background: white;
  color: #4cc4ec;
  font-size: 40px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
