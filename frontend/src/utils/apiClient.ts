import axios from "axios";

const env = import.meta.env.VITE_NODE_ENV;

export const apiClient = axios.create({
  baseURL: env === "development" ? "http://localhost:5000/" : "https://",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("userInfo")) {
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")!).token
      }`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
