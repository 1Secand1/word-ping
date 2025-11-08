<template>
  <main class="main">
    <div class="centerContainer">
      <div v-if="dictionary?.length">
        <p>  Слово на англиском: {{ currentPairWord.translation }}</p>
        <p> Перевод: {{ currentPairWord.word }}</p>
        <p> Предложение: {{ currentPairWord.example }}</p>

        <button @click="toggler">
          {{ switchPairWordIntervalId ? 'Остоновить' : 'Запустить' }}
        </button>
      </div>
      <div v-else>
        <div style="margin-top: 50px;">
          <p>
            В вашем словаре нету запесей, заполните словарь
          </p>
          <el-button @click="router.push({ name: 'vocabulary-manager' })">
            Перейти к словарю
          </el-button>
        </div>
      </div>
    </div>
    <ul
      v-if="dictionary?.length"
      class="word-list scroll-container"
    >
      <li>
        <span>RU</span>
        <span>ENG</span>
      </li>
      <li
        v-for="{ word, translation, id } in dictionary"
        :key="`${word}-${translation}`"
        :class="{ active: currentPairWord.id === id }"
      >
        <span>{{ word }}</span>
        <span>{{ translation }}</span>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useDictionaryStor } from "@/modules/vocabularyManager/stors/useDictionaryStor";
import { router } from "@/router";

const dictionaryStor = useDictionaryStor();

const { dictionary } = storeToRefs(dictionaryStor);

const currentPairWordIndex = ref(0);
const currentPairWord = computed(() => dictionary.value[currentPairWordIndex.value]);
const switchPairWordIntervalId = ref<number | null>(null);

function switchPairWord() {
  speakWords();

  return async () => {
    currentPairWordIndex.value++;

    if (currentPairWordIndex.value > dictionary.value.length - 1) {
      currentPairWordIndex.value = 0;
    }

    await speakWords();
  };
}

async function speakWords() {
  console.log("switchPairWord:", currentPairWord.value.word, ",", currentPairWord.value.translation, currentPairWordIndex.value);

  await speakWord(currentPairWord.value.translation, "en-US");
  await speakWord(currentPairWord.value.word, "ru-RU");
  await speakWord(currentPairWord.value.example, "en-US");
}

function speakWord(word: string, lang: "en-US" | "ru-RU" = "en-US") {
  return new Promise<void>((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      reject(event.error);
    };

    speechSynthesis.speak(utterance);
  });
}

async function toggler() {
  if (switchPairWordIntervalId.value) {
    clearInterval(switchPairWordIntervalId.value);
    switchPairWordIntervalId.value = null;
    return;
  }

  switchPairWordIntervalId.value = setInterval(switchPairWord(), 10 * 1000);
}

onMounted(() => {
  speakWord("Добро пожаловать ))", "ru-RU");
});
</script>

<style scoped>
.centerContainer {
  width: 100%;
  display: grid;
  place-items: center;
}

.main{
  display: flex;
}

.word-list {
  width: 50%;
  color: var(--vwa-c-text-2);
  border: 1px solid var(--vwa-c-divider);
  margin-bottom: 2em;
  li {
    padding: .4rem;
    display: flex;
    &.dimmed {
      opacity: 0.5;
    }
    span {
      width: 50%;
    }
  }
}

.active{
  background: #c4c4c488;
}

.scroll-container {
  overflow-y: auto;
  height: 100%;
  max-height: 75svh;
}

button{
  width: 100%;
}
</style>
