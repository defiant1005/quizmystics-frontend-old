<script lang="ts">
import { defineComponent } from "vue";
import { state } from "@/socket";
import { useGameStore } from "@/stores/game.store";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  name: "PlayersProgress",

  data() {
    const gameStore = useGameStore();

    return {
      gameStore,
      numbers_animation: false,
    };
  },

  computed: {
    ...mapState(useGameStore, {
      userCount: "userCount",
    }),

    ...mapState(useUserStore, {
      userId: "id",
    }),

    usersList() {
      return state.usersList;
    },
  },

  methods: {
    counter(id: string, start: number, end: number, duration: number) {
      const obj: any = document.getElementById(id);
      let current = start;
      const range = end - start;
      const increment = end > start ? 1 : -1;
      const step = Math.abs(Math.floor(duration / range));
      const timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, step);
    },
  },

  mounted() {
    // setTimeout(() => {
    //   const user = this.usersList.find((user) => user.userId === this.userId);
    //
    //   this.numbers_animation = true;
    //   this.counter("count1", this.userCount, user.count, 2200);
    //
    //   this.gameStore.setCount(user.count);
    // }, 1000);

    setTimeout(() => {
      this.numbers_animation = true;

      this.usersList.forEach((user: any, index: any) => {
        this.counter(index.toString(), user.oldCount, user.count, 2200);

        this.gameStore.setCount(user.count);
      });
    }, 1000);
  },
});
</script>

<template>
  <div class="players-progress">
    <div
      v-for="(user, index) in usersList"
      :key="user.userId"
      class="players-progress__users users"
    >
      <p :id="index.toString()">0</p>
      <p>{{ user.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.players-progress {
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 255, 0.6);
  display: flex;
  padding: 30px;
  flex-wrap: wrap;
  gap: 20px;

  .users {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(26, 115, 232, 0.2);
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;

    > p {
      font-size: 22px;

      &:nth-child(1) {
        color: white;
      }
    }
  }
}
</style>
