<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameLayout",
});
</script>

<template>
  <div class="game-layout">
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss" scoped>
.game-layout {
  height: 100%;
}
</style>
