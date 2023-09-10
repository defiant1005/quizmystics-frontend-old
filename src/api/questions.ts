import API from "@/package/services/axios-settings";
import { ISetQuestion } from "@/intefaces/IAdminInrefaces";
import {
  ICheckAnswer,
  ICheckAnswerResponse,
  IQuestion,
} from "@/intefaces/IGame";

export const apiGetQuestions = () => {
  return API.get("api/question/");
};

export const apiGetOneQuestions = (id: number) => {
  return API.get<IQuestion>(`api/question/${id}`);
};

export const apiCheckAnswer = (checkAnswerData: ICheckAnswer) => {
  return API.post<ICheckAnswerResponse>(
    `api/question/check-answer/${checkAnswerData.questionId}`,
    {
      answer: checkAnswerData.answer,
    },
    {
      //@ts-ignore
      notNotice: true,
    }
  );
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
