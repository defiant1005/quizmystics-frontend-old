<script>
import stringGeneration from "@/package/helpers/string-generation";

export default {
  name: "HomePage",

  data() {
    return {
      stringGeneration,
    };
  },

  methods: {
    createRoom() {
      const room = this.stringGeneration(4).toUpperCase();
      this.$router.push(room);
    },

    enterRoom() {
      this.$router.push({
        name: "EnterRoom",
      });
    },
  },
};
</script>

<template>
  <div class="home-page">
    <button class="main-button" @click="createRoom">Создать комнату</button>
    <button class="main-button" @click="enterRoom">Войти в комнату</button>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
}
</style>
