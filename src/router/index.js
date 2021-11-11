import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import RememberPassword from "../views/RememberPassword";
import ChangePassword from "../views/ChangePassword";
import Home from "../views/Home.vue";
import List from "../views/ListView.vue";
import Mod from "../views/Modify.vue";
import NavigationBar from "../components/NavigationBar.vue";
import Profile from "../components/Profile.vue";
import MeetProximos from "../views/MeetProximos.vue";
import MeetAnteriores from "../views/MeetAnteriores.vue";
import MeetSalaPersonal from "../views/MeetSalaPersonal.vue";
import MeetConfig from "../views/MeetConfig.vue";

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
    path: "/proximos",
    name: "proximos",
    component: MeetProximos,
    props: true,
  },
  {
    path: "/anteriores",
    name: "anteriores",
    component: MeetAnteriores,
    props: true,
  },
  {
    path: "/salaPersonal",
    name: "salaPersonal",
    component: MeetSalaPersonal,
    props: true,
  },
  {
    path: "/meetConfig",
    name: "meetConfig",
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
