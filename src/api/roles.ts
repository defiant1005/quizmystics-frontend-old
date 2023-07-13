import API from "@/package/services/axios-settings";
import { ICategories, IRoles, ISetRoles } from "@/intefaces/IAdminInrefaces";

export const apiGetAllRoles = () => {
  return API.get<Array<IRoles>>("api/roles");
};

export const apiSetRole = ({ role }: ISetRoles) => {
  return API.post<ICategories>("api/roles", { role });
};

export const apiDeleteRole = (id: number) => {
  return API.delete(`api/roles/${id}`);
};
