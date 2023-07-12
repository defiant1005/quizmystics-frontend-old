import { defineStore } from "pinia";
import { IAuthData } from "@/intefaces/auth/IAuth";
import * as authAPI from "@/api/auth/auth";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: cookies.get("token") as null | string,
  }),

  actions: {
    login(authData: IAuthData) {
      return new Promise((resolve, reject) => {
        authAPI
          .apiLogin(authData)
          .then((response) => {
            cookies.set("token", response.data.token);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
