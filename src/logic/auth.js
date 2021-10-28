import axios from "axios";
//import Cookies from "js-cookie";

const API = "";
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

  async put(user) {
    let response = await axios.put(API, user);
    console.log(response.data);
  },
  async get() {
    let response = await axios.get("api");
    return response.data;
  },
};
