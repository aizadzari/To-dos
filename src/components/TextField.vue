<script setup>

const props = defineProps(["value"])
const emit = defineEmits(["modelValue"])

function onInput(e) {
    emit('update:modelValue', e.target.value)
}
</script>

<template>
  <v-text-field variant="outlined" class="mx-1"  @input="onInput"></v-text-field>
</template>