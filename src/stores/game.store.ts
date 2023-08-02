import { defineStore } from "pinia";
import * as gameApi from "@/api/game";
import * as questionsApi from "@/api/questions";
import { ICheckAnswer, IQuestion } from "@/intefaces/IGame";

export const useGameStore = defineStore("game-store", {
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

    checkAnswer(data: ICheckAnswer) {
      return new Promise((resolve, reject) => {
        gameApi
          .apiCheckAnswer(data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
