<script lang="ts">
import { defineComponent, PropType } from "vue";
import MainInput from "@/package/components/MainInput.vue";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import MainButton from "@/package/components/MainButton.vue";
import AppDrawer from "@/package/components/AppDrawer.vue";
import { IPlayers } from "@/intefaces/IGame";

export default defineComponent({
  name: "EditUserDrawer",

  components: { AppDrawer, MainButton, MainButtonIcon, MainInput },

  emits: ["close", "openAvatarModal"],

  props: {
    isDrawerOpen: {
      type: Boolean,
      default: false,
    },

    user: {
      type: [Object, null] as PropType<IPlayers | null>,
      required: true,
    },
  },

  data() {
    return {
      userName: "",
    };
  },

  watch: {
    isDrawerOpen(newValue) {
      if (newValue && this.user) {
        this.userName = this.user.name;
      }
    },
  },

  methods: {
    submitEdit() {
      console.log("submitEdit");
    },
  },
});
</script>

<template>
  <AppDrawer
    :is-open="isDrawerOpen"
    title="Редактирование"
    @close="$emit('close')"
  >
    <form v-if="user" class="edit-user-form" @submit.prevent="submitEdit">
      <MainButtonIcon
        class="edit-user-form__ava-btn"
        @click="$emit('openAvatarModal')"
      >
        <img :src="user.avatar" alt="ava" />
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
</template>

<style lang="scss" scoped>
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
