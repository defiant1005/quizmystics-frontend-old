<script lang="ts">
import { defineComponent } from "vue";
import MainModal from "@/package/components/MainModal.vue";
import AdminModalFormCategory from "@/components/admin/AdminModalFormCategory.vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "AdminPage",

  components: { AdminModalFormCategory, MainModal },

  data() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },

  methods: {
    exit() {
      this.authStore.logOut();
      this.$router.replace({
        name: "AdminLogin",
      });
    },
  },
});
</script>

<template>
  <div class="admin-page">
    <button type="button" class="btn btn-danger admin-page__exit" @click="exit">
      Выйти
    </button>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Создать категорию
    </button>
    <button class="btn btn-primary">Создать вопрос</button>

    <MainModal :title="'Создать категорию'">
      <AdminModalFormCategory />
    </MainModal>
  </div>
</template>

<style lang="scss" scoped>
.admin-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  position: relative;

  &__exit {
    position: absolute;
    top: 50px;
    right: 50px;
  }
}
</style>
