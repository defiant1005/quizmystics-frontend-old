import API from "@/package/services/axios-settings";
import { ICategories, ISetCategoryData } from "@/intefaces/ICategories";

export const apiGetCategories = () => {
  return API.get<Array<ICategories>>("api/category/");
};

export const apiSetCategory = ({ title }: ISetCategoryData) => {
  return API.post<ICategories>("api/category/", {
    title: title,
  });
};
