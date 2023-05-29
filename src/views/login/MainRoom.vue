<script>
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import { socket, state } from "@/socket";

export default {
  name: "MainRoom",

  data() {
    const userStore = useUserStore();

    return {
      userStore,
      name: "",
      isNameExist: false,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",

      connected() {
        return state.connected;
      },

      messages() {
        return state.messages;
      },
    }),

    currentRoom() {
      return this.$route.params.id;
    },
  },

  unmounted() {
    socket.disconnect();
  },
};
</script>

<template>
  <div class="main-room">
    <p>Комната номер {{ currentRoom }}</p>

    <div class="">
      <template v-for="(message, index) in messages" :key="index">
        <p>{{ message.text }}</p>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-room {
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
}
</style>
