<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "@/stores/admin/users.store";

export default defineComponent({
  name: "AdminModalFormUser",

  data() {
    const usersStore = useUsersStore();

    return {
      usersStore,
      isLoading: false,
      email: "",
      password: "",
    };
  },

  methods: {
    setUser() {
      this.isLoading = true;
      this.usersStore
        .setUser({
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.usersStore.getAllUsers();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<template>
  <form @submit.prevent="setUser">
    <div class="mb-3">
      <label for="exampleInputText1" class="form-label">Email</label>
      <input
        id="exampleInputText1"
        v-model="email"
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
      />
    </div>

    <div class="mb-3">
      <label for="exampleInputText1" class="form-label">Пароль</label>
      <input
        id="exampleInputText1"
        v-model="password"
        type="password"
        class="form-control"
        aria-describedby="passwordHelp"
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      data-bs-dismiss="modal"
      :disabled="
        isLoading || email.trim().length < 5 || email.trim().length < 5
      "
    >
      Сохранить
    </button>
  </form>
</template>

<style lang="scss" scoped>
.admin-modal-form-user {
}
</style>
