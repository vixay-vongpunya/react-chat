import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const server = axios.create({
  baseURL:
    "https://chat-backend-d7d0f6b7hcdmcbdd.uaenorth-01.azurewebsites.net/api",
  withCredentials: true,
});
