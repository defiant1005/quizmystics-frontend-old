<script lang="ts">
import { defineComponent, PropType } from "vue";
import AppDrawer from "@/package/components/AppDrawer.vue";

export default defineComponent({
  name: "UserCard",

  components: { AppDrawer },

  props: {
    user: {
      type: Object as PropType<any>,
      required: true,
    },
  },

  data() {
    return {
      isDrawerOpen: false,
    };
  },
});
</script>

<template>
  <div class="user-card" @click="isDrawerOpen = true">
    <img src="@/assets/avatars/avatar1.svg" alt="ava" />

    <p>{{ user.name }}</p>
  </div>

  <AppDrawer
    :is-open="isDrawerOpen"
    title="Редактирование"
    @close="isDrawerOpen = false"
  >
    <div>123123123</div>
  </AppDrawer>
</template>

<style lang="scss" scoped>
.user-card {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 32px;
    height: 32px;
  }

  > p {
    margin: 0;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
  }
}
</style>
