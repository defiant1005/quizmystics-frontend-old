<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CheckAnswerResponseType, IQuestion } from "@/intefaces/IGame";
import { useGameStore } from "@/stores/game.store";

export default defineComponent({
  name: "QuestionGame",

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
    <h3 class="question-game__title">{{ question.title }}</h3>

    <div
      class="progress"
      role="progressbar"
      aria-label="Info example"
      :aria-valuenow="progressPercent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-bar bg-info"></div>
    </div>

    <div class="question-game__answer answer">
      <button
        class="answer__item"
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
      >
        {{ question.answer1 }}
      </button>
      <button
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
      >
        {{ question.answer2 }}
      </button>
      <button
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
      >
        {{ question.answer3 }}
      </button>
      <button
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
      >
        {{ question.answer4 }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-game {
  width: 100%;
  min-height: 400px;
  background: wheat;
  padding: 30px;

  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  .progress {
    margin-bottom: 30px;

    .progress-bar {
      width: 0;
      animation: change-width v-bind(answerTimeSec) ease-in;
    }
  }

  .answer {
    width: 100%;
    display: grid;
    align-items: center;
    justify-content: center;

    gap: 20px;
    grid-template-columns: 400px 400px;

    &__item {
      width: 100%;
      height: 100px;
      border-radius: 10px;
      background: #5bf131;
      transition: background 0.2s ease;
      padding: 10px;

      &:hover {
        background: #3fec0f;
      }

      &_active {
        background: #1a73e8 !important;
      }

      &_good {
        background: #29b600 !important;
      }

      &_bad {
        background: #910808 !important;
      }
    }
  }
}

@media (max-width: 886px) {
  .question-game {
    .answer {
      grid-template-columns: 400px;
    }
  }
}

@media (max-width: 468px) {
  .question-game {
    .answer {
      grid-template-columns: auto;
    }
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
