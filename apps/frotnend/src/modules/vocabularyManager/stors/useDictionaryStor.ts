import { defineStore } from "pinia";
import type { IDictionaryItem } from "../types";

interface IUseDictionaryStor {
  dictionary: IDictionaryItem[]
}

export const useDictionaryStor = defineStore("useDictionaryStor", {
  state: (): IUseDictionaryStor => ({
    dictionary: (() => JSON.parse(localStorage.getItem("dictionary")))(),
  }),
  actions: { },
});
