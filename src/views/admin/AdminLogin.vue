<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "AdminLogin",

  data() {
    const authStore = useAuthStore();

    return {
      email: "",
      password: "",
      isLoading: false,
      authStore,
    };
  },

  methods: {
    submitForm() {
      if (this.email.trim().length > 5 && this.password.trim().length > 5) {
        this.isLoading = true;

        this.authStore
          .login({
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.replace({
              name: "AdminPageUsers",
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
});
</script>

<template>
  <div class="admin-login">
    <div class="admin-login__login login">
      <span class="icon-logo login__logo" />

      <h2 class="login__title">Вход Душнила</h2>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="adminLoginEmail" class="form-label">Email address</label>
          <input
            id="adminLoginEmail"
            v-model="email"
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
          />
        </div>

        <div class="mb-3">
          <label for="adminLoginPassword" class="form-label">Password</label>
          <input
            id="adminLoginPassword"
            v-model="password"
            type="password"
            class="form-control"
          />
        </div>
        <button type="submit" :disabled="isLoading" class="btn btn-primary">
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 320px;
    height: 415px;
    border-radius: 12px;
    background: #222222;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: white;

    &__logo {
      width: 48px;
      height: 48px;
      background: white;
    }

    &__title {
    }

    //.form {
    //  width: 272px;
    //  display: flex;
    //  flex-direction: column;
    //  gap: 12px;
    //
    //  &__input {
    //    width: 272px;
    //    height: 36px;
    //    padding: 8px 12px;
    //    line-height: 20px;
    //    font-size: 14px;
    //    border: 1px solid rgba(255, 255, 255, 0.16);
    //    background-color: #333333;
    //    border-radius: 8px;
    //    color: white;
    //  }
    //
    //  &__btn {
    //    background: white;
    //    display: flex;
    //    align-items: center;
    //    justify-content: center;
    //    border-radius: 8px;
    //    width: 100%;
    //    font-size: 14px;
    //    padding: 0 16px;
    //    height: 36px;
    //    color: #222222;
    //
    //    &:hover {
    //      background: #f3f3f3;
    //    }
    //
    //    &:active {
    //      background: #e3e3e3;
    //    }
    //  }
    //}
  }
}
</style>
