<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapState } from "pinia";
import { useCategoriesStore } from "@/stores/admin/categories.store";

export default defineComponent({
  name: "AdminModalFormEditCategory",

  props: {
    editCategoryId: {
      type: [null, Number] as PropType<null | number>,
      required: true,
    },
  },

  data() {
    const categoryStore = useCategoriesStore();

    return {
      categoryStore,
      isLoading: false,
      title: "",
    };
  },

  computed: {
    ...mapState(useCategoriesStore, {
      categories: "categories",
    }),

    currentCategory() {
      return this.categories.find((user) => user.id === this.editCategoryId);
    },
  },

  watch: {
    currentCategory: {
      handler(newValue) {
        if (newValue) {
          //@ts-ignore
          this.title = newValue.title;
        }
      },
      deep: true,
    },
  },

  methods: {
    editCategory() {
      this.isLoading = true;
      this.categoryStore
        .editCategory(this.editCategoryId, {
          title: this.title,
        })
        .then(() => {
          this.title = "";
          this.categoryStore.getCategories();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<template>
  <form @submit.prevent="editCategory">
    <div class="mb-3">
      <label for="AdminModalFormUserEmail" class="form-label">Email</label>
      <input
        id="AdminModalFormUserEmail"
        v-model="title"
        type="text"
        class="form-control"
        aria-describedby="emailHelp"
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      data-bs-dismiss="modal"
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
