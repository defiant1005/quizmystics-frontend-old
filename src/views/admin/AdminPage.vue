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

  methods: {
    closeModalHandler() {
      console.log(123);
    },
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

    <!--    <button-->
    <!--      type="button"-->
    <!--      class="btn btn-primary"-->
    <!--      data-bs-toggle="modal"-->
    <!--      data-bs-target="#exampleModal"-->
    <!--    >-->
    <!--      Создать категорию-->
    <!--    </button>-->

    <!--    <MainModal :title="'Создать категорию'">-->
    <!--      <AdminModalFormCategory @closeModal="closeModalHandler" />-->
    <!--    </MainModal>-->
  </div>
</template>

<style lang="scss" scoped>
.admin-page {
  //display: flex;
  //align-items: center;
  //justify-content: center;
  //height: 100%;
  //flex-direction: column;
  //gap: 20px;
  //position: relative;

  &__exit {
    //position: absolute;
    //top: 50px;
    //right: 50px;
  }
}
</style>
