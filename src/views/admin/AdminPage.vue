<script lang="ts">
import { defineComponent } from "vue";
import MainModal from "@/package/components/MainModal.vue";
import AdminModalFormCategory from "@/components/admin/AdminModalFormCategory.vue";

export default defineComponent({
  name: "AdminPage",

  components: { AdminModalFormCategory, MainModal },

  data() {
    return {
      isCategoryLoading: false,
    };
  },

  methods: {
    setCategoryHandler(category) {
      this.isCategoryLoading = true;
      console.log(category);

      setTimeout(() => {
        this.isCategoryLoading = false;
      }, 3000);
    },
  },
});
</script>

<template>
  <div class="admin-page">
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
      <AdminModalFormCategory
        :is-category-loading="isCategoryLoading"
        @setCategory="setCategoryHandler"
      />
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
}
</style>
