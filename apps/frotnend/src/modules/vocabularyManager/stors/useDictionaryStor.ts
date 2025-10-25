import { defineStore } from "pinia";
import type { IDictionaryItem } from "../types";

interface IUseDictionaryStor {
  dictionary: IDictionaryItem[]
}

export const useDictionaryStor = defineStore("useDictionaryStor", {
  state: (): IUseDictionaryStor => ({
    dictionary: (() => JSON.parse(localStorage.getItem("dictionary")))(),
  }),
  actions: {
    addDictionaryItem() {
      this.dictionary.push({
        id: Math.random(),
        word: "",
        translation: "",
      });
    },
    removeDictionaryItem(removeId: number) {
      this.dictionary = this.dictionary.filter(({ id }) => id !== removeId);
    },
  },
});
