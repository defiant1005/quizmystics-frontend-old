<script lang="ts">
import { defineComponent } from "vue";
import MainTable from "@/package/components/MainTable.vue";
import MainModal from "@/package/components/MainModal.vue";
import { mapState } from "pinia";
import { Modal } from "bootstrap";
import { useCategoriesStore } from "@/stores/admin/categories.store";
import AdminModalFormCreateCategory from "@/components/admin/categories/AdminModalFormCreateCategory.vue";
import AdminModalFormEditCategory from "@/components/admin/categories/AdminModalFormEditCategory.vue";

export default defineComponent({
  name: "AdminPageCategories",

  components: {
    AdminModalFormEditCategory,
    AdminModalFormCreateCategory,
    MainModal,
    MainTable,
  },

  data() {
    const categoryStore = useCategoriesStore();
    return {
      categoryStore,
      editCategoryId: null as null | number,
    };
  },

  computed: {
    ...mapState(useCategoriesStore, {
      categories: "categories",
      tableHeader: "tableHeader",
    }),
  },

  methods: {
    deleteEntityHandler(id) {
      this.categoryStore.deleteCategory(id).then(() => {
        this.categoryStore.getCategories();
      });
    },

    editEntityHandler(id: number) {
      this.editCategoryId = id;
      const myModal = new Modal(document.getElementById("editCategory"));
      myModal.show();
    },

    closeModalHandler() {
      const myModal = new Modal(document.getElementById("createCategory"));
      myModal.toggle();
    },
  },
});
</script>

<template>
  <div class="admin-page-users container mt-5">
    <MainTable
      :table-header="tableHeader"
      :table-data="categories"
      @deleteEntity="deleteEntityHandler"
      @editEntity="editEntityHandler"
    />

    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#createCategory"
    >
      Создать категорию
    </button>

    <MainModal :id-value="'createCategory'" :title="'Создать категорию'">
      <AdminModalFormCreateCategory @closeModal="closeModalHandler" />
    </MainModal>

    <MainModal :title="'Редактировать пользователя'" :id-value="'editCategory'">
      <AdminModalFormEditCategory :edit-category-id="editCategoryId" />
    </MainModal>
  </div>
</template>

<style lang="scss" scoped>
.admin-page-categories {
}
</style>
