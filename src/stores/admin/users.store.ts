import { defineStore } from "pinia";
import * as usersApi from "@/api/users";
import {
  IEditUsersData,
  ISetUsersData,
  IUser,
} from "@/intefaces/IAdminInrefaces";

export const useUsersStore = defineStore("users-store", {
  state: () => ({
    users: [] as Array<IUser>,

    tableHeader: ["id", "email", "roleId"],
  }),

  actions: {
    getAllUsers() {
      return new Promise((resolve, reject) => {
        usersApi
          .apiGetAllUsers()
          .then((response) => {
            this.users = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    setUser({ email, password, roleId }: ISetUsersData) {
      return new Promise((resolve, reject) => {
        usersApi
          .apiSetUsers({ email, password, roleId })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editUser(id: number, { email, roleId }: IEditUsersData) {
      return new Promise((resolve, reject) => {
        usersApi
          .apiEditUsers(id, { email, roleId })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteUser(id: string) {
      return new Promise((resolve, reject) => {
        usersApi
          .apiDeleteUser(id)
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
