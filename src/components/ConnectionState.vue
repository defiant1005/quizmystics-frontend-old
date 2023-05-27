<template>
  <p>State: {{ connected }}</p>
</template>

<script>
import { state } from "@/socket_old";

export default {
  name: "ConnectionState",

  computed: {
    connected() {
      return state.connected;
    },
  },
};
</script>
