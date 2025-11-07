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

    <el-dialog
      v-model="isClosingWarningVisible"
      title="Несохранённые изменения"
      width="500"
      :before-close="cancelLeave"
    >
      <span>У вас есть несохранённые изменения. Покинуть страницу без сохранения?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="confirmLeave">
            Выйти без сохранения
          </el-button>
          <el-button type="primary" @click="saveAndLeave">
            Сохранить и выйти
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeRouteLeave } from "vue-router";
import vocabularyList from "../components/vocabulary-list.vue";
import { useDictionaryStor } from "../stors/useDictionaryStor";
import { useObjectList } from "../externalDependency/composables/useObjectList";
import { useToggle } from "../externalDependency/composables/useToggle";

const dictionaryStor = useDictionaryStor();
const { dictionary } = storeToRefs(dictionaryStor);

const {
  list: dictionaryList,
  addItem: addDictionaryItem,
  removeItem: removeDictionaryItem,
} = useObjectList(dictionary.value);

const {
  isOpen: isClosingWarningVisible,
  close: closeClosingWarningModal,
  open: openClosingWarningModal,
} = useToggle();

let nextRoute = null;

function addNewNote() {
  addDictionaryItem({ id: Math.random(), translation: "", word: "", example: "" });
}

function seveDictionary() {
  dictionary.value = dictionaryList.value;
  localStorage.setItem("dictionary", JSON.stringify(dictionaryList.value));
}

function checkChanges() {
  return JSON.stringify(dictionary.value) !== JSON.stringify(dictionaryList.value);
}

function confirmLeave() {
  closeClosingWarningModal();
  nextRoute.next();
}

function saveAndLeave() {
  confirmLeave();
  seveDictionary();
}

function cancelLeave() {
  closeClosingWarningModal();
  nextRoute = null;
}

onBeforeRouteLeave((to, from, next) => {
  if (checkChanges()) {
    openClosingWarningModal();
    nextRoute = { to, next };
    return;
  }

  next();
});
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
