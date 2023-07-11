import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response.status === 500) {
      console.log("Ошибка сервера");
    } else if (error.response.status === 403 && error.config.method !== "get") {
      console.log("Отказано в доступе");
    } else {
      console.log(error.response.data.error);
    }
    return Promise.reject(error);
  }
);

export default API;
