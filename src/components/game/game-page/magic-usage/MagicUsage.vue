<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers, magicSpellType } from "@/intefaces/IGame";
import {
  chanceDexterity,
  chanceDexterityStringPercent,
} from "@/package/helpers/chance-dexterity";
import MagicUsageDrawer from "@/components/game/game-page/magic-usage/MagicUsageDrawer.vue";

export default defineComponent({
  name: "MagicUsage",
  components: { MagicUsageDrawer },

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
    return {
      chanceDexterity,
      chanceDexterityStringPercent,
      choiceUserId: "",
      spellsButtonsDisabled: false,

      isShowDrawer: false,
    };
  },

  computed: {
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
      };
      console.log(normalize);
    },
  },
});
</script>

<template>
  <div class="magic-usage">
    <h2>Ваш уровень магии: {{ currentUser!.stats!.magic }}</h2>
    <h2>Ваш уровень зашиты от магии: {{ dexterityPercent }}</h2>

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
  </div>

  <MagicUsageDrawer
    :is-drawer-open="isShowDrawer"
    :magic-level="currentUser!.stats!.magic"
    :disabled="spellsButtonsDisabled"
    :spells="currentUser!.spellList"
    @setSpell="setSpellHandler"
  />
</template>

<style lang="scss" scoped>
.magic-usage {
  > h2 {
    @include h-4;
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
</style>
