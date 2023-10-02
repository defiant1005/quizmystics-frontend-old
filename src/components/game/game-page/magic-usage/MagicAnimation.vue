<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers, magicSpellType } from "@/intefaces/IGame";
import { testUserData } from "@/package/constants/test-user-data";
import spellColor from "@/package/helpers/spell-color";

export default defineComponent({
  name: "MagicAnimation",

  props: {
    userList: {
      type: Array as PropType<Array<IPlayers>>,
      default: () => [],
    },
  },

  data() {
    return {
      testUserList: testUserData,

      spellTime: 5,

      testValueChild: 1,

      userInfoDelaysList: [] as Array<number>,
      whoDelaysList: [] as Array<number>,

      isLoadingPage: false,

      timer: 0,
    };
  },

  computed: {
    spellTimeSec() {
      return this.spellTime + "s";
    },

    curseLength() {
      return this.testUserList.reduce((sum: number, user: IPlayers) => {
        return sum + user.curse.length;
      }, 0);
    },
  },

  methods: {
    getUser(userId: string) {
      return this.testUserList.find((user) => user.userId === userId);
    },

    setUserInfoStyle(index: number, curseLength: number) {
      return {
        "animation-delay": `${this.userInfoDelaysList[index]}s`,
        "animation-duration": `${curseLength * this.spellTime + "s"}`,
      };
    },

    setWhoStyle(index: number, userInfoIndex: number) {
      let delay = 0;

      for (let i = 0; i < userInfoIndex; i++) {
        delay += this.testUserList[i].curse.length;
      }

      return {
        "animation-delay": `${
          delay * this.spellTime + this.spellTime * index
        }s`,
      };
    },

    setSpellStyle(index: number, userInfoIndex: number, spell: magicSpellType) {
      let delay = 0;

      for (let i = 0; i < userInfoIndex; i++) {
        delay += this.testUserList[i].curse.length;
      }

      return {
        "animation-delay": `${
          delay * this.spellTime + this.spellTime * index
        }s`,

        background: spellColor(spell),
      };
    },

    setDelayList() {
      let count = 0;

      this.testUserList.forEach((user) => {
        this.userInfoDelaysList.push(count * this.spellTime);
        count += user.curse.length;
      });

      let curseCount = 0;

      for (let i = 0; i < this.curseLength; i++) {
        this.whoDelaysList.push(curseCount);
        curseCount += this.spellTime;
      }
    },

    startTimer() {
      this.timer += 1;

      if (this.timer < 50) {
        setTimeout(() => {
          this.startTimer();
        }, 1000);
      }
    },
  },

  mounted() {
    this.isLoadingPage = true;
    this.setDelayList();
    this.isLoadingPage = false;

    this.startTimer();
  },
});
</script>

<template>
  <div v-if="!isLoadingPage" class="magic-animation">
    {{ timer }}
    <div
      v-for="(user, userInfoIndex) in testUserList"
      :key="user.userId"
      :style="setUserInfoStyle(userInfoIndex, user.curse.length)"
      class="magic-animation__user-info user-info"
    >
      <div class="user-info__who-list who-list">
        <div
          v-for="(who, index) in user.curse"
          :key="index"
          :style="setWhoStyle(index, userInfoIndex)"
          class="who-list__who who"
        >
          <div
            class="who__spell spell"
            :style="setSpellStyle(index, userInfoIndex, who.spell)"
          />

          <img :src="getUser(who.who)?.avatar" alt="ava" />
          <p>{{ getUser(who.who)?.name }}</p>
          <p>{{ who.spell }}</p>
        </div>
      </div>

      <div class="user-info__user user">
        <img :src="user.avatar" alt="ava" />
        <p>{{ user.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.magic-animation {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  position: relative;
  height: 100%;

  .user-info {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    opacity: 0;
    animation: start-animation ease-in;

    .user {
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translate(-50%, 0);
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      justify-content: center;
      border: 1px solid $black;
      border-radius: 50%;

      > img {
        width: 40px;
        height: 40px;
      }

      > p {
        text-align: center;
        width: 100%;
        color: $black;
        @include text-2;
        margin-bottom: 0;
      }
    }

    .who-list {
      display: flex;
      gap: 8px;

      .who {
        width: 100px;
        height: 100px;
        animation: start-animation v-bind(spellTimeSec) ease-in;
        opacity: 0;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translate(-50%, 0);
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        justify-content: center;
        border: 1px solid $black;
        border-radius: 50%;

        .spell {
          position: fixed;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          z-index: -1;
          left: 50%;
          transform: translate(-50%, 0);
          top: 10px;
          background: rgba(255, 0, 0, 0.1);
          animation: spell-animation v-bind(spellTimeSec) ease-in;
        }

        > img {
          width: 40px;
          height: 40px;
        }

        > p {
          color: $black;
          @include text-2;
          margin-bottom: 0;
        }
      }
    }
  }
}

@keyframes start-animation {
  0% {
    opacity: 1;
  }

  99% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes spell-animation {
  0% {
    top: 10px;
  }

  96% {
    top: calc(100vh - 120px);
  }

  100% {
    top: calc(100vh - 120px);
  }
}
</style>
