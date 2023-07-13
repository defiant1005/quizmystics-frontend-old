<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainTable",

  emits: ["deleteEntity"],

  props: {
    tableHeader: {
      type: Array,
      required: true,
    },

    tableData: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentId: null as null | number,
    };
  },

  methods: {},
});
</script>

<template>
  <table class="table table-dark table-striped table-hover">
    <thead>
      <tr>
        <th v-for="(header, index) in tableHeader" :key="index" scope="col">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in tableData" :key="index">
        <td v-for="(cell, cellIndex) in tableHeader" :key="cellIndex">
          {{ row[cell] }}
        </td>
        <button
          type="button"
          class="btn btn-outline-danger"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          @click="currentId = row.id"
        >
          Удалить
        </button>
      </tr>
    </tbody>
  </table>

  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="staticBackdropLabel" class="modal-title fs-5">
            Удалить сущность
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Вы уверены что хотите удалить сущность?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Отмена
          </button>

          <button
            type="button"
            class="btn btn-outline-danger"
            data-bs-dismiss="modal"
            @click="$emit('deleteEntity', currentId)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
