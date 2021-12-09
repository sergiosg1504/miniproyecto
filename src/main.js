import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/logic/vuetify";
import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

Vue.use(VueGoodTablePlugin);

new Vue({ router, vuetify, render: (h) => h(App) }).$mount("#app");
