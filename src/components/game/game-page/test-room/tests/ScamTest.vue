<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers } from "@/intefaces/IGame";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import {
  chanceLuck,
  chanceLuckStringPercent,
} from "@/package/helpers/chance-luck";
import MainButton from "@/package/components/MainButton.vue";
//@ts-ignore
import { socket } from "@/socket";
import delay from "@/package/helpers/delay";

export default defineComponent({
  name: "ScamTest",
  components: { MainButton },
  emits: ["finishTest"],

  props: {
    usersList: {
      type: Array as PropType<Array<IPlayers>>,
      required: true,
    },

    victimUsers: {
      type: Array as PropType<Array<IPlayers>>,
      required: true,
    },
  },

  data() {
    return {
      chanceLuck,
      chanceLuckStringPercent,

      isButtonsDisabled: false,
      selectedNumber: null as null | number,
      winningNumbers: [] as Array<number>,
      isWin: null as null | boolean,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      myId: "id",
      room: "room",
    }),

    isUserReadOnly() {
      return this.victimUsers.find((user) => user.userId === this.myId) ?? null;
    },

    victimUsersName() {
      return this.victimUsers[0]?.name ?? "";
    },

    luckPercent() {
      if (this.isUserReadOnly !== null) {
        return this.chanceLuckStringPercent(
          this.chanceLuck(this.isUserReadOnly!.stats!.luck)
        );
      } else {
        return 0;
      }
    },
  },

  methods: {
    delay,

    choiceNumber(num: number) {
      this.isButtonsDisabled = true;

      const normalize = {
        userId: this.myId,
        room: this.room,
        number: num,
      };

      socket.emit("scamTest", normalize);
    },
  },

  created() {
    socket.on(
      "checkScamTest",
      async (data: {
        win: boolean;
        selectedNumber: number;
        winningNumbers: Array<number>;
      }) => {
        this.selectedNumber = data.selectedNumber;
        await delay(2000);
        this.isWin = data.win;
        await delay(2000);
        this.winningNumbers = data.winningNumbers;
      }
    );

    socket.on("finishScamTest", () => {
      this.$emit("finishTest");
    });
  },
});
</script>

<template>
  <div class="scam-test">
    <h2>Добро пожаловать в испытание Лохотрон</h2>

    <div class="scam-test__header">
      <h2 v-if="isUserReadOnly === null">
        Ждем пока {{ victimUsersName }} пройдет испытание на удачу
      </h2>

      <template v-else>
        <h2>Ваш уровень удачи: {{ luckPercent }}</h2>
        <p>Выберите цифру:</p>
      </template>
    </div>

    <div class="scam-test__test test">
      <div class="test__game game">
        <MainButton
          v-for="item in 100"
          :key="item"
          class="game__item"
          :class="[
            { game__item_active: selectedNumber === item },
            {
              game__item_good:
                (winningNumbers.includes(item) && winningNumbers.length > 0) ||
                (item === selectedNumber && isWin !== null && isWin),
            },
            {
              game__item_bad:
                item === selectedNumber && isWin !== null && !isWin,
            },
          ]"
          :disabled="isButtonsDisabled || isUserReadOnly === null"
          color="green"
          :label="item.toString()"
          @click="choiceNumber(item)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scam-test {
  width: 100%;
  height: 100dvh;
  padding: 30px;
  color: $black;
  display: grid;
  grid-template-rows: fit-content(50px) fit-content(50px) 1fr;
  gap: 8px;

  > h2 {
    @include h-1;
  }

  &__header {
    > h2 {
      @include h-4;
      margin: 0;
    }

    > p {
      @include text-1;
      margin: 0;
    }
  }

  .test {
    display: grid;
    height: 100%;
    grid-template-rows: 1fr;
    gap: 12px;
    overflow-y: scroll;

    .game {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 20px;
      overflow-y: scroll;
      @include yellow-scroll;
      padding: 8px;

      &__item {
        width: 50px;
        height: 50px;

        &_active {
          background: $blue-800;
        }

        &_good {
          background: $green;
        }

        &_bad {
          background: $red;
        }
      }
    }
  }
}
</style>
