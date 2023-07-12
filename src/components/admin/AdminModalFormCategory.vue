<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminModalFormCategory",

  emits: ["setCategory"],

  props: {
    isCategoryLoading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      category: "",
    };
  },

  methods: {
    setCategory() {
      this.$emit("setCategory");
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
      />.
      <div id="emailHelp" class="form-text">Категория вопроса</div>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isCategoryLoading || category.trim().length < 5"
    >
      Сохранить
    </button>
  </form>
</template>

<style lang="scss" scoped></style>
