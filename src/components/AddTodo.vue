<script setup>
import { onMounted, ref, watch } from "vue";
import SelectOption from "./SelectOption.vue";
import TextField from "./TextField.vue";
import List from "./List.vue";
import arrayTask from "../data/arrayTask";

const items = ref([]);
const draft = ref({
  title: "",
  date: "",
  status: false,
});

const rules = ref({
  title: [
    (value) => {
      if (value) return true;

      return "You must enter a title.";
    },
  ],
  date: false,
});

watch(
  draft.value,
  ({ date }) => {
    const element = document.getElementsByClassName("vuejs3-datepicker__value");
    if (date) {
      element[0].classList.remove("border-danger");
      rules.value.date = false;
    }
  },
  { deep: true }
);

onMounted(() => {
  const localData = localStorage.getItem("taskList");

  if (!localData) {
    const data = arrayTask;
    localStorage.setItem("taskList", JSON.stringify(data));
    items.value = data;
  } else {
    items.value = JSON.parse(localData);
  }
});

function validate() {
  const { title, date } = draft.value;

  const element = document.getElementsByClassName("vuejs3-datepicker__value");
  if (!date) {
    element[0].classList.add("border-danger");
    rules.value.date = true;
  } else {
    element[0].classList.remove("border-danger");
    rules.value.date = false;
  }

  return !title || !date ? true : false;
}

function submit() {
  const isValid = validate();
  if (!isValid) {
    const newData = localStorage.getItem("taskList");
    if (!newData) {
      const data = JSON.stringify([draft.value]);
      items.value = [draft.value];
      localStorage.setItem("taskList", data);
    } else {
      const data1 = JSON.parse(newData);
      const data2 = { id: data1.length + 1, ...draft.value };
      const newArr = [...data1, data2];
      items.value = newArr;
      localStorage.setItem("taskList", JSON.stringify(newArr));
    }

    draft.value = {
      title: "",
      date: "",
    };
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

  <div class="">
    <v-form @submit.prevent="submit" class="d-block d-lg-flex w-100">
      <TextField v-model="draft.title" :rules="rules.title" placeholder="Task title" />
      <SelectOption v-model="draft.date" :rules="rules.date" placeholder="Duedate"  />
      <v-btn
        class="button-primary button-xxl mx-1 mt-lg-0 mt-3"
        size="large"
        variant="flat"
        type="submit"
        >Save
      </v-btn>
    </v-form>
  </div>

  <List :items="items" @update="update" @remove="remove" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
