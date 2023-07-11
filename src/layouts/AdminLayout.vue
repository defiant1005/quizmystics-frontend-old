<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminLayout",
});
</script>

<template>
  <div class="admin-layout">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  width: 100%;
  height: 100%;
  background: #141414;
}
</style>
