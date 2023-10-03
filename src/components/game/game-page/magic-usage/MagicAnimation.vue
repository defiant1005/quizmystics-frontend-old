<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers, magicSpellType } from "@/intefaces/IGame";
import { spellColor, spellName } from "@/package/helpers/spells";

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
      spellTime: 5,

      testValueChild: 1,

      userInfoDelaysList: [] as Array<number>,
      whoDelaysList: [] as Array<number>,

      isLoadingPage: false,

      userAnimation: 1,
    };
  },

  computed: {
    spellTimeSec() {
      return this.spellTime + "s";
    },

    curseLength() {
      return this.userList.reduce((sum: number, user: IPlayers) => {
        return sum + user.curse.length;
      }, 0);
    },
  },

  methods: {
    spellName,

    getUser(userId: string) {
      return this.userList.find((user) => user.userId === userId);
    },

    setUserInfoStyle(index: number, curseLength: number) {
      return {
        "animation-delay": `${this.userInfoDelaysList[index]}s`,
        "animation-duration": `${curseLength * this.spellTime + "s"}`,
      };
    },

    setUserStyle(index: number, user: IPlayers) {
      return {
        "animation-delay": `${this.userInfoDelaysList[index]}s`,
        "animation-duration": `${user.curse.length * this.spellTime + "s"}`,
      };
    },

    setWhoStyle(index: number, userInfoIndex: number) {
      let delay = 0;

      for (let i = 0; i < userInfoIndex; i++) {
        delay += this.userList[i].curse.length;
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
        delay += this.userList[i].curse.length;
      }

      return {
        "animation-delay": `${
          delay * this.spellTime + this.spellTime * index
        }s`,

        background: spellColor(spell),
      };
    },

    setSpellNameStyle(index: number, userInfoIndex: number) {
      let delay = 0;

      for (let i = 0; i < userInfoIndex; i++) {
        delay += this.userList[i].curse.length;
      }

      return {
        "animation-delay": `${
          delay * this.spellTime + this.spellTime * index
        }s`,
      };
    },

    setDelayList() {
      let count = 0;

      this.userList.forEach((user) => {
        this.userInfoDelaysList.push(count * this.spellTime);
        count += user.curse.length;
      });

      let curseCount = 0;

      for (let i = 0; i < this.curseLength; i++) {
        this.whoDelaysList.push(curseCount);
        curseCount += this.spellTime;
      }
    },
  },

  mounted() {
    this.isLoadingPage = true;
    this.setDelayList();
    this.isLoadingPage = false;
  },
});
</script>

<template>
  <div v-if="!isLoadingPage" class="magic-animation">
    <div
      v-for="(user, userInfoIndex) in userList"
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
          >
            <p
              class="spell__miss"
              :style="setSpellNameStyle(index, userInfoIndex)"
            >
              {{ who.evaded ? "miss" : "" }}
            </p>
          </div>

          <p
            class="spell__name"
            :style="setSpellNameStyle(index, userInfoIndex)"
          >
            {{ spellName(who.spell) }}
          </p>

          <img :src="getUser(who.who)?.avatar" alt="ava" />
          <p>{{ getUser(who.who)?.name }}</p>
        </div>
      </div>

      <div
        class="user-info__user user"
        :style="setUserStyle(userInfoIndex, user)"
      >
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
      position: fixed;
      left: 150%;
      bottom: 10px;
      transform: translate(-50%, 0);
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      justify-content: center;
      border: 1px solid $black;
      border-radius: 50%;
      background: $white;
      animation: user-animation ease-in;

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
        animation: who-animation v-bind(spellTimeSec) ease-in;
        opacity: 0;
        position: fixed;
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
        background: $white;

        .spell {
          position: fixed;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          z-index: -1;
          left: 50%;
          transform: translate(-50%, 0);
          opacity: 0;
          top: 0;
          animation: spell-animation v-bind(spellTimeSec) ease-in;

          &__name {
            opacity: 0;
            position: fixed;
            top: calc(50vh);
            left: 50%;
            transform: translate(-50%, -50%);
            animation: spell-name-animation v-bind(spellTimeSec) ease-in;
            margin: 0;
            @include text-2;
            color: $black;
            text-align: center;
          }

          &__miss {
            animation: spell-miss-animation v-bind(spellTimeSec) ease-in;
            position: fixed;
            z-index: 99;
            left: 30vw;
            color: $red;
            @include text-1;
          }
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

@keyframes who-animation {
  0% {
    opacity: 0;
    left: 150%;
  }

  5% {
    opacity: 1;
  }

  10% {
    left: 150%;
  }

  20% {
    left: 50%;
  }

  80% {
    left: 50%;
  }

  90% {
    left: 150%;
  }

  99% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    left: 150%;
  }
}

@keyframes spell-animation {
  0% {
    opacity: 0;
    top: 0;
  }

  30% {
    opacity: 1;
    top: 0;
  }

  40% {
    top: 0;
  }

  60% {
    top: calc(100vh - 120px);
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  100% {
    top: calc(100vh - 120px);
  }
}

@keyframes spell-name-animation {
  0% {
    opacity: 0;
    top: calc(50vh);
    left: 50%;
  }

  20% {
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes spell-miss-animation {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 0;
  }

  60% {
    opacity: 0;
  }

  70% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes user-animation {
  0% {
    left: 150%;
  }

  5% {
    left: 50%;
  }

  90% {
    left: 50%;
  }

  100% {
    left: 150%;
  }
}
</style>
