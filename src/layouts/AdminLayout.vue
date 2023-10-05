<script lang="ts">
import { defineComponent } from "vue";
import { useRolesStore } from "@/stores/admin/roles.store";

export default defineComponent({
  name: "AdminLayout",

  data() {
    const rolesStore = useRolesStore();
    return {
      rolesStore,
    };
  },

  mounted() {
    this.rolesStore.getAllRoles();
  },
});
</script>

<template>
  <div class="admin-layout">
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  width: 100%;
  height: 100%;
  background: #141414;
}
</style>
