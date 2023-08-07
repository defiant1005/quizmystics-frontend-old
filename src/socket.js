import { reactive } from "vue";
import { io } from "socket.io-client";
import router from "@/router/index.ts";
import { BASE_URL } from "@/package/services/axios-settings.ts";
import { useGameStore } from "@/stores/game.store.ts";

export const state = reactive({
  connected: false,
  messages: [],
  usersList: [],
  startGame: false,
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

socket.on("message", (message) => {
  state.messages.push(message);
});

socket.on("updateUserList", ({ data }) => {
  state.usersList = data.users;
  console.log(state.usersList);
});

socket.on("startGame", async ({ room, questionId }) => {
  const gameStore = useGameStore();
  await gameStore.getOneQuestion(questionId);

  if (!state.startGame) {
    state.startGame = true;

    if (room) {
      router.push({
        path: `game/room/${room}`,
      });
    }
  }
});
