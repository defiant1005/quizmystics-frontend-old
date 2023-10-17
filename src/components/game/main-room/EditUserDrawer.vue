<script lang="ts">
import { defineComponent, PropType } from "vue";
import MainInput from "@/package/components/MainInput.vue";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";
import MainButton from "@/package/components/MainButton.vue";
import AppDrawer from "@/package/components/AppDrawer.vue";
import { IPlayers } from "@/intefaces/IGame";
import MainCounter from "@/package/components/MainCounter.vue";
import MainPopper from "@/package/components/MainPopper.vue";
import {
  luck_description,
  health_description,
  intelligence_description,
  magic_description,
  power_description,
} from "@/package/stats-description";
import MainTextarea from "@/package/components/MainTextarea.vue";

export default defineComponent({
  name: "EditUserDrawer",

  components: {
    MainTextarea,
    MainPopper,
    MainCounter,
    AppDrawer,
    MainButton,
    MainButtonIcon,
    MainInput,
  },

  emits: ["close", "openAvatarModal", "saveUserData"],

  props: {
    isDrawerOpen: {
      type: Boolean,
      default: false,
    },

    user: {
      type: [Object, null] as PropType<IPlayers | null>,
      required: true,
    },
  },

  data() {
    return {
      health_description,
      power_description,
      magic_description,
      intelligence_description,
      luck_description,

      userName: "",
      nameErrorMessage: "",
      lvlErrorMessage: "",

      winningQuote: "",
      winningQuoteErrorMessage: "",

      health: 1,
      power: 1,
      magic: 1,
      intelligence: 1,
      luck: 1,

      //изменяется из родителя
      avatar: null as null | string,

      startLvl: 15,
    };
  },

  computed: {
    remainsLvl() {
      return (
        this.startLvl -
        this.health -
        this.power -
        this.magic -
        this.intelligence -
        this.luck
      );
    },

    isMaxDisabled() {
      return this.remainsLvl === 0;
    },

    userAvatar() {
      return this.avatar ?? this.user?.avatar;
    },
  },

  watch: {
    isDrawerOpen(newValue) {
      if (newValue && this.user) {
        this.userName = this.user.name;
      }
    },
  },

  methods: {
    submitEdit() {
      this.nameErrorMessage = "";
      this.lvlErrorMessage = "";
      this.winningQuoteErrorMessage = "";

      if (this.userName.trim() === "") {
        this.nameErrorMessage = "Имя не может быть пустым";
        return;
      } else if (!this.isMaxDisabled) {
        this.lvlErrorMessage = "Распределите все уровни";
      } else if (this.winningQuote.trim() === "") {
        this.winningQuoteErrorMessage = "Победителей не судят";
      } else {
        const normalize = {
          name: this.userName,
          avatar: this.avatar ?? this.user?.avatar,
          winningQuote: this.winningQuote,
          stats: {
            health: this.health,
            power: this.power,
            magic: this.magic,
            intelligence: this.intelligence,
            luck: this.luck,
          },
        };

        this.$emit("saveUserData", normalize);
      }
    },

    changeAvatar(avatar: string) {
      this.avatar = avatar;
    },
  },
});
</script>

<template>
  <AppDrawer
    :is-open="isDrawerOpen"
    title="Редактирование"
    @close="$emit('close')"
  >
    <form v-if="user" class="edit-user-form" @submit.prevent="submitEdit">
      <MainButtonIcon
        class="edit-user-form__ava-btn"
        @click="$emit('openAvatarModal')"
      >
        <img :src="userAvatar" alt="ava" />
      </MainButtonIcon>

      <MainInput
        v-model="userName"
        :maxlength="12"
        placeholder="Введите ваше имя"
        left-icon="user"
        :error-message="nameErrorMessage"
      />

      <h4>Распределите 15 уровней (осталось {{ remainsLvl }}):</h4>

      <span v-if="lvlErrorMessage" class="edit-user-form__lvl-error-message">
        {{ lvlErrorMessage }}
      </span>

      <div class="edit-user-form__stats stats">
        <p>
          Здоровье

          <MainPopper :content="health_description">
            <MainButtonIcon class="stats__btn-info">
              <span class="icon-info"></span>
            </MainButtonIcon>
          </MainPopper>
        </p>

        <MainCounter
          v-model:count="health"
          :max-value="5"
          :min-value="1"
          :max-disabled="isMaxDisabled"
        />
      </div>

      <div class="edit-user-form__stats stats">
        <p>
          Сила

          <MainPopper :content="power_description">
            <MainButtonIcon class="stats__btn-info">
              <span class="icon-info"></span>
            </MainButtonIcon>
          </MainPopper>
        </p>

        <MainCounter
          v-model:count="power"
          :max-value="5"
          :min-value="1"
          :max-disabled="isMaxDisabled"
        />
      </div>

      <div class="edit-user-form__stats stats">
        <p>
          Магия

          <MainPopper :content="magic_description">
            <MainButtonIcon class="stats__btn-info">
              <span class="icon-info"></span>
            </MainButtonIcon>
          </MainPopper>
        </p>

        <MainCounter
          v-model:count="magic"
          :max-value="5"
          :min-value="1"
          :max-disabled="isMaxDisabled"
        />
      </div>

      <div class="edit-user-form__stats stats">
        <p>
          Интеллект

          <MainPopper :content="intelligence_description">
            <MainButtonIcon class="stats__btn-info">
              <span class="icon-info"></span>
            </MainButtonIcon>
          </MainPopper>
        </p>

        <MainCounter
          v-model:count="intelligence"
          :max-value="5"
          :min-value="1"
          :max-disabled="isMaxDisabled"
        />
      </div>

      <div class="edit-user-form__stats stats">
        <p>
          Удача

          <MainPopper :content="luck_description">
            <MainButtonIcon class="stats__btn-info">
              <span class="icon-info"></span>
            </MainButtonIcon>
          </MainPopper>
        </p>

        <MainCounter
          v-model:count="luck"
          :max-value="5"
          :min-value="1"
          :max-disabled="isMaxDisabled"
        />
      </div>

      <MainTextarea
        v-model="winningQuote"
        :maxlength="150"
        placeholder="Победная цитата"
        class="edit-user-form__winning-quote"
        :error-message="winningQuoteErrorMessage"
      />

      <MainButton
        type="submit"
        label="Сохранить"
        class="edit-user-form__submit"
      />
    </form>
  </AppDrawer>
</template>

<style lang="scss" scoped>
.edit-user-form {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

  &__ava-btn {
    width: 100px;
    height: 100px;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  > h4 {
    @include h-4;
    color: $black;
  }

  &__lvl-error-message {
    color: $red;
    @include text-2;
  }

  .stats {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > p {
      position: relative;
      @include h-4;
      color: $black;
      margin: 0;
    }

    &__btn-info {
      position: relative;
      left: 0;
      top: 0;

      .icon-info {
        width: 16px;
        height: 16px;
        background: $black;
      }
    }
  }

  &__winning-quote {
    margin-bottom: 20px;
  }

  &__submit {
    margin-bottom: 4px;
  }
}
</style>
