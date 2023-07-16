import { defineStore } from "pinia";
import * as categoriesApi from "@/api/categories";
import { ICategories, ISetCategoryData } from "@/intefaces/IAdminInrefaces";

export const useCategoriesStore = defineStore("categories-store", {
  state: () => ({
    categories: [] as Array<ICategories>,

    tableHeader: ["id", "title"],
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

    editCategory(id: number, { title }: ISetCategoryData) {
      return new Promise((resolve, reject) => {
        categoriesApi
          .apiEditCategory(id, { title })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteCategory(id: string) {
      return new Promise((resolve, reject) => {
        categoriesApi
          .apiDeleteCategory(id)
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
