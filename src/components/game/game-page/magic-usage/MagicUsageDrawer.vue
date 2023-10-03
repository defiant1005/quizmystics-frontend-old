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

    drawerDisabled: {
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

    setSpell(spell: ISpell) {
      if (spell.quantity > 0) {
        this.$emit("setSpell", spell.name);
      }
    },
  },
});
</script>

<template>
  <AppDrawer
    :is-open="isDrawerOpen && !drawerDisabled"
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
          class="spell__btn"
          :label="spell.label + ` (${spell.quantity})`"
          icon="magic"
          :disabled="disabled || spell.quantity === 0"
          :color="getColor(index)"
          @click="setSpell(spell)"
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

  .spell {
    :deep(.ui-button) {
      > span {
        word-wrap: break-word;
      }
    }
  }
}
</style>
