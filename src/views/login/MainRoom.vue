<script>
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";

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
    }),

    currentRoom() {
      return this.$route.params.id;
    },
  },
};
</script>

<template>
  <div class="main-room">
    <p>Комната номер {{ currentRoom }}</p>
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
