<script lang="ts">
import { activeScroll, disableScroll } from "@/package/helpers/scrollActions";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameModal",

  components: { MainButtonIcon },

  emits: ["close"],

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isOpen(newValue) {
      if (newValue) {
        disableScroll();
      } else {
        activeScroll();
      }
    },
  },
});
</script>

<template>
  <Transition name="game-modal">
    <div v-if="isOpen" class="game-modal" @click="$emit('close')">
      <div class="game-modal__content content" @click.stop>
        <MainButtonIcon
          type="button"
          class="content__close-btn"
          @click="$emit('close')"
        >
          <span class="icon-cross" />
        </MainButtonIcon>

        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.game-modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(24, 25, 31, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 70%;
    background: $white;
    border-radius: 24px;
    position: relative;
    max-height: 95vh;
    min-height: 200px;
    overflow: auto;
    padding: 16px;

    &__close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 24px;
      height: 24px;

      > span {
        width: 100%;
        height: 100%;
        background: $black;
      }
    }
  }
}

.game-modal-enter-from {
  opacity: 0;
}

.game-modal-leave-to {
  opacity: 0;
}

.game-modal-enter-from .game-modal-container,
.game-modal-leave-to .game-modal-container {
  transform: scale(1.1);
}
</style>
