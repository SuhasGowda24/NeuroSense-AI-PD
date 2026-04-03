import axios from "axios";

const axiosClient = axios.create({
   baseURL: process.env.REACT_APP_API_URL + "/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // wherever you store JWT
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
