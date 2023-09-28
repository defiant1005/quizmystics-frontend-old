<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import QuestionGame from "@/components/game/game-page/QuestionGame.vue";
import { useGameStore } from "@/stores/game.store";
import { useUserStore } from "@/stores/user";
import PlayersProgress from "@/components/game/game-page/PlayersProgress.vue";
//@ts-ignore
import { state, socket } from "@/socket";

import MagicUsage from "@/components/game/game-page/MagicUsage.vue";

export default defineComponent({
  name: "GamePage",

  components: { MagicUsage, PlayersProgress, QuestionGame },

  data() {
    return {
      timer: 5,
      choiceAnswer: "",
      step: 1,
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

    isShowQuestion() {
      return (
        this.question &&
        !this.isShowProgress &&
        !this.isFinishGame &&
        this.step === 2
      );
    },

    isShowTimer() {
      return this.timer > -1 && this.step === 1;
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
      } else {
        console.error("Неожиданное поведение");
      }
    },

    nextQuestionHandler() {
      state.isShowProgress = !state.isShowProgress;
    },
  },

  mounted() {
    this.step = 1;

    setTimeout(() => {
      this.step = 2;
    }, this.timer * 1000);

    setTimeout(() => {
      this.startTimer();
    }, 500);
  },
});
</script>

<template>
  <div class="game-page" :class="{ 'game-page_active': timer > -1 }">
    <div v-if="isShowTimer" class="game-page__timer timer">
      {{ timer }}
    </div>

    <MagicUsage v-else-if="step === 2" />

    <div v-else-if="isShowQuestion" class="game-page__game game">
      <QuestionGame
        :question="question!"
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
  background: $yellow-100;
  transition: all 1s ease;

  &_active {
    background: $blue-100;
  }

  .timer {
    width: 100px;
    height: 100px;
    background: $white;
    color: $blue-100;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }

  .game {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress {
    width: 100%;
    height: 100%;
  }
}
</style>
