<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GamePage",

  data() {
    return {
      timer: 5,
    };
  },

  methods: {
    startTimer() {
      this.timer--;

      if (this.timer > -1) {
        setTimeout(() => {
          this.startTimer();
        }, 1000);
      }
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

    <div class="game-page__game game"></div>
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
