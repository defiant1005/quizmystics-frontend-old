<script>
export default {
  name: "MainButtonIcon",

  props: {
    isDisable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <button
    :disabled="isDisable"
    class="main-button-icon"
    :class="{ disabled_btn: isDisable }"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.main-button-icon {
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.disabled_btn {
  cursor: not-allowed;
  pointer-events: all !important;
}
</style>
