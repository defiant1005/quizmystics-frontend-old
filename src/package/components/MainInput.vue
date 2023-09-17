<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainInput",

  emits: ["update:modelValue", "input"],

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
  <div class="main-input">
    <span v-if="leftIcon" :class="`icon-${leftIcon}`" />

    <input
      v-model="formattedValue"
      class="main-input__input input"
      :class="{ 'input_left-padding': leftIcon }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.main-input {
  position: relative;
  width: 100%;
  height: 56px;
  display: flex;

  > span {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    background: $black;
  }

  .input {
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
}
</style>
