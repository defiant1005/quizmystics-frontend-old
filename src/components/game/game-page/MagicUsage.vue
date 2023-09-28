<script lang="ts">
import { defineComponent } from "vue";
//@ts-ignore
import { state } from "@/socket";

export default defineComponent({
  name: "MagicUsage",

  computed: {
    userList() {
      return state.usersList;
    },
  },
});
</script>

<template>
  <div class="magic-usage"></div>
</template>

<style lang="scss" scoped>
.magic-usage {
}
</style>
