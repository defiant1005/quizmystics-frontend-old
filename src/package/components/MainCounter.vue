<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainCounter",
  emits: ["update:count"],

  props: {
    count: {
      type: Number,
      required: true,
    },

    maxValue: {
      type: Number,
      default: 10,
    },

    minValue: {
      type: Number,
      default: 0,
    },

    maxDisabled: {
      type: Boolean,
      default: false,
    },

    minDisabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isMaxDisabled() {
      return this.maxDisabled || this.count === this.maxValue;
    },

    isMinDisabled() {
      return this.minDisabled || this.count === this.minValue;
    },
  },

  methods: {
    increment() {
      if (this.count - 1 >= this.minValue) {
        this.$emit("update:count", this.count - 1);
      }
    },

    decrement() {
      if (this.count + 1 <= this.maxValue) {
        this.$emit("update:count", this.count + 1);
      }
    },
  },
});
</script>

<template>
  <div class="main-counter">
    <button type="button" :disabled="isMinDisabled" @click="increment">
      <span class="icon-minus" />
    </button>

    <div class="main-counter__count">{{ count }}</div>

    <button type="button" :disabled="isMaxDisabled" @click="decrement">
      <span class="icon-plus" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.main-counter {
  width: 134px;
  height: 48px;
  border-radius: 16px;
  border: 2px solid $black;
  background: $white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: hidden;

  &__count {
    color: $black;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $yellow;
    @include h-4;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      width: 24px;
      height: 24px;
      background: $black;
    }
  }
}
</style>
