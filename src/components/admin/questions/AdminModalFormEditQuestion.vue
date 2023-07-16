<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapState } from "pinia";
import { useQuestionsStore } from "@/stores/admin/questions.store";

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

    return {
      questionStore,
      isLoading: false,
      title: "",
    };
  },

  computed: {
    ...mapState(useQuestionsStore, {
      questions: "questions",
    }),

    currentQuestion() {
      return this.questions.find((user) => user.id === this.editQuestionId);
    },
  },

  watch: {
    currentQuestion: {
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
    editQuestion() {
      this.isLoading = true;
      this.questionStore
        .editQuestion(this.editQuestionId, {
          title: this.title,
        })
        .then(() => {
          this.title = "";
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
      <label for="AdminModalFormQuestionTitle" class="form-label">ПОЛЕ 1</label>
      <input
        id="AdminModalFormQuestionTitle"
        v-model="title"
        type="text"
        class="form-control"
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
