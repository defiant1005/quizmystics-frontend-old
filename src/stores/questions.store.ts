import { defineStore } from "pinia";
import * as questionsApi from "@/api/questions";
import { IQuestion } from "@/intefaces/IGame";

export const useQuestionsStore = defineStore("questions-store", {
  state: () => ({
    question: null as null | IQuestion,
  }),

  actions: {
    getOneQuestion(id: number) {
      return new Promise((resolve, reject) => {
        questionsApi
          .apiGetOneQuestions(id)
          .then((response) => {
            this.question = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
