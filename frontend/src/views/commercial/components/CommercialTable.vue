<script setup>
import { statusLabels } from '@/data/commercialMock'

defineProps({
  diagnostics: { type: Array, required: true },
  showActions: { type: Boolean, default: true },
  compact: { type: Boolean, default: false },
})

const emit = defineEmits(['view'])

function scoreColor(score) {
  if (score >= 90) return 'var(--color-success-500)'
  if (score >= 50) return 'var(--color-warning-500)'
  return 'var(--color-error-500)'
}

function statusClass(status) {
  const map = {
    novo: 'commercial__badge--info',
    proposta: 'commercial__badge--warning',
    negociando: 'commercial__badge--active',
    fechado: 'commercial__badge--success',
    perdido: 'commercial__badge--critical',
  }
  return map[status] || ''
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <div class="commercial__table">
    <div class="commercial__table-header" :class="{ 'commercial__table-header--compact': compact }">
      <span class="commercial__table-col commercial__table-col--company">Empresa</span>
      <span class="commercial__table-col commercial__table-col--score">Mobile</span>
      <span class="commercial__table-col commercial__table-col--score">Desktop</span>
      <span class="commercial__table-col commercial__table-col--status">Status</span>
      <span v-if="!compact" class="commercial__table-col commercial__table-col--tags">Tags</span>
      <span class="commercial__table-col commercial__table-col--date">Data</span>
      <span v-if="showActions" class="commercial__table-col commercial__table-col--action"></span>
    </div>

    <div
      v-for="item in diagnostics"
      :key="item.id"
      class="commercial__table-row"
      :class="{ 'commercial__table-row--compact': compact }"
    >
      <span class="commercial__table-col commercial__table-col--company" data-label="Empresa">
        {{ item.companyName }}
      </span>
      <span class="commercial__table-col commercial__table-col--score" data-label="Mobile">
        <span class="score-badge" :style="{ '--badge-color': scoreColor(item.mobile.score) }">
          {{ item.mobile.score }}
        </span>
      </span>
      <span class="commercial__table-col commercial__table-col--score" data-label="Desktop">
        <span class="score-badge" :style="{ '--badge-color': scoreColor(item.desktop.score) }">
          {{ item.desktop.score }}
        </span>
      </span>
      <span class="commercial__table-col commercial__table-col--status" data-label="Status">
        <span class="commercial__badge" :class="statusClass(item.status)">
          {{ statusLabels[item.status] }}
        </span>
      </span>
      <span v-if="!compact" class="commercial__table-col commercial__table-col--tags" data-label="Tags">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="commercial__tag"
        >
          {{ tag }}
        </span>
      </span>
      <span class="commercial__table-col commercial__table-col--date" data-label="Data">
        {{ formatDate(item.createdAt) }}
      </span>
      <span v-if="showActions" class="commercial__table-col commercial__table-col--action">
        <button class="commercial__btn-view" @click="emit('view', item)">
          Ver
        </button>
      </span>
    </div>

    <div v-if="!diagnostics.length" class="commercial__table-empty">
      Nenhum diagnóstico encontrado.
    </div>
  </div>
</template>

<style scoped>
.commercial__table {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.commercial__table-header {
  display: grid;
  grid-template-columns: 2fr 80px 80px 140px 1.5fr 100px 80px;
  gap: 12px;
  padding: 12px 20px;
  background-color: var(--theme-bg-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--theme-text-tertiary);
}

.commercial__table-header--compact {
  grid-template-columns: 2fr 80px 80px 140px 100px 80px;
}

.commercial__table-row {
  display: grid;
  grid-template-columns: 2fr 80px 80px 140px 1.5fr 100px 80px;
  gap: 12px;
  padding: 14px 20px;
  align-items: center;
  border-top: 1px solid var(--theme-border-subtle);
  transition: background-color 0.15s;
}

.commercial__table-row--compact {
  grid-template-columns: 2fr 80px 80px 140px 100px 80px;
}

.commercial__table-row:hover {
  background-color: var(--theme-hover);
}

.commercial__table-col--company {
  font-weight: 500;
  color: var(--theme-text-primary);
}

.commercial__table-col--score {
  text-align: center;
}

.commercial__table-col--date {
  font-size: 0.875rem;
  color: var(--theme-text-secondary);
}

.commercial__table-col--action {
  text-align: right;
}

.commercial__table-col--tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.commercial__table-col--status {
  display: flex;
  align-items: center;
}

.score-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--badge-color);
}

.commercial__badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.commercial__badge--info {
  color: var(--color-informationlink-500);
  background-color: rgba(59, 130, 246, 0.12);
}

.commercial__badge--warning {
  color: var(--color-warning-500);
  background-color: rgba(255, 210, 46, 0.12);
}

.commercial__badge--active {
  color: var(--color-primary-400);
  background-color: rgba(45, 140, 85, 0.12);
}

.commercial__badge--success {
  color: var(--color-success-500);
  background-color: rgba(111, 179, 15, 0.12);
}

.commercial__badge--critical {
  color: var(--color-error-500);
  background-color: rgba(231, 54, 35, 0.12);
}

.commercial__tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--theme-text-secondary);
  background-color: var(--theme-bg-tertiary);
  border: 1px solid var(--theme-border-subtle);
}

.commercial__btn-view {
  padding: 6px 14px;
  background-color: transparent;
  color: var(--color-primary-400);
  border: 1px solid var(--color-primary-700);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  white-space: nowrap;
}

.commercial__btn-view:hover {
  background-color: rgba(45, 140, 85, 0.1);
  border-color: var(--color-primary-500);
}

.commercial__table-empty {
  padding: 32px 20px;
  text-align: center;
  color: var(--theme-text-tertiary);
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  .commercial__table-header {
    display: none;
  }

  .commercial__table-row,
  .commercial__table-row--compact {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px 20px;
  }

  .commercial__table-col::before {
    content: attr(data-label);
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--theme-text-tertiary);
    margin-right: 8px;
    min-width: 70px;
  }

  .commercial__table-col--score {
    text-align: left;
  }

  .commercial__table-col--action {
    text-align: left;
  }

  .commercial__table-col--action::before {
    display: none;
  }
}
</style>
