<script>
export default {
  name: "EnterRoom",

  data() {
    return {
      room: "",
    };
  },

  methods: {
    goRoom() {
      this.$router.push(this.room);
    },

    checkUpperCase() {
      this.room = this.room.toUpperCase();
    },
  },
};
</script>

<template>
  <form class="enter-room" @submit.prevent="goRoom">
    <input
      v-model="room"
      class="main-input"
      placeholder="Номер комнаты"
      maxlength="4"
      @input="checkUpperCase"
    />
    <button type="submit" class="main-button" :disabled="room.length !== 4">
      Войти
    </button>
  </form>
</template>

<style lang="scss" scoped>
.enter-room {
  width: 400px;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
}
</style>
