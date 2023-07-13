import { defineStore } from "pinia";
import { IAuthData } from "@/intefaces/IAuth";
import * as authAPI from "@/api/auth";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import jwt_decode from "jwt-decode";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: cookies.get("token") as null | string,
  }),

  getters: {
    tokenDecode(state): any {
      if (state.token) {
        return jwt_decode(state.token);
      }
      return false;
    },

    isAdmin() {
      //@ts-ignore
      return this.tokenDecode?.role === "admin" ?? false;
    },
  },

  actions: {
    login(authData: IAuthData) {
      return new Promise((resolve, reject) => {
        authAPI
          .apiLogin(authData)
          .then((response) => {
            cookies.set("token", response.data.token);
            this.token = response.data.token;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logOut() {
      this.token = null;
      cookies.remove("token");
    },
  },
});
