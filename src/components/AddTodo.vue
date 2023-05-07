<script setup>
import { onMounted, ref } from "vue";
import SelectOption from "./SelectOption.vue";
import TextField from "./TextField.vue";
import List from "./List.vue";

const items = ref([]);
const draft = ref({
  title: "",
  date: "",
  status: false,
});

onMounted(() => {
  const localData = localStorage.getItem("taskList");

  if (!localData) {
    const data = [
      {
        id: 1,
        title: "Notifications",
        date: moment().toISOString(),
        status: true,
      },
      {
        id: 2,
        title: "Sound",
        date: moment().toISOString(),
        status: false,
      },
    ];
    localStorage.setItem("taskList", JSON.stringify(data));
    items.value = data;
  } else {
    {
      items.value = JSON.parse(localData);
    }
  }
});

function submit() {
  const newData = localStorage.getItem("taskList");

  if (!newData) {
    const data = JSON.stringify([draft.value]);
    localStorage.setItem("taskList", data);
  } else {
    const data1 = JSON.parse(newData);
    const data2 = { id: data1.length + 1, ...draft.value };

    const newArr = [...data1, data2];
    localStorage.setItem("taskList", JSON.stringify(newArr));
  }
}

function update(value) {
  items.value = value;
  localStorage.setItem("taskList", JSON.stringify(value));
}

function remove(value) {
  const data = JSON.parse(localStorage.getItem("taskList"));
  const newData = data.filter((x) => x.id !== value.id);

  items.value = newData;
  localStorage.setItem("taskList", JSON.stringify(newData));
}
</script>

<template>
  <h1>Task List</h1>

  <div class="d-flex">
    <TextField v-model="draft.title" />
    <SelectOption v-model="draft.date" />
    <v-btn
      class="button-primary button-xxl mx-1"
      size="large"
      variant="flat"
      @click.prevent="submit"
      >Button
    </v-btn>
  </div>

  <List :items="items" @update="update" @remove="remove" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
