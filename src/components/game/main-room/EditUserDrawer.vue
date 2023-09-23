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
  dexterity_description,
  health_description,
  intelligence_description,
  magic_description,
  power_description,
} from "@/package/stats-description";

export default defineComponent({
  name: "EditUserDrawer",

  components: {
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
      dexterity_description,

      userName: "",
      nameErrorMessage: "",
      lvlErrorMessage: "",

      health: 1,
      power: 1,
      magic: 1,
      intelligence: 1,
      dexterity: 1,

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
        this.dexterity
      );
    },

    isMaxDisabled() {
      return this.remainsLvl === 0;
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

      if (this.userName.trim() === "") {
        this.nameErrorMessage = "Имя не может быть пустым";
        return;
      } else if (!this.isMaxDisabled) {
        this.lvlErrorMessage = "Распределите все уровни";
      } else {
        const normalize = {
          name: this.userName,
          health: this.health,
          power: this.power,
          magic: this.magic,
          intelligence: this.intelligence,
          dexterity: this.dexterity,
        };

        this.$emit("saveUserData", normalize);
      }
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
        <img :src="user.avatar" alt="ava" />
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
          Ловкость

          <MainPopper :content="dexterity_description">
            <MainButtonIcon class="stats__btn-info">
              <span class="icon-info"></span>
            </MainButtonIcon>
          </MainPopper>
        </p>

        <MainCounter
          v-model:count="dexterity"
          :max-value="5"
          :min-value="1"
          :max-disabled="isMaxDisabled"
        />
      </div>

      <MainButton type="submit" label="Сохранить" />
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
}
</style>
