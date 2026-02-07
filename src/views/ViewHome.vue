<script setup>
import { computed } from 'vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useTheme } from '../composables/useTheme'

const { currentTheme } = useTheme()

const themeInfo = computed(() => ({
  current: currentTheme.value,
  dataTheme: typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : 'N/A',
  localStorage: typeof window !== 'undefined' ? localStorage.getItem('app-theme') : 'N/A'
}))
</script>

<template>
  <main class="home">
    <div class="home__header">
      <h1>Home</h1>
      <ThemeToggle />
    </div>
    
    <!-- Teste visual do tema -->
    <div class="home__test">
      <div class="test-card">
        <h2>Teste de Tema</h2>
        <div class="test-info">
          <p><strong>Tema atual (ref):</strong> {{ themeInfo.current }}</p>
          <p><strong>data-theme (DOM):</strong> {{ themeInfo.dataTheme }}</p>
          <p><strong>localStorage:</strong> {{ themeInfo.localStorage }}</p>
        </div>
        
        <div class="test-colors">
          <div class="color-box bg-primary">Background Primary</div>
          <div class="color-box bg-secondary">Background Secondary</div>
          <div class="color-box surface">Surface</div>
          <div class="color-box text-primary">Text Primary</div>
          <div class="color-box text-secondary">Text Secondary</div>
          <div class="color-box border">Border</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  padding-bottom: 32px;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.home__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid var(--theme-border-primary);
}

.home h1 {
  color: var(--theme-text-primary);
  margin: 0;
}

.home__test {
  padding: 24px 16px;
  max-width: 800px;
  margin: 0 auto;
}

.test-card {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-primary);
  border-radius: 8px;
  padding: 24px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.test-card h2 {
  color: var(--theme-text-primary);
  margin-bottom: 16px;
}

.test-info {
  margin-bottom: 24px;
}

.test-info p {
  color: var(--theme-text-secondary);
  margin-bottom: 8px;
  font-size: 14px;
}

.test-info strong {
  color: var(--theme-text-primary);
}

.test-colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.color-box {
  padding: 16px;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--theme-border-primary);
  transition: all 0.3s ease;
}

.bg-primary {
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

.bg-secondary {
  background-color: var(--theme-bg-secondary);
  color: var(--theme-text-primary);
}

.surface {
  background-color: var(--theme-surface);
  color: var(--theme-text-primary);
}

.text-primary {
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

.text-secondary {
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-secondary);
}

.border {
  background-color: var(--theme-bg-primary);
  border: 2px solid var(--theme-border-primary);
  color: var(--theme-text-primary);
}
</style>
