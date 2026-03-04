<script setup>
import { computed } from 'vue'

const props = defineProps({
  diagnostics: { type: Array, required: true },
})

const totalDiagnostics = computed(() => props.diagnostics.length)

const criticalOpportunities = computed(() =>
  props.diagnostics.filter((d) => d.mobile.score < 70).length
)

const avgMobile = computed(() => {
  if (!props.diagnostics.length) return 0
  const sum = props.diagnostics.reduce((acc, d) => acc + d.mobile.score, 0)
  return Math.round(sum / props.diagnostics.length)
})

const avgDesktop = computed(() => {
  if (!props.diagnostics.length) return 0
  const sum = props.diagnostics.reduce((acc, d) => acc + d.desktop.score, 0)
  return Math.round(sum / props.diagnostics.length)
})

function scoreColor(score) {
  if (score >= 90) return 'var(--color-success-500)'
  if (score >= 50) return 'var(--color-warning-500)'
  return 'var(--color-error-500)'
}
</script>

<template>
  <section class="commercial__stats">
    <div class="commercial__card">
      <span class="commercial__card-icon commercial__card-icon--total">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </span>
      <span class="commercial__card-label">Total de Diagnósticos</span>
      <span class="commercial__card-value">{{ totalDiagnostics }}</span>
    </div>

    <div class="commercial__card">
      <span class="commercial__card-icon commercial__card-icon--critical">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </span>
      <span class="commercial__card-label">Oportunidades Críticas</span>
      <span class="commercial__card-value" style="color: var(--color-error-500)">
        {{ criticalOpportunities }}
      </span>
    </div>

    <div class="commercial__card">
      <span class="commercial__card-icon commercial__card-icon--mobile">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      </span>
      <span class="commercial__card-label">Score Médio Mobile</span>
      <span class="commercial__card-value" :style="{ color: scoreColor(avgMobile) }">
        {{ avgMobile }}
      </span>
    </div>

    <div class="commercial__card">
      <span class="commercial__card-icon commercial__card-icon--desktop">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </span>
      <span class="commercial__card-label">Score Médio Desktop</span>
      <span class="commercial__card-value" :style="{ color: scoreColor(avgDesktop) }">
        {{ avgDesktop }}
      </span>
    </div>
  </section>
</template>

<style scoped>
.commercial__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 32px;
}

.commercial__card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.commercial__card:hover {
  border-color: var(--theme-border-secondary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.commercial__card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.commercial__card-icon--total {
  background-color: rgba(45, 140, 85, 0.12);
  color: var(--color-primary-400);
}

.commercial__card-icon--critical {
  background-color: rgba(231, 54, 35, 0.12);
  color: var(--color-error-500);
}

.commercial__card-icon--mobile {
  background-color: rgba(255, 210, 46, 0.12);
  color: var(--color-warning-500);
}

.commercial__card-icon--desktop {
  background-color: rgba(59, 130, 246, 0.12);
  color: var(--color-informationlink-500);
}

.commercial__card-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--theme-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.commercial__card-value {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

@media (max-width: 900px) {
  .commercial__stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .commercial__stats {
    grid-template-columns: 1fr;
  }

  .commercial__card-value {
    font-size: 1.5rem;
  }
}
</style>
