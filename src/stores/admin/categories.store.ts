import { defineStore } from "pinia";
import * as categoriesApi from "@/api/categories";
import { ICategories, ISetCategoryData } from "@/intefaces/ICategories";

export const useCategoriesStore = defineStore("categories-store", {
  state: () => ({
    categories: [] as Array<ICategories>,
  }),

  actions: {
    getCategories() {
      return new Promise((resolve, reject) => {
        categoriesApi
          .apiGetCategories()
          .then((response) => {
            this.categories = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    setCategory({ title }: ISetCategoryData) {
      return new Promise((resolve, reject) => {
        categoriesApi
          .apiSetCategory({ title })
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
