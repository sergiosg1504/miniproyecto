import axios from "axios";
import Cookies from "js-cookie";
//import mail from "../../node/index.js";

const API = "http://172.28.238.132:5000/";
const API_node = "http://localhost:3000/";

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
    return axios.post(API + "check_email", email);
  },
  updatePassword(user) {
    return axios.post(API + "update_password", user);
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
  out(em, pas) {
    let user = {
      email: em,
      password: pas,
    };
    return axios.post(API + "logout", user);
  },
  save(image) {
    return axios.post(API + "save_image", image);
  },
  recover(email) {
    return axios.post(API + "recover_image", email);
  },
  sendEmail(data) {
    return axios.post(API_node, data);
  },
};
