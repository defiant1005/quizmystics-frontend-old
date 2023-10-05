<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapState } from "pinia";
import { useQuestionsStore } from "@/stores/admin/questions.store";
import { useCategoriesStore } from "@/stores/admin/categories.store";
import { useMainStore } from "@/stores/main";

export default defineComponent({
  name: "AdminModalFormEditQuestion",

  props: {
    editQuestionId: {
      type: [null, Number] as PropType<null | number>,
      required: true,
    },
  },

  data() {
    const questionStore = useQuestionsStore();
    const mainStore = useMainStore();

    return {
      questionStore,
      mainStore,
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
    ...mapState(useQuestionsStore, {
      questions: "questions",
    }),

    ...mapState(useCategoriesStore, {
      categories: "categories",
    }),

    currentQuestion() {
      return this.questions.find((user) => user.id === this.editQuestionId);
    },

    checkCorrectAnswer() {
      return (
        this.correct_answer === this.answer1 ||
        this.correct_answer === this.answer2 ||
        this.correct_answer === this.answer3 ||
        this.correct_answer === this.answer4
      );
    },
  },

  watch: {
    currentQuestion: {
      handler(newValue) {
        if (newValue) {
          //@ts-ignore
          this.categoryId = newValue.categoryId;
          //@ts-ignore
          this.title = newValue.title;
          //@ts-ignore
          this.answer1 = newValue.answer1;
          //@ts-ignore
          this.answer2 = newValue.answer2;
          //@ts-ignore
          this.answer3 = newValue.answer3;
          //@ts-ignore
          this.answer4 = newValue.answer4;
          //@ts-ignore
          this.correct_answer = newValue.correct_answer;
        }
      },

      deep: true,
    },
  },

  methods: {
    editQuestion() {
      if (!this.checkCorrectAnswer) {
        return this.mainStore.createNotification({
          type: "danger",
          description: "Проверьте правильный ответ",
        });
      }

      this.isLoading = true;
      this.questionStore
        .editQuestion(this.editQuestionId, {
          categoryId: +this.categoryId,
          title: this.title,
          answer1: this.answer1,
          answer2: this.answer2,
          answer3: this.answer3,
          answer4: this.answer4,
          correct_answer: this.correct_answer,
        })
        .then(() => {
          this.categoryId = "";
          this.title = "";
          this.answer1 = "";
          this.answer2 = "";
          this.answer3 = "";
          this.answer4 = "";
          this.correct_answer = "";
          this.questionStore.getQuestions();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<template>
  <form @submit.prevent="editQuestion">
    <div class="mb-3">
      <label for="addModalFormEditQuestionCategory" class="form-label">
        Категория
      </label>
      <select
        id="addModalFormEditQuestionCategory"
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
      <label for="addModalFormEditQuestionCategory" class="form-label">
        Правильный ответ
      </label>
      <select
        id="addModalFormEditQuestionCategory"
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
        categoryId === '' ||
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
