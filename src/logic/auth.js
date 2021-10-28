import axios from "axios";

const API = "";
export default {
  async put(user) {
    let response = await axios.put(API, user);
    console.log(response.data);
  },
  async get() {
    let response = await axios.get("api");
    return response.data;
  },
};
