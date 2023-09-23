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
    <div class="user-card__left left">
      <img :src="user.avatar" alt="ava" />

      <p>
        {{ user.name }}
        <span v-if="!disabled">(Вы)</span>
      </p>
    </div>

    <div v-if="user.stats" class="user-card__stats stats">
      <div class="stats__stat stat">
        <span class="icon-health" />
        <p>{{ user.stats.health }}</p>
      </div>

      <div class="stats__stat stat">
        <span class="icon-power" />
        <p>{{ user.stats.power }}</p>
      </div>

      <div class="stats__stat stat">
        <span class="icon-magic" />
        <p>{{ user.stats.magic }}</p>
      </div>

      <div class="stats__stat stat">
        <span class="icon-intelligence" />
        <p>{{ user.stats.intelligence }}</p>
      </div>

      <div class="stats__stat stat">
        <span class="icon-dexterity" />
        <p>{{ user.stats.dexterity }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  border-radius: 16px;
  border: 2px solid $black;
  box-shadow: 0 4px 0 0 #18191f;
  position: relative;
  transition: top 0.5s ease-out;
  background: $yellow-800;
  padding: 8px;

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

  .left {
    display: flex;
    align-items: center;
    gap: 8px;

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

  .stats {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;

      gap: 4px;

      > span {
        width: 16px;
        height: 16px;
        background: $black;
      }

      > p {
        color: $black;
        @include text-2;
        margin: 0;
      }
    }
  }
}
</style>
