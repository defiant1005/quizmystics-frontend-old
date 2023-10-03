<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers, magicSpellType } from "@/intefaces/IGame";
import {
  chanceDexterity,
  chanceDexterityStringPercent,
} from "@/package/helpers/chance-dexterity";
import MagicUsageDrawer from "@/components/game/game-page/magic-usage/MagicUsageDrawer.vue";
//@ts-ignore
import { socket } from "@/socket";
import { useMainStore } from "@/stores/main";
import MagicAnimation from "@/components/game/game-page/magic-usage/MagicAnimation.vue";

export default defineComponent({
  name: "MagicUsage",

  components: { MagicAnimation, MagicUsageDrawer },

  emits: ["animationEnd"],

  props: {
    currentUser: {
      type: Object as PropType<IPlayers>,
      required: true,
    },

    userList: {
      type: Array as PropType<Array<IPlayers>>,
      default: () => [],
    },
  },

  data() {
    const mainStore = useMainStore();

    return {
      mainStore,
      chanceDexterity,
      chanceDexterityStringPercent,
      choiceUserId: "",
      spellsButtonsDisabled: false,
      isDrawerDisabled: false,

      progress: 0,
      timer: 10,

      isShowDrawer: false,

      isShowSpellAnimation: false,
    };
  },

  computed: {
    progressPercent() {
      return (this.progress * 100) / this.timer;
    },

    answerTimeSec() {
      return this.timer + "s";
    },

    userListWithoutMe() {
      return this.userList.filter(
        (user) => user.userId !== this.currentUser.userId
      );
    },

    dexterityPercent() {
      return this.chanceDexterityStringPercent(
        this.chanceDexterity(this.currentUser!.stats!.dexterity)
      );
    },
  },

  methods: {
    startProgress() {
      this.progress += 1;
      if (this.progress <= this.timer) {
        setTimeout(() => {
          this.startProgress();
        }, 1000);
      } else {
        this.isShowSpellAnimation = true;
      }
    },

    choiceUser(userId: string) {
      this.choiceUserId = userId;
      this.isShowDrawer = true;
    },

    setSpellHandler(spell: magicSpellType) {
      this.spellsButtonsDisabled = true;
      const normalize = {
        userId: this.currentUser.userId,
        victim: this.choiceUserId,
        spell: spell,
        room: this.currentUser.room,
      };

      socket.emit("magicUsage", normalize, (data: string | undefined) => {
        if (typeof data === "string") {
          this.mainStore.createNotification({
            type: "danger",
            description: data,
          });
        }
      });

      this.isDrawerDisabled = true;

      this.isShowDrawer = false;
    },

    animationEndHandler() {
      this.$emit("animationEnd");
    },
  },

  mounted() {
    this.startProgress();
  },
});
</script>

<template>
  <div class="magic-usage">
    <template v-if="!isShowSpellAnimation">
      <h2>Ваш уровень магии: {{ currentUser!.stats!.magic }}</h2>
      <h2>Ваш уровень зашиты от магии: {{ dexterityPercent }}</h2>

      <p>У вас есть время заколдовать противника:</p>

      <div
        class="progress"
        role="progressbar"
        aria-label="Info example"
        :aria-valuenow="progressPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="progress-bar bg-info" />
      </div>

      <div class="magic-usage__user-list user-list">
        <div
          v-for="user in userListWithoutMe"
          :key="user.userId"
          class="user-list__user user"
          :class="{ user_active: choiceUserId === user.userId }"
          @click="choiceUser(user.userId)"
        >
          <img :src="user.avatar" alt="ava" />

          <p>{{ user.name }}</p>
        </div>
      </div>
    </template>

    <MagicAnimation
      v-else
      :user-list="userList"
      @animationEnd="animationEndHandler"
    />
  </div>

  <MagicUsageDrawer
    :is-drawer-open="isShowDrawer"
    :magic-level="currentUser!.stats!.magic"
    :disabled="spellsButtonsDisabled"
    :drawer-disabled="isDrawerDisabled"
    :spells="currentUser!.spellList"
    @setSpell="setSpellHandler"
    @close="isShowDrawer = !isShowDrawer"
  />
</template>

<style lang="scss" scoped>
.magic-usage {
  width: 100%;
  padding: 30px;

  > h2 {
    @include h-4;
  }

  .progress {
    margin-bottom: 20px;

    .progress-bar {
      width: 0;
      animation: change-width v-bind(answerTimeSec) ease-in;
    }
  }

  .user-list {
    .user {
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      &:hover {
        > p {
          color: $pink;
        }
      }

      &_active {
        > p {
          color: $blue !important;
        }
      }

      > img {
        width: 50px;
        height: 50px;
      }

      > p {
        @include text-2;
      }
    }
  }
}

@keyframes change-width {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
</style>
