import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import RememberPassword from "../views/RememberPassword";
import Home from "../views/Home.vue";
import List from "../views/ListView.vue";
import Mod from "../views/Modify.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
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
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/list",
    name: "ListView",
    component: List,
    props: true
  },
  {
    path: "/mod",
    name: "Modify",
    component: Mod,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
