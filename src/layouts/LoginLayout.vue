<script>
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import MainBack from "@/components/MainBack.vue";

export default {
  name: "LoginLayout",

  components: { MainBack },

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",
    }),

    isShowTitle() {
      return this.$route.name !== "MainRoom";
    },

    isShowBack() {
      return this.$route.name === "EnterRoom";
    },
  },
};
</script>

<template>
  <div class="login-layout" :class="{ 'login-layout_main-room': !isShowTitle }">
    <MainBack v-if="isShowBack" class="login-layout__back-btn" />

    <template v-if="isShowTitle">
      <h1 v-if="saveNameValue">
        Добро пожаловать в игру, {{ saveNameValue }}!
      </h1>
      <h1 v-else>Добро пожаловать в игру!</h1>
    </template>

    <RouterView />
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
  position: relative;

  &__back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  &_main-room {
    justify-content: flex-start;
  }

  > h1 {
    text-align: center;
    @include h-1;
  }
}
</style>
