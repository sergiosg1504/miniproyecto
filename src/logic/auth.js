import axios from "axios";
import Cookies from "js-cookie";
import mail from "../../node/index.js";

const API = "http://127.0.0.1:5000/";
export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  register(user) {
    return axios.post(API + "register", user);
  },
  login(userLogin) {
    return axios.post(API + "login", userLogin);
  },
  checkEmail(email) {
    return axios.post(API, email);
  },
  updatePassword(user) {
    // mirar que nombre de funcion de api esta bien
    return axios.post(API + "upadatePassword", user);
  },

  post(user) {
    let usuario = {
      nombre: user.name,
      apellidos: user.surnames,
      email: user.email,
      role: user.role,
    };
    return axios.post(API + "update?id=" + user.id, usuario);
  },
  get() {
    let response = axios.get(API + "retrieve_all");
    return response;
  },
  del(user) {
    return axios.get(API + "delete?id=" + user.id);
  },
  out(user) {
    return axios.post(API + "logout", user);
  },
<<<<<<< HEAD
  save(image) {
    return axios.post(API + "save_image", image);
  },
  recover(email) {
    return axios.post(API + "recover_image", email);
  },
  enviarEmail() {
    mail.EnviarCorreoConfirmacion();
  },
=======
>>>>>>> parent of cf66dcd (Merge branch 'vue_unido_def' of https://github.com/robertomergon/miniproyecto into vue_unido_def)
};
