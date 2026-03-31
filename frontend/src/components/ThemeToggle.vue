<script setup>
import { useTheme } from '../composables/useTheme'

const { currentTheme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="`Alternar para tema ${currentTheme === 'dark' ? 'claro' : 'escuro'}`"
    type="button"
  >
    <span class="theme-toggle__icon" aria-hidden="true">
      <!-- Modo Escuro: lua crescente | Modo Claro: sol -->
      <svg
        v-if="currentTheme === 'dark'"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg
        v-else
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    </span>
    <span class="theme-toggle__label">
      {{ currentTheme === 'dark' ? 'Modo Escuro' : 'Modo Claro' }}
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
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
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.theme-toggle:hover {
  background-color: var(--theme-hover);
  color: var(--theme-text-primary);
}

.theme-toggle:active {
  background-color: var(--theme-active);
}

.theme-toggle:focus-visible {
  outline: 0;
  box-shadow: 0 0 0 2px var(--theme-focus);
}

.theme-toggle__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.theme-toggle__icon svg {
  display: block;
}

.theme-toggle__label {
  white-space: nowrap;
}
</style>
