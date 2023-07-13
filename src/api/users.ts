import API from "@/package/services/axios-settings";
import { ICategories, ISetUsersData, IUser } from "@/intefaces/IAdminInrefaces";

export const apiGetAllUsers = () => {
  return API.get<Array<IUser>>("api/user/users");
};

export const apiSetUsers = ({ email, password }: ISetUsersData) => {
  return API.post<ICategories>("api/user/registration", { email, password });
};

export const apiDeleteUser = (id: string) => {
  return API.delete(`api/user/users/${id}`);
};
