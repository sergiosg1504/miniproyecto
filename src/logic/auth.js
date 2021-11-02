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
  login(email, password) {
    const user = { email: email, password: password };
    return axios.post(API + "login", user);
  },
  checkEmail(email) {
    return axios.post(API, email);
  },
  updatePassword(email, password) {
    const user = { email, password };
    return axios.post(API, user);
  },

  put(user) {
    return axios.put(API + "update", user);
  },
  get() {
    let response = axios.get(API + "retrieve_all");
    return response;
  },
  del(user) {
    return axios.get(API + "delete?id=" + user.id);
  },
};
