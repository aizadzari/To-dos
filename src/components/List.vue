<script setup>
import { onMounted, ref, watch } from "vue";
import { mdiAccount } from "@mdi/js";
import moment from "moment";
import { changeDataTime } from "../helpers/dateFormat";

const props = defineProps(["items"]);
const emit = defineEmits(["update", "remove", "changePage"]);

const draft = ref({
  options: {
    pageCount: 1,
  },
  page: 1,
  itemsPerPage: 10,
  headers: [
    { title: "Status", key: "status", sortable: false },
    { title: "Title", key: "title", align: "left", sortable: false },
    { title: "Date", key: "date", sortable: false },
    { title: "Actions", key: "action", sortable: false },
  ],
  items: [],
});
const seletedItem = ref(null);
const dialogDelete = ref(false);

watch(props, ({ items }) => {
  const newData = items;
  if (newData.length > 0) {
    draft.value.items = newData;
    draft.value.options.pageCount = getPagination(items.length);
  }
});

function getPagination(length) {
  const total = length;
  const sizePage = 10;
  const result = Math.round(total / sizePage);
  return result;
}

function clickedChecked(data) {
  const newData = props.items;
  const id = data.value;
  const index = newData.findIndex((x) => x.id === id);
  const item = newData[index];

  let newObj = {
    ...item,
    status: !item.status,
  };

  newData.splice(index, 1, { ...item, ...newObj });
  emit("update", newData);
}

function promptRemove(data) {
  dialogDelete.value = true;
  const newData = data.raw;
  seletedItem.value = newData;
}

function closeDelete() {
  dialogDelete.value = false;
  seletedItem.value = null;
}

function deleteItemConfirm() {
  emit("remove", seletedItem.value);
  dialogDelete.value = false;
  seletedItem.value = null;
}
</script>

<template>
  <v-data-table
    v-model:page="draft.page"
    :headers="draft.headers"
    :items="draft.items"
    :items-per-page="draft.itemsPerPage"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialogDelete" max-width="560px">
        <v-card class="pa-5">
          <v-card-title class="text-h5 text-center"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.status="{ item }">
      <v-checkbox-btn
        :model-value="item.raw.status"
        @click.prevent="clickedChecked(item)"
      ></v-checkbox-btn>
    </template>
    <template v-slot:item.title="{ item }">
      <div class="text-left">{{ item.title }}</div>
    </template>
    <template v-slot:item.date="{ item }">
      <div class="text-left">{{ changeDataTime(item.raw.date) }}</div>
    </template>

    <template v-slot:item.action="{ item }">
      <div class="text-left">
        <v-btn
          icon="mdi-delete"
          variant="text"
          class="mx-2"
          @click.prevent="promptRemove(item)"
        ></v-btn>
      </div>
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="draft.page"
          :length="draft.options.pageCount"
        ></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>
