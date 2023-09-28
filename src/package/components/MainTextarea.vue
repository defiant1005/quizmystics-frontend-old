<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainTextarea",

  emits: ["update:modelValue", "textarea"],

  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },

    placeholder: {
      type: String,
    },

    type: {
      type: String,
      default: "text",
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    leftIcon: {
      type: String,
      required: false,
    },

    maxlength: {
      type: Number,
      default: 255,
    },

    errorMessage: {
      type: String,
      default: "",
    },
  },

  computed: {
    formattedValue: {
      get() {
        return this.modelValue;
      },

      set(newValue: string) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
});
</script>

<template>
  <div class="main-textarea">
    <span
      v-if="leftIcon"
      :class="`icon-${leftIcon}`"
      class="main-textarea__icon"
    />

    <textarea
      v-model="formattedValue"
      class="main-textarea__textarea textarea"
      :class="{ 'textarea_left-padding': leftIcon }"
      :placeholder="placeholder"
      cols="3"
      :disabled="disabled"
      :maxlength="maxlength"
      @textarea="$emit('textarea', $event.target.value)"
    />

    <span
      v-if="errorMessage.trim() !== ''"
      class="main-textarea__error-message"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.main-textarea {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;

  &__icon {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    background: $black;
  }

  .textarea {
    resize: none;
    padding: 14px 24px;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 2px solid $black;
    @include text-1;

    &_left-padding {
      padding-left: 52px;
    }
  }

  &__error-message {
    position: absolute;
    top: 100%;
    color: $red;
    @include text-2;
  }
}
</style>
