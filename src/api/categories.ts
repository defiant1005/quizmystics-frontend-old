import API from "@/package/services/axios-settings";
import { ICategories } from "@/intefaces/ICategories";

export const apiGetCategories = () => {
  return API.get<Array<ICategories>>("api/category/");
};

// export const apiGetCategories = (authData: IAuthData) => {
//     return API.post<ILoginResponse>("api/user/login", {
//         email: authData.email,
//         password: authData.password,
//     });
// };
