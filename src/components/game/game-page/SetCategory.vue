<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlayers } from "@/intefaces/IGame";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
//@ts-ignore
import { socket } from "@/socket";
import { ICategories } from "@/intefaces/IAdminInrefaces";
import MainButton from "@/package/components/MainButton.vue";

export default defineComponent({
  name: "SetCategory",
  components: { MainButton },
  emits: ["nextStep"],

  props: {
    userList: {
      type: Array as PropType<Array<IPlayers>>,
      required: true,
    },
  },

  data() {
    return {
      categories: [] as Array<ICategories>,
      isAnswerDisabled: false,
      whoChoiceAnswerId: null as null | string,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      room: "room",
      myId: "id",
    }),

    whoChoiceAnswer() {
      return this.userList.find(
        (item) => item.userId === this.whoChoiceAnswerId
      );
    },

    meData() {
      return this.userList.find((item) => item.userId === this.myId);
    },

    isMeAdmin() {
      return this.meData?.isRoomAdmin ?? false;
    },
  },

  methods: {
    choiceCategory(categoryId: number) {
      this.isAnswerDisabled = true;
      if (this.isMeAdmin) {
        const normalize = {
          room: this.room,
          categoryId: categoryId,
        };

        socket.emit("setCategory", normalize);
      }
    },
  },

  mounted() {
    if (this.isMeAdmin) {
      const normalize = {
        room: this.room,
      };
      socket.emit("whoChoosesCategory", normalize);
    }
  },

  created() {
    socket.on(
      "whoChoosesCategory",
      (data: { userId: string; categories: Array<ICategories> }) => {
        this.whoChoiceAnswerId = data.userId;
        this.categories = data.categories;
        this.isAnswerDisabled = data.userId === this.myId;
      }
    );
  },
});
</script>

<template>
  <div class="set-category">
    <h2 v-if="whoChoiceAnswerId === myId">Выберите категорию</h2>
    <h2 v-else>
      Ждем пока {{ whoChoiceAnswer?.name ?? "" }} выберет категорию
    </h2>
    <div class="set-category__categories categories">
      <MainButton
        v-for="category in categories"
        :key="category.id"
        class="answer__item"
        color="green"
        :label="category.title"
        :disabled="!isAnswerDisabled"
        @click="choiceCategory(category.id)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.set-category {
  width: 100%;
  padding: 30px;

  > h2 {
    color: $black;
    @include h-1;
    margin-bottom: 20px;
  }

  .categories {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
