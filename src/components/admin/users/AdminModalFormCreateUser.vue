<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "@/stores/admin/users.store";
import { useRolesStore } from "@/stores/admin/roles.store";
import { mapState } from "pinia";

export default defineComponent({
  name: "AdminModalFormCreateUser",

  data() {
    const usersStore = useUsersStore();

    return {
      usersStore,
      isLoading: false,
      email: "",
      password: "",
      role: "",
    };
  },

  computed: {
    ...mapState(useRolesStore, {
      roles: "roles",
    }),
  },

  methods: {
    setUser() {
      this.isLoading = true;
      this.usersStore
        .setUser({
          email: this.email,
          password: this.password,
          roleId: +this.role,
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.role = "";
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
      <label for="addModalFormEditUserEmail" class="form-label">Email</label>
      <input
        id="addModalFormEditUserEmail"
        v-model="email"
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormEditUserPassword" class="form-label">
        Пароль
      </label>
      <input
        id="addModalFormEditUserPassword"
        v-model="password"
        type="password"
        class="form-control"
        aria-describedby="passwordHelp"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormEditUserRole" class="form-label">Роль</label>
      <select
        id="addModalFormEditUserRole"
        v-model="role"
        class="form-select"
        aria-label="Default select example"
      >
        <option
          v-for="roleItem in roles"
          :key="roleItem.id"
          :value="roleItem.id"
        >
          {{ roleItem.role }}
        </option>
      </select>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      data-bs-dismiss="modal"
      :disabled="
        isLoading ||
        email.trim().length < 5 ||
        email.trim().length < 5 ||
        role === ''
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
