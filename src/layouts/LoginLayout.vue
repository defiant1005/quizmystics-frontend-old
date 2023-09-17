<script>
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: "LoginLayout",

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",
    }),
  },
};
</script>

<template>
  <div class="login-layout">
    <h1 v-if="saveNameValue">Добро пожаловать в игру, {{ saveNameValue }}!</h1>
    <h1 v-else>Добро пожаловать в игру!</h1>
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

  > h1 {
    text-align: center;
    @include h-1;
  }
}
</style>
