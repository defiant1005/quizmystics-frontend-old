<script lang="ts">
import { defineComponent } from "vue";
import MainNotice from "@/package/components/MainNotice.vue";
import { mapState } from "pinia";
import { useMainStore } from "@/stores/main";

export default defineComponent({
  name: "App",

  components: { MainNotice },

  data() {
    const mainStore = useMainStore();

    return {
      mainStore,
    };
  },

  computed: {
    ...mapState(useMainStore, {
      notification: "notification",
    }),
  },

  methods: {
    clearNotification() {
      this.mainStore.createNotification(null);
    },
  },

  // mounted() {
  //   this.mainStore.createNotification({
  //     type: "success",
  //     description: "Все хорошо",
  //   });
  // },
});
</script>

<template>
  <router-view />

  <MainNotice
    :notice-data="notification"
    :auto-close="true"
    @close="clearNotification"
  />
</template>
