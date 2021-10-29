import axios from "axios";
//import Cookies from "js-cookie";

const API = "http://127.0.0.1:5000/";
export default {
  //setUserLogged(userLogged) {
  // Cookies.set("userLogged", userLogged);
  //},
  //getUserLogged() {
  // return Cookies.get("userLogged");
  //},
  register(user) {
    return axios.post(API, user);
  },
  login(email, password) {
    const user = { email, password };
    return axios.post(API, user);
  },
  checkEmail(email) {
    return axios.post(API, email);
  },
  updatePassword(email, password) {
    const user = { email, password };
    return axios.post(API, user);
  },

  put(user) {
    return axios.put(API, user);
  },
  get() {
    let response = axios.get(API);
    return response.data;
  },
  async del(user) {
    return axios.delete(API, user);
  },
};
