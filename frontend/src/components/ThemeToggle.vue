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
    <span class="theme-toggle__icon">
      {{ currentTheme === 'dark' ? '☀️' : '🌙' }}
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--theme-surface);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.theme-toggle:hover {
  background-color: var(--theme-hover);
  border-color: var(--theme-border-secondary);
}

.theme-toggle:active {
  background-color: var(--theme-active);
}

.theme-toggle:focus-visible {
  outline: 0;
  box-shadow: 0 0 0 2px var(--theme-focus);
}

.theme-toggle__icon {
  font-size: 18px;
  line-height: 1;
}
</style>
