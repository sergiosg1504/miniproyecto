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
  updatePassword(user) {
    // mirar que nombre de funcion de api esta bien
    return axios.post(API + "upadatePassword", user);
  },

  put(user) {
    return axios.put(API, user);
  },
  get() {
    let response = axios.get(API + "retrieve_all");
    return response.data;
  },
  async del(user) {
    return axios.delete(API, user);
  },
};
