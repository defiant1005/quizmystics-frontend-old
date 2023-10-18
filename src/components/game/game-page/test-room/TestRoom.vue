<script lang="ts">
import { defineComponent } from "vue";
//@ts-ignore
import { state, socket } from "@/socket";
import { IPlayers, testsTypes } from "@/intefaces/IGame";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import ArenaTest from "@/components/game/game-page/test-room/tests/ArenaTest.vue";
import MoneyTest from "@/components/game/game-page/test-room/tests/MoneyTest.vue";
import ScamTest from "@/components/game/game-page/test-room/tests/ScamTest.vue";
import FightClubTest from "@/components/game/game-page/test-room/tests/FightClubTest.vue";
import BowlsTest from "@/components/game/game-page/test-room/tests/BowlsTest.vue";
import MathematicsTest from "@/components/game/game-page/test-room/tests/MathematicsTest.vue";
import AverageNumberTest from "@/components/game/game-page/test-room/tests/AverageNumberTest.vue";
import DragonTreasureTest from "@/components/game/game-page/test-room/tests/DragonTreasureTest.vue";
import CubeTest from "@/components/game/game-page/test-room/tests/CubeTest.vue";
import ScalesTest from "@/components/game/game-page/test-room/tests/ScalesTest.vue";
import VictimTest from "@/components/game/game-page/test-room/tests/VictimTest.vue";

export default defineComponent({
  name: "TestRoom",

  components: {
    VictimTest,
    ScalesTest,
    CubeTest,
    DragonTreasureTest,
    AverageNumberTest,
    MathematicsTest,
    BowlsTest,
    FightClubTest,
    ScamTest,
    MoneyTest,
    ArenaTest,
  },

  emits: ["finishTest"],

  data() {
    return {
      currentTest: "scam" as testsTypes,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      room: "room",
      myId: "id",
    }),

    isPlayerAdmin() {
      return (
        this.usersList.find((user: IPlayers) => user.userId === this.myId)
          ?.isRoomAdmin ?? false
      );
    },

    usersList() {
      return state.usersList.filter((player: IPlayers) => {
        return player.stats?.health !== 0;
      });
    },

    currentTest2() {
      return state.currentTest;
    },

    victimUsers() {
      return this.usersList.filter(
        (user: IPlayers) => user.count < user.oldCount
      );
    },
  },

  methods: {
    finishTestHandler() {
      this.$emit("finishTest");
    },
  },

  mounted() {
    if (this.isPlayerAdmin) {
      const normalize = {
        count: this.victimUsers.length,
        allUsersCount: this.usersList.length,
        room: this.room,
      };
      socket.emit("getTestRoom", normalize);
    }
  },
});
</script>

<template>
  <div class="test-room">
    <template v-if="currentTest === 'scam'">
      <ScamTest
        :users-list="usersList"
        :victim-users="victimUsers"
        @finishTest="finishTestHandler"
      />
    </template>

    <template v-else-if="currentTest === 'money'">
      <MoneyTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'arena'">
      <ArenaTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'fight'">
      <FightClubTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'bowls'">
      <BowlsTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'math'">
      <MathematicsTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'average'">
      <AverageNumberTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'dragon'">
      <DragonTreasureTest
        :users-list="usersList"
        :victim-users="victimUsers"
        @finishTest="finishTestHandler"
      />
    </template>

    <template v-else-if="currentTest === 'cube'">
      <CubeTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'scales'">
      <ScalesTest :users-list="usersList" :victim-users="victimUsers" />
    </template>

    <template v-else-if="currentTest === 'victim'">
      <VictimTest :users-list="usersList" :victim-users="victimUsers" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.test-room {
  width: 100%;
  height: 100%;
}
</style>
