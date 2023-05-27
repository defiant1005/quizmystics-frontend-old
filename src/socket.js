import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "http://192.168.0.101:3000/";

export const socket_old = io(URL, {
  autoConnect: false,
  withCredentials: true,
});

socket_old.on("connect", () => {
  state.connected = true;
});

socket_old.on("disconnect", () => {
  state.connected = false;
});

socket_old.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket_old.on("bar", (...args) => {
  state.barEvents.push(args);
});
