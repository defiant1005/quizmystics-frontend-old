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

    checkCorrectAnswer() {
      return (
        this.correct_answer === this.answer1 ||
        this.correct_answer === this.answer2 ||
        this.correct_answer === this.answer3 ||
        this.correct_answer === this.answer4
      );
    },
  },

  methods: {
    setCategory() {
      this.isLoading = true;
      this.questionsStore
        .setQuestion({
          categoryId: +this.categoryId,
          title: this.title.trim(),
          answer1: this.answer1.trim(),
          answer2: this.answer2.trim(),
          answer3: this.answer3.trim(),
          answer4: this.answer4.trim(),
          correct_answer: this.correct_answer.trim(),
        })
        .then(() => {
          this.categoryId = "";
          this.title = "";
          this.answer1 = "";
          this.answer2 = "";
          this.answer3 = "";
          this.answer4 = "";
          this.correct_answer = "";
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
      <label for="addModalFormCreateQuestionCategory" class="form-label">
        Категория
      </label>
      <select
        id="addModalFormCreateQuestionCategory"
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
      <label for="addModalFormCreateQuestionTitle" class="form-label">
        Вопрос
      </label>
      <input
        id="addModalFormCreateQuestionTitle"
        v-model="title"
        type="text"
        :disabled="categoryId === ''"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormCreateQuestionAnswer1" class="form-label">
        Вариант 1
      </label>
      <input
        id="addModalFormCreateQuestionAnswer1"
        v-model="answer1"
        type="text"
        :disabled="categoryId === ''"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormCreateQuestionAnswer2" class="form-label">
        Вариант 2
      </label>
      <input
        id="addModalFormCreateQuestionAnswer2"
        v-model="answer2"
        type="text"
        :disabled="categoryId === ''"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormCreateQuestionAnswer3" class="form-label">
        Вариант 3
      </label>
      <input
        id="addModalFormCreateQuestionAnswer3"
        v-model="answer3"
        :disabled="categoryId === ''"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormCreateQuestionAnswer4" class="form-label">
        Вариант 4
      </label>
      <input
        id="addModalFormCreateQuestionAnswer4"
        v-model="answer4"
        :disabled="categoryId === ''"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="addModalFormCreateQuestionCategory" class="form-label">
        Правильный ответ
      </label>
      <select
        id="addModalFormCreateQuestionCategory"
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
      data-bs-dismiss="modal"
      :disabled="
        isLoading ||
        title.trim() === '' ||
        answer1.trim() === '' ||
        answer2.trim() === '' ||
        answer3.trim() === '' ||
        answer4.trim() === '' ||
        correct_answer.trim() === '' ||
        !checkCorrectAnswer
      "
    >
      Сохранить
    </button>
  </form>
</template>

<style lang="scss" scoped>
.admin-modal-form-user {
}
</style>
