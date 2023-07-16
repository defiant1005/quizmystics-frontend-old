import API from "@/package/services/axios-settings";
import { ICategories, ISetCategoryData } from "@/intefaces/IAdminInrefaces";

export const apiGetCategories = () => {
  return API.get<Array<ICategories>>("api/category/");
};

export const apiSetCategory = ({ title }: ISetCategoryData) => {
  return API.post<ICategories>("api/category/", {
    title: title,
  });
};

export const apiEditCategory = (id: number, { title }: ISetCategoryData) => {
  return API.put<ICategories>(`api/category/${id}`, { title });
};

export const apiDeleteCategory = (id: string) => {
  return API.delete(`api/category/${id}`);
};
