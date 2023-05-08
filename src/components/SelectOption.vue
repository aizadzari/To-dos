<script setup>
import moment from "moment";
import { watch } from "vue";
import Datepicker from "vuejs3-datepicker";

const props = defineProps(["value", "rules", "placeholder"]);
const emit = defineEmits(["modelValue"]);

function onInput(value) {
  const str = moment(value).toISOString();
  emit("update:modelValue", str);
}
</script>

<template>
  <div class="d-flex flex-column mt-2 mt-lg-0">
    <datepicker :placeholder="placeholder" class="mx-1 border-danger" :value="props.value" @input="onInput"></datepicker>
    <p v-show="props.rules" class="messages-error">You must enter a date</p>
  </div>
</template>
