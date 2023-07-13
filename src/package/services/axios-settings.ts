import axios from "axios";
import { useMainStore } from "@/stores/main";
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

//Список POST запросов, на которые не нужно показывать нотификацию "Успешно"
const postBackApiWithoutNotice = ["api/user/login"];

API.interceptors.response.use(
  function (response) {
    const mainStore = useMainStore();

    if (
      response.config.method !== "get" &&
      !postBackApiWithoutNotice.includes(response.config.url ?? "")
    ) {
      mainStore.createNotification({
        type: "success",
        description: "Успешно",
      });
    }

    return response;
  },

  function (error) {
    const mainStore = useMainStore();

    if (error.response.status === 500) {
      mainStore.createNotification({
        type: "danger",
        description: "Ошибка сервера",
      });
    } else if (error.response.status === 403 && error.config.method !== "get") {
      mainStore.createNotification({
        type: "danger",
        description: "Отказано в доступе",
      });
    } else {
      mainStore.createNotification({
        type: "danger",
        description: error.response.data.error,
      });
    }
    return Promise.reject(error);
  }
);

export default API;
