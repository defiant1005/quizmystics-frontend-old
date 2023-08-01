<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "UserAvatar",

  props: {
    user: {
      type: Object as PropType<any>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="user-avatar">
    <div v-if="user.isRoomAdmin" class="user-avatar__crown crown" />
    <span>{{ user.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.user-avatar {
  width: 50px;
  height: 50px;
  background: rgba(215, 64, 220, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;

  .crown {
    position: absolute;
    width: 50px;
    height: 10px;
    background: #da9e18;
    top: 0;
    border-radius: 10px;
  }
}
</style>
