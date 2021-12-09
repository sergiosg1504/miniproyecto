import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/logic/vuetify";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faVideo,
  faTrash,
  faInfoCircle,
  faPlus,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faArrowLeft,
  faVideo,
  faTrash,
  faInfoCircle,
  faPlus,
  faCheckCircle,
  faTimesCircle
);
Vue.component("icon", FontAwesomeIcon);
Vue.config.productionTip = false;

import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

Vue.use(VueGoodTablePlugin);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
