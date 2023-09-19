<script lang="ts">
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import { socket, state } from "@/socket";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import UserCard from "@/components/UserCard.vue";
import MainButton from "@/package/components/MainButton.vue";
import { defineComponent } from "vue";
import { IPlayers } from "@/intefaces/IGame";
import EditUserDrawer from "@/components/game/main-room/EditUserDrawer.vue";
import ChangeAvatarModal from "@/components/game/main-room/ChangeAvatarModal.vue";

export default defineComponent({
  name: "MainRoom",

  components: {
    ChangeAvatarModal,
    EditUserDrawer,
    MainButton,
    UserCard,
    MainButtonIcon,
  },

  data() {
    const userStore = useUserStore();

    return {
      userStore,
      name: "",
      isNameExist: false,

      isDrawerOpen: false,
      isModalOpen: false,

      currentUser: null as null | IPlayers,
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
        //@ts-ignore
        return !!this.usersList.find(
          (user: IPlayers) => user.userId === this.id
        )?.isRoomAdmin;
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

    submitEdit() {
      console.log(123);
    },

    openDrawerHandler(id: string) {
      this.currentUser = this.usersList.find(
        (user: IPlayers) => user.userId === id
      );
      this.isDrawerOpen = true;
    },

    closeDrawerHandler() {
      this.isDrawerOpen = false;
      this.currentUser = null;
    },

    saveAvatarHandler(avatar: string) {
      if (!this.currentUser) {
        console.error("Неожиданное поведение");
        return;
      }

      this.currentUser.avatar = avatar;
      this.isModalOpen = false;
    },
  },
});
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
      <UserCard
        v-for="(user, index) in usersList"
        :key="index"
        :user="user"
        @openDrawer="openDrawerHandler"
      />
    </div>

    <MainButton
      v-if="isRoomAdmin"
      label="Начать"
      color="green"
      @click="startGame"
    />
  </div>

  <EditUserDrawer
    :user="currentUser"
    :is-drawer-open="isDrawerOpen"
    @close="closeDrawerHandler"
    @openAvatarModal="isModalOpen = true"
  />

  <ChangeAvatarModal
    :user-avatar="currentUser?.avatar ?? ''"
    :is-modal-open="isModalOpen"
    @close="isModalOpen = false"
    @saveAvatar="saveAvatarHandler"
  />
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
