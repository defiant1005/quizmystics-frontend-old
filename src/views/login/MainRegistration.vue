<script lang="ts">
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";
import MainInput from "@/package/components/MainInput.vue";
import MainButton from "@/package/components/MainButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainRegistration",
  components: { MainButton, MainInput },

  data() {
    const userStore = useUserStore();

    return {
      userStore,
      name: "",
    };
  },

  computed: {
    ...mapState(useUserStore, {
      saveNameValue: "name",
    }),
  },

  methods: {
    saveName() {
      this.userStore.renameName(this.name);
      this.$router.push({
        name: "HomePage",
      });
    },
  },

  mounted() {
    if (this.saveNameValue) {
      this.name = this.saveNameValue;
    }
  },
});
</script>

<template>
  <div class="main-registration">
    <form class="main-registration__form" @submit.prevent="saveName">
      <MainInput
        v-model="name"
        :maxlength="12"
        placeholder="Введите ваше имя"
        left-icon="user"
      />

      <MainButton
        type="submit"
        :disabled="name.trim().length === 0"
        label="Сохранить"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.main-registration {
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 420px) {
  .main-registration {
    width: 100%;
  }
}
</style>
