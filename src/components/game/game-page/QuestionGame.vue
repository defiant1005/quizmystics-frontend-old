<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CheckAnswerResponseType, IQuestion } from "@/intefaces/IGame";
import { useGameStore } from "@/stores/game.store";
import MainButton from "@/package/components/MainButton.vue";

export default defineComponent({
  name: "QuestionGame",
  components: { MainButton },

  emits: ["choiceAnswer", "setAnswer"],

  props: {
    question: {
      type: Object as PropType<IQuestion>,
      required: true,
    },

    activeAnswer: {
      type: String,
      default: "",
    },
  },

  data() {
    const gameStore = useGameStore();

    return {
      gameStore,
      progress: 0,
      answerTime: 4,
      isCorrectAnswer: null as null | CheckAnswerResponseType,
    };
  },

  computed: {
    progressPercent() {
      return (this.progress * 100) / this.answerTime;
    },

    answerTimeSec() {
      return this.answerTime + "s";
    },
  },

  methods: {
    startProgress() {
      this.progress += 1;
      if (this.progress <= this.answerTime) {
        setTimeout(() => {
          this.startProgress();
        }, 1000);
      } else {
        this.gameStore
          .checkCorrectAnswer({
            questionId: this.question.id,
            answer: this.activeAnswer,
          })
          .then((res: any) => {
            this.isCorrectAnswer = res.data.message;
          })
          .finally(() => {
            setTimeout(() => {
              this.$emit("setAnswer");
            }, 1000);
          });
      }
    },
  },

  mounted() {
    this.startProgress();
  },
});
</script>

<template>
  <div class="question-game">
    <div class="question-game__header header">
      <h3 class="header__title">{{ question.title }}</h3>

      <div
        class="progress"
        role="progressbar"
        aria-label="Info example"
        :aria-valuenow="progressPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="progress-bar bg-info" />
      </div>
    </div>

    <div class="question-game__answer answer">
      <MainButton
        class="answer__item"
        color="green"
        :label="question.answer1"
        :class="[
          { answer__item_active: activeAnswer === question.answer1 },
          {
            answer__item_good:
              activeAnswer === question.answer1 && isCorrectAnswer === 'good',
          },
          {
            answer__item_bad:
              activeAnswer === question.answer1 && isCorrectAnswer === 'bad',
          },
        ]"
        @click="$emit('choiceAnswer', question.answer1)"
      />

      <MainButton
        :label="question.answer2"
        color="green"
        class="answer__item"
        :class="[
          { answer__item_active: activeAnswer === question.answer2 },
          {
            answer__item_good:
              activeAnswer === question.answer2 && isCorrectAnswer === 'good',
          },
          {
            answer__item_bad:
              activeAnswer === question.answer2 && isCorrectAnswer === 'bad',
          },
        ]"
        @click="$emit('choiceAnswer', question.answer2)"
      />

      <MainButton
        :label="question.answer3"
        color="green"
        class="answer__item"
        :class="[
          { answer__item_active: activeAnswer === question.answer3 },
          {
            answer__item_good:
              activeAnswer === question.answer3 && isCorrectAnswer === 'good',
          },
          {
            answer__item_bad:
              activeAnswer === question.answer3 && isCorrectAnswer === 'bad',
          },
        ]"
        @click="$emit('choiceAnswer', question.answer3)"
      />

      <MainButton
        :label="question.answer4"
        color="green"
        class="answer__item"
        :class="[
          { answer__item_active: activeAnswer === question.answer4 },
          {
            answer__item_good:
              activeAnswer === question.answer4 && isCorrectAnswer === 'good',
          },
          {
            answer__item_bad:
              activeAnswer === question.answer4 && isCorrectAnswer === 'bad',
          },
        ]"
        @click="$emit('choiceAnswer', question.answer4)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-game {
  width: 100%;
  height: fit-content;
  padding: 30px;
  display: grid;
  grid-template-rows: fit-content(20px) 1fr;
  gap: 60px;
  justify-content: center;

  .header {
    &__title {
      text-align: center;
      margin-bottom: 20px;
      @include h-1;
    }

    .progress {
      .progress-bar {
        width: 0;
        animation: change-width v-bind(answerTimeSec) ease-in;
      }
    }
  }

  .answer {
    height: fit-content;
    display: grid;
    grid-template-columns: 600px 600px;
    grid-template-rows: 200px 200px;
    gap: 40px;
    align-items: center;
    justify-content: center;

    &__item {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transition: background 0.2s ease;
      padding: 10px;
      @include h-4;

      &_active {
        background: $blue !important;
      }

      &_good {
        background: $green-800 !important;
      }

      &_bad {
        background: $red !important;
      }
    }
  }
}

@media (max-width: 1439px) {
  .question-game {
    .answer {
      grid-template-columns: 450px 450px;
      grid-template-rows: 180px 180px;
      gap: 30px;
    }
  }
}

@media (max-width: 1023px) {
  .question-game {
    .answer {
      grid-template-columns: 350px 350px;
      grid-template-rows: 150px 150px;
      gap: 25px;
    }
  }
}

@media (max-width: 886px) {
  .question-game {
    height: 100%;
    gap: 40px;

    .answer {
      height: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      gap: 20px;
    }
  }
}

@media (max-width: 468px) {
  .question-game {
    gap: 30px;
  }
}

@keyframes change-width {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
</style>
