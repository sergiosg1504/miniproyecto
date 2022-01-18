import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import RememberPassword from "../views/RememberPassword";
import ChangePassword from "../views/ChangePassword";
import Home from "../views/Home.vue";
import List from "../views/ListView.vue";
import Mod from "../views/Modify.vue";
import Profile from "../components/Profile.vue";
import NavigationBar from "../components/NavigationBar.vue";
import IncomingMeetings from "../components/IncomingMeetings.vue";
import MeetReuniones from "../views/MeetReuniones.vue";
import MeetSeminariosWeb from "../views/MeetSeminariosWeb.vue";
import MeetConfig from "../views/MeetConfig.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faVideo,
  faTrash,
  faInfoCircle,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faArrowLeft,
  faVideo,
  faTrash,
  faInfoCircle,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faEye,
  faEyeSlash
);
Vue.component("icon", FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/rememberPassword",
    name: "rememberPassword",
    component: RememberPassword,
    props: true,
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: ChangePassword,
    props: true,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    props: true,
  },
  {
    path: "/list",
    name: "ListView",
    component: List,
    props: true,
  },
  {
    path: "/mod",
    name: "Modify",
    component: Mod,
    props: true,
  },
  {
    path: "/navigationBar",
    name: "NaviagationBar",
    component: NavigationBar,
    props: true,
  },
  {
    path: "/incomingMeetings",
    name: "IncomingMeetings",
    component: IncomingMeetings,
    props: true,
  },
  {
    path: "/reuniones",
    name: "Reuniones",
    component: MeetReuniones,
    props: true,
  },
  {
    path: "/seminariosWeb",
    name: "SeminariosWeb",
    component: MeetSeminariosWeb,
    props: true,
  },
  {
    path: "/configuracion",
    name: "Configuracion",
    component: MeetConfig,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
