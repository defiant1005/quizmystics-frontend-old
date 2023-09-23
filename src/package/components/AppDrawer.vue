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
    <div class="app-drawer__header header">
      <h4>{{ title }}</h4>

      <MainButtonIcon
        type="button"
        class="header__close-btn"
        @click="$emit('close')"
      >
        <span class="icon-cross" />
      </MainButtonIcon>
    </div>

    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.app-drawer {
  width: calc(100% - 2px);
  height: 95dvh;
  position: fixed;
  background: $yellow-800;
  bottom: -100%;
  left: 50%;
  transform: translate(-50%, 0);
  transition: all 0.3s ease-out;
  z-index: 999;
  padding: 20px;
  border-radius: 16px 16px 0 0;
  border: 2px solid $black;
  overflow-y: auto;

  &_open {
    bottom: 0;
  }

  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;

    &__close-btn {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;

      > span {
        width: 100%;
        height: 100%;
        background: $black;
      }
    }

    > h4 {
      @include h-4;
      color: $black;
    }
  }
}
</style>
