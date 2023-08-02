import API from "@/package/services/axios-settings";
import { ISetQuestion } from "@/intefaces/IAdminInrefaces";
import { ICheckAnswer, IQuestion } from "@/intefaces/IGame";

export const apiGetQuestions = () => {
  return API.get("api/question/");
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
  return API.post("api/question/", {
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
  return API.put(`api/question/${id}`, {
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
