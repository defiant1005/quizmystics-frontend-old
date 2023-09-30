<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers } from "@/intefaces/IGame";
import { testUserData } from "@/package/constants/test-user-data";

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

      spellTime: 10,

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
          <p>{{ getUser(who.who)?.name }}</p>
          <img :src="getUser(who.who)?.avatar" alt="ava" />
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

    //position: absolute;
    //top: 0;
    //left: 100%;
    //transform: translate(-100%, 0);

    .user {
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

    .who-list {
      display: flex;
      gap: 8px;

      .who {
        animation: start-animation v-bind(spellTimeSec) ease-in;
        opacity: 0;

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
</style>
