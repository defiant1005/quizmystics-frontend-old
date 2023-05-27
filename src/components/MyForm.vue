<template>
  <form @submit.prevent="onSubmit">
    <input v-model="value" />

    <button type="submit" :disabled="isLoading">Submit</button>
  </form>
</template>

<script>
import { socket_old } from "@/socket_old";

export default {
  name: "MyForm",

  data() {
    return {
      isLoading: false,
      value: "",
    };
  },

  methods: {
    onSubmit() {
      this.isLoading = true;

      socket_old.timeout(200).emit("create-something", this.value, () => {
        this.isLoading = false;
      });
    },
  },
};
</script>
