<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useCategoriesStore } from "@/stores/admin/categories.store";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";

export default defineComponent({
  name: "AdminPage",

  components: { AdminNavigation },

  data() {
    const authStore = useAuthStore();
    const categoriesStore = useCategoriesStore();

    return {
      categoriesStore,
      authStore,
    };
  },

  mounted() {
    this.categoriesStore.getCategories();
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
