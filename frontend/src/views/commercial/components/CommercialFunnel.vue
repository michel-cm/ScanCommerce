<script setup>
import { computed } from 'vue'

const props = defineProps({
  diagnostics: { type: Array, required: true },
})

const stages = [
  { key: 'novo', label: 'Novo', color: 'var(--color-informationlink-500)' },
  { key: 'proposta', label: 'Proposta Enviada', color: 'var(--color-warning-500)' },
  { key: 'negociando', label: 'Negociando', color: 'var(--color-primary-400)' },
  { key: 'fechado', label: 'Fechado', color: 'var(--color-success-500)' },
  { key: 'perdido', label: 'Perdido', color: 'var(--color-error-500)' },
]

const funnelData = computed(() => {
  const counts = {}
  props.diagnostics.forEach((d) => {
    counts[d.status] = (counts[d.status] || 0) + 1
  })
  const maxCount = Math.max(...Object.values(counts), 1)
  return stages.map((stage) => ({
    ...stage,
    count: counts[stage.key] || 0,
    percentage: ((counts[stage.key] || 0) / maxCount) * 100,
  }))
})
</script>

<template>
  <section class="commercial__funnel-section row">
    <h2 class="commercial__section-title">Funil de Oportunidades</h2>

    <div class="commercial__funnel">
      <div
        v-for="stage in funnelData"
        :key="stage.key"
        class="commercial__funnel-stage"
      >
        <div class="commercial__funnel-info">
          <span
            class="commercial__funnel-dot"
            :style="{ backgroundColor: stage.color }"
          ></span>
          <span class="commercial__funnel-label">{{ stage.label }}</span>
          <span class="commercial__funnel-count">{{ stage.count }}</span>
        </div>
        <div class="commercial__funnel-bar-track">
          <div
            class="commercial__funnel-bar-fill"
            :style="{
              width: stage.percentage + '%',
              backgroundColor: stage.color,
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.commercial__funnel-section {
  padding: 0 16px;
  margin-bottom: 32px;
}

.commercial__section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--theme-text-primary);
}

.commercial__funnel {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.commercial__funnel-stage {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.commercial__funnel-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.commercial__funnel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.commercial__funnel-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--theme-text-secondary);
  flex: 1;
}

.commercial__funnel-count {
  font-size: 1rem;
  font-weight: 700;
  color: var(--theme-text-primary);
  min-width: 24px;
  text-align: right;
}

.commercial__funnel-bar-track {
  width: 100%;
  height: 8px;
  background-color: var(--theme-bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.commercial__funnel-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
  min-width: 4px;
}
</style>
