<script>
import { activeScroll, disableScroll } from "@/package/helpers/scrollActions";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";

export default {
  name: "AppDrawer",

  components: { MainButtonIcon },

  emits: ["close"],

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "",
    },
  },

  beforeMount() {
    disableScroll();
  },

  unmounted() {
    activeScroll();
  },
};
</script>

<template>
  <div class="app-drawer" :class="{ 'app-drawer_open': isOpen }">
    <MainButtonIcon
      type="button"
      class="app-drawer__close-btn"
      @click="$emit('close')"
    >
      <span class="icon-cross" />
    </MainButtonIcon>

    <h4>{{ title }}</h4>

    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.app-drawer {
  width: 100%;
  height: 95dvh;
  position: fixed;
  background: red;
  bottom: -100%;
  left: 0;
  transition: all 1s ease-out;
  z-index: 9999999;
  padding: 20px;
  border-radius: 20px 20px 0 0;

  &__close-btn {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 20px;
    right: 20px;

    > span {
      width: 100%;
      height: 100%;
      background: $black;
    }
  }

  &_open {
    bottom: 0;
  }
}
</style>
