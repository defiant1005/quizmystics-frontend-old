<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "@/stores/admin/users.store";
import MainTable from "@/package/components/MainTable.vue";
import { mapState } from "pinia";
import MainModal from "@/package/components/MainModal.vue";
import AdminModalFormUser from "@/components/admin/AdminModalFormUser.vue";

export default defineComponent({
  name: "AdminPageUsers",

  components: {
    AdminModalFormUser,
    MainModal,
    MainTable,
  },

  data() {
    const usersStore = useUsersStore();
    return {
      usersStore,
    };
  },

  computed: {
    ...mapState(useUsersStore, {
      users: "users",
      tableHeader: "tableHeader",
    }),
  },

  methods: {
    deleteEntityHandler(id) {
      this.usersStore.deleteUser(id).then(() => {
        this.usersStore.getAllUsers();
      });
    },
  },

  mounted() {
    this.usersStore.getAllUsers();
  },
});
</script>

<template>
  <div class="admin-page-users container mt-5">
    <MainTable
      :table-header="tableHeader"
      :table-data="users"
      @deleteEntity="deleteEntityHandler"
    />

    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Создать пользователя
    </button>

    <MainModal :title="'Создать пользователя'">
      <AdminModalFormUser />
    </MainModal>
  </div>
</template>

<style lang="scss" scoped></style>
