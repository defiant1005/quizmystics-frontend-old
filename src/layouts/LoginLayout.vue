<script>
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: "LoginLayout",

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",
    }),

    isShowTitle() {
      return this.$route.name !== "MainRoom";
    },
  },
};
</script>

<template>
  <div class="login-layout" :class="{ 'login-layout_main-room': !isShowTitle }">
    <template v-if="isShowTitle">
      <h1 v-if="saveNameValue">
        Добро пожаловать в игру, {{ saveNameValue }}!
      </h1>
      <h1 v-else>Добро пожаловать в игру!</h1>
    </template>

    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.login-layout {
  padding: 12px;
  width: 100%;
  height: 100%;
  background: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  transition: background 0.3s ease-out;

  &_main-room {
    justify-content: flex-start;
  }

  > h1 {
    text-align: center;
    @include h-1;
  }
}
</style>
