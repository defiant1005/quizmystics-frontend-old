import API from "@/package/services/axios-settings";
import { ICategories, ISetCategoryData } from "@/intefaces/IAdminInrefaces";

export const apiGetQuestions = () => {
  return API.get<Array<ICategories>>("api/question/");
};

export const apiSetQuestion = ({ title }: ISetCategoryData) => {
  return API.post<ICategories>("api/question/", {
    title: title,
  });
};

export const apiEditQuestion = (id: number, { title }: ISetCategoryData) => {
  return API.put<ICategories>(`api/question/${id}`, { title });
};

export const apiDeleteQuestion = (id: string) => {
  return API.delete(`api/question/${id}`);
};
