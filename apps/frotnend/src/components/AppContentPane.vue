<template>
  <main class="content-pane">
    <!-- <Transition>
      <router-view />
    </Transition> -->
    <router-view v-slot="{ Component }">
      <Transition>
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
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
