<template>
  <DictionaryCard
    v-for="(dictionaryItem, index) in dictionaryItems"
    :key="index"
    :index="index + 1"
    :dictionary-item="dictionaryItem"
    :disabled-remove="disabledRemove"
    @remove="$emit('remove', $event)"
  />
</template>

<script setup lang="ts">
import DictionaryCard from "./dictionary-card.vue";

defineProps<{
  disabledRemove?: boolean
}>();

defineEmits<{
  remove: [dictionaryItemId: number]
}>();

const dictionaryItems = defineModel("dictionaryItems");
</script>

<style scoped>
.dictionary-card{
  margin-top: 10px;
}
</style>
