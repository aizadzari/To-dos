<script setup>
import { onMounted, ref } from "vue";
import { mdiAccount } from "@mdi/js";
import moment from "moment";
import { changeDataTime } from "../helpers/dateFormat";

const props = defineProps(["items"]);
const emit = defineEmits(["update", "remove"]);

function clicked(data) {
  const newData = props.items;
  const id = data.id;
  const index = newData.findIndex((x) => x.id === id);
  const item = newData[index];

  let newObj = {
    ...item,
    status: !item.status,
  };

  newData.splice(index, 1, { ...item, ...newObj });
  emit("update", newData);
}
</script>

<template>
  <v-list lines="three" select-strategy="classic" class="w-100">
    <v-list-item
      v-for="item in props.items"
      :key="item.id"
      :value="item.id"
      class="pa-0"
    >
      <template v-slot:prepend>
        <v-list-item-action @click.prevent="clicked(item)">
          <v-checkbox-btn
            :model-value="item.status"
            class="mx-2"
          ></v-checkbox-btn>
        </v-list-item-action>
      </template>

      <v-list-item-title @click.prevent="clicked(item)">{{
        item.title
      }}</v-list-item-title>

      <v-list-item-subtitle @click.prevent="clicked(item)">
        {{ changeDataTime(item.date) }}
      </v-list-item-subtitle>

      <template v-slot:append>
        <v-list-item-action @click.prevent="emit('remove', item)">
          <v-btn icon="mdi-delete" variant="text" class="mx-2"></v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>
