import API from "@/package/services/axios-settings";
import { IAuthData, ILoginResponse } from "@/intefaces/auth/IAuth";

export const apiLogin = (authData: IAuthData) => {
  return API.post<ILoginResponse>("api/user/login", {
    email: authData.email,
    password: authData.password,
  });
};
