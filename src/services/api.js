import Axios from "axios";

export const api = Axios.create({
  baseURL: "http://192.168.1.103:3333",
});
