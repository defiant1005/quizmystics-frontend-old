<script lang="ts">
import { defineComponent } from "vue";
import MainNotice from "@/package/components/MainNotice.vue";
import { mapState } from "pinia";
import { useMainStore } from "@/stores/main";
import { testQuestion, testCurse2 } from "@/package/constants/test-user-data";

export default defineComponent({
  name: "App",
  components: { MainNotice },

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
  <RouterView />

  <MainNotice
    :notice-data="notification"
    auto-close
    @close="clearNotification"
  />
</template>
