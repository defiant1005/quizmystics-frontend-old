<script>
export default {
  name: "LoginLayout",
};
</script>

<template>
  <div class="login-layout">
    <h1>Добро пожаловать в игру!</h1>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.login-layout {
  width: 100%;
  height: 100%;
  background: rgba(74, 26, 194, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
</style>
