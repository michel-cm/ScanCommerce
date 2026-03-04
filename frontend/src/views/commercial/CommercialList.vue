<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { diagnostics as mockData } from '@/data/commercialMock'
import CommercialFilters from './components/CommercialFilters.vue'
import CommercialTable from './components/CommercialTable.vue'

const router = useRouter()

const diagnostics = ref([...mockData])
const search = ref('')
const statusFilter = ref('')
const sortBy = ref('date')
const activeTag = ref('')

const availableTags = computed(() => {
  const tags = new Set()
  diagnostics.value.forEach((d) => d.tags.forEach((t) => tags.add(t)))
  return [...tags].sort()
})

const filteredDiagnostics = computed(() => {
  let result = [...diagnostics.value]

  if (search.value) {
    const term = search.value.toLowerCase()
    result = result.filter(
      (d) =>
        d.companyName.toLowerCase().includes(term) ||
        d.url.toLowerCase().includes(term)
    )
  }

  if (statusFilter.value) {
    result = result.filter((d) => d.status === statusFilter.value)
  }

  if (activeTag.value) {
    result = result.filter((d) => d.tags.includes(activeTag.value))
  }

  if (sortBy.value === 'mobile') {
    result.sort((a, b) => a.mobile.score - b.mobile.score)
  } else if (sortBy.value === 'desktop') {
    result.sort((a, b) => a.desktop.score - b.desktop.score)
  } else {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return result
})

function handleView(item) {
  router.push({ name: 'commercial-detail', params: { id: item.id } })
}

function goBack() {
  router.push({ name: 'commercial-dashboard' })
}
</script>

<template>
  <main class="commercial">
    <header class="commercial__header row">
      <div class="commercial__header-left">
        <button class="commercial__btn-back" @click="goBack">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div class="commercial__header-text">
          <h1 class="commercial__title">Lista de Diagnósticos</h1>
          <p class="commercial__subtitle">
            {{ filteredDiagnostics.length }} diagnóstico{{ filteredDiagnostics.length !== 1 ? 's' : '' }} encontrado{{ filteredDiagnostics.length !== 1 ? 's' : '' }}
          </p>
        </div>
      </div>
    </header>

    <section class="commercial__section row">
      <CommercialFilters
        v-model:search="search"
        v-model:status-filter="statusFilter"
        v-model:sort-by="sortBy"
        v-model:active-tag="activeTag"
        :available-tags="availableTags"
      />

      <CommercialTable
        :diagnostics="filteredDiagnostics"
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

.commercial__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px 24px;
}

.commercial__header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.commercial__btn-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-border-subtle);
  border-radius: 8px;
  color: var(--theme-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.commercial__btn-back:hover {
  background-color: var(--theme-hover);
  color: var(--theme-text-primary);
  border-color: var(--theme-border-secondary);
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

.commercial__section {
  padding: 0 16px;
  margin-bottom: 32px;
}

@media (max-width: 600px) {
  .commercial__header {
    padding: 24px 16px 20px;
  }

  .commercial__title {
    font-size: 1.35rem;
  }
}
</style>
