<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { Modal } from "bootstrap";
import MainModal from "@/package/components/MainModal.vue";
import MainTable from "@/package/components/MainTable.vue";
import { useQuestionsStore } from "@/stores/admin/questions.store";
import AdminModalFormCreateQuestion from "@/components/admin/questions/AdminModalFormCreateQuestion.vue";
import AdminModalFormEditQuestion from "@/components/admin/questions/AdminModalFormEditQuestion.vue";

export default defineComponent({
  name: "AdminPageQuestions",

  components: {
    AdminModalFormEditQuestion,
    AdminModalFormCreateQuestion,
    MainTable,
    MainModal,
  },

  data() {
    const questionsStore = useQuestionsStore();
    return {
      questionsStore,
      editQuestionId: null as null | number,
    };
  },

  computed: {
    ...mapState(useQuestionsStore, {
      questions: "questions",
      tableHeader: "tableHeader",
    }),
  },

  methods: {
    deleteEntityHandler(id) {
      this.questionsStore.deleteQuestion(id).then(() => {
        this.questionsStore.getQuestions();
      });
    },

    editEntityHandler(id: number) {
      this.editQuestionId = id;
      const myModal = new Modal(document.getElementById("editQuestion"));
      myModal.show();
    },

    closeModalHandler() {
      const myModal = new Modal(document.getElementById("createQuestion"));
      myModal.toggle();
    },
  },
});
</script>

<template>
  <div class="admin-page-users container mt-5">
    <MainTable
      :table-header="tableHeader"
      :table-data="questions"
      @deleteEntity="deleteEntityHandler"
      @editEntity="editEntityHandler"
    />

    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#createQuestion"
    >
      Создать вопрос
    </button>

    <MainModal :id-value="'createQuestion'" :title="'Создать вопрос'">
      <AdminModalFormCreateQuestion @closeModal="closeModalHandler" />
    </MainModal>

    <MainModal :title="'Редактировать вопрос'" :id-value="'editQuestion'">
      <AdminModalFormEditQuestion :edit-question-id="editQuestionId" />
    </MainModal>
  </div>
</template>

<style lang="scss" scoped>
.admin-page-questions {
}
</style>
