<script>
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import { socket, state } from "@/socket";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import UserCard from "@/components/UserCard.vue";

export default {
  name: "MainRoom",

  components: { UserCard, MainButtonIcon },

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
    <p>
      Комната номер
      <MainButtonIcon
        v-clipboard:copy="currentRoom"
        class="main-room__copy-btn"
      >
        {{ currentRoom }}
        <span class="icon-copy" />
      </MainButtonIcon>
    </p>

    <div class="main-room__users users">
      <UserCard v-for="(user, index) in usersList" :key="index" :user="user" />
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
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;

  &__copy-btn {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: blue;

      > span {
        background: blue;
      }
    }

    > span {
      width: 20px;
      height: 20px;
      background: black;
    }
  }

  .users {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
