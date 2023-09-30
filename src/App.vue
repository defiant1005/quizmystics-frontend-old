<script lang="ts">
import { defineComponent } from "vue";
import MainNotice from "@/package/components/MainNotice.vue";
import { mapState } from "pinia";
import { useMainStore } from "@/stores/main";
import MagicAnimation from "@/components/game/game-page/magic-usage/MagicAnimation.vue";

export default defineComponent({
  name: "App",

  components: { MagicAnimation, MainNotice },

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
  <MagicAnimation />
  <!--  <router-view />-->

  <MainNotice
    :notice-data="notification"
    :auto-close="true"
    @close="clearNotification"
  />
</template>
