<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserAvatar",

  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="user-avatar">
    {{ name }}
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
}
</style>
