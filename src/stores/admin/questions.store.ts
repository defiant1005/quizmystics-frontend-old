import { defineStore } from "pinia";
import * as questionsApi from "@/api/questions";
import { ICategories, ISetCategoryData } from "@/intefaces/IAdminInrefaces";

export const useQuestionsStore = defineStore("questions-store", {
  state: () => ({
    questions: [] as Array<ICategories>,

    tableHeader: [
      "id",
      "title",
      "answer1",
      "answer2",
      "answer3",
      "answer4",
      "correct_answer",
    ],
  }),

  actions: {
    getQuestions() {
      return new Promise((resolve, reject) => {
        questionsApi
          .apiGetQuestions()
          .then((response) => {
            this.questions = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    setQuestion({ title }: ISetCategoryData) {
      return new Promise((resolve, reject) => {
        questionsApi
          .apiSetQuestion({ title })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editQuestion(id: number, { title }: ISetCategoryData) {
      return new Promise((resolve, reject) => {
        questionsApi
          .apiEditQuestion(id, { title })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteQuestion(id: string) {
      return new Promise((resolve, reject) => {
        questionsApi
          .apiDeleteQuestion(id)
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
