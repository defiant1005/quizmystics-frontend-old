<script lang="ts">
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import { socket, state } from "@/socket";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import UserCard from "@/components/UserCard.vue";
import MainButton from "@/package/components/MainButton.vue";
import { defineComponent } from "vue";
import { IPlayers, IPlayersEditData } from "@/intefaces/IGame";
import EditUserDrawer from "@/components/game/main-room/EditUserDrawer.vue";
import ChangeAvatarModal from "@/components/game/main-room/ChangeAvatarModal.vue";
import { ICbData } from "@/intefaces/IMain";

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

      isCopyRoom: false,
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

    isStartDisabled() {
      return !!this.usersList.find((item: IPlayers) => !item.isReady);
    },
  },

  methods: {
    startGame() {
      if (this.isStartDisabled) {
        return;
      }

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

      //@ts-ignore
      this.$refs.mainRoomEditUserDrawer.changeAvatar(avatar);
      this.isModalOpen = false;
    },

    saveUserDataHandler(userData: IPlayersEditData) {
      if (this.currentUser === null) {
        console.error("Неожиданное поведение");
        return;
      }

      this.currentUser.name = userData.name;
      this.currentUser.stats = userData.stats;
      this.currentUser.avatar = userData.avatar;
      this.currentUser.isReady = true;

      socket.emit("changeUserData", this.currentUser, (cbData: ICbData) => {
        if (cbData.error) {
          console.error(cbData?.message);
        } else {
          this.closeDrawerHandler();
        }
      });
    },
  },
});
</script>

<template>
  <div class="main-room">
    <div class="main-room__main main">
      <p>
        Комната номер
        <MainButtonIcon
          v-clipboard:copy="currentRoom"
          class="main__copy-btn"
          :class="{ 'main__copy-btn_active': isCopyRoom }"
          @click="isCopyRoom = true"
        >
          {{ currentRoom }}
          <span :class="!isCopyRoom ? 'icon-copy' : 'icon-check'" />
        </MainButtonIcon>
      </p>

      <div class="main__users users">
        <UserCard
          v-for="(user, index) in usersList"
          :key="index"
          :user="user"
          :disabled="id !== user.userId"
          @openDrawer="openDrawerHandler"
        />
      </div>
    </div>

    <MainButton
      v-if="isRoomAdmin"
      class="main-room__start-game"
      label="Начать"
      color="green"
      :disabled="isStartDisabled"
      @click="startGame"
    />
  </div>

  <EditUserDrawer
    ref="mainRoomEditUserDrawer"
    :user="currentUser"
    :is-drawer-open="isDrawerOpen"
    @close="closeDrawerHandler"
    @openAvatarModal="isModalOpen = true"
    @saveUserData="saveUserDataHandler"
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
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > p {
      color: $black;
      @include text-2;
      text-align: center;
    }

    &__copy-btn {
      width: fit-content;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color 0.1s ease-out;
      color: $black;
      @include text-2;

      &_active {
        color: $green;

        > span {
          transition: background 0.1s ease-out;
          background: $green !important;
        }
      }

      > span {
        width: 18px;
        height: 18px;
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

  &__start-game {
    flex: 0 0 auto;
  }
}
</style>
