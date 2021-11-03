import axios from "axios";
import Cookies from "js-cookie";

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
  updatePassword(email, password) {
    const user = { email, password };
    return axios.post(API, user);
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
};
