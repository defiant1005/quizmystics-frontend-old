<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IQuestion } from "@/intefaces/IGame";

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
      required: false,
    },
  },

  data() {
    return {
      progress: 0,
      answerTime: 30,
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
        this.$emit("setAnswer");
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
        :class="{ answer__item_active: activeAnswer === question.answer1 }"
        @click="$emit('choiceAnswer', question.answer1)"
      >
        {{ question.answer1 }}
      </button>
      <button
        class="answer__item"
        :class="{ answer__item_active: activeAnswer === question.answer2 }"
        @click="$emit('choiceAnswer', question.answer2)"
      >
        {{ question.answer2 }}
      </button>
      <button
        class="answer__item"
        :class="{ answer__item_active: activeAnswer === question.answer3 }"
        @click="$emit('choiceAnswer', question.answer3)"
      >
        {{ question.answer3 }}
      </button>
      <button
        class="answer__item"
        :class="{ answer__item_active: activeAnswer === question.answer4 }"
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
  height: 400px;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    &__item {
      width: 400px;
      height: 100px;
      border-radius: 10px;
      background: #5bf131;
      transition: background 0.2s ease;

      &:hover {
        background: #3fec0f;
      }

      &_active {
        background: #1a73e8 !important;
      }
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
