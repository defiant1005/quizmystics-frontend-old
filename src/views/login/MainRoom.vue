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

      connected() {
        return state.connected;
      },

      messages() {
        return state.messages;
      },

      usersList() {
        return state.usersList;
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

    <div class="main-room__users users">
      <UserAvatar
        v-for="(user, index) in usersList"
        :key="index"
        :name="user"
      />
    </div>

    <div class="">
      <template v-for="(message, index) in messages" :key="index">
        <p>{{ message.data.message }}</p>
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

  .users {
    display: flex;
    gap: 12px;
  }
}
</style>
