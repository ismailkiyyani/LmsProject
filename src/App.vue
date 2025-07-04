<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

// Hide layout on auth pages
const route = useRoute()
const hideLayoutOn = ['/signin', '/signup']
const showLayout = computed(() => !hideLayoutOn.includes(route.path))
</script>

<template>
  <div class="wrapper">
    <Navbar v-if="showLayout" />

    <div class="app-layout">
      <Sidebar v-if="showLayout" />

      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
:root {
  --sidebar-width: 200px;
  --sidebar-width-collapsed: 60px;
  background-color: rgb(242, 242, 242);
}

.wrapper {
  padding-top: 60px;
  /* height of navbar */
  background-color: rgb(242, 242, 242);
  min-height: 100vh;
}

.app-layout {
  display: flex;
  min-height: calc(100vh - 60px);
  background-color: var(--bg-color);
  transition: margin-left 0.3s ease;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: var(--sidebar-width);
  color: var(--text-color);
  transition: margin-left 0.3s ease;
}

/* Collapsed sidebar handling (optional enhancement) */
.sidebar.closed+.main-content {
  margin-left: var(--sidebar-width-collapsed);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
  }
}
</style>
