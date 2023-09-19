<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers } from "@/intefaces/IGame";

export default defineComponent({
  name: "UserCard",

  emits: ["openDrawer"],

  props: {
    user: {
      type: Object as PropType<IPlayers>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="user-card" @click="$emit('openDrawer', user.userId)">
    <img :src="user.avatar" alt="ava" />

    <p>{{ user.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

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
