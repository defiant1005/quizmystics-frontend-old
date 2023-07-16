<script lang="ts">
import { defineComponent } from "vue";
import { useQuestionsStore } from "@/stores/admin/questions.store";
import { mapState } from "pinia";
import { useCategoriesStore } from "@/stores/admin/categories.store";

export default defineComponent({
  name: "AdminModalFormCreateQuestion",

  emits: ["closeModal"],

  data() {
    const questionsStore = useQuestionsStore();

    return {
      questionsStore,
      isLoading: false,
      categoryId: "",
      title: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correct_answer: "",
    };
  },

  computed: {
    ...mapState(useCategoriesStore, {
      categories: "categories",
    }),
  },

  methods: {
    setCategory() {
      this.isLoading = true;
      this.questionsStore
        .setQuestion({
          title: this.title,
        })
        .then(() => {
          this.title = "";
          this.questionsStore.getQuestions();
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
      <label for="addModalFormEditCreateQuestionCategory" class="form-label">
        Категория
      </label>
      <select
        id="addModalFormEditCreateQuestionCategory"
        v-model="categoryId"
        class="form-select"
        aria-label="Default select example"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.title }}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label for="addModalFormEditQuestionTitle" class="form-label">
        Вопрос
      </label>
      <input
        id="addModalFormEditQuestionTitle"
        v-model="title"
        type="text"
        :disabled="categoryId === ''"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormEditQuestionAnswer1" class="form-label">
        Вариант 1
      </label>
      <input
        id="addModalFormEditQuestionAnswer1"
        v-model="answer1"
        type="text"
        :disabled="categoryId === ''"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormEditQuestionAnswer2" class="form-label">
        Вариант 2
      </label>
      <input
        id="addModalFormEditQuestionAnswer2"
        v-model="answer2"
        type="text"
        :disabled="categoryId === ''"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormEditQuestionAnswer3" class="form-label">
        Вариант 3
      </label>
      <input
        id="addModalFormEditQuestionAnswer3"
        v-model="answer3"
        :disabled="categoryId === ''"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormEditQuestionAnswer4" class="form-label">
        Вариант 4
      </label>
      <input
        id="addModalFormEditQuestionAnswer4"
        v-model="answer4"
        :disabled="categoryId === ''"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormEditCreateQuestionCategory" class="form-label">
        Правильный ответ
      </label>
      <select
        id="addModalFormEditCreateQuestionCategory"
        v-model="correct_answer"
        class="form-select"
        :disabled="
          answer1.trim().length === 0 ||
          answer2.trim().length === 0 ||
          answer3.trim().length === 0 ||
          answer4.trim().length === 0
        "
        aria-label="Default select example"
      >
        <option :value="answer1">{{ answer1 }}</option>
        <option :value="answer2">{{ answer2 }}</option>
        <option :value="answer3">{{ answer3 }}</option>
        <option :value="answer4">{{ answer4 }}</option>
      </select>
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
