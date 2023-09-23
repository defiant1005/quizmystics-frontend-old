<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers } from "@/intefaces/IGame";

export default defineComponent({
  name: "UserCard",

  emits: ["openDrawer"],

  props: {
    user: {
      type: Object as PropType<IPlayers>,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    openDrawer() {
      if (!this.disabled) {
        this.$emit("openDrawer", this.user.userId);
      }
    },
  },
});
</script>

<template>
  <div
    class="user-card"
    :class="[
      { 'user-card_disabled': disabled },
      { 'user-card_is-ready': user.isReady },
    ]"
    @click="openDrawer"
  >
    <img :src="user.avatar" alt="ava" />

    <p>
      {{ user.name }}
      <span v-if="!disabled">(Вы)</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  width: 100%;
  height: 56px;

  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
  border-radius: 16px;
  border: 2px solid $black;
  box-shadow: 0 4px 0 0 #18191f;
  position: relative;
  transition: top 0.5s ease-out;
  background: $yellow-800;

  &:not(&_disabled):active {
    box-shadow: none;
    top: 4px;
  }

  &_disabled {
    cursor: default;
  }

  &_is-ready {
    background: $green-800;
  }

  > img {
    width: 32px;
    height: 32px;
  }

  > p {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
  }
}
</style>
