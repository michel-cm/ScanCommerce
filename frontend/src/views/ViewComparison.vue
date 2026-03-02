<script setup>
import { ref, computed } from 'vue'

const scanOptions = [
  { id: 'scan-1', label: 'Scan #1 — 01/03/2026 — lojademo.com.br' },
  { id: 'scan-2', label: 'Scan #2 — 15/02/2026 — lojademo.com.br' },
  { id: 'scan-3', label: 'Scan #3 — 28/02/2026 — megastore.com.br' },
]

const selectedScanA = ref('scan-1')
const selectedScanB = ref('scan-2')

const scanDataMap = {
  'scan-1': {
    performance_score: 72,
    accessibility_score: 88,
    seo_score: 91,
    best_practices_score: 80,
    fcp: 2.1,
    lcp: 3.4,
    speed_index: 3.2,
    total_blocking_time: 320,
    cls: 0.18,
  },
  'scan-2': {
    performance_score: 84,
    accessibility_score: 90,
    seo_score: 93,
    best_practices_score: 75,
    fcp: 1.8,
    lcp: 2.7,
    speed_index: 2.9,
    total_blocking_time: 350,
    cls: 0.11,
  },
  'scan-3': {
    performance_score: 68,
    accessibility_score: 82,
    seo_score: 87,
    best_practices_score: 75,
    fcp: 2.5,
    lcp: 4.1,
    speed_index: 3.8,
    total_blocking_time: 410,
    cls: 0.24,
  },
}

const metricDefinitions = [
  { key: 'performance_score', label: 'Performance Score', unit: '', higherIsBetter: true, group: 'scores' },
  { key: 'accessibility_score', label: 'Accessibility Score', unit: '', higherIsBetter: true, group: 'scores' },
  { key: 'seo_score', label: 'SEO Score', unit: '', higherIsBetter: true, group: 'scores' },
  { key: 'best_practices_score', label: 'Best Practices Score', unit: '', higherIsBetter: true, group: 'scores' },
  { key: 'fcp', label: 'First Contentful Paint', unit: 's', higherIsBetter: false, group: 'vitals' },
  { key: 'lcp', label: 'Largest Contentful Paint', unit: 's', higherIsBetter: false, group: 'vitals' },
  { key: 'speed_index', label: 'Speed Index', unit: 's', higherIsBetter: false, group: 'vitals' },
  { key: 'total_blocking_time', label: 'Total Blocking Time', unit: 'ms', higherIsBetter: false, group: 'vitals' },
  { key: 'cls', label: 'Cumulative Layout Shift', unit: '', higherIsBetter: false, group: 'vitals' },
]

function calcComparison(valueA, valueB, higherIsBetter) {
  const absoluteDiff = valueB - valueA
  const percentDiff = valueA !== 0
    ? ((valueB - valueA) / Math.abs(valueA)) * 100
    : 0

  let status = 'neutral'
  if (absoluteDiff !== 0) {
    const isPositiveChange = higherIsBetter ? absoluteDiff > 0 : absoluteDiff < 0
    status = isPositiveChange ? 'improved' : 'worsened'
  }

  return { absoluteDiff, percentDiff, status }
}

function formatValue(value, unit) {
  if (unit === 'ms') return `${value} ms`
  if (unit === 's') return `${value} s`
  return String(value)
}

function formatDiff(value, unit) {
  const sign = value > 0 ? '+' : ''
  if (unit === 'ms') return `${sign}${Math.round(value)} ms`
  if (unit === 's') return `${sign}${value.toFixed(1)} s`
  return `${sign}${Number.isInteger(value) ? value : value.toFixed(2)}`
}

function formatPercent(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

const statusIcons = {
  improved: '↑',
  worsened: '↓',
  neutral: '—',
}

const comparisonRows = computed(() => {
  const dataA = scanDataMap[selectedScanA.value]
  const dataB = scanDataMap[selectedScanB.value]

  return metricDefinitions.map((metric) => {
    const valueA = dataA[metric.key]
    const valueB = dataB[metric.key]
    const { absoluteDiff, percentDiff, status } = calcComparison(valueA, valueB, metric.higherIsBetter)

    return {
      key: metric.key,
      label: metric.label,
      group: metric.group,
      valueA: formatValue(valueA, metric.unit),
      valueB: formatValue(valueB, metric.unit),
      diff: formatDiff(absoluteDiff, metric.unit),
      percent: formatPercent(percentDiff),
      status,
      icon: statusIcons[status],
    }
  })
})

const scoreRows = computed(() => comparisonRows.value.filter((r) => r.group === 'scores'))
const vitalRows = computed(() => comparisonRows.value.filter((r) => r.group === 'vitals'))
</script>

<template>
  <main class="comparison">
    <header class="comparison__header row">
      <div class="comparison__header-text">
        <h1 class="comparison__title">Comparação de Performance</h1>
        <p class="comparison__subtitle">Compare dois scans lado a lado</p>
      </div>
    </header>

    <section class="comparison__selectors row">
      <div class="comparison__selector">
        <label class="comparison__selector-label" for="scan-a">Scan A</label>
        <select id="scan-a" v-model="selectedScanA" class="comparison__select">
          <option v-for="opt in scanOptions" :key="opt.id" :value="opt.id">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <span class="comparison__vs">VS</span>

      <div class="comparison__selector">
        <label class="comparison__selector-label" for="scan-b">Scan B</label>
        <select id="scan-b" v-model="selectedScanB" class="comparison__select">
          <option v-for="opt in scanOptions" :key="opt.id" :value="opt.id">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </section>

    <!-- Scores -->
    <section class="comparison__section row">
      <h2 class="comparison__section-title">Scores</h2>

      <div class="comparison__table">
        <div class="comparison__table-header">
          <span class="comparison__col comparison__col--metric">Métrica</span>
          <span class="comparison__col comparison__col--value">Scan A</span>
          <span class="comparison__col comparison__col--value">Scan B</span>
          <span class="comparison__col comparison__col--diff">Diferença</span>
          <span class="comparison__col comparison__col--status">Status</span>
        </div>

        <div
          v-for="row in scoreRows"
          :key="row.key"
          class="comparison__row"
        >
          <span class="comparison__cell comparison__cell--metric" data-label="Métrica">
            {{ row.label }}
          </span>
          <span class="comparison__cell comparison__cell--value" data-label="Scan A">
            {{ row.valueA }}
          </span>
          <span class="comparison__cell comparison__cell--value" data-label="Scan B">
            {{ row.valueB }}
          </span>
          <span class="comparison__cell comparison__cell--diff" data-label="Diferença">
            <span class="comparison__diff-group">
              <span :class="['comparison__diff-value', `comparison__diff-value--${row.status}`]">
                {{ row.diff }}
              </span>
              <span :class="['comparison__diff-percent', `comparison__diff-percent--${row.status}`]">
                {{ row.percent }}
              </span>
            </span>
          </span>
          <span class="comparison__cell comparison__cell--status" data-label="Status">
            <span :class="['comparison__status', `comparison__status--${row.status}`]">
              {{ row.icon }}
            </span>
          </span>
        </div>
      </div>
    </section>

    <!-- Core Web Vitals -->
    <section class="comparison__section row">
      <h2 class="comparison__section-title">Core Web Vitals</h2>

      <div class="comparison__table">
        <div class="comparison__table-header">
          <span class="comparison__col comparison__col--metric">Métrica</span>
          <span class="comparison__col comparison__col--value">Scan A</span>
          <span class="comparison__col comparison__col--value">Scan B</span>
          <span class="comparison__col comparison__col--diff">Diferença</span>
          <span class="comparison__col comparison__col--status">Status</span>
        </div>

        <div
          v-for="row in vitalRows"
          :key="row.key"
          class="comparison__row"
        >
          <span class="comparison__cell comparison__cell--metric" data-label="Métrica">
            {{ row.label }}
          </span>
          <span class="comparison__cell comparison__cell--value" data-label="Scan A">
            {{ row.valueA }}
          </span>
          <span class="comparison__cell comparison__cell--value" data-label="Scan B">
            {{ row.valueB }}
          </span>
          <span class="comparison__cell comparison__cell--diff" data-label="Diferença">
            <span class="comparison__diff-group">
              <span :class="['comparison__diff-value', `comparison__diff-value--${row.status}`]">
                {{ row.diff }}
              </span>
              <span :class="['comparison__diff-percent', `comparison__diff-percent--${row.status}`]">
                {{ row.percent }}
              </span>
            </span>
          </span>
          <span class="comparison__cell comparison__cell--status" data-label="Status">
            <span :class="['comparison__status', `comparison__status--${row.status}`]">
              {{ row.icon }}
            </span>
          </span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ===== Layout ===== */
.comparison {
  min-height: 100vh;
  padding-bottom: 48px;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

/* ===== Header ===== */
.comparison__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 24px;
}

.comparison__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

.comparison__subtitle {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: var(--theme-text-tertiary);
}

/* ===== Selectors ===== */
.comparison__selectors {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 32px;
}

.comparison__selector {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comparison__selector-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--theme-text-tertiary);
}

.comparison__select {
  width: 100%;
  appearance: none;
  background-color: var(--theme-bg-tertiary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23979796' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  border: 1px solid var(--theme-border-secondary);
  border-radius: 8px;
  padding: 10px 36px 10px 14px;
  color: var(--theme-text-primary);
  font-size: 0.875rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.comparison__select:hover {
  border-color: var(--theme-border-primary);
  background-color: var(--theme-bg-secondary);
}

.comparison__select:focus {
  outline: none;
  border-color: var(--theme-focus);
  box-shadow: 0 0 0 3px rgba(45, 140, 85, 0.2);
}

.comparison__vs {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--theme-text-tertiary);
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 50%;
}

/* ===== Sections ===== */
.comparison__section {
  padding: 0 16px;
  margin-bottom: 32px;
}

.comparison__section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--theme-text-primary);
}

/* ===== Table ===== */
.comparison__table {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.comparison__table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.4fr 80px;
  gap: 12px;
  padding: 12px 20px;
  background-color: var(--theme-bg-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--theme-text-tertiary);
}

.comparison__row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.4fr 80px;
  gap: 12px;
  padding: 14px 20px;
  align-items: center;
  border-top: 1px solid var(--theme-border-subtle);
  transition: background-color 0.15s;
}

.comparison__row:hover {
  background-color: var(--theme-hover);
}

/* ===== Cells ===== */
.comparison__col--metric,
.comparison__cell--metric {
  font-weight: 500;
  color: var(--theme-text-primary);
}

.comparison__col--value,
.comparison__cell--value {
  text-align: center;
  font-size: 0.9rem;
  color: var(--theme-text-secondary);
  font-variant-numeric: tabular-nums;
}

.comparison__col--diff,
.comparison__cell--diff {
  text-align: center;
}

.comparison__col--status,
.comparison__cell--status {
  text-align: center;
}

/* ===== Diff Values ===== */
.comparison__diff-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.comparison__diff-value {
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.comparison__diff-value--improved { color: var(--color-success-500); }
.comparison__diff-value--worsened { color: var(--color-error-400); }
.comparison__diff-value--neutral  { color: var(--theme-text-tertiary); }

.comparison__diff-percent {
  font-size: 0.72rem;
  font-weight: 500;
}

.comparison__diff-percent--improved { color: var(--color-success-400); }
.comparison__diff-percent--worsened { color: var(--color-error-300); }
.comparison__diff-percent--neutral  { color: var(--theme-text-tertiary); }

/* ===== Status Badge ===== */
.comparison__status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.15s;
}

.comparison__status--improved {
  color: var(--color-success-500);
  background-color: rgba(111, 179, 15, 0.12);
}

.comparison__status--worsened {
  color: var(--color-error-400);
  background-color: rgba(231, 54, 35, 0.12);
}

.comparison__status--neutral {
  color: var(--theme-text-tertiary);
  background-color: rgba(151, 151, 150, 0.12);
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .comparison__table-header {
    display: none;
  }

  .comparison__row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px 20px;
  }

  .comparison__cell::before {
    content: attr(data-label);
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--theme-text-tertiary);
    margin-right: 8px;
    min-width: 80px;
  }

  .comparison__cell--value,
  .comparison__cell--diff,
  .comparison__cell--status {
    text-align: left;
  }

  .comparison__diff-group {
    flex-direction: row;
    gap: 8px;
  }
}

@media (max-width: 600px) {
  .comparison__header {
    padding: 24px 16px 20px;
  }

  .comparison__selectors {
    flex-direction: column;
    align-items: stretch;
  }

  .comparison__vs {
    align-self: center;
  }
}
</style>
