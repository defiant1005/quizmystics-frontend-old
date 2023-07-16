<script lang="ts">
import { defineComponent } from "vue";
import { useCategoriesStore } from "@/stores/admin/categories.store";

export default defineComponent({
  name: "AdminModalFormCreateCategory",

  emits: ["closeModal"],

  data() {
    const categoryStore = useCategoriesStore();

    return {
      categoryStore,
      isLoading: false,
      title: "",
    };
  },

  methods: {
    setCategory() {
      this.isLoading = true;
      this.categoryStore
        .setCategory({
          title: this.title,
        })
        .then(() => {
          this.title = "";
          this.categoryStore.getCategories();
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
      <label for="addModalFormEditUserEmail" class="form-label">
        Категория
      </label>
      <input
        id="addModalFormEditUserEmail"
        v-model="title"
        type="text"
        class="form-control"
        aria-describedby="emailHelp"
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isLoading || title.trim() === ''"
    >
      Сохранить
    </button>
  </form>
</template>

<style lang="scss" scoped>
.admin-modal-form-user {
}
</style>
