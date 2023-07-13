<script lang="ts">
import { defineComponent } from "vue";
import { useCategoriesStore } from "@/stores/admin/categories.store";

export default defineComponent({
  name: "AdminModalFormCategory",

  emits: ["closeModal"],

  props: {},

  data() {
    const categoriesStore = useCategoriesStore();
    return {
      categoriesStore,
      category: "",
      isLoading: false,
    };
  },

  methods: {
    setCategory() {
      this.isLoading = true;
      this.categoriesStore
        .setCategory({
          title: this.category,
        })
        .then(() => {
          this.categoriesStore.getCategories();
          this.category = "";
          this.$emit("closeModal");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<template>
  <form @submit.prevent="setCategory">
    <div class="mb-3">
      <label for="exampleInputText1" class="form-label">Категория</label>
      <input
        id="exampleInputText1"
        v-model="category"
        type="text"
        class="form-control"
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">Категория вопроса</div>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      data-bs-dismiss="modal"
      :disabled="isLoading || category.trim().length < 5"
    >
      Сохранить
    </button>
  </form>
</template>

<style lang="scss" scoped></style>
