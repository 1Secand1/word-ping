<template>
  <DictionaryCard
    v-for="(dictionaryItem, index) in dictionaryItems"
    :key="index"
    :index="index + 1"
    :dictionary-item="dictionaryItem"
    @remove="$emit('remove', $event)"
  />
</template>

<script setup lang="ts">
import DictionaryCard from "./dictionary-card.vue";

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
