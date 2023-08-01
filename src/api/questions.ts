import API from "@/package/services/axios-settings";
import { ICategories, ISetQuestion } from "@/intefaces/IAdminInrefaces";
import { IQuestion } from "@/intefaces/IGame";

export const apiGetQuestions = () => {
  return API.get<Array<ICategories>>("api/question/");
};

export const apiGetOneQuestions = (id: number) => {
  return API.get<IQuestion>(`api/question/${id}`);
};

export const apiSetQuestion = ({
  categoryId,
  title,
  answer1,
  answer2,
  answer3,
  answer4,
  correct_answer,
}: ISetQuestion) => {
  return API.post<ICategories>("api/question/", {
    categoryId,
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correct_answer,
  });
};

export const apiEditQuestion = (
  id: number,
  {
    categoryId,
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correct_answer,
  }: ISetQuestion
) => {
  return API.put<ICategories>(`api/question/${id}`, {
    categoryId,
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correct_answer,
  });
};

export const apiDeleteQuestion = (id: string) => {
  return API.delete(`api/question/${id}`);
};
