<script setup>
import moment from "moment";
import Datepicker from "vuejs3-datepicker";

const props = defineProps(["value"])
const emit = defineEmits(["modelValue"])

function onInput(e) {
    emit('update:modelValue', moment(e.target.value))
}
</script>

<template>
  <datepicker class="mx-1" v-model="props.value"></datepicker>
</template>
