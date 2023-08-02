import { ICheckAnswer } from "@/intefaces/IGame";
import API from "@/package/services/axios-settings";

export const apiCheckAnswer = ({ id, answer }: ICheckAnswer) => {
  return API.post("api/game/check-answer", {
    id,
    answer,
  });
};
