<script>
import stringGeneration from "@/package/helpers/string-generation";
import { socket } from "@/socket";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import { useMainStore } from "@/stores/main";

export default {
  name: "HomePage",

  data() {
    const userStore = useUserStore();
    const mainStore = useMainStore();

    return {
      userStore,
      mainStore,
      stringGeneration,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",
    }),
  },

  methods: {
    createRoom() {
      const room = this.stringGeneration(4).toUpperCase();
      this.userStore.setRoom(room);

      const userData = {
        name: this.saveNameValue,
        room: room,
      };

      socket.connect();

      socket.emit("createRoom", userData, (data) => {
        if (typeof data === "string") {
          this.mainStore.createNotification({
            type: "danger",
            description: data,
          });
        } else {
          this.userStore.saveId(data.userId);
          this.$router.push(room);
        }
      });
    },

    enterRoom() {
      this.$router.push({
        name: "EnterRoom",
      });
    },
  },
};
</script>

<template>
  <div class="home-page">
    <button class="main-button" @click="createRoom">Создать комнату</button>
    <button class="main-button" @click="enterRoom">Войти в комнату</button>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
}
</style>
