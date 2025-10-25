<template>
  <el-card class="dictionary-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>#{{ index }}</span>
        <el-button
          type="primary"
          size="small"
          :icon="Delete"
          circle
          @click="$emit('remove', dictionaryItem.id)"
        />
      </div>
    </template>

    <div class="dictionary-card">
      <el-form-item label="Слово">
        <el-input
          v-model="dictionaryItem.word"
          placeholder="Введите слово"
        />
      </el-form-item>

      <el-form-item label="Перевод">
        <el-input
          v-model="dictionaryItem.translation"
          placeholder="Введите перевод"
        />
      </el-form-item>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import type { IDictionaryItem } from "../types";

defineProps<{
  dictionaryItem: IDictionaryItem
  index: number
}>();

defineEmits<{
  remove: [dictionaryItemId: number]
}>();

const dictionaryItem = defineModel<IDictionaryItem>("dictionaryItem");
</script>

<style scoped>
.dictionary-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dictionary-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #606266;
}
</style>
