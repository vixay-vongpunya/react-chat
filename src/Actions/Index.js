import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const server = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});
