<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useUsersStore } from "@/stores/admin/users.store";
import { useRolesStore } from "@/stores/admin/roles.store";
import { mapState } from "pinia";

export default defineComponent({
  name: "AdminModalFormEditUser",

  props: {
    editUserId: {
      type: [null, Number] as PropType<null | number>,
      required: true,
    },
  },

  data() {
    const usersStore = useUsersStore();

    return {
      usersStore,
      isLoading: false,
      email: "",
      role: null as null | number,
      userId: null as number,
    };
  },

  computed: {
    ...mapState(useRolesStore, {
      roles: "roles",
    }),

    ...mapState(useUsersStore, {
      users: "users",
    }),

    currentUser() {
      return this.users.find((user) => user.id === this.editUserId);
    },
  },

  watch: {
    currentUser: {
      handler(newValue) {
        if (newValue) {
          //@ts-ignore
          this.email = newValue.email;
          //@ts-ignore
          this.role = newValue.roleId;
          //@ts-ignore
          this.userId = newValue.id;
        }
      },
      deep: true,
    },
  },

  methods: {
    editUser() {
      this.isLoading = true;
      this.usersStore
        .editUser(this.userId, {
          email: this.email,
          roleId: +this.role,
        })
        .then(() => {
          this.email = "";
          this.role = null;
          this.userId = 0;
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
  <form @submit.prevent="editUser">
    <div class="mb-3">
      <label for="AdminModalFormUserEmail" class="form-label">Email</label>
      <input
        id="AdminModalFormUserEmail"
        v-model="email"
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
      />
    </div>

    <div class="mb-3">
      <label for="AdminModalFormUserRole" class="form-label">Роль</label>
      <select
        id="AdminModalFormUserRole"
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
        role === null
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
