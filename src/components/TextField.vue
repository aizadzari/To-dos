<script setup>
const props = defineProps(["value", "rules", "placeholder"]);
const emit = defineEmits(["modelValue"]);

function onInput(e) {
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <v-text-field
    :placeholder="placeholder"
    variant="outlined"
    class="mx-1"
    :rules="props.rules"
    @input="onInput"
  ></v-text-field>
</template>