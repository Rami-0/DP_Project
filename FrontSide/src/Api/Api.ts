import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.221.160:3000/",
});
