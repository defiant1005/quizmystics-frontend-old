<script lang="ts">
import { defineComponent, PropType } from "vue";
import AppDrawer from "@/package/components/AppDrawer.vue";
import MainInput from "@/package/components/MainInput.vue";
import MainButton from "@/package/components/MainButton.vue";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import GameModal from "@/package/components/GameModal.vue";

export default defineComponent({
  name: "UserCard",

  components: { GameModal, MainButtonIcon, MainButton, MainInput, AppDrawer },

  props: {
    user: {
      type: Object as PropType<any>,
      required: true,
    },
  },

  data() {
    return {
      isDrawerOpen: false,
      isModalOpen: false,
      userName: this.user.name,
    };
  },

  methods: {
    submitEdit() {
      console.log(123);
    },
  },
});
</script>

<template>
  <div class="user-card" @click="isDrawerOpen = true">
    <img src="@/assets/avatars/avatar1.svg" alt="ava" />

    <p>{{ user.name }}</p>
  </div>

  <AppDrawer
    :is-open="isDrawerOpen"
    title="Редактирование"
    @close="isDrawerOpen = false"
  >
    <form class="edit-user-form" @submit.prevent="submitEdit">
      <MainButtonIcon
        class="edit-user-form__ava-btn"
        @click="isModalOpen = true"
      >
        <img src="@/assets/avatars/avatar1.svg" alt="ava" />
      </MainButtonIcon>

      <MainInput
        v-model="userName"
        :maxlength="12"
        placeholder="Введите ваше имя"
        left-icon="user"
      />

      <MainButton type="submit" label="Сохранить" />
    </form>
  </AppDrawer>

  <GameModal :is-open="isModalOpen" @close="isModalOpen = false">
    <p>123</p>
  </GameModal>
</template>

<style lang="scss" scoped>
.user-card {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  > img {
    width: 32px;
    height: 32px;
  }

  > p {
    margin: 0;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
  }
}

.edit-user-form {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__ava-btn {
    width: 100px;
    height: 100px;

    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
