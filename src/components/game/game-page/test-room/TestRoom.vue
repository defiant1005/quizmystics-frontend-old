<script lang="ts">
import { defineComponent, PropType } from "vue";
//@ts-ignore
import { state } from "@/socket";
import { IPlayers } from "@/intefaces/IGame";

export default defineComponent({
  name: "TestRoom",

  props: {
    victimUsers: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },

  computed: {
    usersList() {
      return state.usersList;
    },

    currentVictimUsers() {
      return this.victimUsers.map((id) => {
        return this.usersList.find((user: IPlayers) => user.userId === id);
      });
    },
  },
});
</script>

<template>
  <div class="test-room"></div>
</template>

<style lang="scss" scoped>
.test-room {
}
</style>
