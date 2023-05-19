<script lang="ts" setup>
import { ref } from "vue";
import { io } from "socket.io-client";

const inputValue = ref("");
const socket = io("http://localhost:3000/", {
  withCredentials: true,
});

const messages = [];

socket.on("chat message", function (msg) {
  messages.push(msg);
});

const submit = () => {
  if (inputValue.value) {
    socket.emit("chat message", inputValue.value);
    inputValue.value = "";
  }
};

// import { defineComponent } from "vue";
//
// export default defineComponent({
//   name: "HomePage",
//
//   props: {},
//
//   data() {
//     return {};
//   },
//
//   computed: {},
//
//   methods: {},
// });
</script>

<template>
  <div class="home-page">
    <form @submit.prevent="submit">
      <input v-model="inputValue" type="text" />
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
}
</style>
