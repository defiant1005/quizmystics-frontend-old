import API from "@/package/services/axios-settings";
import { IAuthData } from "@/intefaces/auth/IAuth";

export const apiLogin = (authData: IAuthData) => {
  return API.post("api/user/login", {
    email: authData.email,
    password: authData.password,
  });
};
