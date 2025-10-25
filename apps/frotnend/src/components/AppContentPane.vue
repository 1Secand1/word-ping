<template>
  <main class="content-pane">
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>

    <div class="content">
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.content-pane {
  width: 100%;
  padding:0 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
