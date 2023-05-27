<template>
  <button @click="connect()">Connect</button>
  <button @click="disconnect()">Disconnect</button>
</template>

<script>
import { socket_old } from "@/socket_old";

export default {
  name: "ConnectionManager",

  methods: {
    connect() {
      socket_old.connect();
    },
    disconnect() {
      socket_old.disconnect();
    },
  },
};
</script>
