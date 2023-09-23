<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainPopper",

  props: {
    content: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <PopperLib arrow :content="content">
    <slot></slot>
  </PopperLib>
</template>

<style lang="scss" scoped>
:deep(.popper) {
  width: 320px;
  background: $green;
  padding: 20px;
  border-radius: 20px;
  color: $black;
  @include text-2;
}

:deep(.popper #arrow::before) {
  background: $green;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: $green;
}
</style>
