import { type Ref, isProxy, ref, toRaw } from "vue";

export function useObjectList<T extends Record<string, any>>(defaultList: T[] = []) {
  const list = ref([]) as Ref<T[]>;

  if (isProxy(defaultList)) {
    list.value = structuredClone(toRaw(defaultList || []));
  } else {
    list.value = structuredClone(defaultList || []);
  }

  function addItem(item: T) {
    list.value.push(item);
  }

  function removeItem<K extends keyof T>(targetField: K, targetFieldValue: T[K]) {
    list.value = list.value.filter(obj => obj[targetField] !== targetFieldValue);
  }

  return {
    list,
    addItem,
    removeItem,
  } as const;
}
