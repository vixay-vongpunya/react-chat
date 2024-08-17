import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const server = axios.create({
  baseURL:
    "https://chatapp-backend-ftdubcg7bafzfucf.japanwest-01.azurewebsites.net/api",
  withCredentials: true,
});
