<script lang="ts">
import { defineComponent } from "vue";
import GameModal from "@/package/components/GameModal.vue";
import { allAvatarsList } from "@/package/helpers/all-avatars-list";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import MainButton from "@/package/components/MainButton.vue";

export default defineComponent({
  name: "ChangeAvatarModal",

  components: { MainButton, MainButtonIcon, GameModal },

  emits: ["close", "saveAvatar"],

  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },

    userAvatar: {
      type: String,
      required: true,
    },
  },

  data() {
    const avatars = allAvatarsList();

    return {
      avatars,
      currentAvatar: null as null | string,
    };
  },

  watch: {
    isModalOpen(newValue) {
      if (newValue) {
        this.currentAvatar = this.userAvatar;
      }
    },
  },

  methods: {
    saveAvatar() {
      this.$emit("saveAvatar", this.currentAvatar);
    },
  },
});
</script>

<template>
  <GameModal :is-open="isModalOpen" @close="$emit('close')">
    <div class="change-avatar-modal">
      <h4>Выбери аватар</h4>

      <MainButtonIcon
        v-for="(item, index) in avatars"
        :key="index"
        class="change-avatar-modal__ava-btn"
        :class="{
          'change-avatar-modal__ava-btn_active': currentAvatar === item,
        }"
        @click="currentAvatar = item"
      >
        <img :src="item" alt="image" />
      </MainButtonIcon>

      <MainButton
        type="button"
        label="Сохранить"
        class="change-avatar-modal__submit"
        @click="saveAvatar"
      />
    </div>
  </GameModal>
</template>

<style lang="scss" scoped>
.change-avatar-modal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  > h4 {
    @include h-4;
    color: $black;
  }

  &__ava-btn {
    width: 50px;
    height: 50px;
    transition: background 0.5s ease-out;

    &_active {
      background: $black-800;
    }

    > img {
      width: 100%;
      height: 100%;
    }
  }

  &__submit {
    margin-top: 16px;
  }
}
</style>
