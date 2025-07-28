<template>
  <main class="main">
    <div class="qwe">
      <div class="">
        <p>  Слово на англиском: {{ currentPairWord.source }}</p>
        <p> Перевод: {{ currentPairWord.translation }}</p>
        <button @click="toggler">
          {{ switchPairWordIntervalId ? 'Остоновить' : 'Запустить' }}
        </button>
      </div>
    </div>
    <ul class="word-list">
      <li>
        <span>RU</span>
        <span>ENG</span>
      </li>
      <li
        v-for="{ source, translation } in vocabulary"
        :key="`${source}-${translation}`"
      >
        <span>{{ source }}</span>
        <span>{{ translation }}</span>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const vocabulary = [
  { source: "shy", translation: "застенчивый" },
  { source: "function", translation: "функция" },
  { source: "value", translation: "значение" },
  { source: "loop", translation: "цикл" },
  { source: "array", translation: "массив" },
  { source: "object", translation: "объект" },
  { source: "string", translation: "строка" },
  { source: "number", translation: "число" },
  { source: "if", translation: "если" },
  { source: "else", translation: "иначе" },
  { source: "return", translation: "возврат" },
  { source: "event", translation: "событие" },
  { source: "handler", translation: "обработчик" },
];

const currentPairWordIndex = ref(0);
const currentPairWord = computed(() => vocabulary[currentPairWordIndex.value]);
const switchPairWordIntervalId = ref<number | null>(null);

async function switchPairWord() {
  console.log("switchPairWord:", currentPairWord.value.source, ",", currentPairWord.value.translation, currentPairWordIndex.value);

  await speakWord(currentPairWord.value.source, "en-US");
  await speakWord(currentPairWord.value.translation, "ru-RU");

  currentPairWordIndex.value++;
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
  height: 100%;
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

button{
  width: 100%;
}
</style>
