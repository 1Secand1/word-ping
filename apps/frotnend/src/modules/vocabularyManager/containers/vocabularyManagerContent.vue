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
        :dictionary-items="dictionaryList"
        @remove="removeDictionaryItem('id', $event)"
      />
    </el-main>

    <el-footer>
      <el-button
        class="add-new-note-btn"
        @click="addNewNote"
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
import { useObjectList } from "../externalDependency/composables/useObjectList";

const dictionaryStor = useDictionaryStor();
const { dictionary } = storeToRefs(dictionaryStor);

const {
  list: dictionaryList,
  addItem: addDictionaryItem,
  removeItem: removeDictionaryItem,
} = useObjectList(dictionary.value);

function addNewNote() {
  addDictionaryItem({ id: Math.random(), translation: "", word: "", example: "" });
}

function seveDictionary() {
  dictionary.value = dictionaryList.value;
  localStorage.setItem("dictionary", JSON.stringify(dictionaryList.value));
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
