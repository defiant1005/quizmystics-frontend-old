<script lang="ts">
import { defineComponent } from "vue";
import MainButtonIcon from "@/package/components/MainButtonIcon.vue";

export default defineComponent({
  name: "MainBack",

  components: { MainButtonIcon },

  methods: {
    goBack() {
      this.$router.push({
        name: "HomePage",
      });
    },
  },
});
</script>

<template>
  <MainButtonIcon class="main-back" @click="goBack">
    <span class="icon-arrow-first" />
  </MainButtonIcon>
</template>

<style lang="scss" scoped>
.main-back {
  width: 40px;
  height: 40px;
  background: $white;
  border-radius: 50%;
  border: 1px solid $black;
  box-shadow: 0 4px 0 0 #18191f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: top 0.15s ease-out;

  &:active {
    box-shadow: none;
    top: calc(24px);
  }

  > span {
    height: 24px;
    width: 24px;
    background: $black;
  }
}
</style>
