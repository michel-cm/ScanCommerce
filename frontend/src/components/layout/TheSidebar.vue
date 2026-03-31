<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from '../ThemeToggle.vue'

const props = defineProps({
  collapsed: Boolean,
  mobileOpen: Boolean,
  isMobile: Boolean,
})

const emit = defineEmits(['update:collapsed', 'update:mobileOpen'])

const route = useRoute()
const tooltip = ref({ visible: false, text: '', top: 0, left: 0 })

const isEffectivelyCollapsed = computed(() => props.collapsed && !props.isMobile)

const menuItems = [
  { id: 'overview', label: 'Visão Geral', icon: 'home', route: { name: 'home' } },
  { id: 'monitoring', label: 'Monitoramento', icon: 'chart', route: { name: 'dashboard' } },
  { id: 'commercial', label: 'Comercial', icon: 'briefcase', route: { name: 'commercial-dashboard' } },
]

const bottomItems = [
  { id: 'settings', label: 'Configurações', icon: 'settings' },
]

const icons = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
}

function isItemActive(item) {
  if (!item.route) return false
  return route.name === item.route.name
}

function toggleSidebar() {
  emit('update:collapsed', !props.collapsed)
}

function showTooltip(event, text) {
  if (!isEffectivelyCollapsed.value) return
  const rect = event.currentTarget.getBoundingClientRect()
  tooltip.value = {
    visible: true,
    text,
    top: rect.top + rect.height / 2,
    left: rect.right + 12,
  }
}

function hideTooltip() {
  tooltip.value.visible = false
}
</script>

<template>
  <aside
    class="sidebar"
    :class="{
      'sidebar--collapsed': isEffectivelyCollapsed,
      'sidebar--mobile': isMobile,
      'sidebar--mobile-open': isMobile && mobileOpen,
    }"
  >
    <!-- Header -->
    <div class="sidebar__header">
      <router-link to="/" class="sidebar__brand">
        <span class="sidebar__logo">BD</span>
        <span class="sidebar__brand-text">Blan Digital</span>
      </router-link>

      <button
        v-if="!isMobile"
        class="sidebar__toggle"
        :title="collapsed ? 'Expandir menu' : 'Recolher menu'"
        @click="toggleSidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline v-if="!isEffectivelyCollapsed" points="15 18 9 12 15 6" />
          <polyline v-else points="9 18 15 12 9 6" />
        </svg>
      </button>

      <button
        v-else
        class="sidebar__toggle"
        @click="$emit('update:mobileOpen', false)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <ul class="sidebar__menu">
        <li
          v-for="item in menuItems"
          :key="item.id"
          class="sidebar__item"
          :class="{overview: item.id === 'overview'}"
        >
          <router-link
            :to="item.route"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': isItemActive(item) }"
            @mouseenter="showTooltip($event, item.label)"
            @mouseleave="hideTooltip"
          >
            <svg
              class="sidebar__icon"
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              v-html="icons[item.icon]"
            ></svg>
            <span class="sidebar__label">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>

      <!-- Footer (Configurações ao final) -->
      <div class="sidebar__footer">
        <div class="sidebar__divider"></div>
        <ThemeToggle />
        <ul class="sidebar__menu">
          <li
            v-for="item in bottomItems"
            :key="item.id"
            class="sidebar__item"
          >
            <button
              class="sidebar__link"
              @mouseenter="showTooltip($event, item.label)"
              @mouseleave="hideTooltip"
            >
              <svg
                class="sidebar__icon"
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                v-html="icons[item.icon]"
              ></svg>
              <span class="sidebar__label">{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
   
  </aside>

  <!-- Tooltip (teleported to body to escape overflow:hidden) -->
  <Teleport to="body">
    <div
      v-if="tooltip.visible"
      class="sidebar-tooltip"
      :style="{ top: tooltip.top + 'px', left: tooltip.left + 'px' }"
    >
      {{ tooltip.text }}
    </div>
  </Teleport>
</template>

<style scoped>
/* ===== Sidebar Base ===== */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background-color: var(--theme-surface);
  border-right: 1px solid var(--theme-border-subtle);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 200;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.sidebar--collapsed {
  width: 72px;
}

/* ===== Header ===== */
.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  min-height: 77px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--theme-border-subtle);
}

.sidebar--collapsed .sidebar__header {
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
}

.sidebar__logo {
  width: 32px;
  height: 32px;
  min-width: 32px;
  background: linear-gradient(135deg, var(--color-primary-400) 0%, var(--color-primary-600) 100%);
  color: var(--color-neutral-50);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  line-height: 20px;
}

.sidebar__brand-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--theme-text-primary);
  white-space: nowrap;
}

.sidebar--collapsed .sidebar__brand-text {
  display: none;
}

.sidebar__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: none;
  color: var(--theme-text-secondary);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

.sidebar__toggle:hover {
  background-color: var(--theme-hover);
  color: var(--theme-text-primary);
}

/* ===== Navigation ===== */
.sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 12px 16px 12px;
}

.sidebar__menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar__item:nth-child(2) {
  margin-top: 16px;
}

.sidebar__item.overview {
  border-bottom: 1px solid var(--theme-border-subtle);
  padding: 16px 0;
}

/* ===== Menu Items ===== */
.sidebar__link {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: none;
  color: var(--theme-text-secondary);
  font-size: 14px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
  position: relative;
  text-align: left;
}

.sidebar__link:hover {
    background-color: var(--color-primary-50);
  color: var(--color-primary-800);
}

.sidebar__link--active {
  background-color: var(--color-primary-50);
  color: var(--color-primary-800);
}

.sidebar__link--active .sidebar__icon {
  color: var(--color-primary-800);
}

.sidebar__link--active:hover {
  background-color: var(--color-primary-50);
}

.sidebar--collapsed .sidebar__link {
  justify-content: center;
  padding: 0;
}

/* ===== Icon ===== */
.sidebar__icon {
  flex-shrink: 0;
  color: inherit;
}

/* ===== Label ===== */
.sidebar__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar--collapsed .sidebar__label {
  display: none;
}

/* ===== Footer ===== */
.sidebar__footer {
  margin-top: auto;
  padding-top: 8px;
  padding-bottom: 12px;
}

.sidebar__divider {
  height: 1px;
  background-color: var(--theme-border-subtle);
  margin-bottom: 12px;
}

/* ===== Mobile ===== */
.sidebar--mobile {
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 280px;
  max-width: 85vw;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
}

.sidebar--mobile.sidebar--mobile-open {
  transform: translateX(0);
}
</style>

<!-- Unscoped styles for teleported tooltip (usa variáveis de tema para dark mode) -->
<style>
.sidebar-tooltip {
  position: fixed;
  transform: translateY(-50%);
  padding: 6px 12px;
  background-color: var(--theme-surface-elevated);
  color: var(--theme-text-primary);
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--theme-border-subtle);
  z-index: 10000;
  pointer-events: none;
}
</style>
