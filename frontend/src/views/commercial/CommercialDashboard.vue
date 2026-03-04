<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { diagnostics as mockData } from '@/data/commercialMock'
import CommercialStatsCards from './components/CommercialStatsCards.vue'
import CommercialFunnel from './components/CommercialFunnel.vue'
import CommercialTable from './components/CommercialTable.vue'

const router = useRouter()
const diagnostics = ref([...mockData])

const recentDiagnostics = ref(
  [...mockData]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
)

function handleNewDiagnostic() {
  alert('Funcionalidade de novo diagnóstico será implementada com a integração da API.')
}

function handleView(item) {
  router.push({ name: 'commercial-detail', params: { id: item.id } })
}

function goToList() {
  router.push({ name: 'commercial-list' })
}
</script>

<template>
  <main class="commercial">
    <header class="commercial__header row">
      <div class="commercial__header-text">
        <h1 class="commercial__title">Diagnóstico Comercial</h1>
        <p class="commercial__subtitle">
          Gestão estratégica de oportunidades baseadas em performance digital
        </p>
      </div>
      <button class="commercial__btn-primary" @click="handleNewDiagnostic">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Novo Diagnóstico
      </button>
    </header>

    <CommercialStatsCards :diagnostics="diagnostics" class="row" />

    <CommercialFunnel :diagnostics="diagnostics" />

    <section class="commercial__section row">
      <div class="commercial__section-header">
        <h2 class="commercial__section-title">Últimos Diagnósticos</h2>
        <button class="commercial__btn-link" @click="goToList">
          Ver todos
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <CommercialTable
        :diagnostics="recentDiagnostics"
        :compact="true"
        @view="handleView"
      />
    </section>
  </main>
</template>

<style scoped>
.commercial {
  min-height: 100vh;
  padding-bottom: 48px;
  background-color: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}

/* ===== Header ===== */
.commercial__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 24px;
}

.commercial__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--theme-text-primary);
}

.commercial__subtitle {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: var(--theme-text-tertiary);
}

.commercial__btn-primary {
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

.commercial__btn-primary:hover {
  background-color: var(--color-primary-400);
  transform: translateY(-1px);
}

.commercial__btn-primary:active {
  background-color: var(--color-primary-600);
  transform: translateY(0);
}

/* ===== Sections ===== */
.commercial__section {
  padding: 0 16px;
  margin-bottom: 32px;
}

.commercial__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.commercial__section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  color: var(--theme-text-primary);
}

.commercial__btn-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  background: none;
  border: none;
  color: var(--color-primary-400);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.2s;
}

.commercial__btn-link:hover {
  color: var(--color-primary-300);
}

/* ===== Responsive ===== */
@media (max-width: 600px) {
  .commercial__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 24px 16px 20px;
  }

  .commercial__btn-primary {
    width: 100%;
    justify-content: center;
  }
}
</style>
