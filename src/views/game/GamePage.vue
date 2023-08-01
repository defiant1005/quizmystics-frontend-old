<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useQuestionsStore } from "@/stores/questions.store";
import QuestionGame from "@/components/game/QuestionGame.vue";

export default defineComponent({
  name: "GamePage",
  components: { QuestionGame },

  data() {
    return {
      timer: 5,
      choiceAnswer: "",
    };
  },

  computed: {
    ...mapState(useQuestionsStore, {
      question: "question",
    }),
  },

  methods: {
    choiceAnswerHandler(answer: string) {
      this.choiceAnswer = answer;
    },

    startTimer() {
      this.timer--;

      if (this.timer > -1) {
        setTimeout(() => {
          this.startTimer();
        }, 1000);
      }
    },

    setAnswerHandler() {
      console.log(this.choiceAnswer);
    },
  },

  mounted() {
    setTimeout(() => {
      this.startTimer();
    }, 500);
  },
});
</script>

<template>
  <div class="game-page" :class="{ 'game-page_active': timer > -1 }">
    <div v-if="timer > -1" class="game-page__timer timer">
      {{ timer }}
    </div>

    <div v-else-if="question" class="game-page__game game">
      <QuestionGame
        :question="question"
        :active-answer="choiceAnswer"
        @choiceAnswer="choiceAnswerHandler"
        @setAnswer="setAnswerHandler"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7563bb;
  transition: all 1s ease;

  &_active {
    background: #a994ff;
  }

  .timer {
    width: 100px;
    height: 100px;
    background: #ffffff;
    color: #a994ff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }
}
</style>
