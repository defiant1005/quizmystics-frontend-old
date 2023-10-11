<script lang="ts">
import { defineComponent, PropType } from "vue";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
//@ts-ignore
import { socket } from "@/socket";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import { IPlayers } from "@/intefaces/IGame";

type chestType = "closed" | "win" | "lose";
export default defineComponent({
  name: "DragonTreasureTest",
  components: { MainButtonIcon },

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
      chest1: "closed" as chestType,
      chest2: "closed" as chestType,
      choiceTreasure: null as null | number,
      isBtnDisabled: false,
    };
  },

  computed: {
    isUserReadOnly() {
      return !this.victimUsers.find((user) => user.userId === this.myId);
    },

    disabled() {
      return this.isBtnDisabled || this.isUserReadOnly;
    },

    ...mapState(useUserStore, {
      myId: "id",
      room: "room",
    }),
  },

  methods: {
    checkChest(checkNumber: number) {
      this.isBtnDisabled = true;
      this.choiceTreasure = checkNumber;
      const normalize = {
        treasureCount: checkNumber,
        room: this.room,
      };
      socket.emit("dragonTest", normalize);
    },
  },

  created() {
    socket.on("finishDragonTest", (isWin: { win: boolean }) => {
      if (this.choiceTreasure === 1) {
        if (isWin.win) {
          this.chest1 = "win";
        } else {
          this.chest1 = "lose";
        }
      } else {
        if (isWin.win) {
          this.chest2 = "win";
        } else {
          this.chest2 = "lose";
        }
      }
    });
  },
});
</script>

<template>
  <div class="dragon-treasure-test">
    <h2>Подземелье дракона</h2>
    <p v-if="!isUserReadOnly">Выбери сундук</p>
    <p v-else>Ждем пока {{ victimUsers[0].name }} выберет сундук</p>
    <div class="dragon-treasure-test__chest-container chest-container">
      <MainButtonIcon
        class="chest-container__btn btn"
        @click="checkChest(1)"
        :is-disable="disabled"
      >
        <Transition name="chest-animation" mode="out-in">
          <img
            v-if="chest1 === 'closed'"
            src="@/assets/icons/chest/closed-chest.svg"
            alt="chest"
          />

          <img
            v-else-if="chest1 === 'win'"
            src="@/assets/icons/chest/win-chest.svg"
            alt="chest"
          />

          <img
            v-else-if="chest1 === 'lose'"
            src="@/assets/icons/chest/lose-chest.svg"
            alt="chest"
          />
        </Transition>
      </MainButtonIcon>

      <MainButtonIcon @click="checkChest(2)" :is-disable="disabled">
        <Transition name="chest-animation" mode="out-in">
          <img
            v-if="chest2 === 'closed'"
            src="@/assets/icons/chest/closed-chest.svg"
            alt="chest"
          />

          <img
            v-else-if="chest2 === 'win'"
            src="@/assets/icons/chest/win-chest.svg"
            alt="chest"
          />

          <img
            v-else-if="chest2 === 'lose'"
            src="@/assets/icons/chest/lose-chest.svg"
            alt="chest"
          />
        </Transition>
      </MainButtonIcon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dragon-treasure-test {
  width: 100%;
  height: 100%;
  padding: 30px;
  background: $yellow-800;

  > h2 {
    text-align: center;
    @include h-1;
    color: $black;
  }

  > p {
    margin-top: 20px;
    text-align: center;
    @include h-4;
    color: $black;
  }

  .chest-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .btn {
      > img {
        width: 100px;
        height: 100px;
      }

      &:disabled {
        opacity: 1;
      }
    }
  }
}

.chest-animation-enter-active,
.chest-animation-leave-active {
  transition: all 1s;
}
.chest-animation-enter,
.chest-animation-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
