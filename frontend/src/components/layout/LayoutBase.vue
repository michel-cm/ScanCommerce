<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TheSidebar from './TheSidebar.vue'

const route = useRoute()

const STORAGE_KEY = 'sidebar-collapsed'
const MOBILE_BREAKPOINT = 768

const sidebarCollapsed = ref(loadCollapsedState())
const isMobileOpen = ref(false)
const isMobile = ref(false)

let mediaQuery = null

function loadCollapsedState() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function saveCollapsedState(value) {
  try {
    localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    /* localStorage unavailable */
  }
}

function handleMediaChange(event) {
  isMobile.value = event.matches
  if (!event.matches) {
    isMobileOpen.value = false
  }
}

watch(sidebarCollapsed, (val) => {
  saveCollapsedState(val)
})

watch(() => route.path, () => {
  isMobileOpen.value = false
})

watch(isMobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
  isMobile.value = mediaQuery.matches
  mediaQuery.addEventListener('change', handleMediaChange)
})

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleMediaChange)
  }
  document.body.style.overflow = ''
})
</script>

<template>
  <div
    class="layout"
    :class="{
      'layout--sidebar-collapsed': sidebarCollapsed && !isMobile,
      'layout--mobile': isMobile,
    }"
  >
    <TheSidebar
      v-model:collapsed="sidebarCollapsed"
      v-model:mobileOpen="isMobileOpen"
      :isMobile="isMobile"
    />

    <!-- Mobile overlay / backdrop -->
    <Transition name="layout-fade">
      <div
        v-if="isMobile && isMobileOpen"
        class="layout__overlay"
        @click="isMobileOpen = false"
      />
    </Transition>

    <div class="layout__main">
      <!-- Mobile top bar -->
      <header v-if="isMobile" class="layout__mobile-header">
        <button class="layout__menu-btn" @click="isMobileOpen = true">
          <svg
            width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span class="layout__mobile-title">Scan</span>
      </header>

      <main class="layout__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ===== Layout Shell ===== */
.layout {
  min-height: 100vh;
}

.layout__main {
  margin-left: 240px;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout--sidebar-collapsed .layout__main {
  margin-left: 72px;
}

.layout--mobile .layout__main {
  margin-left: 0;
}

/* ===== Content ===== */
.layout__content {
  min-height: 100vh;
}

.layout--mobile .layout__content {
  min-height: calc(100vh - 56px);
}

/* ===== Overlay ===== */
.layout__overlay {
  position: fixed;
  inset: 0;
  background-color: var(--theme-overlay);
  z-index: 150;
}

.layout-fade-enter-active,
.layout-fade-leave-active {
  transition: opacity 0.3s ease;
}

.layout-fade-enter-from,
.layout-fade-leave-to {
  opacity: 0;
}

/* ===== Mobile Header ===== */
.layout__mobile-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 56px;
  padding: 0 16px;
  background-color: var(--theme-surface);
  border-bottom: 1px solid var(--theme-border-subtle);
  z-index: 50;
}

.layout__menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--theme-text-primary);
  cursor: pointer;
  transition: background-color 0.2s;
}

.layout__menu-btn:hover {
  background-color: var(--theme-hover);
}

.layout__mobile-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--theme-text-primary);
}
</style>
