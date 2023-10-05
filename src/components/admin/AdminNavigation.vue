<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "AdminNavigation",

  data() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },

  methods: {
    logOut() {
      this.authStore.logOut();
      this.$router.replace({
        name: "AdminLogin",
      });
    },
  },
});
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'AdminPageUsers' }">
              Users
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'AdminPageCategories' }">
              Categories
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'AdminPageQuestions' }">
              Questions
            </RouterLink>
          </li>
        </ul>
      </div>
      <button
        type="button"
        class="btn btn-danger admin-page__exit"
        @click="logOut"
      >
        Выйти
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
