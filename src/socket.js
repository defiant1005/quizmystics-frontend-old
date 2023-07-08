import { reactive } from "vue";
import { io } from "socket.io-client";
import router from "@/router/index.ts";

export const state = reactive({
  connected: false,
  messages: [],
  usersList: [],
  startGame: false,
});

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "http://192.168.0.101:3000/";

export const socket = io(URL, {
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

socket.on("hello", (arg) => {
  console.log(arg);
});

socket.on("updateUserList", ({ data }) => {
  state.usersList = data.users;
});

socket.on("startGame", ({ data }) => {
  state.startGame = true;

  router.push({
    path: `game/room/${data.room}`,
  });

  console.log("начало игры...");
});
