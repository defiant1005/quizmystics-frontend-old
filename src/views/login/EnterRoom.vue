<script>
import { socket } from "@/socket";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import { useMainStore } from "@/stores/main";

export default {
  name: "EnterRoom",

  data() {
    const userStore = useUserStore();
    const mainStore = useMainStore();

    return {
      userStore,
      mainStore,
      room: "",
    };
  },

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",
    }),
  },

  methods: {
    goRoom() {
      const userData = {
        name: this.saveNameValue,
        room: this.room,
      };

      socket.connect();

      socket.emit("connectingExistingRoom", userData, (data) => {
        if (typeof data === "string") {
          this.mainStore.createNotification({
            type: "danger",
            description: data,
          });
        } else {
          this.userStore.saveId(data.userId);
          this.$router.push(this.room);
        }
      });
    },

    checkUpperCase() {
      this.room = this.room.toUpperCase();
    },
  },
};
</script>

<template>
  <form class="enter-room" @submit.prevent="goRoom">
    <input
      v-model="room"
      class="main-input"
      placeholder="Номер комнаты"
      maxlength="4"
      @input="checkUpperCase"
    />
    <button type="submit" class="main-button" :disabled="room.length !== 4">
      Войти
    </button>
  </form>
</template>

<style lang="scss" scoped>
.enter-room {
  width: 400px;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
}
</style>
