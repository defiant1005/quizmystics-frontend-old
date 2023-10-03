<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  CheckAnswerResponseType,
  IQuestion,
  magicSpellType,
} from "@/intefaces/IGame";
import { useGameStore } from "@/stores/game.store";
import MainButton from "@/package/components/MainButton.vue";
import {
  getRandomNumber,
  getRandomNumbers,
} from "@/package/helpers/random-numbers";

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

    curse: {
      type: Array as PropType<Array<magicSpellType>>,
      default: () => [],
    },
  },

  data() {
    const gameStore = useGameStore();

    return {
      getRandomNumbers,
      getRandomNumber,
      gameStore,
      progress: 0,
      answerTime: 10,
      isCorrectAnswer: null as null | CheckAnswerResponseType,
      randomNumbers: [] as Array<number>,
      randomValues: [] as Array<string>,
      hiddenAnswer: null as null | number,
      isLoadingPage: false,
      isSecretRiddle: false,
      isSilenceWisdom: false,
      isAntagonisticRiddle: false,

      coldCharmAnswer1: 0,
      coldCharmAnswer2: 0,
      coldCharmAnswer3: 0,
      coldCharmAnswer4: 0,
    };
  },

  computed: {
    progressPercent() {
      return (this.progress * 100) / this.answerTime;
    },

    answerTimeSec() {
      return this.answerTime + "s";
    },

    firstAnswer() {
      return this.randomNumbers[0];
    },

    secondAnswer() {
      return this.randomNumbers[1];
    },

    thirdAnswer() {
      return this.randomNumbers[2];
    },

    fourthAnswer() {
      return this.randomNumbers[3];
    },
  },

  watch: {
    isSilenceWisdom(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.isSilenceWisdom = false;
        }, (this.answerTime * 1000) / 1.5);
      }
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
              this.finishQuestion();

              setTimeout(() => {
                // this.$emit("setAnswer");
              }, 2000);
            }, 1000);
          });
      }
    },

    startColdCharm() {
      this.coldCharmAnswer1 = 5;
      this.coldCharmAnswer2 = 5;
      this.coldCharmAnswer3 = 5;
      this.coldCharmAnswer4 = 5;
    },

    startSecretException() {
      this.hiddenAnswer = this.getRandomNumber(this.randomNumbers);
    },

    startSilenceWisdom() {
      this.isSilenceWisdom = true;
    },

    startSecretRiddle() {
      this.isSecretRiddle = true;
    },

    startAntagonisticRiddle() {
      this.isAntagonisticRiddle = true;
      this.randomValues = this.getRandomNumbers([
        this.question.answer1,
        this.question.answer2,
        this.question.answer3,
        this.question.answer4,
      ]);
    },

    finishQuestion() {
      this.hiddenAnswer = null;
      this.isLoadingPage = false;
      this.isSecretRiddle = false;
      this.isSilenceWisdom = false;
      this.isAntagonisticRiddle = false;

      this.coldCharmAnswer1 = 0;
      this.coldCharmAnswer2 = 0;
      this.coldCharmAnswer3 = 0;
      this.coldCharmAnswer4 = 0;
    },
  },

  mounted() {
    this.isLoadingPage = true;
    this.startProgress();

    this.randomNumbers = this.getRandomNumbers([0, 1, 2, 3]);

    if (this.curse.find((curse) => curse === "secretException")) {
      this.startSecretException();
    }

    if (this.curse.find((curse) => curse === "coldCharm")) {
      this.startColdCharm();
    }

    if (this.curse.find((curse) => curse === "silenceWisdom")) {
      this.startSilenceWisdom();
    }

    if (this.curse.find((curse) => curse === "secretRiddle")) {
      this.startSecretRiddle();
    }

    if (this.curse.find((curse) => curse === "antagonisticRiddle")) {
      this.startAntagonisticRiddle();
    }

    setTimeout(() => {
      this.isLoadingPage = false;
    }, 100);
  },
});
</script>

<template>
  <div v-if="!isLoadingPage" class="question-game">
    <div class="question-game__header header">
      <h3
        class="header__title"
        :class="{ header__title_hidden: isSecretRiddle }"
      >
        {{ question.title }}
      </h3>

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

    <div v-if="!isSilenceWisdom" class="question-game__answer answer">
      <MainButton
        v-if="coldCharmAnswer1 === 0"
        class="answer__item"
        color="green"
        :label="!isAntagonisticRiddle ? question.answer1 : randomValues[0]"
        :class="[
          { answer__item_active: activeAnswer === question.answer1 },
          { answer__hidden: hiddenAnswer === 0 },
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
        v-else
        class="answer__item"
        :label="`Разморозка (${coldCharmAnswer1})`"
        @click="coldCharmAnswer1--"
      />

      <MainButton
        v-if="coldCharmAnswer2 === 0"
        :label="!isAntagonisticRiddle ? question.answer2 : randomValues[1]"
        color="green"
        class="answer__item"
        :class="[
          { answer__item_active: activeAnswer === question.answer2 },
          { answer__hidden: hiddenAnswer === 1 },
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
        v-else
        class="answer__item"
        :label="`Разморозка (${coldCharmAnswer2})`"
        @click="coldCharmAnswer2--"
      />

      <MainButton
        v-if="coldCharmAnswer3 === 0"
        :label="!isAntagonisticRiddle ? question.answer3 : randomValues[2]"
        color="green"
        class="answer__item"
        :class="[
          { answer__item_active: activeAnswer === question.answer3 },
          { answer__hidden: hiddenAnswer === 2 },
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
        v-else
        class="answer__item"
        :label="`Разморозка (${coldCharmAnswer3})`"
        @click="coldCharmAnswer3--"
      />

      <MainButton
        v-if="coldCharmAnswer4 === 0"
        :label="!isAntagonisticRiddle ? question.answer4 : randomValues[3]"
        color="green"
        class="answer__item"
        :class="[
          { answer__item_active: activeAnswer === question.answer4 },
          { answer__hidden: hiddenAnswer === 3 },
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

      <MainButton
        v-else
        class="answer__item"
        :label="`Разморозка (${coldCharmAnswer4})`"
        @click="coldCharmAnswer4--"
      />
    </div>

    <span v-else class="icon-loading" />
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

      &_hidden {
        opacity: 0 !important;
      }
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

      &:nth-child(1) {
        order: v-bind(firstAnswer);
      }

      &:nth-child(2) {
        order: v-bind(secondAnswer);
      }

      &:nth-child(3) {
        order: v-bind(thirdAnswer);
      }

      &:nth-child(4) {
        order: v-bind(fourthAnswer);
      }

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

    &__hidden {
      opacity: 0 !important;
    }
  }

  .icon-loading {
    width: 24px;
    height: 24px;
    background: $yellow;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
