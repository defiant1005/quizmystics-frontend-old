<script lang="ts">
import { defineComponent } from "vue";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
import { useCategoriesStore } from "@/stores/admin/categories.store";
import { useUsersStore } from "@/stores/admin/users.store";
import { useQuestionsStore } from "@/stores/admin/questions.store";

export default defineComponent({
  name: "AdminPage",

  components: { AdminNavigation },

  data() {
    const categoryStore = useCategoriesStore();
    const usersStore = useUsersStore();
    const questionsStore = useQuestionsStore();

    return {
      categoryStore,
      usersStore,
      questionsStore,

      isPageLoading: false,
    };
  },

  mounted() {
    this.isPageLoading = true;
    Promise.all([
      this.categoryStore.getCategories(),
      this.usersStore.getAllUsers(),
      this.questionsStore.getQuestions(),
    ]).finally(() => {
      this.isPageLoading = false;
    });
  },
});
</script>

<template>
  <div class="admin-page container">
    <AdminNavigation />

    <div
      v-if="isPageLoading"
      class="admin-page__logo d-flex justify-content-center"
    >
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<style lang="scss" scoped>
.admin-page {
  height: 100%;

  &__logo {
    height: 100%;
    align-items: center;
  }
}
</style>
