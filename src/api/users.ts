import API from "@/package/services/axios-settings";
import {
  ICategories,
  IEditUsersData,
  ISetUsersData,
  IUser,
} from "@/intefaces/IAdminInrefaces";

export const apiGetAllUsers = () => {
  return API.get<Array<IUser>>("api/user/users");
};

export const apiSetUsers = ({ email, password, roleId }: ISetUsersData) => {
  return API.post<ICategories>("api/user/registration", {
    email,
    password,
    roleId,
  });
};

export const apiEditUsers = (id: number, { email, roleId }: IEditUsersData) => {
  return API.put<ICategories>(`api/user/users/${id}`, {
    email,
    roleId,
  });
};

export const apiDeleteUser = (id: string) => {
  return API.delete(`api/user/users/${id}`);
};
