<script setup>
import { ref, computed } from 'vue'

const scans = ref([
  { id: 1, url: 'lojademo.com.br', perfMobile: 62, perfDesktop: 89, seo: 92, date: '2026-03-01' },
  { id: 2, url: 'megastore.com.br', perfMobile: 45, perfDesktop: 71, seo: 78, date: '2026-02-28' },
  { id: 3, url: 'techshop.com.br', perfMobile: 78, perfDesktop: 94, seo: 88, date: '2026-02-27' },
  { id: 4, url: 'modaonline.com.br', perfMobile: 55, perfDesktop: 82, seo: 85, date: '2026-02-25' },
  { id: 5, url: 'sportmax.com.br', perfMobile: 70, perfDesktop: 90, seo: 95, date: '2026-02-23' },
])

const evolution = ref([
  { label: 'Semana 1', value: 52 },
  { label: 'Semana 2', value: 58 },
  { label: 'Semana 3', value: 61 },
  { label: 'Semana 4', value: 55 },
  { label: 'Semana 5', value: 68 },
  { label: 'Semana 6', value: 72 },
  { label: 'Semana 7', value: 78 },
])

const avgPerformance = computed(() => {
  const avg = scans.value.reduce((sum, s) => sum + s.perfMobile, 0) / scans.value.length
  return Math.round(avg)
})

const avgSeo = computed(() => {
  const avg = scans.value.reduce((sum, s) => sum + s.seo, 0) / scans.value.length
  return Math.round(avg)
})

const totalScans = computed(() => scans.value.length)

const lastScanDate = computed(() => {
  const sorted = [...scans.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  return formatDate(sorted[0].date)
})

const maxEvolution = computed(() => Math.max(...evolution.value.map(e => e.value)))

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function scoreColor(score) {
  if (score >= 90) return 'var(--color-success-500)'
  if (score >= 50) return 'var(--color-warning-500)'
  return 'var(--color-error-500)'
}

function handleNewScan() {
  alert('Redirecionar para novo scan')
}

function handleDetails(scan) {
  alert(`Ver detalhes de: ${scan.url}`)
}
</script>

<template>
  <main class="dashboard">
    <!-- Header -->
    <header class="dashboard__header row">
      <div class="dashboard__header-text">
        <h1 class="dashboard__title">Dashboard</h1>
        <p class="dashboard__subtitle">Visão geral das análises</p>
      </div>
      <button class="dashboard__btn-new" @click="handleNewScan">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Novo Scan
      </button>
    </header>

    <!-- Summary Cards -->
    <section class="dashboard__summary row">
      <div class="summary-card">
        <span class="summary-card__icon summary-card__icon--performance">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </span>
        <span class="summary-card__label">Média Performance</span>
        <span class="summary-card__value" :style="{ color: scoreColor(avgPerformance) }">
          {{ avgPerformance }}
        </span>
      </div>

      <div class="summary-card">
        <span class="summary-card__icon summary-card__icon--seo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <span class="summary-card__label">Média SEO</span>
        <span class="summary-card__value" :style="{ color: scoreColor(avgSeo) }">
          {{ avgSeo }}
        </span>
      </div>

      <div class="summary-card">
        <span class="summary-card__icon summary-card__icon--total">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </span>
        <span class="summary-card__label">Total de Scans</span>
        <span class="summary-card__value">{{ totalScans }}</span>
      </div>

      <div class="summary-card">
        <span class="summary-card__icon summary-card__icon--date">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <span class="summary-card__label">Último Scan</span>
        <span class="summary-card__value summary-card__value--date">{{ lastScanDate }}</span>
      </div>
    </section>

    <!-- Recent Scans Table -->
    <section class="dashboard__section row">
      <h2 class="dashboard__section-title">Últimos Scans</h2>

      <div class="scans-table">
        <div class="scans-table__header">
          <span class="scans-table__col scans-table__col--url">URL</span>
          <span class="scans-table__col scans-table__col--score">Perf. Mobile</span>
          <span class="scans-table__col scans-table__col--score">Perf. Desktop</span>
          <span class="scans-table__col scans-table__col--date">Data</span>
          <span class="scans-table__col scans-table__col--action"></span>
        </div>

        <div
          v-for="scan in scans"
          :key="scan.id"
          class="scans-table__row"
        >
          <span class="scans-table__col scans-table__col--url" data-label="URL">
            {{ scan.url }}
          </span>
          <span class="scans-table__col scans-table__col--score" data-label="Perf. Mobile">
            <span class="score-badge" :style="{ '--badge-color': scoreColor(scan.perfMobile) }">
              {{ scan.perfMobile }}
            </span>
          </span>
          <span class="scans-table__col scans-table__col--score" data-label="Perf. Desktop">
            <span class="score-badge" :style="{ '--badge-color': scoreColor(scan.perfDesktop) }">
              {{ scan.perfDesktop }}
            </span>
          </span>
          <span class="scans-table__col scans-table__col--date" data-label="Data">
            {{ formatDate(scan.date) }}
          </span>
          <span class="scans-table__col scans-table__col--action">
            <button class="scans-table__btn-details" @click="handleDetails(scan)">
              Ver detalhes
            </button>
          </span>
        </div>
      </div>
    </section>

    <!-- Performance Evolution Chart -->
    <section class="dashboard__section row">
      <h2 class="dashboard__section-title">Evolução de Performance</h2>

      <div class="chart">
        <div class="chart__y-axis">
          <span class="chart__y-label">100</span>
          <span class="chart__y-label">75</span>
          <span class="chart__y-label">50</span>
          <span class="chart__y-label">25</span>
          <span class="chart__y-label">0</span>
        </div>

        <div class="chart__area">
          <div class="chart__grid">
            <span class="chart__grid-line"></span>
            <span class="chart__grid-line"></span>
            <span class="chart__grid-line"></span>
            <span class="chart__grid-line"></span>
            <span class="chart__grid-line"></span>
          </div>

          <div class="chart__bars">
            <div
              v-for="(point, idx) in evolution"
              :key="idx"
              class="chart__bar-group"
            >
              <div class="chart__bar-wrapper">
                <div
                  class="chart__bar"
                  :style="{
                    height: point.value + '%',
                    backgroundColor: scoreColor(point.value),
                  }"
                >
                  <span class="chart__bar-value">{{ point.value }}</span>
                </div>
              </div>
              <span class="chart__bar-label">{{ point.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ===== Dashboard Layout ===== */
.dashboard {
  min-height: 100vh;
  padding-bottom: 48px;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

/* ===== Header ===== */
.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 24px;
}

.dashboard__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

.dashboard__subtitle {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: var(--theme-text-tertiary);
}

.dashboard__btn-new {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: var(--color-primary-500);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
  white-space: nowrap;
}

.dashboard__btn-new:hover {
  background-color: var(--color-primary-400);
  transform: translateY(-1px);
}

.dashboard__btn-new:active {
  background-color: var(--color-primary-600);
  transform: translateY(0);
}

/* ===== Summary Cards ===== */
.dashboard__summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 32px;
}

.summary-card {
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

.summary-card:hover {
  border-color: var(--theme-border-secondary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.summary-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.summary-card__icon--performance {
  background-color: rgba(255, 210, 46, 0.12);
  color: var(--color-warning-500);
}

.summary-card__icon--seo {
  background-color: rgba(59, 130, 246, 0.12);
  color: var(--color-informationlink-500);
}

.summary-card__icon--total {
  background-color: rgba(45, 140, 85, 0.12);
  color: var(--color-primary-400);
}

.summary-card__icon--date {
  background-color: rgba(151, 151, 150, 0.12);
  color: var(--theme-text-tertiary);
}

.summary-card__label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--theme-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.summary-card__value {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

.summary-card__value--date {
  font-size: 1.25rem;
}

/* ===== Sections ===== */
.dashboard__section {
  padding: 0 16px;
  margin-bottom: 32px;
}

.dashboard__section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 16px;
  color: var(--theme-text-primary);
}

/* ===== Scans Table ===== */
.scans-table {
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.scans-table__header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  gap: 12px;
  padding: 12px 20px;
  background-color: var(--theme-bg-tertiary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--theme-text-tertiary);
}

.scans-table__row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  gap: 12px;
  padding: 14px 20px;
  align-items: center;
  border-top: 1px solid var(--theme-border-subtle);
  transition: background-color 0.15s;
}

.scans-table__row:hover {
  background-color: var(--theme-hover);
}

.scans-table__col--url {
  font-weight: 500;
  color: var(--theme-text-primary);
}

.scans-table__col--score {
  text-align: center;
}

.scans-table__col--date {
  font-size: 0.875rem;
  color: var(--theme-text-secondary);
}

.scans-table__col--action {
  text-align: right;
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
  background-color: color-mix(in srgb, var(--badge-color) 12%, transparent);
}

.scans-table__btn-details {
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

.scans-table__btn-details:hover {
  background-color: rgba(45, 140, 85, 0.1);
  border-color: var(--color-primary-500);
}

/* ===== Chart ===== */
.chart {
  display: flex;
  gap: 8px;
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 12px;
  padding: 24px 20px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-height: 260px;
}

.chart__y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 28px;
  flex-shrink: 0;
}

.chart__y-label {
  font-size: 0.7rem;
  color: var(--theme-text-tertiary);
  text-align: right;
  min-width: 24px;
}

.chart__area {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.chart__grid {
  position: absolute;
  inset: 0;
  bottom: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.chart__grid-line {
  display: block;
  height: 1px;
  background-color: var(--theme-border-subtle);
}

.chart__bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  position: relative;
  z-index: 1;
  padding-bottom: 28px;
}

.chart__bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.chart__bar-wrapper {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
}

.chart__bar {
  width: 60%;
  max-width: 48px;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.4s ease;
}

.chart__bar-value {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--theme-text-secondary);
  white-space: nowrap;
}

.chart__bar-label {
  margin-top: 8px;
  font-size: 0.68rem;
  color: var(--theme-text-tertiary);
  white-space: nowrap;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .dashboard__summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .scans-table__header {
    display: none;
  }

  .scans-table__row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px 20px;
  }

  .scans-table__col::before {
    content: attr(data-label);
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--theme-text-tertiary);
    margin-right: 8px;
    min-width: 90px;
  }

  .scans-table__col--score {
    text-align: left;
  }

  .scans-table__col--action {
    text-align: left;
  }

  .scans-table__col--action::before {
    display: none;
  }
}

@media (max-width: 600px) {
  .dashboard__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 16px 20px;
  }

  .dashboard__btn-new {
    width: 100%;
    justify-content: center;
  }

  .dashboard__summary {
    grid-template-columns: 1fr;
  }

  .summary-card__value {
    font-size: 1.5rem;
  }

  .chart {
    padding: 16px 12px 12px;
    min-height: 200px;
  }

  .chart__bar-label {
    font-size: 0.6rem;
  }
}
</style>
