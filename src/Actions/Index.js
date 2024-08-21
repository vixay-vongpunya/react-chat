import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const server = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API_URL}/api`,
  withCredentials: true,
});
