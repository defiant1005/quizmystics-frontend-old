<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainButton",

  props: {
    color: {
      type: String,
      default: "blue",
    },

    label: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: false,
    },

    type: {
      type: String,
      default: "button",
    },

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <button
    class="ui-button"
    :class="[
      `ui-button_color_${color}`,
      {
        'ui-button_loading': loading,
      },
    ]"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="icon" class="ui-button__icon" :class="`icon-${icon}`"></span>
    <span class="ui-button__label">{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  top: 0;
  height: 60px;
  @include text-1;

  &_color {
    &_blue {
      background: $blue;
      color: $white;
      box-shadow: 0 6px 0 0 #18191f;

      &:hover {
        background: $blue-800;
      }

      &:active {
        top: 3px;
        box-shadow: 0 2px 0 #161b13;
      }

      &:disabled {
        top: 0;
        box-shadow: none;
        background: $black-800;
        cursor: not-allowed;
      }

      .ui-button__icon {
        background: $white;
      }
    }

    &_green {
      background: $green;
      color: $white;
      box-shadow: 0 6px 0 0 #18191f;

      &:hover {
        background: $green-800;
      }

      &:active {
        top: 3px;
        box-shadow: 0 2px 0 #161b13;
      }

      &:disabled {
        top: 0;
        box-shadow: none;
        background: $black-800;
        cursor: not-allowed;
      }

      .ui-button__icon {
        background: $white;
      }
    }
  }

  &__label {
    width: 100%;
    text-align: center;
  }
}
</style>
