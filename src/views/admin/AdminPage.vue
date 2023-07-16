<script lang="ts">
import { defineComponent } from "vue";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
import { useCategoriesStore } from "@/stores/admin/categories.store";
import { useUsersStore } from "@/stores/admin/users.store";

export default defineComponent({
  name: "AdminPage",

  components: { AdminNavigation },

  data() {
    const categoryStore = useCategoriesStore();
    const usersStore = useUsersStore();
    // const questionsStore = useQues();

    return {
      categoryStore,
      usersStore,
    };
  },

  mounted() {
    this.categoryStore.getCategories();
    this.usersStore.getAllUsers();
  },
});
</script>

<template>
  <div class="admin-page container">
    <AdminNavigation />

    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.admin-page {
}
</style>
