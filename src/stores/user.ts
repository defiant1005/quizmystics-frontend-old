import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
const cookies = useCookies();

export const useUserStore = defineStore("user-store", {
  state: () => ({
    name: cookies.cookies.get("name") ?? "",
  }),

  actions: {
    renameName(name: string) {
      cookies.cookies.set("name", name);
      this.name = name;
    },
  },
});
