<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import QuestionGame from "@/components/game/QuestionGame.vue";
import { useGameStore } from "@/stores/game.store";
import { useUserStore } from "@/stores/user";
import PlayersProgress from "@/components/game/PlayersProgress.vue";
import { socket, state } from "@/socket";

export default defineComponent({
  name: "GamePage",

  components: { PlayersProgress, QuestionGame },

  data() {
    return {
      timer: 5,
      choiceAnswer: "",
    };
  },

  computed: {
    ...mapState(useGameStore, {
      question: "question",
    }),

    ...mapState(useUserStore, {
      userId: "id",
      room: "room",
    }),

    isShowProgress() {
      return state.isShowProgress;
    },

    isFinishGame() {
      return state.finishGame;
    },
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
      if (this.question?.id && this.userId) {
        const answerData = {
          id: this.question.id,
          answer: this.choiceAnswer,
          userId: this.userId,
          room: this.room,
        };

        socket.emit("changeUserCount", answerData, (error: string) => {
          this.choiceAnswer = "";

          if (error) {
            console.error(error);
          }
        });
      }
    },

    nextQuestionHandler() {
      state.isShowProgress = !state.isShowProgress;
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

    <div
      v-else-if="question && !isShowProgress && !isFinishGame"
      class="game-page__game game"
    >
      <QuestionGame
        :question="question"
        :active-answer="choiceAnswer"
        @choiceAnswer="choiceAnswerHandler"
        @setAnswer="setAnswerHandler"
      />
    </div>

    <div v-else class="game-page__progress progress">
      <PlayersProgress
        :is-finish-game="isFinishGame"
        @nextQuestion="nextQuestionHandler"
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

  .progress {
    width: 100%;
    height: 100%;
  }
}
</style>
