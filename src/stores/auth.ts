import { defineStore } from "pinia";
import { IAuthData } from "@/intefaces/auth/IAuth";
import * as authAPI from "@/api/auth/auth";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({}),

  actions: {
    login(authData: IAuthData) {
      return new Promise((resolve, reject) => {
        authAPI
          .apiLogin(authData)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
