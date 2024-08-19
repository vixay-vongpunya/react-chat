import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const server = axios.create({
  baseURL: `${process.env.BACKEND_API_URL}/api`,
  withCredentials: true,
});
