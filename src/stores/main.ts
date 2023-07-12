import { defineStore } from "pinia";
import { INoticeData } from "@/intefaces/IMain";

export const useMainStore = defineStore("main-store", {
  state: () => ({
    notification: null as null | INoticeData,
  }),

  actions: {
    createNotification(data: INoticeData | null) {
      if (this.notification) {
        this.notification = null;

        setTimeout(() => {
          this.notification = data;
        }, 50);
      } else {
        this.notification = data;
      }
    },
  },
});
