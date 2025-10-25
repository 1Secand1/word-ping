<template>
  <el-container>
    <el-header class="container-header">
      <el-button
        class="save-btn"
        color="#626aef"
        @click="seveDictionary"
      >
        Сохранить
      </el-button>
    </el-header>
    <el-main class="container-main">
      <vocabulary-list
        :dictionary-items="dictionary"
        @remove="removeDictionaryItem"
      />
    </el-main>

    <el-footer>
      <el-button
        class="add-new-note-btn"
        @click="addDictionaryItem"
      >
        Добавить запись
      </el-button>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import vocabularyList from "../components/vocabulary-list.vue";
import { useDictionaryStor } from "../stors/useDictionaryStor";

const dictionaryStor = useDictionaryStor();
const { dictionary } = storeToRefs(dictionaryStor);
const { addDictionaryItem, removeDictionaryItem } = dictionaryStor;

function seveDictionary() {
  console.log("dictionary", dictionary.value);
  localStorage.setItem("dictionary", JSON.stringify(dictionary.value));
}
</script>

<style scoped>
.container-header {
  display: flex;
  justify-content: end;
}

.container-main {
  padding-top: 0;
}

.save-btn {
    margin-top: 10px;
    margin-left: auto;
}

.add-new-note-btn {
  width: 100%;
  color: blueviolet;
  border: solid 1px blueviolet;
}
</style>
