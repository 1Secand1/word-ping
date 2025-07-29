<template>
  <div class="app">
    <AppHeader />

    <div class="main-pane">
      <AppNavigationDrawer v-model="isDrawerOpen">
        <AppSidebar />
      </AppNavigationDrawer>

      <AppContentPane />
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppContentPane from "@/components/AppContentPane.vue";

import AppNavigationDrawer from "@/components/drawers/TouchSlideoutDrawer.vue";

import AppSidebar from "@/components/navbars/MantineSimpleNavbar.vue";

import AppHeader from "@/components/headers/MantineSimpleHeader.vue";

import AppFooter from "@/components/footers/MantineSimpleFooter.vue";

import { useAppConfig } from "@/composables/useAppConfig";

const { isDrawerOpen } = useAppConfig();
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100svh;
  .main-pane {
    flex-grow: 1;
    display: flex;
    z-index: 2;
  }
}
</style>
