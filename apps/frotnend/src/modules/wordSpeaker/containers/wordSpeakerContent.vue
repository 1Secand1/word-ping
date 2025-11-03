<template>
  <main class="main">
    <div class="qwe">
      <div class="">
        <p>  Слово на англиском: {{ currentPairWord.translation }}</p>
        <p> Перевод: {{ currentPairWord.word }}</p>
        <p> Предложение: {{ currentPairWord.example }}</p>

        <button @click="toggler">
          {{ switchPairWordIntervalId ? 'Остоновить' : 'Запустить' }}
        </button>
      </div>
    </div>
    <ul class="word-list scroll-container">
      <li>
        <span>RU</span>
        <span>ENG</span>
      </li>
      <li
        v-for="{ word, translation } in dictionary"
        :key="`${word}-${translation}`"
      >
        <span>{{ word }}</span>
        <span>{{ translation }}</span>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useDictionaryStor } from "@/modules/vocabularyManager/stors/useDictionaryStor";

const dictionaryStor = useDictionaryStor();

const { dictionary } = storeToRefs(dictionaryStor);

const currentPairWordIndex = ref(0);
const currentPairWord = computed(() => dictionary.value[currentPairWordIndex.value]);
const switchPairWordIntervalId = ref<number | null>(null);

const firstTray = ref(true);

async function switchPairWord() {
  if (!firstTray.value) {
    currentPairWordIndex.value++;
  }

  console.log("switchPairWord:", currentPairWord.value.word, ",", currentPairWord.value.translation, currentPairWordIndex.value);

  await speakWord(currentPairWord.value.translation, "en-US");
  await speakWord(currentPairWord.value.word, "ru-RU");
  await speakWord(currentPairWord.value.example, "en-US");

  if (currentPairWordIndex.value >= dictionary.value.length - 1) {
    currentPairWordIndex.value = 0;
  }

  if (firstTray.value) {
    firstTray.value = false;
  }
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

  switchPairWord();

  switchPairWordIntervalId.value = setInterval(switchPairWord, 60 * 1000);
}
</script>

<style scoped>
.qwe {
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
    &:nth-child(even) {
      background-color: var(--vwa-c-bg-alt);
    }
    &.dimmed {
      opacity: 0.5;
    }
    span {
      width: 50%;
    }
  }
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
