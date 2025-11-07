import { ref } from "vue";

export function useToggle(initial: boolean = false) {
  const isOpen = ref(initial);

  const open = () => (isOpen.value = true);
  const close = () => (isOpen.value = false);
  const toggle = () => (isOpen.value = !isOpen.value);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
