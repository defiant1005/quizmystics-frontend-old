<script lang="ts" setup>
import { ref } from "vue";
import { io } from "socket.io-client";

const inputValue = ref("");
const socket = io("http://192.168.0.101:3000/", {
  withCredentials: true,
});

const messages = ref([]);

socket.on("chat message", function (msg) {
  messages.value.push(msg);
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
    <div class="home-page__main main">
      <ul class="main__list list">
        <li v-for="(msg, index) in messages" :key="index" class="list__item">
          {{ msg }}
        </li>
      </ul>
    </div>

    <form class="home-page__form form" @submit.prevent="submit">
      <input
        v-model="inputValue"
        type="text"
        class="form__input"
        placeholder="Введите текст"
      />
      <button type="submit" class="form__btn">Отправить</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 30px;
  background: rgba(118, 118, 241, 0.3);

  .main {
    flex: 1 0 auto;
    max-height: calc(100vh - 160px);
    overflow: auto;

    .list {
      &__item {
        border-bottom: 1px solid black;
        padding: 8px;
        margin-bottom: 8px;
      }
    }
  }

  .form {
    flex: 0 0 auto;
    height: 100px;
    display: flex;
    align-items: center;
    gap: 8px;

    &__input {
      height: 50px;
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid black;
      transition: all 20s ease;
    }
    &__btn {
      height: 50px;
    }
  }
}
</style>
