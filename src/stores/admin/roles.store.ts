import { defineStore } from "pinia";
import * as rolesApi from "@/api/roles";
import { IRoles, ISetRoles } from "@/intefaces/IAdminInrefaces";

export const useRolesStore = defineStore("roles-store", {
  state: () => ({
    roles: [] as Array<IRoles>,
  }),

  actions: {
    getAllRoles() {
      return new Promise((resolve, reject) => {
        rolesApi
          .apiGetAllRoles()
          .then((response) => {
            this.roles = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    setRole({ role }: ISetRoles) {
      return new Promise((resolve, reject) => {
        rolesApi
          .apiSetRole({ role })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteRole(roleId: number) {
      return new Promise((resolve, reject) => {
        rolesApi
          .apiDeleteRole(roleId)
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
