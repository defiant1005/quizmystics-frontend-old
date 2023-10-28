<script lang="ts">
import { defineComponent, PropType } from "vue";
import MainInput from "@/package/components/MainInput.vue";
import MainButton from "@/package/components/MainButton.vue";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import { IPlayers } from "@/intefaces/IGame";
//@ts-ignore
import { socket } from "@/socket";

export default defineComponent({
  name: "AverageNumberTest",
  components: { MainButton, MainInput },

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
      averageNumber: 0,
      isBtnDisabled: false,
      inputDisabled: false,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      room: "room",
      myId: "id",
    }),

    disabledBtn() {
      return this.isBtnDisabled || +this.averageNumber === 0;
    },

    meIsVictim() {
      return this.victimUsers.find((user) => user.userId === this.myId);
    },

    victimUsersName() {
      return this.victimUsers.map((item) => item.name).join(", ");
    },
  },

  methods: {
    choiceAverageNumber() {
      this.inputDisabled = true;
      this.isBtnDisabled = true;
      if (!isNaN(+this.averageNumber)) {
        const normalize: any = {
          userId: this.myId,
          room: this.room,
          averageNumber: +this.averageNumber,
        };

        if (this.meIsVictim?.isRoomAdmin) {
          normalize.usersLength = this.victimUsers.length;
        }
        socket.emit("averageTest", normalize);
      }
    },
  },

  created() {
    socket.on(
      "checkAverageTest",
      (data: { usersAnswers: Array<any>; losePlayers: Array<any> }) => {
        console.log("usersAnswers", data.usersAnswers);
        console.log("losePlayers", data.losePlayers);
      }
    );

    socket.on("finishAverageTest", () => {
      console.log("finishAverageTest");
      // this.$emit("finishTest");
    });
  },
});
</script>

<template>
  <div class="average-number-test">
    <h2>Добро пожаловать в испытание среднего числа</h2>

    <template v-if="!meIsVictim">
      <p>Ждем пока {{ victimUsersName }} пройдут испытание</p>
    </template>

    <template v-else>
      <p>
        Напишите чисто от 1 до 999. Кто напишут самое маленькое и самое большое
        число - лишатся жизни.
      </p>

      <MainInput
        v-model="averageNumber"
        type="tel"
        :disabled="inputDisabled"
        mask="###"
        placeholder="Ваше число"
        left-icon="crosshair"
      />

      <MainButton
        class="submit"
        label="Выбрать"
        :disabled="disabledBtn"
        @click="choiceAverageNumber"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.average-number-test {
  background: $green-800;
  width: 100%;
  height: 100%;
  padding: 12px;

  > h2 {
    @include h-1;
    text-align: center;
    color: $black;
  }

  > p {
    margin-top: 12px;
    @include text-1;
    color: $black;
    text-align: center;
  }

  .submit {
    margin-top: 20px;
  }
}
</style>
