<script>
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import { socket, state } from "@/socket";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "MainRoom",

  components: { UserAvatar },

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
      userRoom: "room",
      id: "id",

      connected() {
        return state.connected;
      },

      messages() {
        return state.messages;
      },

      usersList() {
        return state.usersList;
      },

      isRoomAdmin() {
        return !!this.usersList.find((user) => user.userId === this.id)
          ?.isRoomAdmin;
      },
    }),

    currentRoom() {
      return this.$route.params.id;
    },
  },

  methods: {
    startGame() {
      const gameData = {
        room: this.userRoom,
        players: this.usersList,
      };

      socket.emit("startGame", gameData);
    },
  },
};
</script>

<template>
  <div class="main-room">
    <p>Комната номер {{ currentRoom }}</p>

    <div class="main-room__users users">
      <UserAvatar
        v-for="(user, index) in usersList"
        :key="index"
        :user="user"
      />
    </div>

    <button
      v-if="isRoomAdmin"
      class="main-button main-button_green"
      @click="startGame"
    >
      Начать
    </button>
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

  .users {
    display: flex;
    gap: 12px;
  }
}
</style>
