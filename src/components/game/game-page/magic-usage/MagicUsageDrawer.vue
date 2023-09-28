<script lang="ts">
import { defineComponent, PropType } from "vue";
import AppDrawer from "@/package/components/AppDrawer.vue";
import { ISpell, stateValue } from "@/intefaces/IGame";
import MainButton from "@/package/components/MainButton.vue";
import { buttonColor } from "@/intefaces/IMain";

export default defineComponent({
  name: "MagicUsageDrawer",

  components: {
    MainButton,
    AppDrawer,
  },

  emits: ["close", "setSpell"],

  props: {
    isDrawerOpen: {
      type: Boolean,
      default: false,
    },

    magicLevel: {
      type: Number as PropType<stateValue>,
      required: true,
    },

    spells: {
      type: Array as PropType<Array<ISpell>>,
      default: () => [],
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getColor(index: number): buttonColor {
      switch (index) {
        case 0:
          return "blue";
        case 1:
          return "yellow";
        case 2:
          return "green";
        case 3:
          return "pink";
        case 4:
          return "red";
        default:
          return "blue";
      }
    },
  },
});
</script>

<template>
  <AppDrawer
    :is-open="isDrawerOpen"
    title="Выберите способность"
    @close="$emit('close')"
  >
    <div class="magic-usage-drawer">
      <div
        v-for="(spell, index) in spells"
        :key="index"
        class="magic-usage-drawer__spell spell"
      >
        <MainButton
          :label="spell.label + ` (${spell.quantity})`"
          icon="magic"
          :disabled="disabled"
          :color="getColor(index)"
          @click="$emit('setSpell', spell.name)"
        />
      </div>
    </div>
  </AppDrawer>
</template>

<style lang="scss" scoped>
.magic-usage-drawer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
