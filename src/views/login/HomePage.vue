<script>
import stringGeneration from "@/package/helpers/string-generation";
import { socket } from "@/socket";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import { useMainStore } from "@/stores/main";
import MainButton from "@/package/components/MainButton.vue";
import { getRandomAvatar } from "@/package/helpers/all-avatars-list";

export default {
  name: "HomePage",
  components: { MainButton },

  data() {
    const userStore = useUserStore();
    const mainStore = useMainStore();

    return {
      userStore,
      mainStore,
      stringGeneration,
      isSubmitDisabled: false,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",
    }),
  },

  methods: {
    createRoom() {
      this.isSubmitDisabled = true;
      const room = this.stringGeneration(4).toUpperCase();
      this.userStore.setRoom(room);

      const userData = {
        name: this.saveNameValue,
        room: room,
        avatar: getRandomAvatar(),
        isReady: false,
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

        this.isSubmitDisabled = false;
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
    <MainButton
      label="Создать комнату"
      :disabled="isSubmitDisabled"
      @click="createRoom"
    />

    <MainButton label="Войти в комнату" @click="enterRoom" />
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

@media (max-width: 420px) {
  .home-page {
    width: 100%;
  }
}
</style>
