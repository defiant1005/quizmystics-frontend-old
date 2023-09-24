import { reactive } from "vue";
import { io } from "socket.io-client";
import router from "@/router/index.ts";
import { BASE_URL } from "@/package/services/axios-settings.ts";
import { useGameStore } from "@/stores/game.store.ts";

export const state = reactive({
  connected: false,
  usersList: [],
  startGame: false,
  isShowProgress: false,
  nextQuestion: null,
  finishGame: false,
});

export const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
  state.startGame = false;
});

socket.on("updateUserList", ({ data }) => {
  state.usersList = data.users;
});

socket.on("finishQuestion", async ({ data }) => {
  const gameStore = useGameStore();
  state.isShowProgress = true;
  state.usersList = data.users;
  await gameStore.getOneQuestion(data.nextQuestion);
});

socket.on("startGame", async ({ room, questionId }) => {
  const gameStore = useGameStore();
  await gameStore.getOneQuestion(questionId);

  if (!state.startGame) {
    state.startGame = true;

    if (room) {
      await router.push({
        path: `game/room/${room}`,
      });
    }
  }
});

socket.on("finishGame", async ({ data }) => {
  state.usersList = data.users;
  state.finishGame = true;

  console.log(data);
});
