<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "@/stores/admin/users.store";
import MainTable from "@/package/components/MainTable.vue";
import { mapState } from "pinia";
import MainModal from "@/package/components/MainModal.vue";
import AdminModalFormUser from "@/components/admin/users/AdminModalFormUser.vue";
import { Modal } from "bootstrap";

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
      editUserId: null as null | number,
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

    editEntityHandler(id: number) {
      this.editUserId = id;
      const myModal = new Modal(document.getElementById("editUser"));
      myModal.show();
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
      @editEntity="editEntityHandler"
    />

    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#createUser"
    >
      Создать пользователя
    </button>

    <button
      type="button"
      class="btn btn-primary m-lg-2"
      data-bs-toggle="modal"
      data-bs-target="#editUser"
    >
      Редактировать пользователя
    </button>

    <MainModal :id-value="'createUser'" :title="'Создать пользователя'">
      <AdminModalFormUser />
    </MainModal>

    <MainModal :title="'Редактировать пользователя'" :id-value="'editUser'">
      <AdminModalFormUser :edit-user-id="editUserId" />
    </MainModal>
  </div>
</template>

<style lang="scss" scoped></style>
