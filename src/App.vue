<script lang="ts">
import { defineComponent } from "vue";
import MainNotice from "@/package/components/MainNotice.vue";
import { mapState } from "pinia";
import { useMainStore } from "@/stores/main";
import { testQuestion, testCurse2 } from "@/package/constants/test-user-data";
import QuestionGame from "@/components/game/game-page/QuestionGame.vue";

export default defineComponent({
  name: "App",

  components: { QuestionGame, MainNotice },

  data() {
    const mainStore = useMainStore();

    return {
      testQuestion,
      testCurse2,

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
});
</script>

<template>
  <!--  <router-view />-->
  <QuestionGame :question="testQuestion" :curse="testCurse2" />

  <MainNotice
    :notice-data="notification"
    :auto-close="true"
    @close="clearNotification"
  />
</template>
